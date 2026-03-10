# Dental Clinic Website

## Current State
New project -- no existing code.

## Requested Changes (Diff)

### Add
- Marketing landing page with dental services, hero section, testimonials, pricing/services overview, contact info
- Online appointment booking system (patients can book appointments by selecting service, date, time, and entering contact info)
- Patient management system (admin dashboard to view, manage, and update patient records and appointments)
- WhatsApp appointment automation (WhatsApp click-to-chat links pre-filled with appointment details; admin can send WhatsApp reminders from the dashboard)
- Admin authentication to protect the patient management dashboard

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Patient records (name, phone, email, date of birth, medical notes), appointments (patient ref, service, date, time, status: pending/confirmed/cancelled), services list, admin auth
2. Frontend pages:
   - Public: Landing/marketing page, Book Appointment page
   - Admin (protected): Dashboard overview, Appointments list, Patients list, Appointment detail with WhatsApp action button
3. WhatsApp integration: Generate wa.me links pre-filled with appointment confirmation/reminder messages; open in new tab from admin dashboard
4. Authorization component for admin login/role protection
