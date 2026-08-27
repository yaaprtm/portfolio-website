---
title: "Implementasi Dynamic Routing OSPF vs Static Routing pada Jaringan Multi-Router"
date: "2026-08-20"
category: "Networking"
summary: "Analisis komparasi Static Routing vs Open Shortest Path First (OSPF) serta panduan konfigurasinya pada interkoneksi MikroTik RouterOS dan Cisco Catalyst."
slug: "dinamis-routing-ospf-mikrotik-cisco"
---

# Implementasi Dynamic Routing OSPF vs Static Routing pada Jaringan Multi-Router

Dalam topologi jaringan enterprise yang memiliki lebih dari dua router atau memiliki jalur cadangan (*redundant link*), pengelolaan tabel routing secara manual (**Static Routing**) menjadi tidak efisien dan rawan kesalahan manusia (*human error*).

Protokol **OSPF (Open Shortest Path First)** hadir sebagai solusi *Interior Gateway Protocol (IGP)* berbasis **Link-State** yang menggunakan algoritma Dijkstra (Shortest Path First) untuk menentukan rute terbaik secara otomatis.

---

## 1. Komparasi: Static Routing vs OSPF

| Parameter | Static Routing | OSPF Dynamic Routing |
| :--- | :--- | :--- |
| **Beban Administratif** | Tinggi (harus update manual per router) | Rendah (otomatis discovery neighbor) |
| **Kemampuan Failover** | Lambat (perlu script/Netwatch manual) | Sangat Cepat (konvergensi otomatis < 5 detik) |
| **Kebutuhan Resource CPU** | Sangat Minimal | Sedang (kalkulasi SPF tree) |
| **Skalabilitas** | Cocok untuk 1–3 router | Skalabel untuk puluhan hingga ratusan router (Area 0, Area 1, dll) |

---

## 2. Cara Kerja Protokol OSPF

1. **Hello Protocol**: Router mengirim paket Hello multicast (`224.0.0.5`) untuk mendeteksi tetangga (*Neighbor Adjacency*).
2. **LSA (Link State Advertisement)**: Setiap router bertukar informasi mengenai status link masing-masing.
3. **LSDB (Link State Database)**: Semua router dalam satu area memiliki peta topologi yang identik.
4. **Perhitungan SPF**: Algoritma Dijkstra menghitung rute terpendek dengan metriks *Cost* berdasarkan bandwidth interface ($Cost = \frac{10^8}{Bandwidth}$).

---

## 3. Konfigurasi OSPF pada MikroTik RouterOS v7

Misalkan kita memiliki topologi interkoneksi backbone di subnet `10.255.255.0/30`:

```routeros
/routing ospf instance
add name=ospf-main router-id=10.255.255.1

/routing ospf area
add name=backbone area-id=0.0.0.0 instance=ospf-main

/routing ospf interface-template
# Advertisikan subnet backbone point-to-point
add area=backbone networks=10.255.255.0/30 type=ptp
# Advertisikan subnet LAN lokal
add area=backbone networks=192.168.10.0/24 passive=yes
```

> **Best Practice:** Berikan parameter `passive=yes` pada interface ke arah PC client agar router tidak mengirim paket OSPF Hello yang tidak perlu ke end-user.

---

## 4. Konfigurasi OSPF pada Cisco Router / L3 Switch

```cisco
Router(config)# router ospf 1
Router(config-router)# router-id 10.255.255.2
Router(config-router)# network 10.255.255.0 0.0.0.3 area 0
Router(config-router)# network 192.168.20.0 0.0.0.255 area 0
Router(config-router)# passive-interface GigabitEthernet0/1
```

---

## 5. Verifikasi & Troubleshooting

Gunakan perintah diagnosa berikut:
- **MikroTik**: `/routing ospf neighbor print` $\rightarrow$ Pastikan state berada pada status **Full**.
- **Cisco**: `show ip ospf neighbor` dan `show ip route ospf` $\rightarrow$ Verifikasi rute dengan prefix `O` sudah masuk ke routing table.
- **Failover Test**: Putuskan link utama, amati bahwa traffic beralih ke link backup dalam hitungan detik tanpa downtime total.
