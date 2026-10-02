# SevaDocs (సేవాడాక్స్ / सेवाडॉक्स)

> **"Know what you need before you apply."**
> A modern, fast, responsive web application helping citizens in India understand which documents are required for government and online-portal services before visiting MeeSeva centres or official departmental portals.

---

## ⚠️ Important Public Notice
**SevaDocs is an independent informational citizen tool. It is NOT an official government website and is NOT affiliated with any government department or agency.** Always verify latest scheme rules and guidelines on official portals (`.gov.in`).

---

## 🚀 Core Citizen Flow

1. **Search Service or Document:** Search by service name, department, or required document (e.g. typing `"Income"` reveals both the Income Certificate and all scholarships/schemes requiring it).
2. **Review Checklist:** See all mandatory and optional documents. Tap the Info icon on any document to see accepted examples and formats.
3. **Interactive Readiness Tracker:** Check off documents as you gather them. Progress is automatically saved locally on your device (`0 / N documents ready`).
4. **Understand Process & Requirements:** Review eligibility criteria, step-by-step procedures, statutory government fees, and expected processing times.
5. **Direct to Official Portal:** Jump straight to authentic government portals (`meeseva.telangana.gov.in`, `myaadhaar.uidai.gov.in`, `parivahan.gov.in`, `scholarships.gov.in`, etc.).

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (v3) + Modern Accessible Typography (Inter)
- **Icons:** Lucide React (Clean, outline iconography; zero emoji UI icons)
- **Routing:** React Router v7 (`react-router-dom`)
- **State & Persistence:** Lightweight React Context + `localStorage` for bookmarks, recents, checklist item checks, preferences, and admin session
- **Data Layer:** Structured JSON seed files (`services.json`, `documents.json`, `categories.json`) with an asynchronous mock API layer (`src/services/api.ts`) ready for a backend drop-in (Firebase/Supabase/Node).
- **Internationalization (i18n):** Multi-language support for **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.

---

## 📂 Project Structure

```
src/
├── admin/                     # Admin dashboard & service catalog editor
│   ├── AdminDashboard.tsx     # Password-gated admin table with filters, export & import
│   └── ServiceEditorModal.tsx # Add/Edit service, reorder documents, steps, dates
├── components/                # Reusable accessible UI components
│   ├── AccordionSection.tsx   # Expandable sections for process, fees, eligibility
│   ├── BottomNav.tsx          # Fixed mobile app-style bottom navigation bar
│   ├── CategoryChip.tsx       # Horizontally scrollable category pills with Lucide icons
│   ├── DisclaimerBanner.tsx   # Non-government initiative disclaimer banners
│   ├── DocumentChecklistItem.tsx # Checkbox, mandatory/optional tag, info trigger
│   ├── DocumentDetailModal.tsx   # Modal explaining document, accepted formats & tips
│   ├── EmptyState.tsx         # Empty search states with suggestion chips
│   ├── Footer.tsx             # Citizen footer with official links & notice
│   ├── Header.tsx             # Desktop nav, language selector & theme toggle
│   ├── ProgressBar.tsx        # Slim readiness progress indicator
│   ├── SearchBar.tsx          # Debounced instant search bar with clear button
│   ├── ServiceCard.tsx        # Compact card with tags, department, and favorite heart
│   └── VerifiedBadge.tsx      # Green 'Verified' vs Amber 'Needs Review' badges
├── context/
│   └── AppContext.tsx         # State for i18n, dark/light theme, favorites, checklists
├── data/                      # Structured JSON catalogs
│   ├── categories.json        # 11 Service categories with icon keys
│   ├── documents.json         # Master reusable documents list with descriptions & validity
│   └── services.json          # Seed catalog of 20+ realistic Indian citizen services
├── i18n/
│   └── translations.ts        # English, Telugu, Hindi dictionaries
├── pages/                     # Main user pages
│   ├── Home.tsx               # Hero search, category chips, popular & recent services
│   ├── Profile.tsx            # Active checklists with progress, saved favorites, recents
│   ├── Search.tsx             # Instant search with document match highlighting & filters
│   ├── ServiceDetail.tsx      # Checklist, 2-column layout, accordions, official portal link
│   └── Settings.tsx           # Language, dark/light mode, notifications, about & FAQs
├── services/
│   ├── api.ts                 # Asynchronous API layer (CRUD, search, import/export)
│   └── storage.ts             # LocalStorage persistence helper
└── types/
    └── index.ts               # TypeScript interfaces for Service, Document, Category, etc.
```

---

## 🏛️ Seeded Service Catalog

The seed catalog covers Telangana/AP MeeSeva and Central Government services across all 11 categories:

- **Certificates:** Income Certificate, Caste / Integrated Community Certificate, EWS Certificate, Residence / Nativity Certificate, Birth Certificate, Death Certificate, Legal Heir Certificate
- **Identity & Civic:** Aadhaar Enrolment & Detail Update, PAN Card (Form 49A), Voter ID (Form 6), Passport (Fresh/Reissue), DigiLocker Setup
- **Education & Scholarships:** Telangana ePASS Post-Matric Scholarship & Fee Reimbursement, National Scholarship Portal (NSP Schemes)
- **Jobs & Recruitment:** State Public Service Commission One-Time Registration (TSPSC / APPSC OTR)
- **Land & Property:** Encumbrance Certificate (EC), Pattadar Passbook & Dharani Mutation
- **Loans & Finance:** PM MUDRA Yojana, PM Vishwakarma Scheme
- **Social Welfare & Pensions:** Aasara / YSR Social Security Pensions, PM-KISAN & Rythu Bandhu
- **Health:** Ayushman Bharat PM-JAY & Aarogyasri Card, Unique Disability ID (UDID) / SADAREM Card
- **Business & Employment:** Udyam (MSME) Registration, GST Registration, FSSAI Food Business Licence, e-Shram Card, EPFO UAN & Passbook Services
- **Transport & Utilities:** Learner's Driving Licence (LLR), New Electricity Connection (TSSPDCL)
- **Legal & Police:** Police Clearance Certificate (PCC), RTI Online Application

---

## 🔐 Admin Dashboard (`/admin`)

- **Route:** `/admin`
- **Demo Password:** `admin123`
- **Features:**
  - View all services with real-time text search and category filters
  - Filter for services marked `"Needs Review"`
  - **Add / Edit Service:**
    - Title, category, department, portal name, official URL, fees, processing time
    - Interactive document checklist editor: add custom docs or pick from master list, toggle mandatory vs optional, reorder documents
    - Reorderable application steps
    - Multi-line eligibility and important notes
    - Verification status toggle (`verified` vs `needs_review`) and date picker
    - One-click `"Mark as Verified Today"` button
  - **Bulk Export:** Download full catalog as formatted `.json` file
  - **Bulk Import:** Merge or replace entire catalog with custom JSON
  - **Reset:** Restore default factory seed data at any time

---

## 💻 Setup & Development Instructions

### Prerequisites
Node.js 20+ and npm.

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

The application runs locally at `http://127.0.0.1:5173/`.
