import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { SECTORS, IMAGES } from '../../constants/data';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

export const Overview: React.FC = () => {
  const { user } = useAuthStore();
  const sector = SECTORS.find(s => s.id === user?.sector);

  const stats = [
    { label: user?.sector === 'HEALTH' ? 'Patients' : 'Clients', value: '128', icon: Users, color: 'bg-blue-500' },
    { label: 'Rendez-vous', value: '12', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Revenu Mensuel', value: '$2,450', icon: CreditCard, color: 'bg-emerald-500' },
    { label: 'Croissance', value: '+14%', icon: TrendingUp, color: 'bg-indigo-500' },
  ];

  const appointments = [
    { name: 'Sarah Martin', service: 'Consultation', time: '10:30', status: 'CONFIRMED' },
    { name: 'Marc Dubois', service: 'Suivi', time: '11:45', status: 'PENDING' },
    { name: 'Julie Leroy', service: 'Nouveau Dossier', time: '14:00', status: 'CONFIRMED' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bonjour, {user?.name} 👋</h1>
          <p className="text-slate-500">Voici l'état actuel de votre {sector?.label || 'workspace'}.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">Rapport PDF</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl">Nouveau RDV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-2xl text-white", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold">
                  +2.5%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2rem] overflow-hidden">
          <div className="h-48 relative">
            <img 
              src={IMAGES[user?.sector.toLowerCase() as keyof typeof IMAGES] || IMAGES.hero} 
              className="w-full h-full object-cover" 
              alt="Workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">{user?.organizationName || user?.profession}</h3>
              <p className="text-slate-200 opacity-90">{user?.city}, {user?.country}</p>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-lg text-slate-900">Activité récente</h4>
              <Button variant="link" className="text-indigo-600 p-0 font-bold">Voir tout</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">Nouvelle inscription client</p>
                    <p className="text-xs text-slate-500">Il y a 2 heures • Jean Pierre</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">CRM</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2rem]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Prochains RDV</span>
              <Calendar className="w-5 h-5 text-slate-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {appointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">{apt.time}</span>
                  <div className="w-0.5 h-12 bg-slate-100 group-last:bg-transparent mt-2"></div>
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                  <p className="text-sm font-bold text-slate-900">{apt.name}</p>
                  <p className="text-xs text-slate-500">{apt.service}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {apt.status === 'CONFIRMED' ? (
                      <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] h-5">Confirmé</Badge>
                    ) : (
                      <Badge className="bg-amber-50 text-amber-600 border-none font-bold text-[10px] h-5">En attente</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold">
              Gérer l'agenda
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
