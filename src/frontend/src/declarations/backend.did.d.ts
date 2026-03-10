/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export type AppointmentStatus =
  { 'pending': null } |
  { 'confirmed': null } |
  { 'cancelled': null } |
  { 'completed': null };

export interface Appointment {
  'id': bigint;
  'patientName': string;
  'patientPhone': string;
  'patientEmail': string;
  'service': string;
  'appointmentDate': string;
  'appointmentTime': string;
  'notes': string;
  'status': AppointmentStatus;
  'createdAt': bigint;
}

export interface Patient {
  'id': bigint;
  'name': string;
  'phone': string;
  'email': string;
  'dateOfBirth': string;
  'medicalNotes': string;
  'createdAt': bigint;
}

export interface Stats {
  'totalAppointments': bigint;
  'pendingCount': bigint;
  'confirmedCount': bigint;
  'completedCount': bigint;
  'totalPatients': bigint;
}

export interface _SERVICE {
  '_initializeAccessControlWithSecret': ActorMethod<[string], undefined>;
  'bookAppointment': ActorMethod<[string, string, string, string, string, string, string], bigint>;
  'getAppointments': ActorMethod<[], Array<Appointment>>;
  'updateAppointmentStatus': ActorMethod<[bigint, AppointmentStatus], boolean>;
  'addPatient': ActorMethod<[string, string, string, string, string], bigint>;
  'getPatients': ActorMethod<[], Array<Patient>>;
  'updatePatientNotes': ActorMethod<[bigint, string], boolean>;
  'getStats': ActorMethod<[], Stats>;
}

export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
