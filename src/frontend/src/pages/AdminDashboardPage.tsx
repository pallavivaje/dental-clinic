import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Loader2,
  LogOut,
  MessageCircle,
  Stethoscope,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AppointmentStatus, Patient } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAppointments,
  useGetPatients,
  useGetStats,
  useUpdateAppointmentStatus,
  useUpdatePatientNotes,
} from "../hooks/useQueries";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

function getStatus(status: AppointmentStatus): string {
  return status.__kind__;
}

export function AdminDashboardPage() {
  const { identity, isInitializing, clear } = useInternetIdentity();
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: appointments, isLoading: apptLoading } = useGetAppointments();
  const { data: patients, isLoading: patientsLoading } = useGetPatients();
  const updateStatus = useUpdateAppointmentStatus();
  const updateNotes = useUpdatePatientNotes();

  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    if (!isInitializing && !identity) {
      navigate({ to: "/admin" });
    }
  }, [identity, isInitializing, navigate]);

  const handleStatusChange = async (id: bigint, statusStr: string) => {
    const status: AppointmentStatus = {
      __kind__: statusStr as AppointmentStatus["__kind__"],
    };
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!editPatient) return;
    try {
      await updateNotes.mutateAsync({
        id: editPatient.id,
        medicalNotes: editNotes,
      });
      toast.success("Notes updated");
      setEditPatient(null);
    } catch {
      toast.error("Failed to update notes");
    }
  };

  const handleLogout = () => {
    clear();
    navigate({ to: "/admin" });
  };

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="dashboard.loading_state"
      >
        <Loader2 size={32} className="animate-spin text-dental-teal" />
      </div>
    );
  }

  if (!identity) return null;

  const statCards = [
    {
      label: "Total Appointments",
      value: stats?.totalAppointments.toString() ?? "0",
      icon: CalendarCheck,
      color: "bg-dental-teal-muted text-dental-teal",
    },
    {
      label: "Pending",
      value: stats?.pendingCount.toString() ?? "0",
      icon: ChevronDown,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Confirmed",
      value: stats?.confirmedCount.toString() ?? "0",
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Completed",
      value: stats?.completedCount.toString() ?? "0",
      icon: XCircle,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Patients",
      value: stats?.totalPatients.toString() ?? "0",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-dental-dark text-white px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-dental-teal rounded-xl flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg">
                Denta<span className="text-dental-teal-light">Care</span>
              </span>
              <span className="text-white/40 text-sm ml-2">
                Admin Dashboard
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
            data-ocid="dashboard.logout.button"
          >
            <LogOut size={15} className="mr-1.5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card, i) => (
            <div
              key={card.label}
              className="bg-card border border-border rounded-xl p-4 shadow-xs"
              data-ocid={`dashboard.stats.item.${i + 1}`}
            >
              {statsLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <>
                  <div
                    className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center mb-3`}
                  >
                    <card.icon size={17} />
                  </div>
                  <div className="font-display font-bold text-2xl text-dental-dark">
                    {card.value}
                  </div>
                  <div className="text-muted-foreground text-xs font-medium mt-0.5">
                    {card.label}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="appointments">
          <TabsList className="mb-6 bg-dental-teal-muted rounded-xl">
            <TabsTrigger
              value="appointments"
              className="rounded-lg"
              data-ocid="dashboard.appointments.tab"
            >
              <CalendarCheck size={15} className="mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="rounded-lg"
              data-ocid="dashboard.patients.tab"
            >
              <Users size={15} className="mr-2" />
              Patients
            </TabsTrigger>
          </TabsList>

          {/* APPOINTMENTS TAB */}
          <TabsContent value="appointments">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
              {apptLoading ? (
                <div
                  className="p-8 space-y-3"
                  data-ocid="appointments.loading_state"
                >
                  {[1, 2, 3].map((n) => (
                    <Skeleton key={n} className="h-12 w-full" />
                  ))}
                </div>
              ) : !appointments?.length ? (
                <div
                  className="p-12 text-center text-muted-foreground"
                  data-ocid="appointments.empty_state"
                >
                  No appointments yet.
                </div>
              ) : (
                <Table data-ocid="appointments.table">
                  <TableHeader>
                    <TableRow className="bg-dental-teal-muted/50">
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Name
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Phone
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Service
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Date
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Time
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Status
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt, i) => {
                      const status = getStatus(appt.status);
                      const waText = encodeURIComponent(
                        `Hello ${appt.patientName}, your dental appointment for ${appt.service} on ${appt.appointmentDate} at ${appt.appointmentTime} is confirmed. - Dental Clinic`,
                      );
                      return (
                        <TableRow
                          key={appt.id.toString()}
                          className="hover:bg-muted/30"
                          data-ocid={`appointments.row.${i + 1}`}
                        >
                          <TableCell className="font-medium text-dental-dark">
                            {appt.patientName}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {appt.patientPhone}
                          </TableCell>
                          <TableCell className="text-sm">
                            {appt.service}
                          </TableCell>
                          <TableCell className="text-sm">
                            {appt.appointmentDate}
                          </TableCell>
                          <TableCell className="text-sm">
                            {appt.appointmentTime}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs font-medium border ${
                                STATUS_COLORS[status] ?? ""
                              }`}
                            >
                              {STATUS_LABELS[status] ?? status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs rounded-full"
                                    data-ocid={`appointments.status.dropdown_menu.${i + 1}`}
                                  >
                                    Status{" "}
                                    <ChevronDown size={12} className="ml-1" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {[
                                    "pending",
                                    "confirmed",
                                    "completed",
                                    "cancelled",
                                  ].map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={() =>
                                        handleStatusChange(appt.id, s)
                                      }
                                      className="capitalize text-sm"
                                      data-ocid={`appointments.status.${s}.button.${i + 1}`}
                                    >
                                      {STATUS_LABELS[s]}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>

                              <a
                                href={`https://wa.me/${appt.patientPhone}?text=${waText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-green-600 hover:bg-green-50 rounded-full"
                                  data-ocid={`appointments.whatsapp.button.${i + 1}`}
                                >
                                  <MessageCircle size={14} />
                                </Button>
                              </a>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* PATIENTS TAB */}
          <TabsContent value="patients">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
              {patientsLoading ? (
                <div
                  className="p-8 space-y-3"
                  data-ocid="patients.loading_state"
                >
                  {[1, 2, 3].map((n) => (
                    <Skeleton key={n} className="h-12 w-full" />
                  ))}
                </div>
              ) : !patients?.length ? (
                <div
                  className="p-12 text-center text-muted-foreground"
                  data-ocid="patients.empty_state"
                >
                  No patients yet.
                </div>
              ) : (
                <Table data-ocid="patients.table">
                  <TableHeader>
                    <TableRow className="bg-dental-teal-muted/50">
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Name
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Phone
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Email
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Date of Birth
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Medical Notes
                      </TableHead>
                      <TableHead className="font-heading font-bold text-dental-dark">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient, i) => (
                      <TableRow
                        key={patient.id.toString()}
                        className="hover:bg-muted/30"
                        data-ocid={`patients.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-dental-dark">
                          {patient.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {patient.phone}
                        </TableCell>
                        <TableCell className="text-sm">
                          {patient.email}
                        </TableCell>
                        <TableCell className="text-sm">
                          {patient.dateOfBirth}
                        </TableCell>
                        <TableCell className="text-sm max-w-[200px] truncate text-muted-foreground">
                          {patient.medicalNotes || "—"}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditPatient(patient);
                              setEditNotes(patient.medicalNotes);
                            }}
                            className="h-7 text-xs rounded-full"
                            data-ocid={`patients.edit.edit_button.${i + 1}`}
                          >
                            Edit Notes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Patient Notes Dialog */}
      <Dialog
        open={!!editPatient}
        onOpenChange={(open) => !open && setEditPatient(null)}
      >
        <DialogContent
          className="rounded-2xl max-w-md"
          data-ocid="patients.notes.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Edit Medical Notes
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="text-muted-foreground text-sm mb-3">
              Patient: <strong>{editPatient?.name}</strong>
            </p>
            <Textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Enter medical notes, allergies, conditions..."
              rows={5}
              className="rounded-xl"
              data-ocid="patients.notes.textarea"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditPatient(null)}
              className="rounded-full"
              data-ocid="patients.notes.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveNotes}
              disabled={updateNotes.isPending}
              className="bg-dental-teal hover:bg-dental-teal-dark text-white rounded-full"
              data-ocid="patients.notes.save_button"
            >
              {updateNotes.isPending ? (
                <Loader2 size={14} className="animate-spin mr-2" />
              ) : null}
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
