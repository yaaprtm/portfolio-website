"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Wifi, Router, Server, Satellite, ChevronRight, RefreshCw, Info } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// ============================================================
// Network Topology Visualizer — Arya Putra Pratama Portfolio
// Visualizes VSAT → Router → Switch → VLAN → Clients
// With interactive "ping simulation" animations
// ============================================================

interface TopoNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  x: number; // % of container
  y: number;
  color: string;
  info: {
    device: string;
    ip: string;
    protocol: string;
    detail: string;
  };
}

interface Packet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}

interface Edge {
  from: string;
  to: string;
  color?: string;
}

const NODES: TopoNode[] = [
  {
    id: "satellite",
    label: "VSAT Satellite",
    sublabel: "Ku-Band · 1 Mbps",
    icon: Satellite,
    x: 50, y: 12,
    color: "#00F5A0",
    info: { device: "Hughes Network Systems", ip: "203.0.113.1", protocol: "DVB-S2", detail: "Uplink ke NOC Jakarta via Satelit Palapa-D" },
  },
  {
    id: "router",
    label: "Router",
    sublabel: "Mikrotik RB3011",
    icon: Router,
    x: 50, y: 38,
    color: "#00D4FF",
    info: { device: "MikroTik RB3011UiAS", ip: "192.168.1.1/24", protocol: "NAT · OSPF", detail: "Gateway utama, firewall, bandwidth management & NAT masquerade" },
  },
  {
    id: "switch",
    label: "Switch L3",
    sublabel: "Cisco Catalyst",
    icon: Server,
    x: 50, y: 65,
    color: "#818CF8",
    info: { device: "Cisco Catalyst 2960", ip: "192.168.1.2", protocol: "VLAN Trunking 802.1Q", detail: "Distribusi ke 3 VLAN terpisah dengan inter-VLAN routing" },
  },
  {
    id: "vlan10",
    label: "VLAN 10",
    sublabel: "Manajemen",
    icon: Wifi,
    x: 18, y: 86,
    color: "#F59E0B",
    info: { device: "Access Point + Admin PC", ip: "10.10.10.0/24", protocol: "VLAN 10", detail: "Jaringan manajemen perangkat & admin internal" },
  },
  {
    id: "vlan20",
    label: "VLAN 20",
    sublabel: "Operasional",
    icon: Wifi,
    x: 50, y: 86,
    color: "#EF4444",
    info: { device: "PC Workstation · CCTV", ip: "10.20.20.0/24", protocol: "VLAN 20", detail: "Perangkat operasional lapangan dan monitoring kamera" },
  },
  {
    id: "vlan30",
    label: "VLAN 30",
    sublabel: "Tamu / Guest",
    icon: Wifi,
    x: 82, y: 86,
    color: "#A78BFA",
    info: { device: "Access Point Guest", ip: "10.30.30.0/24", protocol: "VLAN 30", detail: "Isolated guest network dengan QoS terbatas 256Kbps per user" },
  },
];

const CLIENT_NODES = [
  { id: "c1", label: "Admin PC", parent: "vlan10", x: 10, y: 96, color: "#F59E0B" },
  { id: "c2", label: "Workstation", parent: "vlan20", x: 42, y: 96, color: "#EF4444" },
  { id: "c3", label: "Guest Laptop", parent: "vlan30", x: 74, y: 96, color: "#A78BFA" },
];

const EDGES: Edge[] = [
  { from: "satellite", to: "router", color: "#00F5A0" },
  { from: "router", to: "switch", color: "#00D4FF" },
  { from: "switch", to: "vlan10", color: "#F59E0B" },
  { from: "switch", to: "vlan20", color: "#EF4444" },
  { from: "switch", to: "vlan30", color: "#A78BFA" },
];

