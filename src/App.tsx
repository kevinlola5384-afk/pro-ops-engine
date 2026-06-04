import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { useAuthStore } from './store/useAuthStore';

// Pages
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { Overview } from './pages/Dashboard/Overview';
import { WorkspaceModules } from './pages/Dashboard/WorkspaceModules';
import { Settings } from './pages/Dashboard/Settings';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Mock other pages
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-2xl font-bold">{name}</h2>
    <p className="text-slate-500">Ce module est en cours de développement.</p>
  </div>
);

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Overview />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/dashboard/workspace" 
          element={
            <DashboardLayout>
              <WorkspaceModules />
            </DashboardLayout>
          } 
        />
        <Route path="/dashboard/crm" element={<DashboardLayout><Placeholder name="CRM Clients" /></DashboardLayout>} />
        <Route path="/dashboard/calendar" element={<DashboardLayout><Placeholder name="Agenda & Rendez-vous" /></DashboardLayout>} />
        <Route path="/dashboard/documents" element={<DashboardLayout><Placeholder name="Documents & Exports" /></DashboardLayout>} />
        <Route path="/dashboard/billing" element={<DashboardLayout><Placeholder name="Facturation & Paiements" /></DashboardLayout>} />
        <Route path="/dashboard/reports" element={<DashboardLayout><Placeholder name="Rapports & Analyses" /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
