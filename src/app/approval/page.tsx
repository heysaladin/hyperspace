"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckSquare, Square, ChevronRight, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type EmployeeStatus = "pending" | "approved" | "rejected"

interface Employee {
  id: string
  name: string
  role: string
  initials: string
  kpiCount: number
  deadline: string
  daysLeft: number
  status: EmployeeStatus
}

interface KpiItem {
  id: string
  name: string
  bobot: number
  target: string
  formula: string
  comment: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialEmployees: Employee[] = [
  {
    id: "budi",
    name: "Budi Santoso",
    role: "Sales Manager",
    initials: "BS",
    kpiCount: 3,
    deadline: "30 Jun 2026",
    daysLeft: 3,
    status: "pending",
  },
  {
    id: "sari",
    name: "Sari Widyawati",
    role: "Marketing Lead",
    initials: "SW",
    kpiCount: 2,
    deadline: "30 Jun 2026",
    daysLeft: 3,
    status: "pending",
  },
  {
    id: "deni",
    name: "Deni Aldiano",
    role: "Ops Coordinator",
    initials: "DA",
    kpiCount: 4,
    deadline: "28 Jun 2026",
    daysLeft: 1,
    status: "approved",
  },
]

const kpiItemsMap: Record<string, KpiItem[]> = {
  budi: [
    {
      id: "1",
      name: "Target Penjualan Q3",
      bobot: 40,
      target: "Rp 50.000.000",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
    {
      id: "2",
      name: "Customer Satisfaction Score",
      bobot: 30,
      target: "88%",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
    {
      id: "3",
      name: "Jumlah Komplain",
      bobot: 30,
      target: "10",
      formula: "100% - ((Realisasi - Target) / Target × 100%)",
      comment: "",
    },
  ],
  sari: [
    {
      id: "4",
      name: "Leads Baru per Bulan",
      bobot: 60,
      target: "150 leads",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
    {
      id: "5",
      name: "Konversi Campaign",
      bobot: 40,
      target: "12%",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
  ],
  deni: [
    {
      id: "6",
      name: "SLA Operasional",
      bobot: 50,
      target: "95%",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
    {
      id: "7",
      name: "Efisiensi Biaya",
      bobot: 25,
      target: "Rp 80.000.000",
      formula: "100% - ((Realisasi - Target) / Target × 100%)",
      comment: "",
    },
    {
      id: "8",
      name: "Uptime Sistem",
      bobot: 15,
      target: "99%",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
    {
      id: "9",
      name: "Onboarding Karyawan",
      bobot: 10,
      target: "5 orang",
      formula: "(Realisasi / Target) × 100%",
      comment: "",
    },
  ],
}

// ─── Status helpers ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EmployeeStatus }) {
  if (status === "approved")
    return (
      <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 text-[11px]">
        Disetujui
      </Badge>
    )
  if (status === "rejected")
    return (
      <Badge className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-50 text-[11px]">
        Ditolak
      </Badge>
    )
  return (
    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 text-[11px]">
      Menunggu
    </Badge>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApprovalPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [kpiData, setKpiData] = useState<Record<string, KpiItem[]>>(kpiItemsMap)
  const [currentView, setCurrentView] = useState<"list" | "detail">("list")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [filterTab, setFilterTab] = useState<"pending" | "approved" | "rejected">("pending")
  const [bulkSelected, setBulkSelected] = useState<string[]>([])
  const [bulkMode, setBulkMode] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [successBanner, setSuccessBanner] = useState("")
  const [toastMsg, setToastMsg] = useState("")

  // ─── Derived ─────────────────────────────────────────────────────────────

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId) ?? null
  const selectedKpis = selectedEmployeeId ? (kpiData[selectedEmployeeId] ?? []) : []

  const anyKpiHasComment = selectedKpis.some((k) => k.comment.trim() !== "")

  const filteredEmployees = employees.filter((e) => e.status === filterTab)

  // ─── List view helpers ────────────────────────────────────────────────────

  function toggleBulkSelect(id: string) {
    setBulkSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function selectAll() {
    const pendingIds = filteredEmployees.map((e) => e.id)
    setBulkSelected(pendingIds)
  }

  function approveSelected() {
    setEmployees((prev) =>
      prev.map((e) => (bulkSelected.includes(e.id) ? { ...e, status: "approved" } : e))
    )
    setBulkSelected([])
    setBulkMode(false)
    showToast("KPI terpilih berhasil disetujui")
  }

  function showToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(""), 3000)
  }

  // ─── Detail view helpers ──────────────────────────────────────────────────

  function updateComment(kpiId: string, comment: string) {
    if (!selectedEmployeeId) return
    setKpiData((prev) => ({
      ...prev,
      [selectedEmployeeId]: prev[selectedEmployeeId].map((k) =>
        k.id === kpiId ? { ...k, comment } : k
      ),
    }))
  }

  function handleApproveAll() {
    if (!selectedEmployee) return
    setEmployees((prev) =>
      prev.map((e) => (e.id === selectedEmployee.id ? { ...e, status: "approved" } : e))
    )
    setSuccessBanner(`KPI ${selectedEmployee.name} berhasil disetujui`)
    setTimeout(() => {
      setSuccessBanner("")
      setCurrentView("list")
      setSelectedEmployeeId(null)
    }, 2000)
  }

  function handleRejectAll() {
    if (!rejectReason.trim()) return
    if (!selectedEmployee) return
    setEmployees((prev) =>
      prev.map((e) => (e.id === selectedEmployee.id ? { ...e, status: "rejected" } : e))
    )
    setShowRejectModal(false)
    setRejectReason("")
    setSuccessBanner(`KPI ${selectedEmployee.name} telah ditolak`)
    setTimeout(() => {
      setSuccessBanner("")
      setCurrentView("list")
      setSelectedEmployeeId(null)
    }, 2000)
  }

  // ─── Render: Detail View ──────────────────────────────────────────────────

  if (currentView === "detail" && selectedEmployee) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
        <TopBar
          title="Approval KPI"
          backHref={undefined}
          right={undefined}
        />
        {/* Custom back + title for detail */}
        <div className="sticky top-0 z-40 bg-[#f5f5f0] border-b border-zinc-200 -mt-[57px]">
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              onClick={() => {
                setCurrentView("list")
                setSelectedEmployeeId(null)
              }}
              className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 rotate-180 text-zinc-600" />
            </button>
            <h1 className="text-[15px] font-semibold flex-1 text-center">Detail KPI</h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Success banner */}
        {successBanner && (
          <div className="mx-4 mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2 text-green-700 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successBanner}
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-4">
          {/* Employee info */}
          <Card className="border-0 shadow-sm bg-[#1e1e30] text-white">
            <CardContent className="p-4 flex items-center gap-3">
              <Avatar className="w-12 h-12 shrink-0">
                <AvatarFallback className="bg-[#4ecb71] text-[#1a5c35] font-bold">
                  {selectedEmployee.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-base">{selectedEmployee.name}</p>
                <p className="text-zinc-400 text-sm">{selectedEmployee.role}</p>
              </div>
            </CardContent>
          </Card>

          {/* KPI cards */}
          {selectedKpis.map((kpi) => {
            const hasComment = kpi.comment.trim() !== ""
            return (
              <Card key={kpi.id} className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-800 leading-snug flex-1">{kpi.name}</p>
                    <Badge className="bg-zinc-100 text-zinc-600 border-0 text-[11px] shrink-0">
                      Bobot {kpi.bobot}%
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs text-zinc-500">
                    <div className="flex items-center justify-between">
                      <span>Target</span>
                      <span className="font-medium text-zinc-700">{kpi.target}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Formula</span>
                      <span className="font-medium text-zinc-700 text-right max-w-[60%]">{kpi.formula}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-zinc-500 mb-1.5 block">
                      Catatan
                      {hasComment && (
                        <span className="ml-2 text-amber-600 font-medium">
                          ⚠ KPI tidak bisa disetujui jika ada catatan
                        </span>
                      )}
                    </Label>
                    <Textarea
                      placeholder="Tambahkan catatan (opsional — jika diisi, KPI tidak bisa disetujui)"
                      value={kpi.comment}
                      onChange={(e) => updateComment(kpi.id, e.target.value)}
                      rows={2}
                      className="rounded-xl border-zinc-200 resize-none text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Alert if comments present */}
          {anyKpiHasComment && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                Hapus semua catatan untuk bisa menyetujui KPI.
              </p>
            </div>
          )}
        </main>

        {/* Sticky bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-4 py-3 space-y-2 z-40">
          {anyKpiHasComment && (
            <p className="text-xs text-center text-amber-600 font-medium">
              Hapus komentar untuk menyetujui
            </p>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50 font-semibold"
              onClick={() => setShowRejectModal(true)}
            >
              <XCircle className="w-4 h-4 mr-1.5" />
              Tolak Semua
            </Button>
            <Button
              disabled={anyKpiHasComment}
              className="flex-1 h-12 rounded-xl bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] font-semibold disabled:opacity-40"
              onClick={handleApproveAll}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Setujui Semua
            </Button>
          </div>
        </div>

        {/* Reject modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
            <div className="w-full bg-white rounded-t-2xl p-5 space-y-4">
              <p className="text-base font-semibold text-zinc-800">Tolak semua KPI?</p>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">
                  Alasan penolakan <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Tulis alasan penolakan…"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                  className="rounded-xl border-zinc-200 resize-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                  onClick={() => {
                    setShowRejectModal(false)
                    setRejectReason("")
                  }}
                >
                  Batal
                </Button>
                <Button
                  disabled={!rejectReason.trim()}
                  className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-40"
                  onClick={handleRejectAll}
                >
                  Konfirmasi Tolak
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── Render: List View ────────────────────────────────────────────────────

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Approval KPI" />

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e30] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Filter tabs */}
      <div className="px-4 pt-4 pb-0">
        <div className="bg-white rounded-xl flex p-1 shadow-sm">
          {(["pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilterTab(tab)
                setBulkMode(false)
                setBulkSelected([])
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                filterTab === tab
                  ? "bg-[#1e1e30] text-white"
                  : "text-zinc-500"
              }`}
            >
              {tab === "pending" ? "Menunggu" : tab === "approved" ? "Disetujui" : "Ditolak"}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-28 space-y-3">
        {/* Bulk mode header */}
        {filterTab === "pending" && filteredEmployees.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setBulkMode((v) => !v)
                setBulkSelected([])
              }}
              className="text-sm font-semibold text-zinc-600 flex items-center gap-1.5"
            >
              {bulkMode ? (
                <CheckSquare className="w-4 h-4 text-[#4ecb71]" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              Pilih Semua
            </button>
            {bulkMode && (
              <div className="flex items-center gap-2">
                <button onClick={selectAll} className="text-xs text-zinc-500 underline">
                  Tandai semua
                </button>
                <Button
                  disabled={bulkSelected.length === 0}
                  className="h-8 px-3 rounded-lg bg-[#4ecb71] text-[#1a5c35] text-xs font-semibold disabled:opacity-40"
                  onClick={approveSelected}
                >
                  Setujui Terpilih ({bulkSelected.length})
                </Button>
              </div>
            )}
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Tidak ada data untuk tab ini.
          </div>
        )}

        {filteredEmployees.map((emp) => (
          <Card key={emp.id} className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {bulkMode && filterTab === "pending" && (
                  <button
                    onClick={() => toggleBulkSelect(emp.id)}
                    className="mt-1 shrink-0"
                  >
                    {bulkSelected.includes(emp.id) ? (
                      <CheckSquare className="w-5 h-5 text-[#4ecb71]" />
                    ) : (
                      <Square className="w-5 h-5 text-zinc-300" />
                    )}
                  </button>
                )}

                <Avatar className="w-11 h-11 shrink-0">
                  <AvatarFallback className="bg-[#1e1e30] text-white text-sm font-bold">
                    {emp.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">{emp.name}</p>
                      <p className="text-xs text-zinc-400">{emp.role}</p>
                    </div>
                    <StatusBadge status={emp.status} />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-zinc-100 text-zinc-600 border-0 text-[11px]">
                      {emp.kpiCount} KPI
                    </Badge>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        emp.daysLeft <= 2 ? "text-red-500" : "text-zinc-400"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      Deadline: {emp.deadline}
                      {emp.daysLeft <= 2 && ` (${emp.daysLeft} hari lagi)`}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEmployeeId(emp.id)
                      setCurrentView("detail")
                    }}
                    className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1a5c35]"
                  >
                    Lihat Detail
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  )
}
