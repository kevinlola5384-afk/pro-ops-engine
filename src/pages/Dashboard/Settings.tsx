import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Palette, 
  Upload, 
  Image as ImageIcon,
  Check,
  ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';
import { PLANS } from '../../constants/data';
import { cn } from '../../lib/utils';

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const isProPlus = ['PRO_PLUS', 'BUSINESS', 'MAX', 'ENTREPRISE'].includes(user?.plan || '');

  const [primaryColor, setPrimaryColor] = React.useState(user?.branding?.primaryColor || '#4f46e5');

  const handleSaveBranding = () => {
    updateUser({ branding: { ...user?.branding, primaryColor } });
    toast.success('Branding mis à jour !');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Gérez votre profil, votre branding et vos préférences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardHeader><CardTitle>Informations Générales</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nom Complet</Label>
                  <Input defaultValue={user?.name} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input defaultValue={user?.phone} className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Nom du Workspace</Label>
                  <Input defaultValue={user?.organizationName || user?.profession} className="rounded-xl h-12" />
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 h-12 font-bold">Enregistrer les modifications</Button>
            </CardContent>
          </Card>

          <Card className={cn(
            "border-none shadow-sm rounded-[2rem] overflow-hidden transition-all",
            !isProPlus && "opacity-60 grayscale-[0.5]"
          )}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" /> Personnalisation & Branding</CardTitle>
              {!isProPlus && <Badge variant="destructive" className="bg-amber-100 text-amber-700 border-amber-200">PRO PLUS REQUIS</Badge>}
            </CardHeader>
            <CardContent className="space-y-8">
              {!isProPlus && (
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4 items-start">
                  <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-900">Passez au plan Pro Plus</p>
                    <p className="text-sm text-amber-700">Débloquez la personnalisation des couleurs, le logo sur les documents et une identité visuelle unique.</p>
                    <Button variant="link" className="text-amber-700 p-0 h-auto font-bold mt-2">Voir les plans</Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label>Logo de l'entreprise</Label>
                  <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">PNG, SVG (max 5MB)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Couleur Primaire</Label>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      disabled={!isProPlus}
                      className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-700 uppercase">{primaryColor}</p>
                      <p className="text-xs text-slate-400">Utilisée pour les boutons et accents.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['#4f46e5', '#e11d48', '#0891b2', '#059669', '#d97706'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setPrimaryColor(c)}
                        disabled={!isProPlus}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                          primaryColor === c ? "border-slate-900 scale-110" : "border-white"
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {isProPlus && (
                <Button onClick={handleSaveBranding} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 h-12 font-bold">
                  Appliquer le branding
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[2rem] bg-slate-900 text-white overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <Badge className="bg-indigo-600 border-none">PLAN {user?.plan}</Badge>
                <ImageIcon className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Abonnement actuel</p>
                <h3 className="text-3xl font-bold">${PLANS.find(p => p.id === user?.plan)?.price || 0}<span className="text-lg text-slate-500">/mois</span></h3>
              </div>
              <ul className="space-y-3">
                {PLANS.find(p => p.id === user?.plan)?.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl h-12">Changer de plan</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
