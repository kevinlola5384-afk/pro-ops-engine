import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { SECTORS, PLANS } from '../../constants/data';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ChevronRight, ChevronLeft, Check, Sparkles, Building2, UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

const registerSchema = z.object({
  accountType: z.enum(['INDIVIDUAL', 'ORGANIZATION']),
  name: z.string().min(2, 'Le nom est requis'),
  organizationName: z.string().optional(),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Téléphone requis'),
  password: z.string().min(6, 'Mot de passe trop court'),
  country: z.string().min(2, 'Pays requis'),
  city: z.string().min(2, 'Ville requise'),
  sector: z.string().min(1, 'Secteur requis'),
  profession: z.string().min(1, 'Métier requis'),
  plan: z.string(),
  employees: z.string().optional(),
});

type FormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'INDIVIDUAL',
      plan: 'INTRO',
      country: 'France',
      sector: 'BEAUTY'
    }
  });

  const accountType = form.watch('accountType');
  const selectedSectorId = form.watch('sector');
  const professions = SECTORS.find(s => s.id === selectedSectorId)?.professions || [];

  const nextStep = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 1) fields = ['accountType'];
    if (step === 2) fields = ['name', 'organizationName', 'email', 'phone', 'password'];
    if (step === 3) fields = ['country', 'city', 'sector', 'profession', 'employees'];
    
    const isValid = await form.trigger(fields);
    if (isValid) setStep(step + 1);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await register({
        ...values,
        sector: values.sector as any,
        plan: values.plan as any
      });
      toast.success('Bienvenue sur OPUS+ ! Votre espace de travail est prêt.');
      navigate('/dashboard');
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-indigo-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-2xl">O+</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">OPUS+</span>
        </Link>

        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-bold leading-tight">Rejoignez la nouvelle ère du service professionnel.</h2>
          <div className="space-y-4">
            {["Workspace métier spécialisé", "CRM & Agenda intégré", "Facturation automatisée", "Marketplace panafricaine"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="font-medium text-indigo-100">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-indigo-200 text-sm">© 2024 OPUS+ SaaS Platform</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-slate-50">
        <Card className="w-full max-w-xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                      step >= i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                    )}>
                      {step > i ? <Check className="w-5 h-5" /> : i}
                    </div>
                    {i < 4 && (
                      <div className={cn(
                        "h-1 flex-1 mx-2 rounded-full transition-all duration-300",
                        step > i ? "bg-indigo-600" : "bg-slate-100"
                      )}></div>
                    )}
                  </div>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                {step === 1 && "Choisissez votre profil"}
                {step === 2 && "Vos informations"}
                {step === 3 && "Votre activité"}
                {step === 4 && "Choisissez votre plan"}
              </h1>
              <p className="text-slate-500">Commençons par configurer votre espace de travail.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-4">
                    <RadioGroup defaultValue="INDIVIDUAL" onValueChange={(v) => form.setValue('accountType', v as any)} className="grid gap-4">
                      <Label htmlFor="individual" className={cn("flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all", accountType === 'INDIVIDUAL' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200 bg-white")}>
                        <RadioGroupItem value="INDIVIDUAL" id="individual" className="sr-only" />
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                          <UserCircle2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lg">Professionnel indépendant</p>
                          <p className="text-sm text-slate-500">Pour les freelances et auto-entrepreneurs.</p>
                        </div>
                        {accountType === 'INDIVIDUAL' && <Check className="text-indigo-600" />}
                      </Label>
                      <Label htmlFor="organization" className={cn("flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all", accountType === 'ORGANIZATION' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200 bg-white")}>
                        <RadioGroupItem value="ORGANIZATION" id="organization" className="sr-only" />
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lg">Organisation</p>
                          <p className="text-sm text-slate-500">Pour les cabinets, salons et entreprises.</p>
                        </div>
                        {accountType === 'ORGANIZATION' && <Check className="text-indigo-600" />}
                      </Label>
                    </RadioGroup>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    {accountType === 'ORGANIZATION' && (
                      <div className="space-y-2">
                        <Label>Nom de l'organisation</Label>
                        <Input placeholder="ex: Cabinet Juridique Alpha" {...form.register('organizationName')} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Nom complet</Label>
                      <Input placeholder="Jean Dupont" {...form.register('name')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email professionnel</Label>
                      <Input type="email" placeholder="jean@exemple.com" {...form.register('email')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input placeholder="+33 6 12 34 56 78" {...form.register('phone')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Mot de passe</Label>
                      <Input type="password" placeholder="••••••••" {...form.register('password')} />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Pays</Label>
                        <Input placeholder="ex: France" {...form.register('country')} />
                      </div>
                      <div className="space-y-2">
                        <Label>Ville</Label>
                        <Input placeholder="ex: Paris" {...form.register('city')} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Votre Secteur</Label>
                      <Select onValueChange={(v) => form.setValue('sector', v)} defaultValue={selectedSectorId}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          {SECTORS.map(s => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Votre Métier</Label>
                      <Select onValueChange={(v) => form.setValue('profession', v)}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Sélectionner un métier" />
                        </SelectTrigger>
                        <SelectContent>
                          {professions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {accountType === 'ORGANIZATION' && (
                      <div className="space-y-2">
                        <Label>Nombre d'employés</Label>
                        <Select onValueChange={(v) => form.setValue('employees', v)}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Sélectionner le nombre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5">1 - 5 employés</SelectItem>
                            <SelectItem value="6-20">6 - 20 employés</SelectItem>
                            <SelectItem value="21-50">21 - 50 employés</SelectItem>
                            <SelectItem value="50+">50+ employés</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
                      {PLANS.map((plan) => (
                        <Label key={plan.id} htmlFor={`plan-${plan.id}`} className={cn("flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all relative", form.watch('plan') === plan.id ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 bg-white")}>
                          <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} className="sr-only" />
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 flex items-center gap-2">
                              {plan.name}
                              {plan.popular && <Badge className="bg-indigo-600 text-[8px] h-4">POPULAIRE</Badge>}
                            </span>
                            <span className="text-xs text-slate-500">{plan.features[0]}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold">${plan.price}</span>
                            <span className="text-xs text-slate-500 block">/mois</span>
                          </div>
                        </Label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-4 pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" className="h-14 flex-1 rounded-2xl font-bold border-2" onClick={() => setStep(step - 1)}>
                    <ChevronLeft className="mr-2 w-5 h-5" /> Retour
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" className="h-14 flex-[2] rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100" onClick={nextStep}>
                    Continuer <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <Button type="submit" className="h-14 flex-[2] rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
                    Finaliser mon workspace <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </form>

            <p className="text-center text-sm text-slate-500">
              Déjà un compte ? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Se connecter</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