export default function NetworkTopologyVisualizer() {
  const { play } = useSoundEffects();
  const [hoveredNode, setHoveredNode] = useState<TopoNode | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [pingStats, setPingStats] = useState<Record<string, { rtt: number; success: boolean } | null>>({});
  const [pinging, setPinging] = useState<string | null>(null);
  const packetIdRef = useRef(0);

  const getNodePos = useCallback((nodeId: string): { x: number; y: number } | null => {
    const node = NODES.find((n) => n.id === nodeId);
    if (node) return { x: node.x, y: node.y };
    const client = CLIENT_NODES.find((c) => c.id === nodeId);
    if (client) return { x: client.x, y: client.y };
    return null;
  }, []);

  const toSvg = (x: number, y: number) => ({ svgX: (x / 100) * 400, svgY: (y / 100) * 250 });

  const simulatePing = useCallback(
    (clientId: string) => {
      if (pinging) return;
      setPinging(clientId);
      setPingStats((prev) => ({ ...prev, [clientId]: null }));
      play("ping");

      const client = CLIENT_NODES.find((c) => c.id === clientId)!;
      const clientPos = getNodePos(clientId)!;
      const satPos = getNodePos("satellite")!;

      const start = toSvg(clientPos.x, clientPos.y);
      const end = toSvg(satPos.x, satPos.y);

      const packetId = ++packetIdRef.current;
      const rtt = 38 + Math.floor(Math.random() * 45);

      setPackets((prev) => [
        ...prev,
        {
          id: packetId,
          startX: start.svgX,
          startY: start.svgY,
          endX: end.svgX,
          endY: end.svgY,
          color: client.color,
        },
      ]);

      setTimeout(() => {
        setPackets((prev) => prev.filter((p) => p.id !== packetId));
        setPingStats((prev) => ({ ...prev, [clientId]: { rtt, success: true } }));
        setPinging(null);
        play("success");
      }, 700);
    },
    [pinging, play, getNodePos]
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-cyan-neon animate-pulse" />
          <span className="text-xs font-mono text-slate-300 font-semibold">Network Topology — VSAT Site</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">
            ● ONLINE
          </span>
        </div>
      </div>

      {/* SVG Topology Canvas */}
      <div className="relative bg-navy-950/60 border border-white/5 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <svg
          viewBox="0 0 400 250"
          className="w-full h-full"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {/* Grid lines */}
          {[50, 100, 150, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}

          {/* ── Edges ─────────────────────────── */}
          {EDGES.map((edge) => {
            const from = getNodePos(edge.from);
            const to = getNodePos(edge.to);
            if (!from || !to) return null;
            const { svgX: x1, svgY: y1 } = toSvg(from.x, from.y);
            const { svgX: x2, svgY: y2 } = toSvg(to.x, to.y);
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={edge.color || "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeOpacity="0.5"
              />
            );
          })}

          {/* Client → VLAN edges */}
          {CLIENT_NODES.map((c) => {
            const parent = NODES.find((n) => n.id === c.parent)!;
            const { svgX: x1, svgY: y1 } = toSvg(c.x, c.y);
            const { svgX: x2, svgY: y2 } = toSvg(parent.x, parent.y);
            return (
              <line
                key={`client-${c.id}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={c.color}
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="2 3"
              />
            );
          })}

          {/* ── Animated Packets ──────────────── */}
          {packets.map((packet) => (
            <motion.circle
              key={packet.id}
              initial={{ cx: packet.startX, cy: packet.startY }}
              animate={{
                cx: [packet.startX, packet.endX, packet.startX],
                cy: [packet.startY, packet.endY, packet.startY],
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              r="4"
              fill={packet.color}
              style={{ filter: `drop-shadow(0 0 6px ${packet.color})` }}
            />
          ))}

          {/* ── Main Nodes ────────────────────── */}
          {NODES.map((node) => {
            const { svgX, svgY } = toSvg(node.x, node.y);
            const isHovered = hoveredNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${svgX}, ${svgY})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow ring */}
                {isHovered && (
                  <circle r="20" fill="none" stroke={node.color} strokeWidth="1" opacity="0.4" />
                )}
                {/* Node circle */}
                <circle
                  r="14"
                  fill={`${node.color}18`}
                  stroke={node.color}
                  strokeWidth={isHovered ? "2" : "1.5"}
                  opacity={isHovered ? 1 : 0.8}
                />
                {/* Label */}
                <text x="0" y="23" textAnchor="middle" fontSize="6" fill={node.color} fontWeight="bold">
                  {node.label}
                </text>
                <text x="0" y="30" textAnchor="middle" fontSize="5" fill="rgba(255,255,255,0.4)">
                  {node.sublabel}
                </text>
              </g>
            );
          })}

          {/* ── Client Nodes (Clickable Ping) ─── */}
          {CLIENT_NODES.map((client) => {
            const { svgX, svgY } = toSvg(client.x, client.y);
            const isPinging = pinging === client.id;
            const stat = pingStats[client.id];

            return (
              <g
                key={client.id}
                transform={`translate(${svgX}, ${svgY})`}
                style={{ cursor: "pointer" }}
                onClick={() => simulatePing(client.id)}
              >
                {isPinging && (
                  <circle r="16" fill="none" stroke={client.color} strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" values="10;20;10" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
                <rect x="-12" y="-7" width="24" height="14" rx="3"
                  fill={`${client.color}20`} stroke={client.color} strokeWidth="1.2" />
                <text x="0" y="2.5" textAnchor="middle" fontSize="5.5" fill={client.color} fontWeight="bold">
                  {client.label}
                </text>
                {stat && (
                  <text x="0" y="18" textAnchor="middle" fontSize="4.5" fill={stat.success ? "#00F5A0" : "#EF4444"}>
                    {stat.success ? `✓ ${stat.rtt}ms` : "✗ Timeout"}
                  </text>
                )}
                {!stat && !isPinging && (
                  <text x="0" y="18" textAnchor="middle" fontSize="4" fill="rgba(255,255,255,0.25)">
                    klik ping
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Info Tooltip */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-3 right-3 p-3 rounded-xl border border-white/10 bg-navy-950/95 backdrop-blur-md"
            >
              <div className="flex items-start gap-2">
                <Info size={12} className="text-cyan-neon mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold" style={{ color: hoveredNode.color }}>
                      {hoveredNode.info.device}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-400">
                      {hoveredNode.info.ip}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-400">
                      {hoveredNode.info.protocol}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-relaxed">{hoveredNode.info.detail}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ping Stats Bar */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {CLIENT_NODES.map((client) => {
          const stat = pingStats[client.id];
          const isPinging = pinging === client.id;
          return (
            <button
              key={client.id}
              onClick={() => simulatePing(client.id)}
              disabled={!!pinging}
              className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold" style={{ color: client.color }}>
                  {client.label}
                </span>
                {isPinging ? (
                  <RefreshCw size={10} className="text-slate-400 animate-spin" />
                ) : (
                  <ChevronRight size={10} className="text-slate-600" />
                )}
              </div>
              {stat ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-[9px] font-mono text-green-400">RTT {stat.rtt}ms · TTL 64</span>
                </div>
              ) : isPinging ? (
                <span className="text-[9px] font-mono text-slate-500 animate-pulse">Pinging…</span>
              ) : (
                <span className="text-[9px] font-mono text-slate-600">Klik untuk ping</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] font-mono text-slate-500">
        <span>● VSAT Topology · Kalimantan Barat</span>
        <span className="text-slate-700">|</span>
        <span>Hover node untuk info · Klik client untuk simulasi ping</span>
      </div>
    </div>
  );
}
