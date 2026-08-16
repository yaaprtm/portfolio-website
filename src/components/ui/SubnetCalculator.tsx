"use client";

import { useState, useMemo } from "react";
import { Calculator, CheckCircle2, AlertCircle, Cpu, Network, Binary, RefreshCw } from "lucide-react";

interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  firstHost: string;
  lastHost: string;
  usableHosts: number;
  totalHosts: number;
  binaryMask: string;
  binaryIp: string;
}

function parseAndCalculate(inputStr: string): SubnetResult | null {
  try {
    const trimmed = inputStr.trim();
    if (!trimmed) return null;

    let ip = trimmed;
    let cidr = 24;

    if (trimmed.includes("/")) {
      const parts = trimmed.split("/");
      ip = parts[0].trim();
      cidr = parseInt(parts[1].trim(), 10);
    }

    const octets = ip.split(".").map((s) => parseInt(s, 10));
    if (
      octets.length !== 4 ||
      octets.some((o) => isNaN(o) || o < 0 || o > 255) ||
      isNaN(cidr) ||
      cidr < 1 ||
      cidr > 32
    ) {
      return null;
    }

    // Calculate 32-bit unsigned integers
    const ipUint =
      ((octets[0] << 24) >>> 0) +
      ((octets[1] << 16) >>> 0) +
      ((octets[2] << 8) >>> 0) +
      (octets[3] >>> 0);

    const maskUint = cidr === 32 ? 0xffffffff : ((~0 << (32 - cidr)) >>> 0);
    const netUint = (ipUint & maskUint) >>> 0;
    const broadUint = (netUint | ~maskUint) >>> 0;

    const uintToIp = (u: number) =>
      [(u >>> 24) & 255, (u >>> 16) & 255, (u >>> 8) & 255, u & 255].join(".");

    const uintToBinary = (u: number) =>
      [(u >>> 24) & 255, (u >>> 16) & 255, (u >>> 8) & 255, u & 255]
        .map((b) => b.toString(2).padStart(8, "0"))
        .join(".");

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : Math.max(0, totalHosts - 2);

    const firstHostUint = cidr >= 31 ? netUint : netUint + 1;
    const lastHostUint = cidr >= 31 ? broadUint : broadUint - 1;

    return {
      networkAddress: uintToIp(netUint),
      broadcastAddress: uintToIp(broadUint),
      subnetMask: uintToIp(maskUint),
      firstHost: uintToIp(firstHostUint),
      lastHost: uintToIp(lastHostUint),
      usableHosts,
      totalHosts,
      binaryMask: uintToBinary(maskUint),
      binaryIp: uintToBinary(ipUint),
    };
  } catch {
    return null;
  }
}

const presets = [
  { label: "192.168.1.0/24 (SOHO)", value: "192.168.1.0/24" },
  { label: "172.16.0.0/16 (Enterprise)", value: "172.16.0.0/16" },
  { label: "10.0.0.0/8 (Large Network)", value: "10.0.0.0/8" },
];

export default function SubnetCalculator() {
  const [inputVal, setInputVal] = useState("192.168.1.0/24");

  const result = useMemo(() => parseAndCalculate(inputVal), [inputVal]);

  return (
    <div className="glass-card p-5 sm:p-6 border border-white/10 rounded-2xl bg-navy-950/80 backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center">
            <Calculator size={16} className="text-cyan-neon" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">Coba Sendiri: Subnet Calculator</h4>
            <span className="text-[10px] font-mono text-cyan-neon">Interactive Subnetting Tool</span>
          </div>
        </div>
      </div>

      {/* Instruction Line */}
      <p className="text-slate-400 text-xs leading-relaxed mb-4">
        Masukkan IP Address dan CIDR untuk melihat hasil perhitungan subnet secara real-time.
      </p>

      {/* Quick Presets */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-[10px] font-mono text-slate-500 my-auto mr-1">Preset:</span>
        {presets.map((p) => (
          <button
            key={p.value}
            onClick={() => setInputVal(p.value)}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-cyan-soft border border-white/10 hover:border-cyan-neon/40 text-[11px] font-mono text-slate-300 hover:text-cyan-neon transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative mb-4">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Misal: 192.168.1.0/24"
          inputMode="decimal"
          className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/15 text-slate-100 font-mono text-xs sm:text-sm input-glow transition-all"
        />
        {result ? (
          <span className="absolute right-3 top-2.5 text-emerald-400 text-xs font-mono flex items-center gap-1">
            <CheckCircle2 size={14} /> Valid
          </span>
        ) : (
          <span className="absolute right-3 top-2.5 text-amber-400 text-xs font-mono flex items-center gap-1">
            <AlertCircle size={14} /> Format Tidak Valid
          </span>
        )}
      </div>

      {/* Results Display */}
      {result ? (
        <div className="space-y-3 font-mono text-xs pt-3 border-t border-white/10">
          {/* Main Grid Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-500 text-[10px] block">Network Address</span>
              <span className="text-cyan-neon font-bold">{result.networkAddress}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-500 text-[10px] block">Subnet Mask</span>
              <span className="text-slate-200 font-bold">{result.subnetMask}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-500 text-[10px] block">Broadcast Address</span>
              <span className="text-amber-300 font-bold">{result.broadcastAddress}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-500 text-[10px] block">Total Usable Hosts</span>
              <span className="text-cyan-neon font-bold">
                {result.usableHosts.toLocaleString()} Host
              </span>
            </div>
          </div>

          {/* Usable Range Bar */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between flex-wrap gap-2">
            <span className="text-slate-500 text-[10px]">Usable Host Range:</span>
            <span className="text-slate-200 font-semibold">
              {result.firstHost} — {result.lastHost}
            </span>
          </div>

          {/* Binary Notation Representation */}
          <div className="p-2.5 rounded-xl bg-navy-900 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Binary size={12} className="text-cyan-neon" /> Binary Mask Notation:
              </span>
            </div>
            <p className="text-[11px] text-cyan-neon/90 tracking-widest break-all font-mono">
              {result.binaryMask}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono text-center">
          Format IP/CIDR tidak valid. Masukkan format contoh: 192.168.1.0/24
        </div>
      )}
    </div>
  );
}
