export type LanguageCode = 'en' | 'te' | 'hi';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  disclaimerShort: string;
  disclaimerFull: string;
  searchPlaceholder: string;
  searchHint: string;
  popularServices: string;
  recentlyViewed: string;
  allCategories: string;
  filterByJurisdiction: string;
  allJurisdictions: string;
  central: string;
  telangana: string;
  andhraPradesh: string;
  documentsRequired: string;
  documentsReady: string;
  mandatory: string;
  optional: string;
  viewInfo: string;
  applyOnOfficialPortal: string;
  verified: string;
  needsReview: string;
  lastVerified: string;
  eligibility: string;
  applicationProcess: string;
  fees: string;
  processingTime: string;
  whereToApply: string;
  importantNotes: string;
  relatedServices: string;
  requirementsWarning: string;
  navHome: string;
  navSearch: string;
  navProfile: string;
  navSettings: string;
  navAdmin: string;
  favorites: string;
  noFavorites: string;
  noRecents: string;
  savedChecklists: string;
  noChecklists: string;
  clearHistory: string;
  clearHistoryConfirm: string;
  settingsTitle: string;
  language: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  systemMode: string;
  notifications: string;
  notificationsDesc: string;
  aboutTitle: string;
  aboutDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  helpTitle: string;
  helpDesc: string;
  noServicesFound: string;
  tryAnotherKeyword: string;
  requiresDocument: string;
  matchingDocuments: string;
  adminPortal: string;
  adminLoginTitle: string;
  adminPasswordPlaceholder: string;
  loginButton: string;
  logoutButton: string;
  addNewService: string;
  editService: string;
  deleteService: string;
  exportJson: string;
  importJson: string;
  markVerified: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'SevaDocs',
    tagline: 'Know what you need before you apply.',
    disclaimerShort: 'Independent citizen guide. Not affiliated with any government portal.',
    disclaimerFull: 'SevaDocs is an independent informational guide designed to help citizens prepare required documents. It is NOT an official government website and is not affiliated with any government agency. Always verify the latest requirements on the official government portal before applying.',
    searchPlaceholder: 'What service are you looking for? (e.g. Income, Aadhaar, Caste...)',
    searchHint: 'Search by service name, department, or required document (e.g., "Aadhaar", "Income")',
    popularServices: 'Popular Services',
    recentlyViewed: 'Recently Viewed',
    allCategories: 'All Categories',
    filterByJurisdiction: 'Jurisdiction',
    allJurisdictions: 'All India & States',
    central: 'Central Government',
    telangana: 'Telangana (MeeSeva)',
    andhraPradesh: 'Andhra Pradesh',
    documentsRequired: 'Documents Required',
    documentsReady: 'documents ready',
    mandatory: 'Mandatory',
    optional: 'Optional',
    viewInfo: 'View explanation & accepted examples',
    applyOnOfficialPortal: 'Apply on Official Portal',
    verified: 'Verified',
    needsReview: 'Needs Review',
    lastVerified: 'Last verified',
    eligibility: 'Eligibility Criteria',
    applicationProcess: 'Application Process',
    fees: 'Statutory Fees',
    processingTime: 'Expected Processing Time',
    whereToApply: 'Where to Apply',
    importantNotes: 'Important Notes',
    relatedServices: 'Related Services',
    requirementsWarning: 'Requirements may change. Please verify the latest requirements on the official government portal before applying.',
    navHome: 'Home',
    navSearch: 'Search',
    navProfile: 'Profile',
    navSettings: 'Settings',
    navAdmin: 'Admin',
    favorites: 'Saved Favorites',
    noFavorites: 'No favorite services saved yet. Tap the heart icon on any service to bookmark it.',
    noRecents: 'No recently viewed services yet.',
    savedChecklists: 'Active Document Checklists',
    noChecklists: 'No document checklists in progress.',
    clearHistory: 'Clear saved progress & recents',
    clearHistoryConfirm: 'Are you sure you want to clear your local checklists and viewing history?',
    settingsTitle: 'Settings & Preferences',
    language: 'Language',
    theme: 'Appearance',
    lightMode: 'Light',
    darkMode: 'Dark',
    systemMode: 'System',
    notifications: 'Updates & Alerts',
    notificationsDesc: 'Receive browser notifications when requirements for your bookmarked services change',
    aboutTitle: 'About SevaDocs',
    aboutDesc: 'SevaDocs was created to eliminate guesswork, repeated visits, and rejection of government applications by giving citizens a clear, verified checklist of documents before they head to MeeSeva counters or official portals.',
    privacyTitle: 'Privacy Policy',
    privacyDesc: 'Zero personal data is stored on our servers. All your bookmarks, document checklist progress, and viewing history remain strictly inside your device browser storage (localStorage).',
    helpTitle: 'Help & Citizen Tips',
    helpDesc: 'Keep original documents along with 2 photocopies when visiting MeeSeva or ASK centres. Ensure name spelling across Aadhaar and SSC marks memo matches before applying.',
    noServicesFound: 'No services found.',
    tryAnotherKeyword: 'Try searching for another keyword, service name, or required document.',
    requiresDocument: 'Requires',
    matchingDocuments: 'Matching Document',
    adminPortal: 'Admin Dashboard',
    adminLoginTitle: 'Admin Authentication',
    adminPasswordPlaceholder: 'Enter administrator password',
    loginButton: 'Login',
    logoutButton: 'Logout',
    addNewService: 'Add New Service',
    editService: 'Edit Service',
    deleteService: 'Delete Service',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    markVerified: 'Mark as Verified Today',
  },
  te: {
    appName: 'సేవాడాక్స్ (SevaDocs)',
    tagline: 'దరఖాస్తు చేయడానికి ముందు మీకు కావలసిన పత్రాలను తెలుసుకోండి.',
    disclaimerShort: 'పౌరుల సమాచార గైడ్. ఇది అధికారిక ప్రభుత్వ వెబ్‌సైట్ కాదు.',
    disclaimerFull: 'సేవాడాక్స్ (SevaDocs) అనేది పౌరులకు అవసరమైన పత్రాలను సిద్ధం చేయడంలో సహాయపడే ఒక స్వతంత్ర సమాచార గైడ్. ఇది అధికారిక ప్రభుత్వ వెబ్‌సైట్ కాదు. దరఖాస్తు చేసే ముందు అధికారిక పోర్టల్‌లో తాజా నిబంధనలను తప్పక ధృవీకరించుకోండి.',
    searchPlaceholder: 'మీకు ఏ సేవ అవసరం? (ఉదా. ఆదాయం, కుల ధ్రువీకరణ, ఆధార్...)',
    searchHint: 'సేవ పేరు లేదా అవసరమైన పత్రం పేరుతో వెతకండి (ఉదా: ఆదాయ ధ్రువీకరణ పత్రం)',
    popularServices: 'ప్రజాదరణ పొందిన సేవలు',
    recentlyViewed: 'ఇటీవల చూసినవి',
    allCategories: 'అన్ని విభాగాలు',
    filterByJurisdiction: 'ప్రాంతం / పరిధి',
    allJurisdictions: 'అన్ని ప్రాంతాలు',
    central: 'కేంద్ర ప్రభుత్వం',
    telangana: 'తెలంగాణ (మీసేవ)',
    andhraPradesh: 'ఆంధ్రప్రదేశ్',
    documentsRequired: 'అవసరమైన పత్రాలు',
    documentsReady: 'పత్రాలు సిద్ధంగా ఉన్నాయి',
    mandatory: 'తప్పనిసరి',
    optional: 'ఐచ్ఛికం',
    viewInfo: 'వివరణ & ఆమోదిత పత్రాల వివరాలు చూడండి',
    applyOnOfficialPortal: 'అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి',
    verified: 'ధృవీకరించబడింది',
    needsReview: 'సమీక్ష అవసరం',
    lastVerified: 'చివరిగా ధృవీకరించిన తేదీ',
    eligibility: 'అర్హత ప్రమాణాలు',
    applicationProcess: 'దరఖాస్తు ప్రక్రియ',
    fees: 'ప్రభుత్వ రుసుము',
    processingTime: 'పట్టే సమయం',
    whereToApply: 'ఎక్కడ దరఖాస్తు చేయాలి',
    importantNotes: 'ముఖ్యమైన గమనికలు',
    relatedServices: 'సంబంధిత సేవలు',
    requirementsWarning: 'నిబంధనలు మారవచ్చు. దరఖాస్తు చేయడానికి ముందు అధికారిక ప్రభుత్వ పోర్టల్‌లో వివరాలను సరిచూసుకోండి.',
    navHome: 'హోమ్',
    navSearch: 'శోధన',
    navProfile: 'ప్రొఫైల్',
    navSettings: 'సెట్టింగ్‌లు',
    navAdmin: 'అడ్మిన్',
    favorites: 'సేవ్ చేసిన సేవలు',
    noFavorites: 'ఇంకా ఏ సేవలను సేవ్ చేయలేదు. ఇష్టమైన సేవపై హార్ట్ గుర్తును నొక్కండి.',
    noRecents: 'ఇటీవల చూసిన సేవలు ఏవీ లేవు.',
    savedChecklists: 'డాక్యుమెంట్ చెక్‌లిస్ట్‌లు',
    noChecklists: 'ప్రస్తుతం యాక్టివ్ చెక్‌లిస్ట్‌లు ఏవీ లేవు.',
    clearHistory: 'డేటాను క్లియర్ చేయండి',
    clearHistoryConfirm: 'మీ బ్రౌజర్ చరిత్ర మరియు చెక్‌లిస్ట్‌లను నిజంగా తొలగించాలనుకుంటున్నారా?',
    settingsTitle: 'సెట్టింగ్‌లు',
    language: 'భాష (Language)',
    theme: 'థీమ్',
    lightMode: 'లైట్',
    darkMode: 'డార్క్',
    systemMode: 'సిస్టమ్',
    notifications: 'నోటిఫికేషన్లు',
    notificationsDesc: 'సేవల నిబంధనలలో మార్పులు వచ్చినప్పుడు సమాచారం పొందండి',
    aboutTitle: 'సేవాడాక్స్ గురించి',
    aboutDesc: 'మీసేవ మరియు ఆన్‌లైన్ పోర్టల్‌లకు వెళ్లే ముందు పౌరులకు ఖచ్చితమైన డాక్యుమెంట్ చెక్‌లిస్ట్ అందించడం సేవాడాక్స్ ప్రధాన లక్ష్యం.',
    privacyTitle: 'గోప్యతా విధానం',
    privacyDesc: 'మీ వ్యక్తిగత డేటా ఏదీ మా సర్వర్లలో భద్రపరచబడదు. అంతా మీ బ్రౌజర్ లోకల్ స్టోరేజ్‌లోనే ఉంటుంది.',
    helpTitle: 'సహాయం మరియు చిట్కాలు',
    helpDesc: 'మీసేవ కేంద్రానికి వెళ్లేటప్పుడు ఒరిజినల్ డాక్యుమెంట్లు మరియు రెండు జిరాక్స్ సెట్లను తప్పక తీసుకెళ్లండి.',
    noServicesFound: 'ఎలాంటి సేవలు కనుగొనబడలేదు.',
    tryAnotherKeyword: 'మరొక పదం లేదా పత్రం పేరుతో వెతకండి.',
    requiresDocument: 'కావలసిన పత్రం',
    matchingDocuments: 'సరిపోలిన పత్రం',
    adminPortal: 'అడ్మిన్ డ్యాష్‌బోర్డ్',
    adminLoginTitle: 'అడ్మిన్ లాగిన్',
    adminPasswordPlaceholder: 'పాస్‌వర్డ్ నమోదు చేయండి',
    loginButton: 'లాగిన్',
    logoutButton: 'లాగౌట్',
    addNewService: 'కొత్త సేవను జోడించండి',
    editService: 'సేవను సవరించండి',
    deleteService: 'సేవను తొలగించండి',
    exportJson: 'JSON ఎగుమతి',
    importJson: 'JSON దిగుమతి',
    markVerified: 'ఈరోజే ధృవీకరించినట్లు గుర్తించు',
  },
  hi: {
    appName: 'सेवाडॉक्स (SevaDocs)',
    tagline: 'आवेदन करने से पहले जानें आपको क्या चाहिए।',
    disclaimerShort: 'नागरिक सूचना गाइड। किसी भी सरकारी पोर्टल से संबद्ध नहीं है।',
    disclaimerFull: 'सेवाडॉक्स (SevaDocs) नागरिकों को आवश्यक दस्तावेज तैयार करने में सहायता करने वाला एक स्वतंत्र सूचना मार्गदर्शक है। यह कोई आधिकारिक सरकारी वेबसाइट नहीं है। आवेदन करने से पहले आधिकारिक सरकारी पोर्टल पर नवीनतम आवश्यकताओं की पुष्टि अवश्य करें।',
    searchPlaceholder: 'आप किस सेवा की तलाश कर रहे हैं? (उदा. आय प्रमाण पत्र, आधार, जाति...)',
    searchHint: 'सेवा के नाम या आवश्यक दस्तावेज़ से खोजें (उदा: आय प्रमाण पत्र, जाति प्रमाण पत्र)',
    popularServices: 'लोकप्रिय सेवाएं',
    recentlyViewed: 'हाल ही में देखी गई',
    allCategories: 'सभी श्रेणियां',
    filterByJurisdiction: 'अधिकार क्षेत्र',
    allJurisdictions: 'सभी क्षेत्र',
    central: 'केंद्र सरकार',
    telangana: 'तेलंगाना (मीसेवा)',
    andhraPradesh: 'आंध्र प्रदेश',
    documentsRequired: 'आवश्यक दस्तावेज',
    documentsReady: 'दस्तावेज तैयार हैं',
    mandatory: 'अनिवार्य',
    optional: 'वैकल्पिक',
    viewInfo: 'विवरण और स्वीकृत उदाहरण देखें',
    applyOnOfficialPortal: 'आधिकारिक पोर्टल पर आवेदन करें',
    verified: 'सत्यापित',
    needsReview: 'समीक्षा आवश्यक',
    lastVerified: 'अंतिम सत्यापन तिथि',
    eligibility: 'पात्रता मानदंड',
    applicationProcess: 'आवेदन प्रक्रिया',
    fees: 'सरकारी शुल्क',
    processingTime: 'अनुमानित समय',
    whereToApply: 'कहाँ आवेदन करें',
    importantNotes: 'महत्वपूर्ण नोट्स',
    relatedServices: 'संबंधित सेवाएं',
    requirementsWarning: 'आवश्यकताएं बदल सकती हैं। कृपया आवेदन करने से पहले आधिकारिक सरकारी पोर्टल पर पुष्टि करें।',
    navHome: 'होम',
    navSearch: 'खोजें',
    navProfile: 'प्रोफ़ाइल',
    navSettings: 'सेटिंग्स',
    navAdmin: 'व्यवस्थापक (Admin)',
    favorites: 'पसंदीदा सेवाएं',
    noFavorites: 'कोई पसंदीदा सेवा सहेजी नहीं गई है। किसी भी सेवा पर दिल के आइकन पर टैप करें।',
    noRecents: 'हाल ही में देखी गई कोई सेवा नहीं है।',
    savedChecklists: 'सक्रिय दस्तावेज़ चेकलिस्ट',
    noChecklists: 'कोई सक्रिय चेकलिस्ट नहीं है।',
    clearHistory: 'इतिहास और चेकलिस्ट साफ़ करें',
    clearHistoryConfirm: 'क्या आप वाकई अपना सहेजा गया डेटा साफ़ करना चाहते हैं?',
    settingsTitle: 'सेटिंग्स और प्राथमिकताएं',
    language: 'भाषा (Language)',
    theme: 'थीम',
    lightMode: 'लाइट',
    darkMode: 'डार्क',
    systemMode: 'सिस्टम',
    notifications: 'अपडेट और अलर्ट',
    notificationsDesc: 'आवश्यकताओं में बदलाव होने पर सूचनाएं प्राप्त करें',
    aboutTitle: 'सेवाडॉक्स के बारे में',
    aboutDesc: 'सेवाडॉक्स का उद्देश्य सरकारी सेवाओं और मीसेवा काउंटरों पर जाने से पहले नागरिकों को सटीक दस्तावेज़ सूची प्रदान करना है।',
    privacyTitle: 'गोपनीयता नीति',
    privacyDesc: 'हमारा प्लेटफ़ॉर्म कोई भी व्यक्तिगत डेटा एकत्र नहीं करता है। सभी चेकलिस्ट और प्राथमिकताएं आपके ब्राउज़र स्टोरेज में ही रहती हैं।',
    helpTitle: 'नागरिक सहायता और सुझाव',
    helpDesc: 'मीसेवा या सरकारी काउंटर पर जाते समय हमेशा मूल दस्तावेज़ और 2 फोटोकॉपी अपने साथ रखें।',
    noServicesFound: 'कोई सेवा नहीं मिली।',
    tryAnotherKeyword: 'कृपया किसी अन्य कीवर्ड या दस्तावेज़ के नाम से खोजें।',
    requiresDocument: 'आवश्यक दस्तावेज',
    matchingDocuments: 'मिलान दस्तावेज़',
    adminPortal: 'व्यवस्थापक डैशबोर्ड',
    adminLoginTitle: 'एडमिन लॉगिन',
    adminPasswordPlaceholder: 'व्यवस्थापक पासवर्ड दर्ज करें',
    loginButton: 'लॉगिन करें',
    logoutButton: 'लॉगआउट',
    addNewService: 'नई सेवा जोड़ें',
    editService: 'सेवा संपादित करें',
    deleteService: 'सेवा हटाएं',
    exportJson: 'JSON निर्यात करें',
    importJson: 'JSON आयात करें',
    markVerified: 'आज सत्यापित के रूप में चिह्नित करें',
  },
};
