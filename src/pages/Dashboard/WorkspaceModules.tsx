import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Scissors, Heart, Stethoscope, Gavel, GraduationCap, 
  Dumbbell, Camera, Briefcase, FileText, ClipboardList,
  UserCheck, Receipt, Presentation, ShieldCheck
} from 'lucide-react';

export const WorkspaceModules: React.FC = () => {
  const { user } = useAuthStore();
  const sector = user?.sector;

  const renderBeauty = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><Scissors className="w-5 h-5"/> Services & Prestations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {['Coupe Homme', 'Brushing', 'Coloration', 'Manucure'].map(s => (
            <div key={s} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-bold">{s}</span>
              <span className="text-indigo-600 font-bold">25€</span>
            </div>
          ))}
          <Button className="w-full rounded-xl">Ajouter un service</Button>
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><UserCheck className="w-5 h-5"/> Employés & Staff</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {['Marie (Coiffeuse)', 'Julien (Barbier)'].map(s => (
            <div key={s} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">{s[0]}</div>
              <span className="font-bold">{s}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderHealth = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5"/> Dossiers Patients</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-blue-900">Thomas Legrand</p>
              <p className="text-xs text-blue-700">Groupe A+ • Antécédents asthme</p>
            </div>
            <Button size="sm" variant="ghost">Voir</Button>
          </div>
          <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">Nouveau Patient</Button>
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5"/> Ordonnances & Actes</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-center py-10">
          <Presentation className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Générez vos ordonnances sécurisées ici.</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderLegal = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Dossiers & Procédures</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {['Affaire Dupont vs Mairie', 'Contrat Immobilier SCI'].map(d => (
            <div key={d} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
              <span className="font-bold text-sm">{d}</span>
              <Badge className="bg-indigo-600">Ouvert</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm rounded-3xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><Presentation className="w-5 h-5"/> Audiences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-2xl">
            <p className="font-bold text-amber-900">Tribunal de Commerce</p>
            <p className="text-xs text-amber-700">Demain à 09:00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Espace {user?.sector.toLowerCase()}</h2>
        <Badge variant="outline" className="border-indigo-600 text-indigo-600 px-4 py-1">Mode Professionnel</Badge>
      </div>

      {sector === 'BEAUTY' && renderBeauty()}
      {sector === 'HEALTH' && renderHealth()}
      {sector === 'LEGAL' && renderLegal()}
      
      {/* Fallback for other sectors to avoid empty screen */}
      {!['BEAUTY', 'HEALTH', 'LEGAL'].includes(sector || '') && (
        <Card className="border-none shadow-sm rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Modules Spécialisés {user?.sector}</h3>
          <p className="text-slate-500 max-w-md mx-auto">Votre workspace est configuré avec les outils spécifiques à votre métier de {user?.profession}.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {['Gestion Clients', 'Planning', 'Documents', 'Facturation', 'Suivi', 'Analyses'].map(tool => (
              <div key={tool} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                <p className="font-bold text-sm text-slate-700">{tool}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
