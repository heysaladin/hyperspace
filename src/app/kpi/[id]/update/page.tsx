"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TopBar } from "@/components/top-bar"
import { use } from "react"
import { AlertTriangle } from "lucide-react"

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

// Months considered "previous" (before current month) — simulate June as current
const previousMonths = ["Jan", "Feb", "Mar", "Apr", "Mei"]
const currentMonth = "Jun"

// Mock KPI data
const KPI_TARGET = 100_000_000 // Rp 100M

export default function UpdateRealisasiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [nilai, setNilai] = useState("")
  const [inputMethod, setInputMethod] = useState<"bulan-ini" | "akumulasi">("bulan-ini")
  const [bulanan, setBulanan] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      router.push(`/kpi/${id}`)
    }, 800)
  }

  // Progress calculation
  const nilaiNum = parseFloat(nilai) || 0
  const progress = KPI_TARGET > 0 ? (nilaiNum / KPI_TARGET) * 100 : 0
  const progressFormatted = progress.toFixed(1)

  // Check if previous months are empty
  const emptyPreviousMonths = previousMonths.filter((m) => !bulanan[m] || bulanan[m].trim() === "")
  const hasMissingMonths = emptyPreviousMonths.length > 0

  // Progress color
  function progressColor(p: number) {
    if (p >= 100) return "text-[#1a5c35]"
    if (p >= 75) return "text-blue-600"
    if (p >= 50) return "text-amber-600"
    return "text-red-500"
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Update Realisasi" backHref={`/kpi/${id}`} />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-4">
        {/* KPI info */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-[11px] text-zinc-400 mb-0.5">KPI</p>
            <p className="text-sm font-semibold">Pencapaian Target Revenue</p>
            <p className="text-xs text-zinc-400 mt-1">Target: Rp 100.000.000 · Periode 2026</p>
          </CardContent>
        </Card>

        {/* Method selection */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Cara Input Realisasi Bulan Ini
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setInputMethod("bulan-ini")}
              className={`text-left p-3.5 rounded-xl border-2 transition-colors ${
                inputMethod === "bulan-ini"
                  ? "border-[#1e1e30] bg-[#1e1e30] text-white"
                  : "border-zinc-200 bg-white text-zinc-700"
              }`}
            >
              <p className="text-sm font-semibold">Realisasi di bulan ini saja</p>
              <p className={`text-xs mt-0.5 ${inputMethod === "bulan-ini" ? "text-zinc-400" : "text-zinc-400"}`}>
                Pencapaian bulan berjalan saja
              </p>
            </button>
            <button
              onClick={() => setInputMethod("akumulasi")}
              className={`text-left p-3.5 rounded-xl border-2 transition-colors ${
                inputMethod === "akumulasi"
                  ? "border-[#1e1e30] bg-[#1e1e30] text-white"
                  : "border-zinc-200 bg-white text-zinc-700"
              }`}
            >
              <p className="text-sm font-semibold">Akumulasi hingga bulan ini</p>
              <p className="text-xs mt-0.5 text-zinc-400">
                Sudah dijumlahkan dari awal periode
              </p>
            </button>
          </div>
        </section>

        {/* Input realisasi */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Input Realisasi
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-3">
              <div>
                <Label htmlFor="nilai" className="text-sm font-medium">
                  Nilai Realisasi <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
                    Rp
                  </span>
                  <Input
                    id="nilai"
                    type="number"
                    placeholder="0"
                    value={nilai}
                    onChange={(e) => setNilai(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-zinc-200 text-base font-semibold"
                  />
                </div>
              </div>

              {/* Progress preview */}
              {nilai !== "" && nilaiNum > 0 && (
                <div className={`rounded-xl p-3 border ${progress > 200 ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
                  <p className={`text-sm font-semibold ${progress > 200 ? "text-amber-700" : progressColor(progress)}`}>
                    Estimasi progress: {progressFormatted}%
                  </p>
                  {progress > 200 && (
                    <p className="text-xs text-amber-600 mt-1 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      Progress mencapai {'>'}200%. Pastikan data realisasi sudah benar.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Missing months warning */}
        {hasMissingMonths && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-sm text-amber-700">
              ⚠️ Bulan {emptyPreviousMonths[0]} –{" "}
              {emptyPreviousMonths[emptyPreviousMonths.length - 1]} belum diisi. Lengkapi terlebih dahulu.
            </p>
            <button className="text-xs text-amber-600 underline mt-1">Isi sekarang →</button>
          </div>
        )}

        {/* Target bulanan */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Realisasi Per Bulan
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-3">
              {months.map((m) => {
                const isCurrent = m === currentMonth
                const isPrevious = previousMonths.includes(m)
                const isEmpty = !bulanan[m] || bulanan[m].trim() === ""
                return (
                  <div key={m} className="flex items-center gap-3">
                    <span
                      className={`w-10 text-sm font-medium shrink-0 ${
                        isCurrent ? "text-[#1a5c35] font-bold" : "text-zinc-500"
                      }`}
                    >
                      {m}
                    </span>
                    <Input
                      type="number"
                      placeholder="—"
                      value={bulanan[m] ?? ""}
                      onChange={(e) =>
                        setBulanan((prev) => ({ ...prev, [m]: e.target.value }))
                      }
                      className={`h-10 rounded-xl flex-1 ${
                        isPrevious && isEmpty
                          ? "border-amber-300 bg-amber-50"
                          : "border-zinc-200"
                      }`}
                    />
                    {isCurrent && (
                      <span className="text-[10px] text-[#1a5c35] font-semibold shrink-0">Bulan ini</span>
                    )}
                    {isPrevious && isEmpty && (
                      <span className="text-[10px] text-amber-500 shrink-0">Kosong</span>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>

        {/* Lampiran */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Lampiran / Bukti
          </h3>
          <button className="w-full h-24 rounded-2xl border-2 border-dashed border-zinc-300 bg-white flex flex-col items-center justify-center gap-2 text-zinc-400 active:bg-zinc-50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 16v-8m-4 4l4-4 4 4M6 20h12"
              />
            </svg>
            <span className="text-sm">Upload lampiran (opsional)</span>
          </button>
        </section>
      </main>

      {/* Save options */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40 space-y-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-12 rounded-xl font-semibold border-zinc-300 text-zinc-700"
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] text-sm"
          >
            {saving ? "Menyimpan…" : "Simpan & Minta Verifikasi"}
          </Button>
        </div>
        <button
          className="w-full text-center text-xs text-zinc-400 underline py-1"
          onClick={handleSave}
        >
          Minta End-Period Verifikasi
        </button>
      </div>
    </div>
  )
}
