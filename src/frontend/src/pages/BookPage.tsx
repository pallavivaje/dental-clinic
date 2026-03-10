import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarCheck,
  CheckCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useBookAppointment } from "../hooks/useQueries";

const SERVICES = [
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics / Braces",
  "Root Canal",
  "Emergency Dental",
  "Dental Filling",
  "Dental Crown",
  "Routine Check-up",
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function BookPage() {
  const bookAppointment = useBookAppointment();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [booked, setBooked] = useState<{
    id: bigint;
    service: string;
    date: string;
    time: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.service || !form.time) {
      toast.error("Please select a service and time slot.");
      return;
    }
    try {
      const id = await bookAppointment.mutateAsync({
        patientName: form.name,
        patientPhone: form.phone,
        patientEmail: form.email,
        service: form.service,
        appointmentDate: form.date,
        appointmentTime: form.time,
        notes: form.notes,
      });
      setBooked({
        id,
        service: form.service,
        date: form.date,
        time: form.time,
      });
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  const whatsappUrl = booked
    ? `https://wa.me/+12345678901?text=${encodeURIComponent(
        `Hi, I just booked appointment #${booked.id} for ${booked.service} on ${booked.date} at ${booked.time}`,
      )}`
    : "";

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border p-10 max-w-md w-full text-center shadow-dental"
          data-ocid="booking.success_state"
        >
          <div className="w-16 h-16 bg-dental-teal-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-dental-teal" />
          </div>
          <h2 className="font-display font-bold text-2xl text-dental-dark mb-2">
            Appointment Confirmed!
          </h2>
          <p className="text-muted-foreground mb-1 text-sm">
            Your appointment ID is
          </p>
          <div className="font-display font-bold text-3xl text-dental-teal mb-4">
            #{booked.id.toString()}
          </div>
          <div className="bg-dental-teal-muted rounded-xl p-4 mb-6 text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">Service: </span>
              <span className="font-semibold text-dental-dark">
                {booked.service}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Date: </span>
              <span className="font-semibold text-dental-dark">
                {booked.date}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Time: </span>
              <span className="font-semibold text-dental-dark">
                {booked.time}
              </span>
            </div>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold"
              data-ocid="booking.whatsapp.primary_button"
            >
              <MessageCircle size={16} className="mr-2" />
              Confirm via WhatsApp
            </Button>
          </a>
          <button
            type="button"
            className="mt-4 text-sm text-muted-foreground hover:text-dental-teal transition-colors"
            onClick={() => setBooked(null)}
            data-ocid="booking.new.secondary_button"
          >
            Book another appointment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 dental-gradient rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CalendarCheck size={26} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-dental-dark mb-2">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground">
            Fill in your details and we'll confirm your slot within 30 minutes.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl border border-border p-8 shadow-dental space-y-6"
          data-ocid="booking.panel"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="name"
                className="font-heading font-semibold text-dental-dark mb-2 block"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Jane Doe"
                className="rounded-xl"
                data-ocid="booking.name.input"
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="font-heading font-semibold text-dental-dark mb-2 block"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+1 (555) 000-0000"
                className="rounded-xl"
                data-ocid="booking.phone.input"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="email"
              className="font-heading font-semibold text-dental-dark mb-2 block"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="jane@example.com"
              className="rounded-xl"
              data-ocid="booking.email.input"
            />
          </div>

          <div>
            <Label className="font-heading font-semibold text-dental-dark mb-2 block">
              Service *
            </Label>
            <Select
              value={form.service}
              onValueChange={(v) => setForm((p) => ({ ...p, service: v }))}
            >
              <SelectTrigger
                className="rounded-xl"
                data-ocid="booking.service.select"
              >
                <SelectValue placeholder="Select a dental service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label
                htmlFor="date"
                className="font-heading font-semibold text-dental-dark mb-2 block"
              >
                Preferred Date *
              </Label>
              <Input
                id="date"
                type="date"
                required
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
                className="rounded-xl"
                data-ocid="booking.date.input"
              />
            </div>
            <div>
              <Label className="font-heading font-semibold text-dental-dark mb-2 block">
                Preferred Time *
              </Label>
              <Select
                value={form.time}
                onValueChange={(v) => setForm((p) => ({ ...p, time: v }))}
              >
                <SelectTrigger
                  className="rounded-xl"
                  data-ocid="booking.time.select"
                >
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label
              htmlFor="notes"
              className="font-heading font-semibold text-dental-dark mb-2 block"
            >
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) =>
                setForm((p) => ({ ...p, notes: e.target.value }))
              }
              placeholder="Any allergies, concerns, or special requests..."
              className="rounded-xl resize-none"
              rows={3}
              data-ocid="booking.notes.textarea"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={bookAppointment.isPending}
            className="w-full bg-dental-teal hover:bg-dental-teal-dark text-white rounded-full font-semibold shadow-dental"
            data-ocid="booking.submit.submit_button"
          >
            {bookAppointment.isPending ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              <>
                <CalendarCheck size={18} className="mr-2" />
                Confirm Appointment
              </>
            )}
          </Button>

          {bookAppointment.isError && (
            <p
              className="text-center text-destructive text-sm"
              data-ocid="booking.error_state"
            >
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
