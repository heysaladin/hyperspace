import Link from "next/link"
import { MoreHorizontal, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"

const kpiData: Record<string, {
  name: string
  description: string
  formatTarget: string
  targetPeriode: number | string
  targetBulanan: string
  bobot: number
  formula: string
  realisasi: number | string
  realisasiUnit: string
  target: number
  metode: string
  score: number
  trustStatus: "unverified" | "waiting" | "verified"
  verifikator: string
  catatan: { tag: string; isi: string }[]
  history: { type: string; desc: string; time: string }[]
}> = {
  "1": {
    name: "Pencapaian Target Revenue",
    description: "Mengukur pencapaian target pendapatan perusahaan dalam satu periode fiskal.",
    formatTarget: "Currency (Rp)",
    targetPeriode: 120_000_000,
    targetBulanan: "10.000.000/bulan",
    bobot: 30,
    formula: "Realisasi / Target × 100",
    realisasi: 102_000_000,
    realisasiUnit: "Rp",
    target: 120_000_000,
    metode: "Total kumulatif",
    score: 85,
    trustStatus: "verified",
    verifikator: "Budi (Atasan)",
    catatan: [
      { tag: "Temuan", isi: "Realisasi Q3 sempat turun karena kondisi pasar." },
      { tag: "Lain-lain", isi: "Perlu evaluasi strategi penjualan kuartal berikutnya." },
    ],
    history: [
      { type: "Update Realisasi", desc: "Rp 102.000.000", time: "12 Jun 2026" },
      { type: "Verified", desc: "Diverifikasi oleh Budi", time: "10 Jun 2026" },
      { type: "Update Realisasi", desc: "Rp 95.000.000", time: "5 Mei 2026" },
    ],
  },
  "2": {
    name: "Customer Satisfaction Score",
    description: "Skor kepuasan pelanggan diukur dari hasil survey berkala.",
    formatTarget: "Persentase (%)",
    targetPeriode: 90,
    targetBulanan: "-",
    bobot: 25,
    formula: "Standar: (Realisasi / Target) × 100",
    realisasi: 65,
    realisasiUnit: "%",
    target: 90,
    metode: "Rata-rata bulanan",
    score: 72,
    trustStatus: "waiting",
    verifikator: "Rina (Atasan)",
    catatan: [{ tag: "Komplain", isi: "Beberapa pelanggan mengeluhkan waktu respons." }],
    history: [
      { type: "Update Realisasi", desc: "65%", time: "3 Jun 2026" },
      { type: "Submitted", desc: "Menunggu verifikasi", time: "3 Jun 2026" },
    ],
  },
}

const trustConfig = {
  unverified: { label: "Unverified", color: "bg-zinc-200 text-zinc-600" },
  waiting: { label: "Waiting Verification", color: "bg-amber-100 text-amber-700" },
  verified: { label: "Verified", color: "bg-green-100 text-green-700" },
}

export default async function DetailKpiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const kpi = kpiData[id] ?? kpiData["1"]
  const trust = trustConfig[kpi.trustStatus]
  const progressPct = Math.round((Number(kpi.realisasi) / kpi.target) * 100)

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TopBar
        title="Detail KPI"
        backHref="/kpi"
        right={
          <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl">
            <MoreHorizontal className="w-5 h-5 text-zinc-600" />
          </Button>
        }
      />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-36 space-y-4">
        {/* KPI header */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[17px] font-bold leading-tight flex-1">{kpi.name}</h2>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${trust.color}`}>
            {trust.label}
          </span>
        </div>

        {/* Progress summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#52d68a] to-[#45c97e] text-[#1a5c35]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs opacity-70">Score KPI</p>
                <p className="text-3xl font-black">{kpi.score}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70">Progress</p>
                <p className="text-3xl font-black">{progressPct}%</p>
              </div>
            </div>
            <Progress value={progressPct} className="h-2.5 bg-[#1a5c35]/20 [&>div]:bg-[#1a5c35]" />
            <div className="flex justify-between text-xs opacity-70 mt-1.5">
              <span>
                {kpi.realisasiUnit === "Rp"
                  ? `Rp ${(Number(kpi.realisasi) / 1_000_000).toFixed(0)}jt`
                  : `${kpi.realisasi}${kpi.realisasiUnit}`}
              </span>
              <span>
                Target:{" "}
                {kpi.realisasiUnit === "Rp"
                  ? `Rp ${(kpi.target / 1_000_000).toFixed(0)}jt`
                  : `${kpi.target}${kpi.realisasiUnit}`}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Definisi */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            Definisi KPI
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-[11px] text-zinc-400 mb-1">
                  Deskripsi KPI
                  <Badge variant="outline" className="ml-2 text-[9px] px-1.5 py-0">✎ editable</Badge>
                </p>
                <p className="text-sm text-zinc-700 leading-relaxed">{kpi.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100">
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Format Target</p>
                  <p className="text-sm font-semibold">{kpi.formatTarget}</p>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Bobot</p>
                  <p className="text-sm font-semibold">{kpi.bobot}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Target Periode</p>
                  <p className="text-sm font-semibold">
                    {kpi.realisasiUnit === "Rp"
                      ? `Rp ${(Number(kpi.targetPeriode) / 1_000_000).toFixed(0)}jt`
                      : `${kpi.targetPeriode}${kpi.realisasiUnit}`}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Target Bulanan</p>
                  <p className="text-sm font-semibold">{kpi.targetBulanan}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-zinc-100">
                <p className="text-[11px] text-zinc-400 mb-0.5">Formula Perhitungan</p>
                <p className="text-sm font-mono bg-zinc-50 rounded-lg px-3 py-2">{kpi.formula}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Realisasi */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            Realisasi
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-[11px] text-zinc-400 mb-0.5">Realisasi Terbaru</p>
                <p className="text-lg font-bold">
                  {kpi.realisasiUnit === "Rp"
                    ? `Rp ${Number(kpi.realisasi).toLocaleString("id")}`
                    : `${kpi.realisasi} ${kpi.realisasiUnit}`}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100">
                <p className="text-[11px] text-zinc-400 mb-0.5">Metode Realisasi</p>
                <p className="text-sm font-semibold">{kpi.metode}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Evaluasi */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            Evaluasi
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Score KPI</p>
                  <p className="text-2xl font-black text-[#1a5c35]">{kpi.score} <span className="text-sm text-zinc-400 font-normal">/100</span></p>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 mb-0.5">Verifikator</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {kpi.trustStatus === "verified" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    <p className="text-sm font-semibold">{kpi.verifikator}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Catatan Verifikasi */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            Catatan Verifikasi
          </h3>
          <div className="space-y-2">
            {kpi.catatan.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl rounded-bl-sm shadow-sm p-3">
                <Badge
                  variant="outline"
                  className={`text-[10px] mb-2 ${
                    c.tag === "Komplain"
                      ? "border-red-300 text-red-600 bg-red-50"
                      : c.tag === "Temuan"
                      ? "border-amber-300 text-amber-600 bg-amber-50"
                      : "border-zinc-300 text-zinc-500"
                  }`}
                >
                  {c.tag}
                </Badge>
                <p className="text-sm text-zinc-700 leading-relaxed">{c.isi}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            History (Audit Trail)
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-0">
              {kpi.history.map((h, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#4ecb71] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{h.type}</p>
                      <p className="text-xs text-zinc-500">{h.desc}</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 shrink-0">{h.time}</span>
                  </div>
                  {i < kpi.history.length - 1 && <div className="h-px bg-zinc-100 ml-5" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Sticky footer actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 flex gap-3 z-40">
        <Link
          href={`/kpi/${id}/edit`}
          className="flex-1 h-12 rounded-xl font-semibold border border-zinc-300 bg-white flex items-center justify-center text-sm text-zinc-700 active:bg-zinc-50"
        >
          Edit Deskripsi
        </Link>
        <Link
          href={`/kpi/${id}/update`}
          className="flex-1 h-12 rounded-xl font-semibold bg-[#4ecb71] text-[#1a5c35] flex items-center justify-center text-sm active:bg-[#3ab862]"
        >
          Update Realisasi
        </Link>
      </div>

      <BottomNav />
    </div>
  )
}
