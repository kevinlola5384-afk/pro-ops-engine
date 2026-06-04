export type UserRole = 'SUPER_ADMIN' | 'OWNER' | 'MANAGER' | 'EMPLOYÉ' | 'CLIENT';

export type SectorType = 
  | 'BEAUTY' 
  | 'HEALTH' 
  | 'LEGAL' 
  | 'EDUCATION' 
  | 'COACHING' 
  | 'CREATIVE' 
  | 'FINANCE' 
  | 'MINISTRY';

export type PlanType = 'INTRO' | 'STARTER' | 'PRO' | 'PRO_PLUS' | 'BUSINESS' | 'MAX' | 'ENTREPRISE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  sector: SectorType;
  profession: string;
  organizationName?: string;
  country: string;
  city: string;
  phone: string;
  plan: PlanType;
  workspaceId: string;
  branding?: {
    logo?: string;
    primaryColor?: string;
  };
}

export interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  sector: SectorType;
  isPublic: boolean;
  employees: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
