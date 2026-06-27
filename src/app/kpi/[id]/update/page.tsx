"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TopBar } from "@/components/top-bar"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
const CURRENT_MONTH_IDX = 5 // Juni

type MonthlyKpi = {
  name: string
  unit: "Rp" | string
  hasMonthlyTarget: true
  targetBulanan: number
  wasVerified: boolean
  realisasiBulanan: Partial<Record<string, number>>
}
type SimpleKpi = {
  name: string
  unit: "Rp" | string
  hasMonthlyTarget: false
  targetPeriode: number
  wasVerified: boolean
  realisasi: number
}
type KpiMock = MonthlyKpi | SimpleKpi

const KPI_MOCK: Record<string, KpiMock> = {
  "1": {
    name: "Pencapaian Target Revenue",
    unit: "Rp",
    hasMonthlyTarget: true,
    targetBulanan: 10_000_000,
    wasVerified: true,
    realisasiBulanan: {
      Jan: 9_500_000,
      Feb: 11_000_000,
      // Mar kosong (warning)
      // Apr kosong (warning)
      Mei: 8_700_000,
      // Jun belum diisi — bulan berjalan
    },
  },
  "2": {
    name: "Customer Satisfaction Score",
    unit: "%",
    hasMonthlyTarget: false,
    targetPeriode: 90,
    wasVerified: false,
    realisasi: 65,
  },
}

function formatVal(val: number, unit: string) {
  if (unit === "Rp") return `Rp ${val.toLocaleString("id")}`
  return `${val} ${unit}`
}

function scoreColor(pct: number) {
  if (pct >= 100) return "text-green-700"
  if (pct >= 75) return "text-blue-600"
  if (pct >= 50) return "text-amber-600"
  return "text-red-500"
}

// ─── Monthly update view ───────────────────────────────────────────────────

