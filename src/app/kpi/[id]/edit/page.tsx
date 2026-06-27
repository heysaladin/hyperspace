"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TopBar } from "@/components/top-bar"
import { use } from "react"

export default function EditKpiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [desc, setDesc] = useState(
    "Mengukur pencapaian target pendapatan perusahaan dalam satu periode fiskal."
  )
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => router.push(`/kpi/${id}`), 800)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Edit KPI" backHref={`/kpi/${id}`} />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">
        {/* Info read-only */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 space-y-3">
            {[
              { label: "Nama KPI", value: "Pencapaian Target Revenue" },
              { label: "Format Target", value: "Currency (Rp)" },
              { label: "Target Periode", value: "Rp 120.000.000" },
              { label: "Bobot", value: "30%" },
              { label: "Formula", value: "Realisasi / Target × 100" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between items-center">
                <p className="text-[11px] text-zinc-400">{f.label}</p>
                <p className="text-sm font-medium text-zinc-600">{f.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-[12px] text-amber-700 font-medium">
            ℹ️ Hanya Deskripsi KPI yang dapat diedit. Perubahan ini tidak mempengaruhi target, bobot, atau formula.
          </p>
        </div>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <Label htmlFor="desc" className="text-sm font-medium">
              Deskripsi KPI
            </Label>
            <Textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              className="mt-2 rounded-xl border-zinc-200 resize-none text-sm leading-relaxed"
              placeholder="Tulis deskripsi KPI…"
            />
          </CardContent>
        </Card>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 flex gap-3 z-40">
        <Button
          variant="outline"
          className="flex-1 h-12 rounded-xl font-semibold"
          onClick={() => router.push(`/kpi/${id}`)}
        >
          Batal
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35]"
        >
          {saving ? "Menyimpan…" : "Simpan"}
        </Button>
      </div>
    </div>
  )
}
