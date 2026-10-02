import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FileCheck2,
  Home,
  Search,
  User,
  Settings,
  Shield,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../i18n/translations';

export const Header: React.FC = () => {
  const { t, language, setLanguage, theme, setTheme, isAdmin } = useApp();

  const navLinks = [
    { to: '/', label: t.navHome, icon: Home },
    { to: '/search', label: t.navSearch, icon: Search },
    { to: '/profile', label: t.navProfile, icon: User },
    { to: '/settings', label: t.navSettings, icon: Settings },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageCode);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          {/* Logo & Tagline */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl py-1"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm shadow-sky-600/30 group-hover:bg-sky-500 transition-colors flex-shrink-0">
              <FileCheck2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Seva<span className="text-sky-600 dark:text-sky-400">Docs</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block leading-none mt-0.5">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Desktop Navigation"
            className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
          >
            {navLinks.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-subtle font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Controls: Language, Theme, Admin */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative flex items-center">
              <label htmlFor="lang-select" className="sr-only">
                Language
              </label>
              <div className="absolute left-2.5 pointer-events-none text-slate-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <select
                id="lang-select"
                value={language}
                onChange={handleLanguageChange}
                aria-label="Select language"
                className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl pl-7 pr-6 py-2 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer min-h-[40px]"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Admin Link / Badge */}
            <Link
              to="/admin"
              className={`p-2 rounded-xl text-xs font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isAdmin
                  ? 'bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
