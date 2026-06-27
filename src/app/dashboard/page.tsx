"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, ChevronRight, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { TopBar } from "@/components/top-bar"
import { Progress } from "@/components/ui/progress"

const kpiCards = [
  {
    id: "1",
    name: "Pencapaian Target Revenue",
    bobot: 30,
    score: 85,
    target: 120_000_000,
    realisasi: 102_000_000,
    unit: "Rp",
    trend: "up",
  },
  {
    id: "2",
    name: "Customer Satisfaction Score",
    bobot: 25,
    score: 72,
    target: 90,
    realisasi: 65,
    unit: "%",
    trend: "down",
  },
  {
    id: "3",
    name: "Tingkat Retensi Karyawan",
    bobot: 20,
    score: 91,
    target: 95,
    realisasi: 86,
    unit: "%",
    trend: "up",
  },
]

const leaderboard = [
  { rank: 1, name: "Budi Santoso", score: 98, initials: "BS" },
  { rank: 2, name: "Rina Marlina", score: 95, initials: "RM" },
  { rank: 3, name: "Deni Kurniawan", score: 90, initials: "DK" },
  { rank: 4, name: "Sari Wulandari", score: 87, initials: "SW" },
  { rank: 5, name: "Ahmad Rizky", score: 84, initials: "AR" },
]

const bannersByScore = [
  { max: 50, mascot: "😿", msg: "Yuk tingkatkan performa KPI-mu!", gradient: "from-orange-500 to-red-500" },
  { max: 80, mascot: "😺", msg: "Terus semangat, target semakin dekat!", gradient: "from-blue-500 to-indigo-600" },
  { max: 100, mascot: "😸", msg: "Hampir sempurna! Pertahankan!", gradient: "from-emerald-500 to-green-600" },
  { max: 200, mascot: "🏆", msg: "Luar biasa! Kamu melampaui target!", gradient: "from-purple-500 to-pink-500" },
]

export default function DashboardPage() {
  const [segType, setSegType] = useState<"individu" | "perusahaan">("individu")
  const [segPeriod, setSegPeriod] = useState<"tahunan" | "bulanan">("tahunan")

  const avgScore = Math.round(kpiCards.reduce((a, k) => a + k.score, 0) / kpiCards.length)
  const banner = bannersByScore.find((b) => avgScore < b.max)!

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar title="Dashboard" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-5">
        {/* Segment type */}
        <div className="grid grid-cols-2 gap-2">
          {(["individu", "perusahaan"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSegType(s)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${
                segType === s
                  ? "bg-[#1e1e30] text-white"
                  : "bg-white text-zinc-500 border border-zinc-200"
              }`}
            >
              {s === "individu" ? "Individu" : "Perusahaan"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(["tahunan", "bulanan"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSegPeriod(s)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${
                segPeriod === s
                  ? "bg-[#4ecb71] text-white"
                  : "bg-white text-zinc-500 border border-zinc-200"
              }`}
            >
              {s === "tahunan" ? "Tahunan" : "Bulanan"}
            </button>
          ))}
        </div>

        {/* Dynamic banner */}
        <div className={`rounded-2xl bg-gradient-to-br ${banner.gradient} p-4 text-white flex items-center gap-3`}>
          <span className="text-4xl">{banner.mascot}</span>
          <div>
            <p className="text-xs text-white/70 mb-0.5">Rata-rata KPI {segType}</p>
            <p className="font-bold text-sm">{banner.msg}</p>
          </div>
          <div className="ml-auto text-right shrink-0">
            <p className="text-2xl font-black">{avgScore}</p>
            <p className="text-xs text-white/70">/100</p>
          </div>
        </div>

        {/* Fun viz total */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Progress KPI Keseluruhan</p>
              <span className="text-xs text-zinc-400">{avgScore}/100</span>
            </div>
            <div className="space-y-2">
              <Progress value={avgScore} className="h-3 rounded-full" />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>0</span>
                <span className="text-[#4ecb71] font-bold">{avgScore}% tercapai</span>
                <span>100</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {["🥉 Bronze", "🥈 Silver", "🥇 Gold"].map((tier, i) => (
                <div
                  key={tier}
                  className={`py-2 rounded-xl text-[11px] font-medium ${
                    i === 0 ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  {tier}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            KPI Cards
          </h2>
          <div className="space-y-3">
            {kpiCards.map((kpi) => (
              <Link key={kpi.id} href={`/kpi/${kpi.id}`}>
                <Card className="border-0 shadow-sm bg-white active:scale-[0.98] transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-[13px] font-semibold leading-tight flex-1">{kpi.name}</p>
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        Bobot {kpi.bobot}%
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-zinc-400">Score</p>
                        <p className="text-xl font-black text-[#1a5c35]">{kpi.score}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-zinc-400">Realisasi</p>
                        <p className="text-sm font-semibold">
                          {kpi.unit === "Rp"
                            ? `Rp ${(kpi.realisasi / 1_000_000).toFixed(0)}jt`
                            : `${kpi.realisasi}${kpi.unit}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-zinc-400">Target</p>
                        <p className="text-sm font-semibold text-zinc-400">
                          {kpi.unit === "Rp"
                            ? `Rp ${(kpi.target / 1_000_000).toFixed(0)}jt`
                            : `${kpi.target}${kpi.unit}`}
                        </p>
                      </div>
                    </div>

                    <Progress value={(kpi.realisasi / kpi.target) * 100} className="h-2" />

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-zinc-400">
                        {Math.round((kpi.realisasi / kpi.target) * 100)}% dari target
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide">
              Leaderboard — Top 5
            </h2>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-0">
              {leaderboard.map((person, i) => (
                <div key={person.rank}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span
                      className={`w-7 text-sm font-bold text-center ${
                        i === 0 ? "text-amber-500" : i === 1 ? "text-zinc-400" : i === 2 ? "text-amber-700" : "text-zinc-400"
                      }`}
                    >
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${person.rank}`}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1e1e30] flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white">{person.initials}</span>
                    </div>
                    <span className="flex-1 text-sm font-medium">{person.name}</span>
                    <Badge
                      className={`font-bold ${
                        i === 0 ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"
                      }`}
                      variant="secondary"
                    >
                      {person.score}
                    </Badge>
                  </div>
                  {i < leaderboard.length - 1 && <div className="h-px bg-zinc-100 mx-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
