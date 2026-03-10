import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> { __kind__: "Some"; value: T; }
export interface None { __kind__: "None"; }
export type Option<T> = Some<T> | None;

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
