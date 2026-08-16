# 🚀 Portfolio Website — Setup & Customization Guide

Website portofolio dark/futuristik dibangun dengan **Next.js 14**, **Tailwind CSS**, **Framer Motion**, dan **Lucide React**.

---

## ⚡ Quick Start

### 1. Install Node.js (jika belum)
Download dari [nodejs.org](https://nodejs.org/) → pilih versi **LTS**. Restart terminal setelah instalasi.

### 2. Install dependencies
Buka terminal di folder project, lalu jalankan:
```bash
npm install
```

### 3. Jalankan dev server
```bash
npm run dev
```
Buka browser ke **http://localhost:3000**

### 4. Build untuk production
```bash
npm run build
npm run start
```

---

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx        <- SEO metadata, font import
│   ├── page.tsx          <- Assembles semua section
│   └── globals.css       <- Design tokens, animasi, scrollbar
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    <- Sticky navbar + mobile menu
│   │   └── Footer.tsx    <- Footer + social links
│   ├── sections/
│   │   ├── Hero.tsx      <- Typing effect + network canvas
│   │   ├── About.tsx     <- Bio + counter stats
│   │   ├── Skills.tsx    <- Skill cards per kategori
│   │   ├── Projects.tsx  <- Project card grid
│   │   ├── Experience.tsx<- Terminal-style timeline
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx   <- Form + social links
│   └── ui/
│       ├── NetworkBackground.tsx <- Canvas animasi jaringan
│       ├── SectionWrapper.tsx
│       ├── SectionHeading.tsx
│       ├── Button.tsx
│       └── Badge.tsx
└── data/
    ├── projects.ts       <- Edit proyek kamu di sini
    ├── skills.ts         <- Edit skill kamu di sini
    ├── experience.ts     <- Edit pengalaman kamu di sini
    └── certifications.ts <- Edit sertifikasi kamu di sini
```

---

## Cara Mengganti Data

### Nama & Informasi Pribadi
Edit file-file berikut (cari teks `Your Name`, `username`, dll):

| File | Yang Perlu Diubah |
|------|-------------------|
| src/app/layout.tsx | title, description, URL, Twitter handle |
| src/components/sections/Hero.tsx | Nama, tagline, link sosmed |
| src/components/sections/About.tsx | Bio, info chips, stats |
| src/components/layout/Footer.tsx | Link sosmed, copyright |
| src/components/sections/Contact.tsx | Link sosmed, nomor WA |

### Foto Profil
1. Taruh file foto di public/images/avatar.jpg
2. Di About.tsx, ganti div placeholder dengan Image dari next/image

### Proyek (src/data/projects.ts)
Tambah objek baru ke array `projects` mengikuti format yang sudah ada.

### Skills (src/data/skills.ts)
Tambah/hapus skill di array `skills` masing-masing kategori.
Level: "beginner" | "intermediate" | "advanced" | "expert"

### Pengalaman (src/data/experience.ts)
Tambah entry baru. Type: "work" | "internship" | "education" | "organization"

### Sertifikasi (src/data/certifications.ts)
Tambah entry sertifikasi baru.

---

## Deploy ke Vercel

1. Push project ke GitHub
2. Buka vercel.com, Import repo
3. Vercel otomatis mendeteksi Next.js -> klik Deploy
4. Selesai! URL tersedia dalam 2 menit

---

## Integrasi EmailJS (Contact Form)

1. Daftar di emailjs.com (free tier tersedia)
2. npm install @emailjs/browser
3. Di Contact.tsx, ganti bagian Placeholder dengan emailjs.send()
