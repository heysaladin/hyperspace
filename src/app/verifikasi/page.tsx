"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle } from "lucide-react"

type Status = "pending" | "verified" | "rejected"
type Category = "Komplain" | "Temuan" | "Lain-lain"

interface KpiVerifyItem {
  id: string
  kpiName: string
  owner: string
  dueDate: string
  progress: number
  status: Status
}

const initialItems: KpiVerifyItem[] = [
  {
    id: "1",
    kpiName: "Peningkatan Customer Satisfaction Score",
    owner: "Budi Santoso",
    dueDate: "30 Jun 2026",
    progress: 72,
    status: "pending",
  },
  {
    id: "2",
    kpiName: "Pengurangan Waktu Resolusi Tiket Support",
    owner: "Rina Maharani",
    dueDate: "28 Jun 2026",
    progress: 88,
    status: "pending",
  },
]

const CATEGORIES: Category[] = ["Komplain", "Temuan", "Lain-lain"]

function statusBadge(status: Status) {
  if (status === "verified") {
    return (
      <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
        Terverifikasi
      </Badge>
    )
  }
  if (status === "rejected") {
    return (
      <Badge className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-50">
        Ditolak
      </Badge>
    )
  }
  return (
    <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50">
      Perlu Verifikasi
    </Badge>
  )
}

interface InlineActionState {
  action: "verify" | "reject"
  category: Category | null
  komentar: string
}

export default function VerifikasiPage() {
  const [items, setItems] = useState<KpiVerifyItem[]>(initialItems)
  // Map of item id → expanded inline action state
  const [expanded, setExpanded] = useState<Record<string, InlineActionState>>({})

  function openAction(id: string, action: "verify" | "reject") {
    setExpanded((prev) => ({
      ...prev,
      [id]: { action, category: null, komentar: "" },
    }))
  }

  function closeAction(id: string) {
    setExpanded((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function setCategory(id: string, cat: Category) {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], category: cat },
    }))
  }

  function setKomentar(id: string, val: string) {
    setExpanded((prev) => ({
      ...prev,
      [id]: { ...prev[id], komentar: val },
    }))
  }

  function confirmAction(id: string) {
    const state = expanded[id]
    if (!state) return

    const status: Status = state.action === "verify" ? "verified" : "rejected"

    // Reject requires komentar
    if (state.action === "reject" && !state.komentar.trim()) return

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    )
    closeAction(id)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Verifikasi KPI" backHref="/" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-4">
        {items.map((item) => {
          const state = expanded[item.id]
          const isExpanded = !!state

          return (
            <Card key={item.id} className="bg-white border border-zinc-200 overflow-hidden">
              <CardContent className="p-4 space-y-3">
                {/* KPI name + badge */}
                <div className="space-y-1.5">
                  <p className="text-[14px] font-semibold text-zinc-800 leading-snug">
                    {item.kpiName}
                  </p>
                  {statusBadge(item.status)}
                </div>

                <Separator className="bg-zinc-100" />

                {/* Meta info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Pemilik</span>
                    <span className="text-xs font-medium text-zinc-700">{item.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Tenggat</span>
                    <span className="text-xs font-medium text-zinc-700">{item.dueDate}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Progres</span>
                    <span className="text-xs font-semibold text-zinc-700">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2 bg-zinc-100" />
                </div>

                {/* Action buttons — only show while pending and not expanded */}
                {item.status === "pending" && !isExpanded && (
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      className="flex-1 h-9 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 text-sm"
                      onClick={() => openAction(item.id, "reject")}
                    >
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Tolak
                    </Button>
                    <Button
                      className="flex-1 h-9 bg-[#4ecb71] hover:bg-[#3ab861] text-white text-sm font-medium"
                      onClick={() => openAction(item.id, "verify")}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Verifikasi
                    </Button>
                  </div>
                )}

                {/* Inline expanded section */}
                {item.status === "pending" && isExpanded && state && (
                  <div
                    className={`rounded-xl border p-4 space-y-3 ${
                      state.action === "verify"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className="text-xs font-semibold text-zinc-600">
                      {state.action === "verify" ? "Konfirmasi Verifikasi" : "Konfirmasi Penolakan"}
                    </p>

                    {/* Category badges */}
                    <div>
                      <p className="text-xs text-zinc-500 mb-2">
                        Kategori{state.action === "reject" ? " *" : " (opsional)"}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                          const isSelected = state.category === cat
                          return (
                            <button
                              key={cat}
                              onClick={() => setCategory(item.id, cat)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                                isSelected
                                  ? state.action === "verify"
                                    ? "bg-[#4ecb71] text-[#1a5c35] border-[#4ecb71]"
                                    : "bg-red-500 text-white border-red-500"
                                  : "bg-white text-zinc-600 border-zinc-200"
                              }`}
                            >
                              {cat}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Komentar */}
                    <div>
                      <p className="text-xs text-zinc-500 mb-1.5">
                        Komentar{state.action === "reject" ? " *" : " (opsional)"}:
                      </p>
                      <Textarea
                        placeholder={
                          state.action === "reject"
                            ? "Tuliskan alasan penolakan…"
                            : "Tambahkan catatan (opsional)…"
                        }
                        value={state.komentar}
                        onChange={(e) => setKomentar(item.id, e.target.value)}
                        rows={2}
                        className="rounded-xl border-zinc-200 resize-none text-sm bg-white"
                      />
                    </div>

                    {/* Confirm / Cancel */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 h-9 rounded-xl text-sm"
                        onClick={() => closeAction(item.id)}
                      >
                        Batal
                      </Button>
                      <Button
                        disabled={
                          state.action === "reject" && !state.komentar.trim()
                        }
                        className={`flex-1 h-9 rounded-xl text-sm font-semibold disabled:opacity-40 ${
                          state.action === "verify"
                            ? "bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35]"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        onClick={() => confirmAction(item.id)}
                      >
                        {state.action === "verify" ? "Konfirmasi Verifikasi" : "Konfirmasi Tolak"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Feedback state */}
                {item.status === "verified" && (
                  <div className="flex items-center gap-2 pt-1 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>KPI ini telah diverifikasi.</span>
                  </div>
                )}
                {item.status === "rejected" && (
                  <div className="flex items-center gap-2 pt-1 text-red-600 text-sm">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>KPI ini telah ditolak.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </main>

      <BottomNav />
    </div>
  )
}