function MonthlyUpdate({ kpi, id }: { kpi: MonthlyKpi; id: string }) {
  const router = useRouter()

  const initValues: Record<string, string> = {}
  MONTHS.forEach((m) => {
    const v = kpi.realisasiBulanan[m]
    initValues[m] = v !== undefined ? String(v) : ""
  })
  const [values, setValues] = useState(initValues)
  const [saving, setSaving] = useState(false)

  const missingPast = MONTHS.slice(0, CURRENT_MONTH_IDX).filter((m) => !values[m]?.trim())

  const totalFilled = MONTHS.slice(0, CURRENT_MONTH_IDX + 1)
    .filter((m) => values[m]?.trim())
    .reduce((sum, m) => sum + (parseFloat(values[m]) || 0), 0)

  const totalTarget = kpi.targetBulanan * (CURRENT_MONTH_IDX + 1)
  const pct = totalTarget > 0 ? (totalFilled / totalTarget) * 100 : 0

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => router.push(`/kpi/${id}`), 700)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Update Realisasi" backHref={`/kpi/${id}`} />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-4">
        {/* KPI info */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-zinc-400 mb-0.5">KPI · Bulanan</p>
              <p className="text-sm font-semibold">{kpi.name}</p>
              <p className="text-xs text-zinc-400 mt-1">
                Target {formatVal(kpi.targetBulanan, kpi.unit)}/bulan
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-zinc-400">Estimasi skor</p>
              <p className={`text-xl font-black ${scoreColor(pct)}`}>{pct.toFixed(0)}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Verified → Unverified notice */}
        {kpi.wasVerified && (
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
            <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              KPI ini sebelumnya sudah Verified. Menyimpan perubahan akan mereset status ke{" "}
              <span className="font-semibold">Unverified</span> otomatis.
            </p>
          </div>
        )}

        {/* Missing months warning — non-blocking */}
        {missingPast.length > 0 && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              {missingPast.length} bulan belum memiliki realisasi ({missingPast.join(", ")}). Bulan
              kosong tidak dihitung — bukan dianggap 0.
            </p>
          </div>
        )}

        {/* Month inputs */}
        <section>
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Realisasi Per Bulan
          </h3>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-2">
              {MONTHS.map((m, idx) => {
                const isPast = idx < CURRENT_MONTH_IDX
                const isCurrent = idx === CURRENT_MONTH_IDX
                const isFuture = idx > CURRENT_MONTH_IDX
                const isEmpty = !values[m]?.trim()
                const isEditable = isPast || isCurrent

                return (
                  <div key={m} className="flex items-center gap-3">
                    {/* Month label */}
                    <span
                      className={`w-9 text-sm font-medium shrink-0 ${
                        isCurrent ? "text-[#1a5c35] font-bold" : "text-zinc-500"
                      }`}
                    >
                      {m}
                    </span>

                    {/* Input */}
                    {isEditable ? (
                      <div className="relative flex-1">
                        {kpi.unit === "Rp" && (
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none">
                            Rp
                          </span>
                        )}
                        <Input
                          type="number"
                          placeholder="0"
                          value={values[m]}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [m]: e.target.value }))
                          }
                          className={`h-10 rounded-xl text-sm ${
                            kpi.unit === "Rp" ? "pl-8" : ""
                          } ${
                            isPast && isEmpty
                              ? "border-amber-300 bg-amber-50/60"
                              : isCurrent
                              ? "border-[#4ecb71] bg-green-50/30"
                              : "border-zinc-200"
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center px-3">
                        <span className="text-xs text-zinc-400">Belum waktunya</span>
                      </div>
                    )}

                    {/* Status badge */}
                    <div className="w-16 text-right shrink-0">
                      {isCurrent && (
                        <span className="text-[10px] text-[#1a5c35] font-semibold bg-green-100 px-1.5 py-0.5 rounded-md">
                          Berjalan
                        </span>
                      )}
                      {isPast && !isEmpty && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                      {isPast && isEmpty && (
                        <span className="text-[10px] text-amber-500">Kosong</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40">
        <p className="text-[11px] text-zinc-400 text-center mb-2">
          Simpan = langsung aktif · Skor dihitung ulang otomatis
        </p>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35]"
        >
          {saving ? "Menyimpan…" : "Simpan Realisasi"}
        </Button>
      </div>
    </div>
  )
}

// ─── Simple (non-monthly) update view ─────────────────────────────────────

function SimpleUpdate({ kpi, id }: { kpi: SimpleKpi; id: string }) {
  const router = useRouter()
  const [nilai, setNilai] = useState(String(kpi.realisasi))
  const [saving, setSaving] = useState(false)

  const nilaiNum = parseFloat(nilai) || 0
  const pct = kpi.targetPeriode > 0 ? (nilaiNum / kpi.targetPeriode) * 100 : 0
  const changed = nilaiNum !== kpi.realisasi

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => router.push(`/kpi/${id}`), 700)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Update Realisasi" backHref={`/kpi/${id}`} />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-4">
        {/* KPI info */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-[11px] text-zinc-400 mb-0.5">KPI</p>
            <p className="text-sm font-semibold">{kpi.name}</p>
            <p className="text-xs text-zinc-400 mt-1">
              Target: {formatVal(kpi.targetPeriode, kpi.unit)} · Periode 2026
            </p>
          </CardContent>
        </Card>

        {/* Verified notice */}
        {kpi.wasVerified && (
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
            <AlertTriangle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              KPI ini sebelumnya sudah Verified. Menyimpan perubahan akan mereset status ke{" "}
              <span className="font-semibold">Unverified</span> otomatis.
            </p>
          </div>
        )}

        {/* Current vs new */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 space-y-4">
            {/* Current value */}
            <div>
              <p className="text-[11px] text-zinc-400 mb-1">Nilai Realisasi Sekarang</p>
              <p className="text-lg font-bold text-zinc-700">
                {formatVal(kpi.realisasi, kpi.unit)}
              </p>
            </div>

            <div className="h-px bg-zinc-100" />

            {/* New value input */}
            <div>
              <p className="text-[11px] text-zinc-400 mb-2">
                Nilai Realisasi Baru <span className="text-red-500">*</span>
              </p>
              <div className="relative">
                {kpi.unit === "Rp" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
                    Rp
                  </span>
                )}
                <Input
                  type="number"
                  placeholder="0"
                  value={nilai}
                  onChange={(e) => setNilai(e.target.value)}
                  className={`h-12 rounded-xl text-base font-semibold ${
                    kpi.unit === "Rp" ? "pl-10" : ""
                  }`}
                />
              </div>
            </div>

            {/* Progress preview */}
            {nilaiNum > 0 && (
              <div
                className={`rounded-xl p-3 border ${
                  pct >= 100
                    ? "bg-green-50 border-green-200"
                    : pct >= 75
                    ? "bg-blue-50 border-blue-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm font-bold ${scoreColor(pct)}`}>
                    Estimasi skor: {pct.toFixed(1)}%
                  </p>
                  {changed && (
                    <span className="text-[10px] text-zinc-400">
                      {kpi.realisasi < nilaiNum ? "▲" : "▼"}{" "}
                      {Math.abs(nilaiNum - kpi.realisasi).toLocaleString("id")} {kpi.unit !== "Rp" ? kpi.unit : ""}
                    </span>
                  )}
                </div>
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 100 ? "bg-green-500" : pct >= 75 ? "bg-blue-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>{formatVal(nilaiNum, kpi.unit)}</span>
                  <span>Target: {formatVal(kpi.targetPeriode, kpi.unit)}</span>
                </div>
                {pct > 200 && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Progress {pct.toFixed(0)}% — pastikan data sudah benar.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40">
        <p className="text-[11px] text-zinc-400 text-center mb-2">
          Simpan = langsung aktif · Nilai sebelumnya digantikan
        </p>
        <Button
          onClick={handleSave}
          disabled={saving || !nilai.trim() || nilaiNum <= 0}
          className="w-full h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] disabled:opacity-40"
        >
          {saving ? "Menyimpan…" : "Simpan Realisasi"}
        </Button>
      </div>
    </div>
  )
}

// ─── Page router ──────────────────────────────────────────────────────────

export default function UpdateRealisasiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const kpi = KPI_MOCK[id] ?? KPI_MOCK["1"]

  if (kpi.hasMonthlyTarget) {
    return <MonthlyUpdate kpi={kpi} id={id} />
  }
  return <SimpleUpdate kpi={kpi} id={id} />
}
