import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AppointmentStatus,
  backendInterface as DentalBackend,
} from "../backend.d";
import { useActor } from "./useActor";

function getDentalActor(actor: unknown): DentalBackend {
  return actor as DentalBackend;
}

export function useBookAppointment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      patientName: string;
      patientPhone: string;
      patientEmail: string;
      service: string;
      appointmentDate: string;
      appointmentTime: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return getDentalActor(actor).bookAppointment(
        data.patientName,
        data.patientPhone,
        data.patientEmail,
        data.service,
        data.appointmentDate,
        data.appointmentTime,
        data.notes,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useGetAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return getDentalActor(actor).getAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; status: AppointmentStatus }) => {
      if (!actor) throw new Error("Not connected");
      return getDentalActor(actor).updateAppointmentStatus(
        data.id,
        data.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useGetPatients() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return getDentalActor(actor).getPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdatePatientNotes() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; medicalNotes: string }) => {
      if (!actor) throw new Error("Not connected");
      return getDentalActor(actor).updatePatientNotes(
        data.id,
        data.medicalNotes,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return getDentalActor(actor).getStats();
    },
    enabled: !!actor && !isFetching,
  });
}
