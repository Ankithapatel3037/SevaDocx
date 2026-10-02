import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { AdminDashboard } from './admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
          {/* Top Header */}
          <Header />

          {/* Main Body */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Mobile Bottom Navigation Bar */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
