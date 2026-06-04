import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { SECTORS } from '../constants/data';
import { cn } from '../lib/utils';

const MOCK_PROS = [
  { 
    id: 1, 
    name: "Dr. Sarah Toure", 
    title: "Dentiste Expérimentée", 
    city: "Dakar", 
    country: "Sénégal", 
    rating: 4.9, 
    reviews: 124, 
    sector: "HEALTH",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  { 
    id: 2, 
    name: "Le Salon Premium", 
    title: "Coiffure & Esthétique", 
    city: "Abidjan", 
    country: "Côte d'Ivoire", 
    rating: 4.8, 
    reviews: 89, 
    sector: "BEAUTY",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salon"
  },
  { 
    id: 3, 
    name: "Maître Koffi", 
    title: "Avocat Droit des Affaires", 
    city: "Lomé", 
    country: "Togo", 
    rating: 5.0, 
    reviews: 56, 
    sector: "LEGAL",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koffi"
  },
  { 
    id: 4, 
    name: "Elite Coaching", 
    title: "Personal Training", 
    city: "Casablanca", 
    country: "Maroc", 
    rating: 4.7, 
    reviews: 210, 
    sector: "COACHING",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elite"
  },
];

const categories = SECTORS;
const availabilities = ["Aujourd'hui", "Demain", "Cette semaine"];

export const MarketplacePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-indigo-600 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-2xl">O+</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">OPUS+ Marketplace</span>
            </Link>
          </div>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">Trouvez le meilleur professionnel pour vos besoins.</h1>
            <p className="text-indigo-100 text-xl">Réservez en ligne, payez en toute sécurité et profitez d'un service de qualité.</p>
            
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 mt-12">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input 
                  placeholder="Quel service recherchez-vous ?" 
                  className="w-full bg-white/10 border-none rounded-2xl py-6 pl-12 pr-4 text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white/40"
                />
              </div>
              <div className="w-full md:w-64 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input 
                  placeholder="Ville ou Pays" 
                  className="w-full bg-white/10 border-none rounded-2xl py-6 pl-12 pr-4 text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white/40"
                />
              </div>
              <Button className="bg-white text-indigo-600 hover:bg-slate-100 h-12 md:h-14 px-8 rounded-2xl font-bold mt-2 md:mt-0">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-72 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm space-y-8">
              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <Filter className="w-4 h-4" /> Catégories
                </h4>
                <div className="space-y-2">
                  {categories.map((s) => (
                    <div key={s.id} className="flex items-center gap-3 group">
                      <input type="checkbox" id={s.id} className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-600" />
                      <label htmlFor={s.id} className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors cursor-pointer">{s.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-slate-900">Disponibilité</h4>
                <div className="space-y-2">
                  {availabilities.map((d) => (
                    <div key={d} className="flex items-center gap-3 group">
                      <input type="checkbox" id={d} className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-600" />
                      <label htmlFor={d} className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors cursor-pointer">{d}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100">
              <ShieldCheck className="w-10 h-10 text-indigo-600 mb-4" />
              <h4 className="font-bold text-indigo-900 mb-2">Paiement Sécurisé</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Toutes les transactions sur OPUS+ sont protégées. Votre argent est en sécurité jusqu'à la fin de la prestation.
              </p>
            </div>
          </aside>

          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">1,240 professionnels trouvés</h2>
              <Button variant="outline" size="sm" className="rounded-xl">Trier par : Recommandé</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_PROS.map((pro) => (
                <Card key={pro.id} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[2rem] overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="p-8 space-y-6">
                      <div className="flex gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-slate-50 group-hover:border-indigo-100 transition-colors">
                            <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none mb-2 px-3">
                            {SECTORS.find(s => s.id === pro.sector)?.label}
                          </Badge>
                          <h3 className="text-xl font-bold text-slate-900">{pro.name}</h3>
                          <p className="text-slate-500 font-medium">{pro.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-bold">{pro.rating}</span>
                          <span className="text-slate-400 text-xs">({pro.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{pro.city}, {pro.country}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold">
                          Réserver <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="h-12 w-12 rounded-xl border-slate-200" asChild>
                          <Link to="/marketplace">👁️</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Button variant="outline" className="rounded-2xl px-8 h-12 font-bold border-2">Charger plus de professionnels</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© 2024 OPUS+ Marketplace. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};
