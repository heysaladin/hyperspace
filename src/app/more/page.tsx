"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight, Trophy, Users, ThumbsUp, ShieldCheck,
  Download, Activity, HelpCircle, MessageSquare,
  Bell, Sun, Globe,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"

const stats = [
  { label: "Skor KPI", value: "82%", color: "text-[#1a5c35]" },
  { label: "KPI Aktif", value: "6",   color: "text-zinc-800" },
  { label: "Perlu Update", value: "2", color: "text-amber-500" },
  { label: "Rank Tim",   value: "#2",  color: "text-[#1a5c35]" },
]

type MenuItem = {
  icon: React.ElementType
  label: string
  sub: string
  href: string
  iconBg: string
  iconColor: string
  badge?: number
  toggle?: boolean
}

const fiturItems: MenuItem[] = [
  { icon: Users,      label: "Team KPI",    sub: "Progres KPI seluruh tim",        href: "/team-kpi",  iconBg: "bg-blue-50",    iconColor: "text-blue-600" },
  { icon: ThumbsUp,   label: "Approval",    sub: "KPI menunggu persetujuanmu",     href: "/approval",  iconBg: "bg-green-50",   iconColor: "text-[#1a5c35]", badge: 2 },
  { icon: ShieldCheck, label: "Verifikasi", sub: "KPI menunggu verifikasimu",      href: "/verifikasi",iconBg: "bg-violet-50",  iconColor: "text-violet-600", badge: 4 },
]

const pengaturanItems: MenuItem[] = [
  { icon: Bell,  label: "Notifikasi",  sub: "Reminder & update KPI",    href: "/notifikasi", iconBg: "bg-green-50",  iconColor: "text-[#1a5c35]", toggle: true },
  { icon: Sun,   label: "Tampilan",    sub: "Tema terang / gelap",       href: "#",           iconBg: "bg-blue-50",   iconColor: "text-blue-600" },
  { icon: Globe, label: "Bahasa",      sub: "Bahasa Indonesia",          href: "#",           iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
]

const laporanItems: MenuItem[] = [
  { icon: Download, label: "Export KPI",         sub: "Unduh PDF atau Excel",         href: "#", iconBg: "bg-green-50", iconColor: "text-[#1a5c35]" },
  { icon: Activity, label: "Riwayat Performa",   sub: "Semua periode sebelumnya",     href: "#", iconBg: "bg-blue-50",  iconColor: "text-blue-600"  },
]

const bantuanItems: MenuItem[] = [
  { icon: HelpCircle,    label: "FAQ & Tutorial",  sub: "Cara pakai Ezer",    href: "#", iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
  { icon: MessageSquare, label: "Hubungi Admin",   sub: "Laporkan masalah",   href: "#", iconBg: "bg-violet-50", iconColor: "text-violet-600", badge: 3 },
]

function MenuCard({ items }: { items: MenuItem[] }) {
  const [notifOn, setNotifOn] = useState(true)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {items.map((item, i) => {
        const Icon = item.icon
        const isToggle = item.toggle
        const row = (
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
              <Icon className={`w-4.5 h-4.5 ${item.iconColor}`} style={{ width: 18, height: 18 }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-800">{item.label}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">{item.sub}</p>
            </div>
            {isToggle ? (
              <button
                onClick={() => setNotifOn((v) => !v)}
                className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${notifOn ? "bg-[#4ecb71]" : "bg-zinc-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${notifOn ? "right-1" : "left-1"}`} />
              </button>
            ) : item.badge ? (
              <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full shrink-0">
                {item.badge}
              </span>
            ) : (
              <ChevronRight className="w-4 h-4 text-zinc-300 shrink-0" />
            )}
          </div>
        )
        return (
          <div key={item.label}>
            {isToggle ? (
              <div>{row}</div>
            ) : (
              <Link href={item.href} className="block active:bg-zinc-50 transition-colors">
                {row}
              </Link>
            )}
            {i < items.length - 1 && <div className="h-px bg-zinc-100 mx-4" />}
          </div>
        )
      })}
    </div>
  )
}

function SectionHead({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1 pt-4 pb-2">
      {title}
    </p>
  )
}

export default function MorePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Lainnya" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {/* Profile + Pencapaian card */}
        <div className="bg-[#1e1e30] rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#4ecb71]/10 -translate-y-8 translate-x-8" />

          {/* Profile row */}
          <Link href="/profil" className="flex items-center gap-4 p-5 active:opacity-80 transition-opacity relative z-10">
            <Avatar className="w-14 h-14 shrink-0">
              <AvatarFallback className="bg-[#4ecb71] text-[#1a5c35] text-xl font-black">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-[17px] leading-tight">Adin Saputra</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">Sales Executive · Level 7</p>
              <p className="text-[#4ecb71] text-[11px] font-semibold mt-1.5">Tim Sales — PT Maju Bersama</p>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
          </Link>

          {/* Divider */}
          <div className="h-px bg-white/10 mx-5" />

          {/* Pencapaian row */}
          <Link href="/badges" className="flex items-center gap-3 px-5 py-4 active:opacity-80 transition-opacity relative z-10">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">Pencapaian</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">3 Badge · Streak 6 bulan 🔥</p>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl py-3 px-1 text-center shadow-sm">
              <p className={`text-lg font-black leading-tight ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Fitur */}
        <SectionHead title="Fitur" />
        <MenuCard items={fiturItems} />

        {/* Pengaturan */}
        <SectionHead title="Pengaturan" />
        <MenuCard items={pengaturanItems} />

        {/* Laporan */}
        <SectionHead title="Laporan" />
        <MenuCard items={laporanItems} />

        {/* Bantuan */}
        <SectionHead title="Bantuan" />
        <MenuCard items={bantuanItems} />

        {/* Version */}
        <p className="text-center text-[10px] text-zinc-300 font-medium pt-6 pb-2">
          Ezer v1.2.0 · © 2026 PT Maju Bersama
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
