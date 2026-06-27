"use client"

import Link from "next/link"
import { ChevronRight, Filter } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { TopBar } from "@/components/top-bar"
import { Kepi, kepiForProgress } from "@/components/kepi"

const kpiList = [
  { id: "1", name: "Revenue", emoji: "💰", bobot: 35, score: 89, target: "10.000.000.000", realisasi: "8.900.000.000", progress: 89 },
  { id: "2", name: "Profit", emoji: "💵", bobot: 30, score: 80, target: "2.500.000.000", realisasi: "2.000.000.000", progress: 80 },
  { id: "3", name: "Jumlah Customer", emoji: "👥", bobot: 20, score: 85, target: "5.000", realisasi: "4.250", progress: 85 },
  { id: "4", name: "Jumlah Toko Aktif", emoji: "🏪", bobot: 15, score: 84, target: "250", realisasi: "210", progress: 84 },
]

function CircleProgress({ value, size = 56 }: { value: number; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = Math.min(value / 100, 1) * circ
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8f5e9" strokeWidth="5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#4ecb71"
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function MyKpiPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="My KPI" />

      <main className="flex-1 overflow-y-auto pb-28">

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-[#2d8c4e] to-[#1e6e38] px-4 pt-5 pb-10 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-10 -translate-x-6" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            {/* Left: title */}
            <div className="flex-1">
              <p className="text-white text-2xl font-bold leading-tight">My KPI</p>
              <p className="text-white/80 text-xs mt-1">Kejar target, raih hasil terbaik! 🎯</p>
            </div>

            {/* Right: Level badge card */}
            <div className="bg-[#1e1e30]/80 backdrop-blur-sm rounded-2xl p-3 min-w-[130px] shrink-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-lg">⭐</span>
                <span className="text-white font-bold text-sm">Level 7</span>
              </div>
              <p className="text-white/60 text-[10px] mb-1.5">XP 2,150 / 3,000</p>
              {/* XP progress bar */}
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{ width: `${(2150 / 3000) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <Kepi variant={kepiForProgress(89)} size={90} className="absolute right-4 bottom-0" />
        </div>

        {/* Summary Card — overlaps banner */}
        <div className="px-4 -mt-4 relative z-20">
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
            {/* Left: Total Pencapaian */}
            <div className="flex-1">
              <p className="text-[11px] text-zinc-500 mb-0.5">Total Pencapaian</p>
              <p className="text-3xl font-bold text-[#4ecb71] leading-tight">89%</p>
              <span className="inline-flex items-center mt-1 bg-green-100 text-[#1a5c35] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Sangat Baik! 🔥
              </span>
            </div>

            {/* Middle: Realisasi */}
            <div className="border-l border-zinc-100 pl-3 flex-1">
              <p className="text-[10px] text-zinc-400 mb-0.5">Realisasi Total</p>
              <p className="text-base font-bold text-zinc-800">89 / 100</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Bobot Total</p>
            </div>

            {/* Right: Medal */}
            <div className="text-4xl shrink-0">🏅</div>
          </div>
        </div>

        {/* Filter + Section header */}
        <div className="px-4 pt-5 pb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-800">Daftar KPI 📋</p>
          <button className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl px-3 py-1.5 shadow-sm active:scale-95 transition-transform">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {/* KPI Cards */}
        <div className="px-4 space-y-3">
          {kpiList.map((kpi, idx) => (
            <Link key={kpi.id} href={`/kpi/${kpi.id}`}>
              <div className="bg-white rounded-2xl shadow-sm p-4 active:scale-[0.98] transition-transform">
                <div className="flex items-start gap-3">
                  {/* Number badge */}
                  <div className="w-6 h-6 rounded-lg bg-[#4ecb71] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[11px] font-bold">{idx + 1}</span>
                  </div>

                  {/* Emoji icon */}
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-xl">
                    {kpi.emoji}
                  </div>

                  {/* Middle: name + target/realisasi + progress */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-800 leading-tight truncate">{kpi.name}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Target: {kpi.target} &nbsp;|&nbsp; Realisasi: {kpi.realisasi}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-green-50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#4ecb71] transition-all"
                          style={{ width: `${kpi.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md shrink-0">
                        {kpi.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Right: circle progress + bobot badge */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="relative">
                      <CircleProgress value={kpi.progress} size={52} />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ transform: "rotate(0deg)" }}
                      >
                        <span className="text-[11px] font-bold text-zinc-700">{kpi.score}%</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                      Bobot {kpi.bobot}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Motivational footer banner */}
        <div className="mx-4 mt-5 bg-gradient-to-br from-[#2d8c4e] to-[#1e6e38] rounded-2xl p-4 flex items-center gap-3">
          <div className="text-3xl shrink-0">🏆</div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">Pertahankan momentum ini!</p>
            <p className="text-white/70 text-xs mt-0.5 leading-snug">
              Terus tingkatkan performa dan capai semua targetmu! 💪
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/60 shrink-0" />
        </div>

        {/* Bottom spacer for FAB */}
        <div className="h-4" />
      </main>

      {/* Floating Action Button */}
      <Link
        href="/kpi/create"
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-[#4ecb71] text-white font-semibold text-sm px-4 py-3 rounded-2xl shadow-lg shadow-green-500/30 active:scale-95 transition-transform"
      >
        <span className="text-base leading-none">+</span>
        Buat KPI
      </Link>

      <BottomNav />
    </div>
  )
}
