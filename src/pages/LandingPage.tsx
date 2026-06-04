import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Users, 
  Calendar, 
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { SECTORS, PLANS, IMAGES } from '../constants/data';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">O+</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">OPUS+</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Solutions</a>
            <a href="#tarifs" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Tarifs</a>
            <Link to="/marketplace" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Marketplace</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-semibold">Connexion</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 font-semibold px-6">Démarrer gratuitement</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 px-4 py-1 rounded-full text-sm font-semibold">
              Propulsez votre activité professionnelle
            </Badge>
            <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              L'espace de travail <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">ultime</span> pour les pros.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              OPUS+ centralise votre gestion, vos clients et vos paiements dans une plateforme unique et spécialisée selon votre métier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 w-full sm:w-auto">
                  Créer mon workspace <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" className="h-14 px-8 text-lg border-2 rounded-2xl w-full sm:w-auto">
                  Découvrir la Marketplace
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-3xl blur-2xl -z-10"></div>
            <img src={IMAGES.hero} alt="OPUS+ Dashboard" className="rounded-3xl shadow-2xl border border-slate-100 w-full" />
          </motion.div>
        </div>
      </section>

      <section id="solutions" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold text-slate-900">Une solution pour chaque métier</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">OPUS+ s'adapte à votre secteur d'activité avec des modules spécialisés et des workflows optimisés.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SECTORS.map((sector) => (
              <motion.div whileHover={{ y: -10 }} key={sector.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <sector.icon className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{sector.label}</h3>
                <ul className="space-y-2">
                  {sector.professions.slice(0, 3).map(p => (
                    <li key={p} className="text-slate-500 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-300 rounded-full"></div> {p}
                    </li>
                  ))}
                  <li className="text-indigo-600 text-sm font-semibold pt-2">Et bien plus...</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tarifs" className="py-24 bg-slate-900 text-white rounded-[3rem] mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold">Des tarifs transparents</h2>
            <p className="text-slate-400 text-lg">Choisissez le plan adapté à la taille de votre activité.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLANS.slice(0, 4).map((plan) => (
              <Card key={plan.id} className={cn("bg-slate-800 border-slate-700 relative overflow-hidden transition-transform hover:scale-105", plan.popular && "border-indigo-500 scale-105 z-10")}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Plus Populaire
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-slate-400">/mois</span>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block">
                    <Button className={cn("w-full h-12 rounded-xl font-bold", plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-white text-slate-900 hover:bg-slate-100")}>
                      Choisir ce plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2024 OPUS+. Tous droits réservés.</p>
      </footer>
    </div>
  );
};
