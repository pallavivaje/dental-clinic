/* eslint-disable */

// @ts-nocheck

import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type Agent, type ActorSubclass } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";

export interface Some<T> { __kind__: "Some"; value: T; }
export interface None { __kind__: "None"; }
export type Option<T> = Some<T> | None;

export class ExternalBlob {
  _blob?: Uint8Array<ArrayBuffer> | null;
  directURL: string;
  onProgress?: (percentage: number) => void = undefined;
  private constructor(directURL: string, blob: Uint8Array<ArrayBuffer> | null) {
    if (blob) { this._blob = blob; }
    this.directURL = directURL;
  }
  static fromURL(url: string): ExternalBlob { return new ExternalBlob(url, null); }
  static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob {
    const url = URL.createObjectURL(new Blob([new Uint8Array(blob)], { type: 'application/octet-stream' }));
    return new ExternalBlob(url, blob);
  }
  public async getBytes(): Promise<Uint8Array<ArrayBuffer>> {
    if (this._blob) { return this._blob; }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  public getDirectURL(): string { return this.directURL; }
  public withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
    this.onProgress = onProgress;
    return this;
  }
}

export type AppointmentStatus =
  | { __kind__: "pending" }
  | { __kind__: "confirmed" }
  | { __kind__: "cancelled" }
  | { __kind__: "completed" };

export interface Appointment {
  id: bigint;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: bigint;
}

export interface Patient {
  id: bigint;
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  medicalNotes: string;
  createdAt: bigint;
}

export interface Stats {
  totalAppointments: bigint;
  pendingCount: bigint;
  confirmedCount: bigint;
  completedCount: bigint;
  totalPatients: bigint;
}

export interface backendInterface {
  _initializeAccessControlWithSecret(secret: string): Promise<void>;
  bookAppointment(patientName: string, patientPhone: string, patientEmail: string, service: string, appointmentDate: string, appointmentTime: string, notes: string): Promise<bigint>;
  getAppointments(): Promise<Array<Appointment>>;
  updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<boolean>;
  addPatient(name: string, phone: string, email: string, dateOfBirth: string, medicalNotes: string): Promise<bigint>;
  getPatients(): Promise<Array<Patient>>;
  updatePatientNotes(id: bigint, medicalNotes: string): Promise<boolean>;
  getStats(): Promise<Stats>;
}

function toCandicStatus(status: AppointmentStatus): object {
  return { [status.__kind__]: null };
}

function fromCandidStatus(value: object): AppointmentStatus {
  if ('pending' in value) return { __kind__: 'pending' };
  if ('confirmed' in value) return { __kind__: 'confirmed' };
  if ('cancelled' in value) return { __kind__: 'cancelled' };
  return { __kind__: 'completed' };
}

function fromCandidAppointment(a: any): Appointment {
  return {
    id: a.id, patientName: a.patientName, patientPhone: a.patientPhone,
    patientEmail: a.patientEmail, service: a.service,
    appointmentDate: a.appointmentDate, appointmentTime: a.appointmentTime,
    notes: a.notes, status: fromCandidStatus(a.status), createdAt: a.createdAt,
  };
}

function fromCandidPatient(p: any): Patient {
  return {
    id: p.id, name: p.name, phone: p.phone, email: p.email,
    dateOfBirth: p.dateOfBirth, medicalNotes: p.medicalNotes, createdAt: p.createdAt,
  };
}

export class Backend implements backendInterface {
  constructor(
    private actor: ActorSubclass<_SERVICE>,
    private _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
    private _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>,
    private processError?: (error: unknown) => never
  ) {}

  private async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.processError) {
      try { return await fn(); } catch (e) { this.processError(e); throw new Error('unreachable'); }
    }
    return fn();
  }

  async _initializeAccessControlWithSecret(secret: string): Promise<void> {
    return this.call(() => this.actor._initializeAccessControlWithSecret(secret));
  }
  async bookAppointment(patientName: string, patientPhone: string, patientEmail: string, service: string, appointmentDate: string, appointmentTime: string, notes: string): Promise<bigint> {
    return this.call(() => this.actor.bookAppointment(patientName, patientPhone, patientEmail, service, appointmentDate, appointmentTime, notes));
  }
  async getAppointments(): Promise<Array<Appointment>> {
    const result = await this.call(() => this.actor.getAppointments());
    return result.map(fromCandidAppointment);
  }
  async updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<boolean> {
    return this.call(() => this.actor.updateAppointmentStatus(id, toCandicStatus(status)));
  }
  async addPatient(name: string, phone: string, email: string, dateOfBirth: string, medicalNotes: string): Promise<bigint> {
    return this.call(() => this.actor.addPatient(name, phone, email, dateOfBirth, medicalNotes));
  }
  async getPatients(): Promise<Array<Patient>> {
    const result = await this.call(() => this.actor.getPatients());
    return result.map(fromCandidPatient);
  }
  async updatePatientNotes(id: bigint, medicalNotes: string): Promise<boolean> {
    return this.call(() => this.actor.updatePatientNotes(id, medicalNotes));
  }
  async getStats(): Promise<Stats> {
    return this.call(() => this.actor.getStats());
  }
}

export interface CreateActorOptions {
  agent?: Agent;
  agentOptions?: HttpAgentOptions;
  actorOptions?: ActorConfig;
  processError?: (error: unknown) => never;
}

export function createActor(
  canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>,
  options: CreateActorOptions = {}
): Backend {
  const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
  const actor = Actor.createActor<_SERVICE>(idlFactory, {
    agent, canisterId, ...options.actorOptions,
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
