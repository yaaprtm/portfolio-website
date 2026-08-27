---
title: "Panduan Konfigurasi Firewall Filter & NAT Masquerade di MikroTik RouterOS"
date: "2026-08-15"
category: "Networking"
summary: "Tutorial teknis mengamankan router MikroTik menggunakan Firewall Filter Rules dan konfigurasi Source NAT (Masquerade) untuk akses internet jaringan lokal."
slug: "konfigurasi-firewall-nat-mikrotik"
---

# Panduan Konfigurasi Firewall Filter & NAT Masquerade di MikroTik RouterOS

Dalam arsitektur jaringan komputer modern, router berfungsi tidak hanya sebagai penerus paket data (*packet forwarding*), tetapi juga sebagai gerbang pertahanan pertama (*first line of defense*) melalui sistem **Stateful Firewall**.

Artikel ini merangkum konfigurasi mendasar **Firewall Filter Rules** dan **Source NAT (Masquerade)** pada MikroTik RouterOS (v6/v7) untuk mengamankan jaringan lokal sekaligus menghubungkannya ke internet publik.

---

## 1. Konsep Dasar NAT (Network Address Translation)

IPv4 lokal menggunakan blok IP Private (RFC 1918 seperti `192.168.0.0/16` atau `10.0.0.0/8`) yang tidak dapat dirutekan secara langsung di internet publik. Untuk itu, RouterOS menggunakan **Source NAT (srcnat)** dengan action **masquerade** untuk mentranslasikan IP private client menjadi IP publik router.

### Perintah CLI Konfigurasi NAT Masquerade:

```routeros
/ip firewall nat
add chain=srcnat out-interface=ether1-WAN action=masquerade comment="NAT Masquerade to Internet"
```

> **Catatan Teknis:** Pastikan `out-interface` diarahkan ke interface yang terhubung ke ISP/WAN agar router tidak melakukan masquerade pada traffic internal antar-VLAN.

---

## 2. Stateful Firewall Filter Rules

MikroTik memproses paket filter melalui tiga *chains* utama:
- **Input**: Paket yang ditujukan langsung ke router itu sendiri (misal: SSH, Winbox, DNS request ke router).
- **Forward**: Paket yang melintasi router dari satu interface ke interface lain (misal: traffic client LAN ke internet).
- **Output**: Paket yang berasal dari router itu sendiri menuju keluar.

---

## 3. Implementasi Aturan Keamanan (Security Hardening)

Berikut adalah urutan filter rules standar industri untuk mengamankan *chain input* dan *chain forward*:

```routeros
/ip firewall filter
# 1. Izinkan koneksi yang sudah terjalin (Established & Related)
add chain=input connection-state=established,related action=accept comment="Accept Established & Related"
add chain=forward connection-state=established,related action=accept comment="Accept Established & Related Forward"

# 2. Drop paket invalid (rusak/malformed)
add chain=input connection-state=invalid action=drop comment="Drop Invalid Input"
add chain=forward connection-state=invalid action=drop comment="Drop Invalid Forward"

# 3. Izinkan akses Winbox dan SSH hanya dari interface LAN / Management VLAN
add chain=input in-interface=vlan10-MGMT protocol=tcp dst-port=8291,22 action=accept comment="Allow Winbox & SSH from MGMT"

# 4. Izinkan ICMP (Ping) terbatas untuk monitoring jaringan
add chain=input protocol=icmp limit=5,10:packet action=accept comment="Allow Limited ICMP Ping"

# 5. Drop seluruh traffic input lainnya dari interface WAN
add chain=input in-interface=ether1-WAN action=drop comment="Drop All Other WAN Input"
```

---

## 4. Verifikasi dan Monitoring

Setelah konfigurasi diterapkan, lakukan pengujian berikut:
1. **Tes Konektivitas Client**: Jalankan perintah `ping 8.8.8.8` dan `nslookup google.com` dari PC client untuk memastikan NAT dan DNS resolve berfungsi.
2. **Port Scanning Test**: Gunakan *Nmap* dari sisi WAN (`nmap -Pn -p 1-1000 <IP_WAN>`) untuk memverifikasi bahwa seluruh port penting router berada pada status *filtered/closed*.
3. **Log Analysis**: Pantau menu `/ip firewall filter print stats` untuk melihat jumlah *packet count* dan *byte count* yang terfilter oleh rule yang dibuat.
