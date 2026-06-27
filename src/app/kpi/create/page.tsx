"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TopBar } from "@/components/top-bar"
import {
  ChevronDown,
  ChevronLeft,
  Plus,
  Trash2,
  Pencil,
  CheckSquare,
  Square,
  Upload,
  Download,
  FileText,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type FormatTarget =
  | "Rp"
  | "$"
  | "%"
  | "Angka"
  | "Tanggal"
  | "Bulan"
  | "Jam"
  | "Menit"
  | "Detik"
  | "Rasio"
  | "Teks"
  | ""

type FormulaType = "higher" | "lower" | "khusus" | ""

interface KondisiRow {
  kondisi: string
  nilai: string
}

interface DraftKpi {
  id: string
  nama: string
  deskripsi: string
  formatTarget: FormatTarget
  nilaiTarget: string
  hasBulanan: boolean
  bulananValues: Record<string, string>
  agregasi: "total" | "rata-rata"
  formula: FormulaType
  kondisiRows: KondisiRow[]
  verifikator: string
  bobot: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FORMAT_OPTIONS: { value: FormatTarget; label: string }[] = [
  { value: "Rp", label: "Rp (Rupiah)" },
  { value: "$", label: "$ (Dollar)" },
  { value: "%", label: "% (Persen)" },
  { value: "Angka", label: "Angka" },
  { value: "Tanggal", label: "Tanggal (DD/MM/YY)" },
  { value: "Bulan", label: "Bulan (MM/YY)" },
  { value: "Jam", label: "Jam" },
  { value: "Menit", label: "Menit" },
  { value: "Detik", label: "Detik" },
  { value: "Rasio", label: "Rasio" },
  { value: "Teks", label: "Teks" },
]

const SUPPORTS_BULANAN: FormatTarget[] = ["Rp", "$", "%", "Angka", "Jam", "Menit", "Detik"]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

const COMPANY_KPIS = [
  { id: "c1", label: "Revenue Perusahaan", target: "Rp 100M" },
  { id: "c2", label: "Customer Satisfaction", target: "90%" },
  { id: "c3", label: "Efisiensi Operasional", target: "85%" },
]

const SUPERVISOR_KPIS = [
  { id: "s1", label: "Target Penjualan Tim - Budi", target: "Rp 50M" },
  { id: "s2", label: "CSAT Score - Rina", target: "88%" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function NativeSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative mt-2">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm appearance-none text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4ecb71]/50"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
    </div>
  )
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e30] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 whitespace-nowrap">
      {message}
      <button onClick={onClose} className="text-zinc-400 hover:text-white text-lg leading-none">×</button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateKpiPage() {
  const router = useRouter()

  // Step: 0=landing, 1=pilih referensi, 2=isi detail, 3=draft list
  const [step, setStep] = useState(0)
  const [toast, setToast] = useState("")

  // Step 1
  const [selectedCompany, setSelectedCompany] = useState<string[]>([])
  const [selectedSupervisor, setSelectedSupervisor] = useState<string[]>([])

  // Step 2 form (one KPI at a time)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [nama, setNama] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [formatTarget, setFormatTarget] = useState<FormatTarget>("")
  const [nilaiTarget, setNilaiTarget] = useState("")
  const [hasBulanan, setHasBulanan] = useState(false)
  const [bulananValues, setBulananValues] = useState<Record<string, string>>({})
  const [agregasi, setAgregasi] = useState<"total" | "rata-rata">("total")
  const [formula, setFormula] = useState<FormulaType>("")
  const [kondisiRows, setKondisiRows] = useState<KondisiRow[]>([{ kondisi: "", nilai: "" }])
  const [verifikator, setVerifikator] = useState("")

  // Step 3
  const [drafts, setDrafts] = useState<DraftKpi[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ─── Helpers ─────────────────────────────────────────────────────────────

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  function toggleCompany(id: string) {
    setSelectedCompany((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function toggleSupervisor(id: string) {
    setSelectedSupervisor((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function resetForm() {
    setEditingId(null)
    setNama("")
    setDeskripsi("")
    setFormatTarget("")
    setNilaiTarget("")
    setHasBulanan(false)
    setBulananValues({})
    setAgregasi("total")
    setFormula("")
    setKondisiRows([{ kondisi: "", nilai: "" }])
    setVerifikator("")
  }

  function loadDraftToForm(draft: DraftKpi) {
    setEditingId(draft.id)
    setNama(draft.nama)
    setDeskripsi(draft.deskripsi)
    setFormatTarget(draft.formatTarget)
    setNilaiTarget(draft.nilaiTarget)
    setHasBulanan(draft.hasBulanan)
    setBulananValues(draft.bulananValues)
    setAgregasi(draft.agregasi)
    setFormula(draft.formula)
    setKondisiRows(draft.kondisiRows.length > 0 ? draft.kondisiRows : [{ kondisi: "", nilai: "" }])
    setVerifikator(draft.verifikator)
    setStep(2)
  }

  function saveDraft() {
    if (!nama.trim() || !nilaiTarget.trim() || !formatTarget || !formula) return

    const draft: DraftKpi = {
      id: editingId ?? Date.now().toString(),
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      formatTarget,
      nilaiTarget: nilaiTarget.trim(),
      hasBulanan,
      bulananValues,
      agregasi,
      formula,
      kondisiRows,
      verifikator: verifikator.trim() || "Atasan",
      bobot: "",
    }

    if (editingId) {
      setDrafts((prev) => prev.map((d) => (d.id === editingId ? { ...draft, bobot: d.bobot } : d)))
    } else {
      setDrafts((prev) => [...prev, draft])
    }

    resetForm()
    setStep(3)
  }

  function deleteDraft(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id))
    setDeleteConfirm(null)
  }

  function updateBobot(id: string, val: string) {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, bobot: val } : d)))
  }

  const totalBobot = drafts.reduce((sum, d) => sum + (parseFloat(d.bobot) || 0), 0)
  const bobotOk = Math.abs(totalBobot - 100) < 0.01
  const canSubmit = drafts.length >= 2 && bobotOk

  // Bulanan computed
  const bulananTotal = Object.values(bulananValues).reduce((s, v) => s + (parseFloat(v) || 0), 0)
  const bulananCount = Object.values(bulananValues).filter((v) => v !== "").length
  const bulananAvg = bulananCount > 0 ? bulananTotal / bulananCount : 0

  // ─── Kondisi rows ─────────────────────────────────────────────────────────

  function addKondisi() {
    if (kondisiRows.length < 6) {
      setKondisiRows((prev) => [...prev, { kondisi: "", nilai: "" }])
    }
  }

  function removeKondisi(idx: number) {
    setKondisiRows((prev) => prev.filter((_, i) => i !== idx))
  }

  function updateKondisi(idx: number, field: "kondisi" | "nilai", val: string) {
    setKondisiRows((prev) => prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row)))
  }

  // ─── Step 2 validation ────────────────────────────────────────────────────
  const step2Valid =
    nama.trim().length >= 2 &&
    nilaiTarget.trim() !== "" &&
    formatTarget !== "" &&
    formula !== ""

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Buat KPI" backHref="/kpi" />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      {/* ── STEP 0: Landing ── */}
      {step === 0 && (
        <main className="flex-1 overflow-y-auto px-4 pt-6 pb-28">
          <p className="text-sm text-zinc-500 mb-6 text-center">Pilih cara membuat KPI kamu</p>
          <div className="space-y-3">
            {/* Option 1: Buat di aplikasi */}
            <button
              onClick={() => setStep(1)}
              className="w-full text-left bg-[#1e1e30] text-white rounded-2xl p-5 shadow-md active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4ecb71] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#1a5c35]" />
                </div>
                <div>
                  <p className="font-semibold text-base">Buat KPI di Aplikasi</p>
                  <p className="text-zinc-400 text-sm mt-1">Isi form langkah demi langkah secara mudah</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-[#4ecb71] text-sm font-semibold">
                Mulai sekarang →
              </div>
            </button>

            {/* Option 2: Upload KPI */}
            <button
              onClick={() => showToast("Segera hadir")}
              className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-zinc-200 active:bg-zinc-50 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-700">Upload KPI</p>
                  <p className="text-zinc-400 text-sm mt-1">Upload file Excel atau CSV berisi KPI kamu</p>
                  <Badge className="mt-2 bg-zinc-100 text-zinc-500 text-[10px] border-0">Segera Hadir</Badge>
                </div>
              </div>
            </button>

            {/* Option 3: Download Template */}
            <button
              onClick={() => showToast("Segera hadir")}
              className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-zinc-200 active:bg-zinc-50 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-700">Download Template</p>
                  <p className="text-zinc-400 text-sm mt-1">Unduh template Excel untuk diisi offline</p>
                  <Badge className="mt-2 bg-zinc-100 text-zinc-500 text-[10px] border-0">Segera Hadir</Badge>
                </div>
              </div>
            </button>
          </div>
        </main>
      )}

      {/* ── STEP 1: Pilih KPI Referensi ── */}
      {step === 1 && (
        <main className="flex-1 overflow-y-auto px-4 pt-5 pb-32 space-y-5">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= 1 ? "bg-[#4ecb71]" : "bg-zinc-200"}`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400 font-medium">Langkah 1 dari 3</p>

          <div className="bg-[#1e1e30] rounded-2xl p-4 text-white">
            <p className="text-sm leading-relaxed">
              Hai Adin, apakah ada KPI perusahaan atau KPI atasan yang relevan untukmu?
            </p>
          </div>

          {/* KPI Perusahaan */}
          <section>
            <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
              KPI Perusahaan
            </h3>
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-3 space-y-1">
                {COMPANY_KPIS.map((k) => {
                  const checked = selectedCompany.includes(k.id)
                  return (
                    <button
                      key={k.id}
                      onClick={() => toggleCompany(k.id)}
                      className="w-full flex items-center gap-3 py-3 px-2 rounded-xl active:bg-zinc-50 text-left"
                    >
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-[#4ecb71] shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-zinc-300 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-800">{k.label}</p>
                        <p className="text-xs text-zinc-400">Target: {k.target}</p>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          {/* KPI Atasan */}
          <section>
            <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
              KPI Atasan
            </h3>
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-3 space-y-1">
                {SUPERVISOR_KPIS.map((k) => {
                  const checked = selectedSupervisor.includes(k.id)
                  return (
                    <button
                      key={k.id}
                      onClick={() => toggleSupervisor(k.id)}
                      className="w-full flex items-center gap-3 py-3 px-2 rounded-xl active:bg-zinc-50 text-left"
                    >
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-[#4ecb71] shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-zinc-300 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-800">{k.label}</p>
                        <p className="text-xs text-zinc-400">Target: {k.target}</p>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>
        </main>
      )}

      {/* ── STEP 2: Isi Detail KPI ── */}
      {step === 2 && (
        <main className="flex-1 overflow-y-auto px-4 pt-5 pb-32 space-y-5">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= 2 ? "bg-[#4ecb71]" : "bg-zinc-200"}`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400 font-medium">Langkah 2 dari 3 — {editingId ? "Edit KPI" : "KPI Baru"}</p>

          {/* Nama KPI */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div>
                <Label htmlFor="nama" className="text-sm font-medium">
                  Nama KPI <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  placeholder="Contoh: Target Penjualan Q3"
                  value={nama}
                  maxLength={500}
                  onChange={(e) => setNama(e.target.value)}
                  className="mt-2 h-11 rounded-xl border-zinc-200"
                />
                <p className="text-[11px] text-zinc-400 mt-1">{nama.length}/500 karakter</p>
              </div>

              <div>
                <Label htmlFor="deskripsi" className="text-sm font-medium">
                  Deskripsi KPI{" "}
                  <span className="ml-1 text-[10px] text-zinc-400 font-normal">opsional</span>
                </Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Jelaskan tujuan dan konteks KPI ini…"
                  value={deskripsi}
                  maxLength={2000}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  className="mt-2 rounded-xl border-zinc-200 resize-none text-sm"
                />
                <p className="text-[11px] text-zinc-400 mt-1">{deskripsi.length}/2000</p>
              </div>
            </CardContent>
          </Card>

          {/* Target */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Format Target <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  value={formatTarget}
                  onChange={(v) => {
                    setFormatTarget(v as FormatTarget)
                    if (!SUPPORTS_BULANAN.includes(v as FormatTarget)) {
                      setHasBulanan(false)
                    }
                  }}
                  placeholder="Pilih format…"
                  options={FORMAT_OPTIONS}
                />
              </div>

              <div>
                <Label htmlFor="nilai-target" className="text-sm font-medium">
                  Nilai Target <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  {formatTarget && formatTarget !== "Angka" && formatTarget !== "Teks" && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
                      {formatTarget === "Tanggal" || formatTarget === "Bulan" ? "" : formatTarget}
                    </span>
                  )}
                  <Input
                    id="nilai-target"
                    type={
                      formatTarget === "Teks"
                        ? "text"
                        : formatTarget === "Tanggal"
                        ? "text"
                        : formatTarget === "Bulan"
                        ? "text"
                        : "number"
                    }
                    placeholder={
                      formatTarget === "Tanggal"
                        ? "DD/MM/YY"
                        : formatTarget === "Bulan"
                        ? "MM/YY"
                        : formatTarget === "Teks"
                        ? "Teks target…"
                        : "0"
                    }
                    value={nilaiTarget}
                    onChange={(e) => setNilaiTarget(e.target.value)}
                    className={`h-11 rounded-xl border-zinc-200 ${
                      formatTarget && formatTarget !== "Angka" && formatTarget !== "Teks" && formatTarget !== "Tanggal" && formatTarget !== "Bulan"
                        ? "pl-10"
                        : ""
                    }`}
                  />
                </div>
              </div>

              {/* Target Bulanan */}
              {SUPPORTS_BULANAN.includes(formatTarget as FormatTarget) && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Target Bulanan?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {([true, false] as const).map((v) => (
                      <button
                        key={String(v)}
                        onClick={() => setHasBulanan(v)}
                        className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          hasBulanan === v
                            ? "bg-[#1e1e30] text-white"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {v ? "Ya" : "Tidak"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly inputs */}
              {hasBulanan && (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-500 font-medium">Nilai target per bulan:</p>
                  <div className="space-y-2">
                    {MONTHS.map((m) => (
                      <div key={m} className="flex items-center gap-3">
                        <span className="w-10 text-sm text-zinc-500 font-medium shrink-0">{m}</span>
                        <Input
                          type="number"
                          placeholder="—"
                          value={bulananValues[m] ?? ""}
                          onChange={(e) =>
                            setBulananValues((prev) => ({ ...prev, [m]: e.target.value }))
                          }
                          className="h-9 rounded-xl border-zinc-200 flex-1 text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  {bulananCount > 0 && (
                    <div className="bg-zinc-50 rounded-xl p-3 space-y-1">
                      <p className="text-xs text-zinc-500">
                        Total: <span className="font-semibold text-zinc-700">{bulananTotal.toLocaleString()}</span>
                      </p>
                      <p className="text-xs text-zinc-500">
                        Rata-rata: <span className="font-semibold text-zinc-700">{bulananAvg.toFixed(2)}</span>
                      </p>
                    </div>
                  )}

                  {bulananCount > 0 && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-2 font-medium">Gunakan nilai mana sebagai target utama?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(["total", "rata-rata"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setAgregasi(v)}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                              agregasi === v
                                ? "bg-[#4ecb71] text-[#1a5c35]"
                                : "bg-zinc-100 text-zinc-500"
                            }`}
                          >
                            {v === "total" ? "Gunakan Total" : "Gunakan Rata-rata"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Formula */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm font-medium">
                Formula Perhitungan <span className="text-red-500">*</span>
              </Label>

              {/* Higher is better */}
              <button
                onClick={() => setFormula("higher")}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-colors ${
                  formula === "higher"
                    ? "border-[#4ecb71] bg-green-50"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-800">(Realisasi / Target) × 100%</p>
                <p className="text-xs text-zinc-500 mt-1">Digunakan jika nilai lebih tinggi = lebih baik</p>
              </button>

              {/* Lower is better */}
              <button
                onClick={() => setFormula("lower")}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-colors ${
                  formula === "lower"
                    ? "border-[#4ecb71] bg-green-50"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-800">
                  100% − ((Realisasi − Target) / Target × 100%)
                </p>
                <p className="text-xs text-zinc-500 mt-1">Digunakan jika nilai lebih rendah = lebih baik</p>
              </button>

              {/* Custom */}
              <button
                onClick={() => setFormula("khusus")}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-colors ${
                  formula === "khusus"
                    ? "border-[#4ecb71] bg-green-50"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <p className="text-sm font-semibold text-zinc-800">Formula Khusus</p>
                <p className="text-xs text-zinc-500 mt-1">Tentukan kondisi sendiri dengan nilai persentase</p>
              </button>

              {/* Custom condition rows */}
              {formula === "khusus" && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-zinc-500 font-medium">Kondisi (2–6 baris):</p>
                  {kondisiRows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        placeholder="Kondisi…"
                        value={row.kondisi}
                        onChange={(e) => updateKondisi(idx, "kondisi", e.target.value)}
                        className="flex-1 h-9 rounded-xl border-zinc-200 text-sm"
                      />
                      <span className="text-zinc-400 text-sm">=</span>
                      <Input
                        type="number"
                        placeholder="%"
                        value={row.nilai}
                        onChange={(e) => updateKondisi(idx, "nilai", e.target.value)}
                        className="w-20 h-9 rounded-xl border-zinc-200 text-sm"
                      />
                      {kondisiRows.length > 2 && (
                        <button
                          onClick={() => removeKondisi(idx)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {kondisiRows.length < 6 && (
                    <button
                      onClick={addKondisi}
                      className="flex items-center gap-1.5 text-[#4ecb71] text-sm font-semibold mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah kondisi
                    </button>
                  )}
                  {kondisiRows.length >= 6 && (
                    <p className="text-xs text-zinc-400">Maksimal 6 kondisi.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verifikator */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <Label htmlFor="verifikator" className="text-sm font-medium">Verifikator</Label>
              <Input
                id="verifikator"
                placeholder="Nama verifikator (default: Atasan)"
                value={verifikator}
                onChange={(e) => setVerifikator(e.target.value)}
                className="mt-2 h-11 rounded-xl border-zinc-200"
              />
              <p className="text-[11px] text-zinc-400 mt-1.5">Default: Atasan</p>
            </CardContent>
          </Card>
        </main>
      )}

      {/* ── STEP 3: Draft list & bobot ── */}
      {step === 3 && (
        <main className="flex-1 overflow-y-auto px-4 pt-5 pb-48 space-y-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= 3 ? "bg-[#4ecb71]" : "bg-zinc-200"}`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400 font-medium">Langkah 3 dari 3 — Review & Bobot</p>

          {drafts.length === 0 && (
            <div className="text-center py-16 text-zinc-400 text-sm">
              Belum ada KPI. Tambah KPI terlebih dahulu.
            </div>
          )}

          {drafts.map((d) => (
            <Card key={d.id} className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-800">{d.nama}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {d.formatTarget} · {d.nilaiTarget}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => loadDraftToForm(d)}
                      className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center active:bg-zinc-200"
                    >
                      <Pencil className="w-4 h-4 text-zinc-500" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(d.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center active:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-xs text-zinc-500 shrink-0">Bobot (%)</Label>
                  <Input
                    type="number"
                    min={10}
                    max={90}
                    placeholder="0"
                    value={d.bobot}
                    onChange={(e) => updateBobot(d.id, e.target.value)}
                    className="h-9 rounded-xl border-zinc-200 w-24 text-sm"
                  />
                  <span className="text-xs text-zinc-400">10 – 90%</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Delete confirm */}
          {deleteConfirm && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
              <div className="w-full bg-white rounded-t-2xl p-5 space-y-4">
                <p className="text-sm font-semibold text-zinc-800">Hapus KPI ini?</p>
                <p className="text-sm text-zinc-500">Tindakan ini tidak bisa dibatalkan.</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-11 rounded-xl"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Batal
                  </Button>
                  <Button
                    className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => deleteDraft(deleteConfirm)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bobot progress */}
          {drafts.length > 0 && (
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700">Total Bobot</span>
                  <span
                    className={`text-sm font-bold ${
                      bobotOk
                        ? "text-[#1a5c35]"
                        : totalBobot > 100
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  >
                    {totalBobot}%
                  </span>
                </div>
                <Progress
                  value={Math.min(totalBobot, 100)}
                  className={`h-2 ${
                    bobotOk
                      ? "[&>div]:bg-[#4ecb71]"
                      : totalBobot > 100
                      ? "[&>div]:bg-red-500"
                      : "[&>div]:bg-amber-400"
                  }`}
                />
                <p
                  className={`text-xs ${
                    bobotOk
                      ? "text-[#1a5c35]"
                      : totalBobot > 100
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {bobotOk
                    ? "Total bobot sudah tepat 100%"
                    : totalBobot > 100
                    ? "Total bobot melebihi 100%. Kurangi bobot."
                    : "Harus tepat 100%"}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      )}

      {/* ── Bottom action bars ── */}

      {step === 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-zinc-200 text-zinc-600 font-semibold"
            onClick={() => {
              resetForm()
              setStep(2)
            }}
          >
            Lewati
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] text-base"
            onClick={() => {
              resetForm()
              setStep(2)
            }}
          >
            Lanjut →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40 flex gap-3">
          <Button
            variant="outline"
            className="h-12 px-4 rounded-xl border-zinc-200"
            onClick={() => {
              if (editingId) {
                setStep(3)
              } else {
                setStep(1)
              }
              resetForm()
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            disabled={!step2Valid}
            className="flex-1 h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] text-base disabled:opacity-40"
            onClick={saveDraft}
          >
            Simpan KPI
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-4 z-40 space-y-2">
          <Button
            variant="outline"
            disabled={drafts.length >= 8}
            className="w-full h-10 rounded-xl border-zinc-200 text-zinc-600 font-semibold text-sm disabled:opacity-40"
            onClick={() => {
              if (drafts.length >= 8) {
                showToast("Maksimal 8 KPI per periode")
                return
              }
              resetForm()
              setStep(2)
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah KPI Lagi
            {drafts.length >= 8 && <span className="ml-2 text-xs text-zinc-400">(maks. 8)</span>}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-zinc-300 text-zinc-700 font-semibold"
              onClick={() => router.push("/kpi")}
            >
              Simpan Draft
            </Button>
            <div className="flex-1 relative">
              <Button
                disabled={!canSubmit}
                className="w-full h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] text-sm disabled:opacity-40"
                onClick={() => router.push("/kpi")}
              >
                Simpan & Minta Persetujuan
              </Button>
              {!canSubmit && (
                <p className="text-[10px] text-zinc-400 text-center mt-1">
                  {drafts.length < 2
                    ? "Minimal 2 KPI"
                    : "Total bobot harus 100%"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
