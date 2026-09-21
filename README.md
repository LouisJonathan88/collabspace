# CollabSpace

CollabSpace adalah aplikasi web kolaborasi tim secara *real-time* — menggabungkan **Kanban board**, **dokumen kolaboratif**, dan **live chat** dalam satu workspace. Dibangun sebagai tugas kelompok mata kuliah *Cloud Computing*.

## Fitur

- **Role-based access control** — Owner, Editor, dan Viewer dengan hak akses berbeda per project
- **Kanban board** — drag-and-drop task antar kolom (To Do, Doing, Done), real-time sync antar anggota
- **Dokumen kolaboratif** — rich-text editor untuk menulis dokumen bersama, dengan export ke PDF
- **Live chat** — diskusi real-time per dokumen/project
- **Presence indicator** — melihat siapa saja yang sedang online/aktif di project
- **Autentikasi** — login & register dengan Firebase Auth

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Backend/Database:** Firebase (Firestore, Auth, Realtime Database untuk presence)
- **Drag & Drop:** dnd-kit / @hello-pangea/dnd
- **Rich Text Editor:** Tiptap
- **Export:** html2pdf.js, html-docx-js
- **Routing:** React Router v7
- **Deployment:** Vercel

## Menjalankan

1. Clone repository ini
   ```bash
   git clone https://github.com/LouisJonathan88/collabspace.git
   cd collabspace
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Buat file `.env` di root project, lalu isi dengan kredensial Firebase project kamu sendiri:
   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_DATABASE_URL=
   ```

4. Jalankan development server
   ```bash
   npm run dev
   ```

## 📁 Struktur Project

```
src/
├── components/     # Komponen UI (board, chat, docs, dashboard, project, shared)
├── context/        # React Context (AuthContext)
├── hooks/          # Custom hooks (useAuth, useChat, useDocument, useProject, useTask)
├── lib/            # Konfigurasi & helper (Firebase, Firestore, auth, presence, export PDF)
├── pages/          # Halaman utama (Login, Register, Dashboard, Project, Document)
└── types/          # Definisi tipe TypeScript
```