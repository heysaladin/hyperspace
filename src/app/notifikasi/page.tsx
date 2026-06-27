"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ThumbsUp, CheckCircle2, XCircle, ShieldCheck,
  Clock, AlertTriangle, Trophy, Bell, CheckCheck,
} from "lucide-react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Badge } from "@/components/ui/badge"

type NotifType =
  | "kpi_submitted"
  | "kpi_approved"
  | "kpi_rejected"
  | "verification_requested"
  | "kpi_verified"
  | "verification_rejected"
  | "ready_for_closing"
  | "kpi_finalized"
  | "closing_rejected"
  | "deadline_reminder"
  | "governance_warning"
  | "overdue"

type Domain = "authoring" | "verification" | "progress" | "account"
type Category = "all" | "actionable" | "reminder" | "warning"

interface Notif {
  id: number
  type: NotifType
  domain: Domain
  title: string
  desc: string
  time: string
  date: "today" | "yesterday" | "older"
  href: string
  isActionable: boolean
  unread: boolean
}

const ALL_NOTIFS: Notif[] = [
  {
    id: 1,
    type: "kpi_submitted",
    domain: "authoring",
    title: "KPI Menunggu Approval",
    desc: "Budi Santoso mengajukan KPI 'Target Penjualan Q3' dan menunggu persetujuanmu.",
    time: "10 menit lalu",
    date: "today",
    href: "/approval",
    isActionable: true,
    unread: true,
  },
  {
    id: 2,
    type: "verification_requested",
    domain: "verification",
    title: "KPI Menunggu Verifikasi",
    desc: "Sari W. meminta verifikasi KPI 'Customer Satisfaction Score' periode Jun 2026.",
    time: "45 menit lalu",
    date: "today",
    href: "/verifikasi",
    isActionable: true,
    unread: true,
  },
  {
    id: 3,
    type: "kpi_verified",
    domain: "verification",
    title: "KPI Diverifikasi",
    desc: "KPI 'Target Revenue' kamu berhasil diverifikasi oleh Budi (Atasan).",
    time: "2 jam lalu",
    date: "today",
    href: "/kpi/1",
    isActionable: false,
    unread: true,
  },
  {
    id: 4,
    type: "deadline_reminder",
    domain: "progress",
    title: "Deadline Update KPI — H-3",
    desc: "Kamu memiliki 3 KPI yang belum diupdate. Deadline update realisasi: 30 Jun 2026.",
    time: "Pagi ini",
    date: "today",
    href: "/kpi",
    isActionable: true,
    unread: true,
  },
  {
    id: 5,
    type: "kpi_approved",
    domain: "authoring",
    title: "KPI Disetujui",
    desc: "KPI 'Efisiensi Operasional' yang kamu ajukan sudah disetujui oleh Rina (Atasan).",
    time: "Kemarin, 15:30",
    date: "yesterday",
    href: "/kpi/3",
    isActionable: false,
    unread: false,
  },
  {
    id: 6,
    type: "ready_for_closing",
    domain: "progress",
    title: "KPI Siap Ditutup",
    desc: "KPI milik Deni A. 'Pengembangan Kompetensi Tim' sudah siap untuk End-Approval.",
    time: "Kemarin, 09:00",
    date: "yesterday",
    href: "/approval",
    isActionable: true,
    unread: false,
  },
  {
    id: 7,
    type: "governance_warning",
    domain: "authoring",
    title: "KPI Belum Lengkap",
    desc: "KPI 'Customer Satisfaction' tidak memiliki data realisasi untuk bulan Mei 2026.",
    time: "Kemarin, 08:00",
    date: "yesterday",
    href: "/kpi/2",
    isActionable: false,
    unread: false,
  },
  {
    id: 8,
    type: "kpi_rejected",
    domain: "authoring",
    title: "KPI Ditolak",
    desc: "KPI 'Tingkat Retensi Karyawan' ditolak oleh Rina. Lihat catatan dan perbaiki.",
    time: "2 hari lalu",
    date: "older",
    href: "/kpi/3",
    isActionable: false,
    unread: false,
  },
  {
    id: 9,
    type: "kpi_finalized",
    domain: "progress",
    title: "KPI Sudah Ditutup",
    desc: "KPI 'Target Revenue' periode 2025 telah difinalisasi. Skor akhir: 85/100.",
    time: "3 hari lalu",
    date: "older",
    href: "/kpi/1",
    isActionable: false,
    unread: false,
  },
  {
    id: 10,
    type: "overdue",
    domain: "progress",
    title: "Overdue — KPI Belum Diverifikasi",
    desc: "KPI 'Efisiensi Operasional' belum diverifikasi saat periode penutupan berlangsung.",
    time: "4 hari lalu",
    date: "older",
    href: "/verifikasi",
    isActionable: false,
    unread: false,
  },
]

