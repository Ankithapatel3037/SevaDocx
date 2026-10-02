import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, ExternalLink, ShieldAlert, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Disclaimer Alert */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-white font-semibold block mb-0.5">
              Independent Informational Resource
            </strong>
            {t.disclaimerFull}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Seva<span className="text-sky-600 dark:text-sky-400">Docs</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Helping citizens prepare required documents accurately before visiting MeeSeva centres
              or government portals across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {t.navSearch}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {t.navProfile} & Checklists
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {t.navSettings}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {t.navAdmin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://meeseva.telangana.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1"
                >
                  <span>MeeSeva Telangana</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://myaadhaar.uidai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1"
                >
                  <span>myAadhaar (UIDAI)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://digilocker.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center gap-1"
                >
                  <span>DigiLocker</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} SevaDocs. Non-governmental public utility.</p>
          <div className="flex items-center gap-1">
            <span>Built for Indian citizens with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
