/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

const AppointmentStatus = IDL.Variant({
  'pending': IDL.Null,
  'confirmed': IDL.Null,
  'cancelled': IDL.Null,
  'completed': IDL.Null,
});

const Appointment = IDL.Record({
  'id': IDL.Nat,
  'patientName': IDL.Text,
  'patientPhone': IDL.Text,
  'patientEmail': IDL.Text,
  'service': IDL.Text,
  'appointmentDate': IDL.Text,
  'appointmentTime': IDL.Text,
  'notes': IDL.Text,
  'status': AppointmentStatus,
  'createdAt': IDL.Int,
});

const Patient = IDL.Record({
  'id': IDL.Nat,
  'name': IDL.Text,
  'phone': IDL.Text,
  'email': IDL.Text,
  'dateOfBirth': IDL.Text,
  'medicalNotes': IDL.Text,
  'createdAt': IDL.Int,
});

const Stats = IDL.Record({
  'totalAppointments': IDL.Nat,
  'pendingCount': IDL.Nat,
  'confirmedCount': IDL.Nat,
  'completedCount': IDL.Nat,
  'totalPatients': IDL.Nat,
});

export const idlService = IDL.Service({
  '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
  'bookAppointment': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'getAppointments': IDL.Func([], [IDL.Vec(Appointment)], ['query']),
  'updateAppointmentStatus': IDL.Func([IDL.Nat, AppointmentStatus], [IDL.Bool], []),
  'addPatient': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'getPatients': IDL.Func([], [IDL.Vec(Patient)], ['query']),
  'updatePatientNotes': IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
  'getStats': IDL.Func([], [Stats], ['query']),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const AppointmentStatus = IDL.Variant({
    'pending': IDL.Null,
    'confirmed': IDL.Null,
    'cancelled': IDL.Null,
    'completed': IDL.Null,
  });
  const Appointment = IDL.Record({
    'id': IDL.Nat,
    'patientName': IDL.Text,
    'patientPhone': IDL.Text,
    'patientEmail': IDL.Text,
    'service': IDL.Text,
    'appointmentDate': IDL.Text,
    'appointmentTime': IDL.Text,
    'notes': IDL.Text,
    'status': AppointmentStatus,
    'createdAt': IDL.Int,
  });
  const Patient = IDL.Record({
    'id': IDL.Nat,
    'name': IDL.Text,
    'phone': IDL.Text,
    'email': IDL.Text,
    'dateOfBirth': IDL.Text,
    'medicalNotes': IDL.Text,
    'createdAt': IDL.Int,
  });
  const Stats = IDL.Record({
    'totalAppointments': IDL.Nat,
    'pendingCount': IDL.Nat,
    'confirmedCount': IDL.Nat,
    'completedCount': IDL.Nat,
    'totalPatients': IDL.Nat,
  });
  return IDL.Service({
    '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
    'bookAppointment': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getAppointments': IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'updateAppointmentStatus': IDL.Func([IDL.Nat, AppointmentStatus], [IDL.Bool], []),
    'addPatient': IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getPatients': IDL.Func([], [IDL.Vec(Patient)], ['query']),
    'updatePatientNotes': IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
    'getStats': IDL.Func([], [Stats], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
