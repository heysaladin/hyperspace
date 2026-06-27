"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Clock,
  ShieldCheck,
  ThumbsUp,
  Lock,
  ClipboardList,
  XCircle,
  Users,
  CheckSquare,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { TopBar } from "@/components/top-bar"
import { Kepi, kepiMoodForScore } from "@/components/kepi"

const kpiAlerts = [
  {
    label: "KPI belum di-update",
    count: 3,
    unit: "KPI",
    href: "/kpi",
    icon: Clock,
  },
  {
    label: "KPI belum diverifikasi",
    count: 2,
    unit: "KPI",
    href: "/kpi",
    icon: XCircle,
  },
  {
    label: "Task menunggu dikerjakan",
    count: 5,
    unit: "Task",
    href: "/task",
    icon: ClipboardList,
  },
]

const roleActions = [
  {
    label: "Perlu diverifikasi",
    sub: "Verifikator",
    count: 4,
    href: "/verifikasi",
    icon: ShieldCheck,
  },
  {
    label: "Perlu di-approve",
    sub: "Approver",
    count: 2,
    href: "/approval",
    icon: ThumbsUp,
  },
  {
    label: "Perlu di-tutup",
    sub: "End-Approval",
    count: 1,
    href: "/kpi?filter=close",
    icon: Lock,
  },
]

const quickAccess = [
  { label: "Team KPI", href: "/team-kpi", icon: Users },
  { label: "Approval", href: "/approval", icon: ThumbsUp },
  { label: "Verifikasi", href: "/verifikasi", icon: ShieldCheck },
  { label: "Task", href: "/task", icon: CheckSquare },
]

const motivationalMessages = [
  {
    emoji: "🚀",
    title: "Semangat, hampir sampai!",
    desc: "Skor KPI-mu sudah 78.5. Terus tingkatkan realisasi untuk mencapai target!",
  },
  {
    emoji: "⭐",
    title: "Kamu di jalur yang tepat!",
    desc: "Progress minggu ini meningkat 5 poin. Jangan berhenti sekarang!",
  },
  {
    emoji: "🏆",
    title: "Top performer bulan ini!",
    desc: "Kamu berada di peringkat #3 leaderboard perusahaan. Kejar posisi #1!",
  },
]

const XP_CURRENT = 2150
const XP_MAX = 3000
const XP_PCT = Math.round((XP_CURRENT / XP_MAX) * 100)

export default function HomePage() {
  const [bannerIdx, setBannerIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((i) => (i + 1) % motivationalMessages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const msg = motivationalMessages[bannerIdx]

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar title="Selamat Pagi 👋" />

      {/* Scroll area */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white border border-zinc-200">
            <CardContent className="p-4">
              <p className="text-[11px] text-zinc-500 mb-2 leading-tight">KPI Individu</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-zinc-800">78.5</span>
                <span className="text-xs text-zinc-400">/100</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-zinc-200">
            <CardContent className="p-4">
              <p className="text-[11px] text-zinc-500 mb-2 leading-tight">KPI Perusahaan</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-zinc-800">82.3</span>
                <span className="text-xs text-zinc-400">/100</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Poin & Level card */}
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {/* Level badge */}
              <div className="flex items-center gap-1.5 bg-[#1e1e30] text-white px-3 py-1.5 rounded-xl shrink-0">
                <span className="text-base">⭐</span>
                <span className="text-xs font-bold">Level 7</span>
              </div>

              {/* XP bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-zinc-500 font-medium">XP</span>
                  <span className="text-[11px] text-zinc-400 tabular-nums">
                    {XP_CURRENT.toLocaleString("id-ID")} / {XP_MAX.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#4ecb71] transition-all"
                    style={{ width: `${XP_PCT}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak card */}
        <Link href="/badges">
          <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
            <CardContent className="p-4 flex items-center gap-3">
              <Kepi variant="streak3" size={56} />
              <div className="flex-1">
                <p className="text-sm font-bold text-zinc-800">3 Bulan Streak! 🔥</p>
                <p className="text-xs text-zinc-500 mt-0.5">Update KPI konsisten 3 bulan berturut-turut</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-semibold text-[#1a5c35] bg-green-50 border border-green-200 px-2 py-0.5 rounded-lg">3 Badge</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Kepi motivational banner */}
        <div className="bg-[#1e1e30] text-white rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-end gap-3">
            {/* Kepi with mood based on score */}
            <Kepi variant={kepiMoodForScore(78.5)} size={72} className="-mb-1" />
            <div className="flex-1 min-w-0 pb-1">
              <p className="font-bold text-sm leading-tight">{msg.title}</p>
              <p className="text-xs text-white/70 mt-1 leading-snug">{msg.desc}</p>
            </div>
          </div>
          {/* Carousel dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {motivationalMessages.map((_, i) => (
              <button key={i} onClick={() => setBannerIdx(i)}
                className={`rounded-full transition-all ${i === bannerIdx ? "w-4 h-1.5 bg-[#4ecb71]" : "w-1.5 h-1.5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Perlu Tindakan */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Perlu Tindakan
          </h2>
          <div className="space-y-2">
            {kpiAlerts.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href}>
                  <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Icon className="w-5 h-5 text-zinc-500 shrink-0" />
                      <p className="text-[13px] font-medium text-zinc-700 flex-1 min-w-0">
                        {item.label}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="font-semibold text-xs px-2">
                          {item.count} {item.unit}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Peran Saya */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Peran Saya
          </h2>
          <div className="space-y-2">
            {roleActions.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href}>
                  <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Icon className="w-5 h-5 text-zinc-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-zinc-700">{item.label}</p>
                        <p className="text-[11px] text-zinc-400">{item.sub}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="font-semibold text-xs px-2">
                          {item.count}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Akses Cepat */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickAccess.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href}>
                  <Card className="bg-white border border-zinc-200 active:scale-[0.98] transition-transform">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-zinc-600" />
                      </div>
                      <p className="text-[12px] font-medium text-zinc-700 text-center">
                        {item.label}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
