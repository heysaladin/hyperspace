import { Lock } from "lucide-react"
import { TopBar } from "@/components/top-bar"
import { Kepi } from "@/components/kepi"

const XP_CURRENT = 2150
const XP_MAX = 3000
const XP_PCT = Math.round((XP_CURRENT / XP_MAX) * 100)

const earned = [
  { id: 1, emoji: "🎯", name: "First KPI", desc: "KPI pertamamu berhasil diapprove", date: "Jan 2026" },
  { id: 2, emoji: "🔥", name: "On Fire", desc: "3 bulan berturut-turut capai >100%", date: "Mar 2026" },
  { id: 3, emoji: "⚡", name: "Speed Runner", desc: "Update KPI dalam 24 jam setelah periode buka", date: "Jun 2026" },
]

const locked = [
  { id: 4, emoji: "💎", name: "Perfect Score", desc: "Raih total KPI score 100", hint: "Skor kamu: 78.5/100" },
  { id: 5, emoji: "🏆", name: "KPI Champion", desc: "Capai top 3 leaderboard perusahaan", hint: "Posisi kamu: #5" },
  { id: 6, emoji: "📅", name: "Consistent", desc: "Update KPI 6 bulan berturut-turut", hint: "Streak kamu: 3 bulan" },
  { id: 7, emoji: "🤝", name: "Team Player", desc: "5 KPI tim berhasil diverifikasi olehmu", hint: "Progres: 2/5" },
]

export default function BadgesPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Pencapaian" backHref="/" />

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-10 space-y-5">

        {/* Kepi celebrate + summary */}
        <div className="flex flex-col items-center gap-3">
          <Kepi variant="celebrate" size={120} />
          <p className="text-base font-bold text-zinc-800">Kamu sudah dapat 3 badge!</p>
        </div>

        {/* XP / Level card */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#1e1e30] text-white px-3 py-1.5 rounded-xl shrink-0">
              <span className="text-base">⭐</span>
              <span className="text-xs font-bold">Level 7</span>
            </div>
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
        </div>

        {/* Earned badges */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Badge Diraih
          </h2>
          <div className="space-y-2">
            {earned.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-2xl border border-zinc-200 border-l-4 border-l-[#4ecb71] p-4 flex items-center gap-3"
              >
                <div className="text-3xl shrink-0">{badge.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-800">{badge.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{badge.desc}</p>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0">{badge.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Locked badges */}
        <section>
          <h2 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Badge Belum Diraih
          </h2>
          <div className="space-y-2">
            {locked.map((badge) => (
              <div
                key={badge.id}
                className="bg-zinc-50 rounded-2xl border border-zinc-200 p-4 flex items-center gap-3"
              >
                <div className="relative shrink-0">
                  <span
                    className="text-3xl"
                    style={{ opacity: 0.4, filter: "grayscale(1)" }}
                  >
                    {badge.emoji}
                  </span>
                  <Lock className="absolute -bottom-1 -right-1 w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-400">{badge.name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{badge.desc}</p>
                  <p className="text-[10px] text-zinc-400 mt-1 font-medium">{badge.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
