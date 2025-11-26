export interface Appointment {
  id: string;
  date: string;
  time: string;
  department: string;
  patientName: string;
  email: string;
  phone: string;
  symptoms: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export type BookingStep = 'date' | 'details' | 'confirmation';

export type TimeSlot = string;

export enum Department {
  GENERAL = 'General Medicine',
  CARDIOLOGY = 'Cardiology',
  PEDIATRICS = 'Pediatrics',
  ORTHOPEDICS = 'Orthopedics',
  DERMATOLOGY = 'Dermatology'
}