import React from 'react';
import {
  Globe,
  Sun,
  Moon,
  Monitor,
  Bell,
  Info,
  Shield,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../i18n/translations';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Settings: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    theme,
    setTheme,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          {t.settingsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your local preferences, language, appearance, and learn about SevaDocs.
        </p>
      </div>

      {/* Prominent Independent Notice */}
      <DisclaimerBanner variant="full" />

      {/* Preferences Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Preferences
        </h2>

        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <label htmlFor="settings-language" className="font-semibold text-sm text-slate-900 dark:text-white block">
                {t.language}
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose the display language for services and checklist labels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['en', 'te', 'hi'] as LanguageCode[]).map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] cursor-pointer ${
                  language === lang
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिन्दी'}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <span className="font-semibold text-sm text-slate-900 dark:text-white block">
                {t.theme}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between soft light mode and easy-on-the-eyes dark mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                theme === 'light'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-subtle'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.lightMode}</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                theme === 'dark'
                  ? 'bg-white dark:bg-slate-900 text-sky-400 shadow-subtle'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{t.darkMode}</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                theme === 'system'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-subtle'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{t.systemMode}</span>
            </button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-sm text-slate-900 dark:text-white block">
                {t.notifications}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                {t.notificationsDesc}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer min-h-[44px] min-w-[44px] -m-2 p-2">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={e => setNotificationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[10px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-sky-600" />
          </label>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.aboutTitle}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.aboutDesc}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Every service in our database contains verified lists of mandatory and optional
          documents, statutory fees, typical processing times, and direct links to authentic
          government departments (UIDAI, MeeSeva, Parivahan, NSP, FoSCoS, and others).
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.privacyTitle}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.privacyDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <strong className="block text-slate-900 dark:text-white mb-1">
              No Tracking or Analytics
            </strong>
            We do not log your searches, documents checked, or IP address.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <strong className="block text-slate-900 dark:text-white mb-1">
              Offline First Capabilities
            </strong>
            The document requirements can be reviewed even when your network connection drops.
          </div>
        </div>
      </section>

      {/* Citizen Help & FAQs */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.helpTitle}
          </h2>
        </div>

        <div className="space-y-3 pt-1 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              Q: Are DigiLocker documents accepted at government offices?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              Yes. Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules 2016, documents in the "Issued Documents" section of DigiLocker are legally treated at par with original physical documents.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              Q: What if the spelling of my name is slightly different between my Aadhaar and 10th Marks Memo?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              Mismatches in name spelling or date of birth cause over 60% of government application rejections. We strongly recommend visiting an Aadhaar Seva Kendra to update your name on Aadhaar to match your Class 10th Board Certificate before applying for scholarships, passports, or TSPSC/APPSC examinations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              Q: What is the difference between MeeSeva Category A and Category B services?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              Category A services are issued across the counter instantly using existing digitized database records (e.g., duplicate certificate copies, Encumbrance Certificates). Category B services require field inspection by the Village Revenue Officer (VRO) or Revenue Inspector (RI) and approval by the Mandal Revenue Officer (MRO/Tahsildar), typically taking 7-15 working days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
