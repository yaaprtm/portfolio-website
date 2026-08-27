---
title: "Panduan Lengkap Pointing Antena VSAT Lapangan & Optimasi Parameter SNR"
date: "2026-08-23"
category: "Networking"
summary: "Prosedur operasional standar (SOP) pelaksanaan pointing antena VSAT di lapangan: perhitungan Azimuth, Elevasi, Polarisasi, dan pengukuran nilai SNR / Es/No."
slug: "panduan-pointing-antena-vsat-lapangan"
---

# Panduan Lengkap Pointing Antena VSAT Lapangan & Optimasi Parameter SNR

Proses **Pointing Antena VSAT** adalah tahapan paling krusial dalam instalasi stasiun bumi satelit. Kesalahan orientasi sudut sekecil $0.5^\circ$ dapat menyebabkan antena membidik satelit yang salah (*Cross-Pol Interference*) atau menghasilkan kualitas sinyal yang sangat rendah sehingga link tidak stabil saat terjadi hujan (*rain fade*).

Artikel ini menguraikan tahapan standar teknisi lapangan saat melakukan pointing antena VSAT di lokasi remote (berdasarkan pengalaman proyek instalasi di Kalimantan Barat).

---

## 1. Persiapan Data & Parameter Satelit

Sebelum memulai pointing, teknisi harus menghitung 3 parameter koordinat geosinkron berdasarkan koordinat GPS lokasi stasiun bumi:

1. **Azimuth ($\theta_{Az}$)**: Arah horizontal kompas antena terhadap kutub utara sebenarnya (*True North*).
2. **Elevasi ($\theta_{El}$)**: Sudut kemiringan vertikal antena dari garis horizon tanah ke atas langit ($0^\circ - 90^\circ$).
3. **Polarisasi (Skew)**: Sudut perputaran LNB/Feedhorn untuk menyelaraskan polaritas gelombang vertikal/horizontal terhadap satelit.

> **Tips Lapangan:** Perhitungkan nilai **Magnetic Declination** (deklinasi magnetik bumi) jika menggunakan kompas manual agar arah sudut Azimuth tidak meleset dari *True North*.

---

## 2. Prosedur Pointing Langkah Demi Langkah

### Langkah 1: Pemasangan Tiang (*Pole Mast*) Tegak Lurus
Gunakan *waterpass* (bubble level) untuk memastikan tiang penyangga antena berada pada sudut tegak lurus sempurna ($90^\circ$). Jika tiang miring, skala sudut elevasi pada *mount bracket* tidak akan akurat.

### Langkah 2: Pemasangan Sudut Awal (Coarse Adjustment)
1. Atur sudut **Polarisasi (Skew)** feed horn sesuai tabel perhitungan.
2. Atur sudut **Elevasi** antena menggunakan *inclinometer* pada bagian belakang bracket dish.
3. Arahkan **Azimuth** menggunakan kompas ke arah target satelit.

### Langkah 3: Pencarian Sinyal Halus (Fine Pointing)
1. Hubungkan modem satelit ke LNB melalui kabel IFL dan buka dashboard web modem (misal interface GUI Hughes/iDirect di `192.168.0.1` atau `192.168.1.1`).
2. Masuk ke menu **Antenna Pointing Utility** untuk memantau nilai **Signal-to-Noise Ratio (SNR / EsNo)** secara real-time.
3. Geser Azimuth perlahan ke kiri/kanan (sapuan $1^\circ$ per detik) hingga modem mulai mendeteksi sinyal (*Carrier Detection*).
4. Setelah sinyal terdeteksi (*DVB Lock*), kencangkan baut azimuth perlahan.
5. Lakukan penyesuaian halus pada baut **Elevasi** dengan memutar *fine adjustment screw* hingga nilai SNR mencapai puncak maksimal.
6. Lakukan penyesuaian halus pada **Polarisasi (Skew)** dengan memutar sedikit feed horn hingga nilai sinyal maksimal dan cross-polarization minimal.

---

## 3. Parameter Kualitas Link Satelit

| Parameter | Ambang Batas Minimum | Nilai Ideal Lapangan | Keterangan |
| :--- | :--- | :--- | :--- |
| **Es/No / SNR** | $\ge 9.5 \text{ dB}$ | $13.0 - 16.5 \text{ dB}$ | Perbandingan daya sinyal terhadap noise |
| **Rx Sinyal Level** | $-45 \text{ dBm}$ | $-35 \text{ s/d } -25 \text{ dBm}$ | Kekuatan daya terima pada modem |
| **Bit Error Rate (BER)** | $< 10^{-7}$ | $0$ (Error Free) | Integritas bit transmisi data |

---

## 4. Lineup Bersama NOC (Network Operation Center)

Setelah nilai SNR lokal maksimal:
1. Hubungi tim **Hub / NOC Satelit** melalui telepon satelit atau seluler.
2. Minta izin untuk melakukan **Continuous Wave (CW) Transmission Test** untuk memverifikasi daya pancar (Tx) BUC dan isolasi polarisasi silang (*Cross-Pol Isolation* $\ge 30 \text{ dB}$).
3. Setelah disetujui NOC (*Lineup Approved*), kunci semua baut antena dengan torsi standar dan pasang pelindung silikon/karet anti-air (*weatherproofing*) pada konektor koaksial luar.
