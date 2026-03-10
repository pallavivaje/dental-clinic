import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

actor {
  // ── Legacy types (DRC Logistics) kept for stable variable compatibility ────
  // These variables existed in the previous deployment and cannot be dropped
  // without an explicit migration. We retain them here, unused.

  type _LegacyCargoType = {
    #fullContainerLoad;
    #lessThanTruckLoad;
    #reeferTrucking;
    #projectUponRequest;
    #landFreight;
    #oversize;
    #oceanImportExport;
    #projectManagement;
    #consulting;
    #services;
  };

  type _LegacyCargoCondition = {
    #standard;
    #dangerousHazmat;
    #temperatureControlled;
    #oversizedOverweight;
    #liquidBulk;
    #solidBulk;
  };

  type _LegacyShipmentType = {
    #fullContainerLoad;
    #lessThanTruckLoad;
    #reeferTrucking;
    #projectUponRequest;
  };

  type _LegacyQuoteRequest = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    origin : Text;
    destination : Text;
    cargoType : _LegacyCargoType;
    cargoCondition : _LegacyCargoCondition;
    shipmentType : _LegacyShipmentType;
  };

  // Retained stable variables from previous version (do not remove)
  let quoteRequests = Map.empty<Nat, _LegacyQuoteRequest>();
  var nextQuoteRequestId : Nat = 0;

  // ── Dental Clinic Types ────────────────────────────────────────────────────

  public type AppointmentStatus = {
    #pending;
    #confirmed;
    #cancelled;
    #completed;
  };

  public type Appointment = {
    id : Nat;
    patientName : Text;
    patientPhone : Text;
    patientEmail : Text;
    service : Text;
    appointmentDate : Text;
    appointmentTime : Text;
    notes : Text;
    status : AppointmentStatus;
    createdAt : Int;
  };

  public type Patient = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    dateOfBirth : Text;
    medicalNotes : Text;
    createdAt : Int;
  };

  public type Stats = {
    totalAppointments : Nat;
    pendingCount : Nat;
    confirmedCount : Nat;
    completedCount : Nat;
    totalPatients : Nat;
  };

  // ── State ──────────────────────────────────────────────────────────────────

  let appointments = Map.empty<Nat, Appointment>();
  var nextAppointmentId : Nat = 0;

  let patients = Map.empty<Nat, Patient>();
  var nextPatientId : Nat = 0;

  // ── Public: Appointments ───────────────────────────────────────────────────

  public shared func bookAppointment(
    patientName : Text,
    patientPhone : Text,
    patientEmail : Text,
    service : Text,
    appointmentDate : Text,
    appointmentTime : Text,
    notes : Text,
  ) : async Nat {
    let id = nextAppointmentId;
    let appt : Appointment = {
      id;
      patientName;
      patientPhone;
      patientEmail;
      service;
      appointmentDate;
      appointmentTime;
      notes;
      status = #pending;
      createdAt = Time.now();
    };
    appointments.add(id, appt);
    nextAppointmentId += 1;
    id;
  };

  public query func getAppointments() : async [Appointment] {
    appointments.values().toArray();
  };

  public shared func updateAppointmentStatus(id : Nat, status : AppointmentStatus) : async Bool {
    switch (appointments.get(id)) {
      case (?appt) {
        let updated = { appt with status };
        appointments.add(id, updated);
        true;
      };
      case null { false };
    };
  };

  // ── Public: Patients ───────────────────────────────────────────────────────

  public shared func addPatient(
    name : Text,
    phone : Text,
    email : Text,
    dateOfBirth : Text,
    medicalNotes : Text,
  ) : async Nat {
    let id = nextPatientId;
    let patient : Patient = {
      id;
      name;
      phone;
      email;
      dateOfBirth;
      medicalNotes;
      createdAt = Time.now();
    };
    patients.add(id, patient);
    nextPatientId += 1;
    id;
  };

  public query func getPatients() : async [Patient] {
    patients.values().toArray();
  };

  public shared func updatePatientNotes(id : Nat, medicalNotes : Text) : async Bool {
    switch (patients.get(id)) {
      case (?p) {
        let updated = { p with medicalNotes };
        patients.add(id, updated);
        true;
      };
      case null { false };
    };
  };

  // ── Public: Stats ──────────────────────────────────────────────────────────

  public query func getStats() : async Stats {
    var pending = 0;
    var confirmed = 0;
    var completed = 0;
    for (appt in appointments.values()) {
      switch (appt.status) {
        case (#pending) { pending += 1 };
        case (#confirmed) { confirmed += 1 };
        case (#completed) { completed += 1 };
        case (#cancelled) {};
      };
    };
    {
      totalAppointments = appointments.size();
      pendingCount = pending;
      confirmedCount = confirmed;
      completedCount = completed;
      totalPatients = patients.size();
    };
  };
};
