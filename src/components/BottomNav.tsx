import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, User, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { t } = useApp();

  const navItems = [
    { to: '/', label: t.navHome, icon: Home },
    { to: '/search', label: t.navSearch, icon: Search },
    { to: '/profile', label: t.navProfile, icon: User },
    { to: '/settings', label: t.navSettings, icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-lg px-2 py-1 safe-area-bottom"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-h-[48px] select-none ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-normal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mb-1 transition-transform ${
                      isActive ? 'stroke-[2.4] scale-105' : 'stroke-[1.8]'
                    }`}
                  />
                  <span className="text-[11px] tracking-tight leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