const TYPE_CONFIG: Record<NotifType, {
  icon: React.ElementType
  iconColor: string
  iconBg: string
}> = {
  kpi_submitted:            { icon: ThumbsUp,      iconColor: "text-amber-600",  iconBg: "bg-amber-50"  },
  kpi_approved:             { icon: CheckCircle2,  iconColor: "text-green-600",  iconBg: "bg-green-50"  },
  kpi_rejected:             { icon: XCircle,       iconColor: "text-red-500",    iconBg: "bg-red-50"    },
  verification_requested:   { icon: ShieldCheck,   iconColor: "text-violet-600", iconBg: "bg-violet-50" },
  kpi_verified:             { icon: ShieldCheck,   iconColor: "text-green-600",  iconBg: "bg-green-50"  },
  verification_rejected:    { icon: XCircle,       iconColor: "text-red-500",    iconBg: "bg-red-50"    },
  ready_for_closing:        { icon: Trophy,        iconColor: "text-blue-600",   iconBg: "bg-blue-50"   },
  kpi_finalized:            { icon: Trophy,        iconColor: "text-green-600",  iconBg: "bg-green-50"  },
  closing_rejected:         { icon: XCircle,       iconColor: "text-red-500",    iconBg: "bg-red-50"    },
  deadline_reminder:        { icon: Clock,         iconColor: "text-amber-600",  iconBg: "bg-amber-50"  },
  governance_warning:       { icon: AlertTriangle, iconColor: "text-orange-500", iconBg: "bg-orange-50" },
  overdue:                  { icon: AlertTriangle, iconColor: "text-red-500",    iconBg: "bg-red-50"    },
}

const DOMAIN_BADGE: Record<Domain, { label: string; cls: string }> = {
  authoring:    { label: "KPI Authoring", cls: "bg-blue-50 text-blue-700 border-blue-200"     },
  verification: { label: "Verifikasi",    cls: "bg-violet-50 text-violet-700 border-violet-200" },
  progress:     { label: "Progress",      cls: "bg-green-50 text-green-700 border-green-200"   },
  account:      { label: "Akun",          cls: "bg-zinc-100 text-zinc-600 border-zinc-200"     },
}

const FILTERS: { key: Category; label: string }[] = [
  { key: "all",        label: "Semua"      },
  { key: "actionable", label: "Perlu Aksi" },
  { key: "reminder",   label: "Reminder"   },
  { key: "warning",    label: "Warning"    },
]

function matchFilter(n: Notif, cat: Category) {
  if (cat === "all") return true
  if (cat === "actionable") return n.isActionable
  if (cat === "reminder") return n.type === "deadline_reminder"
  if (cat === "warning") return n.type === "governance_warning" || n.type === "overdue"
  return false
}

const DATE_LABELS = { today: "Hari ini", yesterday: "Kemarin", older: "Sebelumnya" }

export default function NotifikasiPage() {
  const [filter, setFilter] = useState<Category>("all")
  const [notifs, setNotifs] = useState(ALL_NOTIFS)

  const filtered = notifs.filter((n) => matchFilter(n, filter))
  const unreadCount = notifs.filter((n) => n.unread).length

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n))
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const groups = (["today", "yesterday", "older"] as const).map((date) => ({
    date,
    items: filtered.filter((n) => n.date === date),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar
        title="Notifikasi"
        backHref="/"
        right={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-medium text-[#1a5c35] bg-green-50 border border-green-200 rounded-lg px-2.5 py-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Baca semua
            </button>
          ) : undefined
        }
      />

      {/* Filter tabs */}
      <div className="sticky top-[57px] z-30 bg-[#f5f5f0] border-b border-zinc-200 px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const count = f.key === "all"
              ? notifs.filter((n) => n.unread).length
              : notifs.filter((n) => matchFilter(n, f.key) && n.unread).length
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filter === f.key
                    ? "bg-[#1e1e30] text-white"
                    : "bg-white text-zinc-600 border border-zinc-200"
                }`}
              >
                {f.label}
                {count > 0 && (
                  <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                    filter === f.key ? "bg-[#4ecb71] text-[#1a5c35]" : "bg-zinc-200 text-zinc-600"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-28">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
              <Bell className="w-8 h-8 text-zinc-300" />
            </div>
            <p className="text-sm font-semibold text-zinc-500">Tidak ada notifikasi</p>
            <p className="text-xs text-zinc-400">Notifikasi baru akan muncul di sini</p>
          </div>
        ) : (
          groups.map(({ date, items }) => (
            <div key={date}>
              {/* Date group header */}
              <div className="px-4 pt-4 pb-1.5">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                  {DATE_LABELS[date]}
                </p>
              </div>

              <div className="px-4 space-y-2 pb-1">
                {items.map((n) => {
                  const cfg = TYPE_CONFIG[n.type]
                  const Icon = cfg.icon
                  const domain = DOMAIN_BADGE[n.domain]

                  return (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => markRead(n.id)}
                      className={`flex items-start gap-3 rounded-2xl p-3.5 transition-all active:scale-[0.98] ${
                        n.unread
                          ? "bg-white shadow-sm border border-zinc-100"
                          : "bg-zinc-50/80"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-sm leading-tight ${n.unread ? "font-semibold text-zinc-800" : "font-medium text-zinc-600"}`}>
                            {n.title}
                          </p>
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-[#4ecb71] shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed mb-2">{n.desc}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${domain.cls}`}>
                            {domain.label}
                          </span>
                          {n.isActionable && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                              Perlu Aksi
                            </span>
                          )}
                          <span className="text-[10px] text-zinc-400 ml-auto">{n.time}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))
        )}

        {/* Footer note */}
        {groups.length > 0 && (
          <p className="text-center text-[10px] text-zinc-300 py-6 px-4">
            Menampilkan maks. 100 notifikasi terbaru · Tersimpan 12 bulan
          </p>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
