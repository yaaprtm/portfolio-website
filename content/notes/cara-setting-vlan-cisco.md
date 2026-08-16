---
title: "Cara Setting VLAN dan Inter-VLAN Routing di Cisco Packet Tracer"
date: "2026-08-15"
category: "Networking"
summary: "Panduan praktis langkah demi langkah konfigurasi VLAN 10, VLAN 20, Trunking dot1Q, dan Inter-VLAN Routing pada Router Cisco menggunakan CLI."
slug: "cara-setting-vlan-cisco"
---

# Cara Setting VLAN dan Inter-VLAN Routing di Cisco Packet Tracer

Dalam arsitektur jaringan komputer modern, **Virtual Local Area Network (VLAN)** adalah metode wajib untuk membagi satu jaringan fisik (*switch*) menjadi beberapa jaringan logis terpisah. Hal ini bertujuan untuk mengisolasi *broadcast domain*, meningkatkan efisiensi *bandwidth*, dan menjaga keamanan antar departemen.

Artikel ini akan membahas langkah praktis konfigurasi VLAN pada **Cisco Packet Tracer**.

---

## 1. Topologi Jaringan yang Digunakan

Pada skenario ini, kita menggunakan 1 buah Switch Layer 2 Cisco (2960) dan 1 buah Router Cisco (2811):

- **VLAN 10 (HRD)**: Subnet `192.168.10.0/24` — Port Fa0/1 s/d Fa0/5
- **VLAN 20 (Finance)**: Subnet `192.168.20.0/24` — Port Fa0/6 s/d Fa0/10
- **Trunk Link**: Port Fa0/24 (menghubungkan Switch ke Router Fa0/0)

---

## 2. Langkah Konfigurasi pada Switch Cisco (Layer 2)

Buka terminal CLI pada Switch Cisco, lalu masukkan perintah berikut:

```bash
Switch> enable
Switch# configure terminal

! Membuat VLAN 10 dan VLAN 20
Switch(config)# vlan 10
Switch(config-vlan)# name HRD
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name Finance
Switch(config-vlan)# exit

! Memasukkan Port ke VLAN 10
Switch(config)# interface range fa0/1-5
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit

! Memasukkan Port ke VLAN 20
Switch(config)# interface range fa0/6-10
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
Switch(config-if-range)# exit

! Konfigurasi Port Trunk ke Router
Switch(config)# interface fa0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit
```

---

## 3. Konfigurasi Inter-VLAN Routing pada Router (Router-on-a-Stick)

Agar PC di VLAN 10 dapat saling berkomunikasi dengan PC di VLAN 20, kita memerlukan **Inter-VLAN Routing** berbasis sub-interface (Router-on-a-Stick):

```bash
Router> enable
Router# configure terminal

! Mengaktifkan Interface Utama
Router(config)# interface fa0/0
Router(config-if)# no shutdown
Router(config-if)# exit

! Sub-interface VLAN 10
Router(config)# interface fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit

! Sub-interface VLAN 20
Router(config)# interface fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit
```

---

## 4. Pengujian Konektivitas (Verifikasi)

Setelah konfigurasi selesai, lakukan pengujian berikut di Command Prompt PC:

1. Ketik `ping 192.168.10.1` (Default Gateway VLAN 10) — **Result: Reply**
2. Ketik `ping 192.168.20.2` (IP PC di VLAN 20) — **Result: Reply**
3. Jalankan `show vlan brief` di Switch untuk memastikan asosiasi port sudah sesuai.

> **Tips Troubleshooting**: Jika ping gagal antar VLAN, periksa kembali apakah port penghubung Switch ke Router sudah dikonfigurasi sebagai `switchport mode trunk` dan enkapsulasi `dot1Q` pada router sudah sesuai dengan nomor VLAN ID.
