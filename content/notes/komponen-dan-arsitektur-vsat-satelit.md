---
title: "Mengenal Komponen Utama VSAT Ground Station: Dish, BUC, LNB, dan Satelit Modem"
date: "2026-08-22"
category: "Networking"
summary: "Penjelasan mendalam mengenai arsitektur sistem VSAT (Very Small Aperture Terminal), pembagian ODU & IDU, serta fungsi masing-masing perangkat telekomunikasi satelit."
slug: "komponen-dan-arsitektur-vsat-satelit"
---

# Mengenal Komponen Utama VSAT Ground Station: Dish, BUC, LNB, dan Satelit Modem

**VSAT (Very Small Aperture Terminal)** adalah stasiun bumi telekomunikasi satelit yang menggunakan antena parabola berdiameter kecil (biasanya antara 1.2 hingga 2.4 meter) untuk menyediakan konektivitas broadband di daerah terpencil (*3T: Terdepan, Terluar, Tertinggal*) yang belum terjangkau serat optik maupun BTS seluler.

Secara garis besar, infrastruktur stasiun VSAT terbagi menjadi dua segmen utama: **Outdoor Unit (ODU)** dan **Indoor Unit (IDU)**.

---

## 1. Outdoor Unit (ODU)

ODU adalah perangkat yang ditempatkan di luar ruangan dan terpapar langsung dengan lingkungan luar:

### A. Antena Parabola (Reflector Dish & Feed Horn)
- **Fungsi**: Memantulkan dan memfokuskan gelombang radio elektromagnetik ke satu titik fokus (*Feed Horn*).
- **Material**: Terbuat dari lembaran baja atau fiber komposit tahan cuaca dengan sudut kelengkungan geometris presisi (Offset Antenna).

### B. BUC (Block Up-Converter) — Tx (Transmitter)
- **Fungsi**: Menerima sinyal frekuensi menengah (L-Band: 950–1450 MHz) dari modem indoor melalui kabel koaksial IFL, kemudian menaikkan frekuensinya (*Up-Convert*) ke frekuensi transmisi satelit (misal: Ku-Band 14 GHz atau C-Band 6 GHz) dan memperkuat daya pancarnya (Watt).

### C. LNB (Low Noise Block down-converter) — Rx (Receiver)
- **Fungsi**: Menangkap sinyal mikro yang sangat lemah dari satelit (misal: Ku-Band 12 GHz), memperkuatnya dengan noise minimal, dan menurunkannya (*Down-Convert*) ke sinyal L-Band agar dapat dibaca oleh modem indoor.

### D. OMT (Ortho-Mode Transducer)
- **Fungsi**: Memisahkan jalur transmisi (Tx) dan penerimaan (Rx) pada feed horn berdasarkan polarisasi gelombang (Horizontal vs Vertical atau Circular).

---

## 2. Indoor Unit (IDU)

IDU ditempatkan di dalam ruang server / kabinet tertutup:

### A. Satellite Modem (contoh: Hughes / iDirect / Newtec)
- Mengubah paket IP Ethernet (dari router LAN) menjadi sinyal modulasi RF (*DVB-S2X / TDMA*) dan sebaliknya.
- Mengelola enkripsi, sinkronisasi waktu (*Time Slot*), dan adaptasi modulasi (*Adaptive Coding and Modulation / ACM*).

### B. Kabel IFL (Inter-Facility Link)
- Menggunakan kabel koaksial berkualtas tinggi (RG-6 atau RG-11 berimpedansi 75 Ohm) dengan konektor F-Type kompresi untuk menghubungkan modem indoor ke BUC dan LNB di luar.

---

## 3. Perbedaan Frekuensi: C-Band vs Ku-Band

| Karakteristik | C-Band (4/6 GHz) | Ku-Band (12/14 GHz) |
| :--- | :--- | :--- |
| **Ketahanan Cuaca (Hujan)** | Sangat Baik (Tahan Redaman Hujan) | Rentan terhadap *Rain Fade* (Hujan Lebat) |
| **Ukuran Dish Antena** | Lebih Besar (1.8m – 3.8m) | Lebih Ringkas (1.2m – 1.8m) |
| **Biaya Perangkat & Instalasi**| Relatif Lebih Tinggi | Lebih Ekonomis & Mudah Dipindahkan |
| **Penggunaan Umum** | Backbone Bank, Maritim, Militer | Sekolah, Puskesmas, Tambang, Perkebunan |

---

## 4. Kesimpulan

Pemahaman terhadap karakteristik fisik dan elektrikal setiap komponen ODU dan IDU sangat krusial bagi teknisi lapangan agar proses perakitan (*assembly*), instalasi grounding petir, serta alignment pointing antena dapat berjalan dengan standar keselamatan dan performa optimal.
