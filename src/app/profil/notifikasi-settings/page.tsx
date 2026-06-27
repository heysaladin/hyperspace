"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TopBar } from "@/components/top-bar"
import { Bell, CheckCircle2, ThumbsUp, ShieldCheck } from "lucide-react"

export default function NotifikasiSettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true)

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Pengaturan Notifikasi" backHref="/profil" />

      <main className="flex-1 overflow-y-auto px-4 pt-5 pb-28 space-y-5">
        {/* OS Push Toggle */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-zinc-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800">OS Push Notification</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Aktifkan atau nonaktifkan notifikasi push dari perangkat
                  </p>
                </div>
              </div>
              {/* Toggle */}
              <button
                onClick={() => setPushEnabled((v) => !v)}
                className={`w-12 h-6 rounded-full transition-colors shrink-0 relative ${
                  pushEnabled ? "bg-[#4ecb71]" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    pushEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
              <p className="text-xs text-amber-700">
                Notifikasi aksi (approval, verifikasi) tidak dapat dinonaktifkan.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info cards */}
        <div>
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wide mb-3">
            Kategori Notifikasi
          </p>
          <div className="space-y-3">
            {/* Approval */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-800">Approval KPI</p>
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">Wajib</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Notifikasi saat KPI kamu memerlukan atau telah mendapat persetujuan dari atasan.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Verifikasi */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-800">Verifikasi Realisasi</p>
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">Wajib</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Notifikasi saat data realisasi KPI kamu perlu diverifikasi oleh verifikator.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* General */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-zinc-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-800">Pengingat & Info</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${pushEnabled ? "text-[#1a5c35] bg-green-50" : "text-zinc-400 bg-zinc-100"}`}>
                      {pushEnabled ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                    Pengingat deadline KPI, pembaruan sistem, dan info umum lainnya. Mengikuti pengaturan push global.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
