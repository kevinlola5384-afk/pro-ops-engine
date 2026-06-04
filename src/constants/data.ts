import { SectorType, PlanType } from '../types';
import { 
  Scissors, 
  Stethoscope, 
  Gavel, 
  GraduationCap, 
  Dumbbell, 
  Camera, 
  Briefcase, 
  Heart 
} from 'lucide-react';

export const SECTORS = [
  { id: 'BEAUTY', label: 'Beauté & Bien-être', icon: Scissors, professions: ['Salon de coiffure', 'Barbier', 'Institut de beauté', 'Spa', 'Maquilleur professionnel'] },
  { id: 'HEALTH', label: 'Santé', icon: Stethoscope, professions: ['Médecin', 'Dentiste', 'Dermatologue', 'Sexologue', 'Psychologue', 'Kinésithérapeute'] },
  { id: 'LEGAL', label: 'Juridique', icon: Gavel, professions: ['Avocat', 'Notaire', 'Huissier', 'Conseiller juridique'] },
  { id: 'EDUCATION', label: 'Éducation', icon: GraduationCap, professions: ['Centre de formation', 'École privée', 'Université privée', 'Professeur particulier', 'Auto-école'] },
  { id: 'COACHING', label: 'Coaching', icon: Dumbbell, professions: ['Coach sportif', 'Coach de vie', 'Coach business', 'Mentor', 'Conseiller conjugal'] },
  { id: 'CREATIVE', label: 'Créatif & Événementiel', icon: Camera, professions: ['Photographe', 'Vidéaste', 'Wedding Planner', 'Organisateur d’événements', 'MC'] },
  { id: 'FINANCE', label: 'Finance & Conseil', icon: Briefcase, professions: ['Expert-comptable', 'Comptable', 'Auditeur', 'Consultant', 'Conseiller financier'] },
  { id: 'MINISTRY', label: 'Ministère & Spirituel', icon: Heart, professions: ['Pasteur', 'Prophète', 'Évangéliste', 'Conseiller spirituel'] },
];

export const PLANS = [
  { id: 'INTRO', name: 'INTRO', price: 0, users: 1, clients: 5, appointments: 5, features: ['1 utilisateur', '5 clients', '5 rendez-vous'] },
  { id: 'STARTER', name: 'STARTER', price: 5, users: 1, clients: 25, appointments: 30, features: ['1 utilisateur', '25 clients', '30 rendez-vous'] },
  { id: 'PRO', name: 'PRO', price: 15, users: 1, clients: 100, appointments: 150, features: ['1 utilisateur', '100 clients', '150 rendez-vous'] },
  { id: 'PRO_PLUS', name: 'PRO PLUS', price: 19, users: 2, clients: 250, appointments: 500, features: ['2 utilisateurs', '250 clients', '500 rendez-vous', 'Branding personnalisé'], popular: true },
  { id: 'BUSINESS', name: 'BUSINESS', price: 39, users: 5, clients: Infinity, appointments: Infinity, features: ['5 utilisateurs', '1 succursale', 'Clients illimités'] },
  { id: 'MAX', name: 'MAX', price: 79, users: 20, clients: Infinity, appointments: Infinity, features: ['20 utilisateurs', '5 succursales', 'Clients illimités'] },
  { id: 'ENTREPRISE', name: 'ENTREPRISE', price: 149, users: 100, clients: Infinity, appointments: Infinity, features: ['100 utilisateurs', 'Succursales illimitées'] },
];

export const IMAGES = {
  hero: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/hero-main-a3a7e085-1780602894328.webp',
  beauty: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-beauty-f3a3f543-1780602894291.webp',
  health: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-health-fbf96014-1780602895508.webp',
  legal: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-legal-00cea1c7-1780602895082.webp',
  education: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-education-5de2ed14-1780602894468.webp',
  coaching: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-coaching-1c7b959a-1780602894217.webp',
  creative: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-creative-81a83e25-1780602894154.webp',
  finance: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-finance-a073ca4e-1780602894448.webp',
  ministry: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6296a74-cd48-43c7-8e7c-6f549c45f768/workspace-ministry-a045180c-1780602897513.webp',
};
