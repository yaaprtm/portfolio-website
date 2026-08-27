---
title: "Manajemen Bandwidth Kantor Menggunakan Simple Queue & Queue Tree di MikroTik"
date: "2026-08-18"
category: "Networking"
summary: "Teknik optimasi alokasi bandwidth jaringan kantor menggunakan Hierarchical Token Bucket (HTB), Simple Queue, dan pembagian prioritas traffic operasional."
slug: "manajemen-bandwidth-simple-queue-mikrotik"
---

# Manajemen Bandwidth Kantor Menggunakan Simple Queue & Queue Tree di MikroTik

Salah satu tantangan terbesar dalam administrasi jaringan kantor adalah fenomena **Bandwidth Hogging**, yaitu ketika satu atau dua pengguna menghabiskan seluruh kapasitas internet (misal untuk download file besar atau video streaming), sehingga menyebabkan latensi tinggi (*bufferbloat*) pada aplikasi operasional penting.

MikroTik RouterOS menyediakan modul **Quality of Service (QoS)** yang sangat fleksibel berbasis algoritma **Hierarchical Token Bucket (HTB)**.

---

## 1. Konsep Dasar Limitasi: CIR vs MIR

Dalam perancangan manajemen bandwidth, terdapat dua parameter krusial:
- **MIR (Maximum Information Rate)** / `max-limit`: Batas maksimal bandwidth yang bisa didapat client jika utilisasi jaringan sedang lengang.
- **CIR (Committed Information Rate)** / `limit-at`: Jaminan bandwidth minimal yang **pasti didapatkan** client meskipun jaringan sedang padat (*congested*).

---

## 2. Implementasi dengan Simple Queue

Metode paling cepat dan praktis untuk segmentasi subnet per divisi (VLAN) adalah menggunakan **Simple Queue**.

### Contoh Skema Pembagian Bandwidth:
- Total Bandwidth ISP: **50 Mbps Download / 20 Mbps Upload**
- Divisi Manajemen (VLAN 10): CIR 10 Mbps, MIR 30 Mbps (Priority 1)
- Divisi Operasional (VLAN 20): CIR 15 Mbps, MIR 30 Mbps (Priority 3)
- Jaringan Tamu / Guest (VLAN 30): CIR 2 Mbps, MIR 5 Mbps (Priority 8)

### Script CLI Simple Queue:

```routeros
/queue simple
# Parent Queue (Total Alokasi ISP)
add name="TOTAL-INTERNET" target=ether1-WAN max-limit=20M/50M

# Sub-Queue Divisi Manajemen (Prioritas Tinggi)
add name="VLAN10-MGMT" parent="TOTAL-INTERNET" target=10.10.10.0/24 \
    limit-at=5M/10M max-limit=10M/30M priority=1/1 queue=default-small/default-small

# Sub-Queue Divisi Operasional (Prioritas Menengah)
add name="VLAN20-OPS" parent="TOTAL-INTERNET" target=10.20.20.0/24 \
    limit-at=8M/15M max-limit=15M/30M priority=3/3 queue=default-small/default-small

# Sub-Queue Guest (Prioritas Terendah)
add name="VLAN30-GUEST" parent="TOTAL-INTERNET" target=10.30.30.0/24 \
    limit-at=1M/2M max-limit=2M/5M priority=8/8 queue=default-small/default-small
```

---

## 3. Optimasi Menggunakan Packet Marking (Mangle)

Untuk kontrol yang lebih presisi pada level jenis traffic (misal: membedakan traffic browsing, VoIP, dan download), gunakan **Mangle** di Firewall sebelum diarahkan ke **Queue Tree**:

```routeros
/ip firewall mangle
# Tandai koneksi DNS & ICMP (Ping)
add chain=prerouting protocol=udp dst-port=53 action=mark-connection new-connection-mark=dns_conn passthrough=yes
add chain=prerouting connection-mark=dns_conn action=mark-packet new-packet-mark=prio_pkt passthrough=no
```

---

## 4. Kesimpulan & Rekomendasi

1. **Gunakan Nilai Burstable Secara Bijak**: Fitur *burst* memungkinkan client mendapatkan lonjakan kecepatan sesaat saat membuka halaman web pertama kali tanpa membebani bandwidth jangka panjang.
2. **Monitoring Real-time**: Gunakan fitur *Graphing* di RouterOS (`/tool graphing queue`) untuk memantau apakah ada queue yang mengalami *packet drop* berlebihan.
