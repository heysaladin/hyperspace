"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, AlertCircle, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Suspense } from "react"

function validatePassword(pw: string) {
  if (pw.length < 8) return "Minimal 8 karakter"
  if (!/[A-Z]/.test(pw)) return "Minimal 1 huruf kapital"
  if (!/[0-9]/.test(pw)) return "Minimal 1 angka"
  return null
}

function AktivasiContent() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token")

  // Simulate: no token = invalid, token="expired" = expired
  const tokenStatus = !token ? "missing" : token === "expired" ? "expired" : "valid"

  const [step, setStep] = useState<"set-password" | "success">("set-password")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwError, setPwError] = useState("")
  const [confirmError, setConfirmError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendSent, setResendSent] = useState(false)

  function handleActivate() {
    const err = validatePassword(password)
    if (err) { setPwError(err); return }
    if (password !== confirm) { setConfirmError("Password tidak cocok"); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("success")
    }, 1000)
  }

  function handleResend() {
    setResendSent(true)
  }

  // Invalid / expired token
  if (tokenStatus !== "valid") {
    return (
      <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 text-center gap-5">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-zinc-800">
            {tokenStatus === "expired" ? "Link Sudah Kadaluarsa" : "Link Tidak Valid"}
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
            {tokenStatus === "expired"
              ? "Link aktivasi ini sudah tidak berlaku. Minta link baru untuk mengaktifkan akun."
              : "Link aktivasi tidak ditemukan atau sudah digunakan sebelumnya."}
          </p>
        </div>
        {resendSent ? (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">Link baru sudah dikirim. Cek email kamu.</p>
          </div>
        ) : (
          <Button
            onClick={handleResend}
            variant="outline"
            className="h-11 px-6 rounded-xl border-zinc-300 font-medium gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Kirim Ulang Link Aktivasi
          </Button>
        )}
        <button
          onClick={() => router.push("/login")}
          className="text-sm text-zinc-400 hover:text-zinc-600 underline underline-offset-4"
        >
          Kembali ke Login
        </button>
      </div>
    )
  }

  // Success
  if (step === "success") {
    return (
      <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#4ecb71]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-zinc-800">Akun Berhasil Diaktifkan!</h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
            Selamat datang di ezer. Akun kamu sudah aktif dan siap digunakan.
          </p>
        </div>
        <Button
          onClick={() => router.push("/")}
          className="h-12 px-8 bg-[#4ecb71] hover:bg-[#3ab861] text-[#1a5c35] font-semibold rounded-xl"
        >
          Mulai Gunakan ezer →
        </Button>
      </div>
    )
  }

  // Set password form
  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center border-b border-zinc-100">
        <div className="w-14 h-14 rounded-2xl bg-[#1e1e30] flex items-center justify-center shadow-md mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M8 16L13 21L24 10" stroke="#4ecb71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-zinc-800">Aktivasi Akun</h1>
        <p className="text-sm text-zinc-500 mt-1">Buat password untuk mengaktifkan akunmu</p>
      </div>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-28 space-y-5">

        {/* Info banner */}
        <div className="bg-[#f0faf4] border border-[#b7e4c7] rounded-xl px-4 py-3">
          <p className="text-xs text-[#2d6e47] leading-relaxed">
            Password bersifat sensitif. Jangan bagikan ke siapa pun, termasuk tim ezer.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-zinc-700">
            Password Baru <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwError("") }}
              className={`h-11 border-zinc-200 pr-11 ${pwError ? "border-red-300" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {pwError
            ? <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{pwError}</p>
            : <p className="text-xs text-zinc-400">Min. 8 karakter, 1 huruf kapital, 1 angka</p>
          }
          {/* Strength indicator */}
          {password.length > 0 && (
            <div className="flex gap-1 mt-1">
              {[1, 2, 3].map((level) => {
                const strength = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password)].filter(Boolean).length
                return (
                  <div key={level} className={`h-1 flex-1 rounded-full transition-colors ${
                    strength >= level
                      ? strength === 1 ? "bg-red-400" : strength === 2 ? "bg-amber-400" : "bg-[#4ecb71]"
                      : "bg-zinc-200"
                  }`} />
                )
              })}
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-zinc-700">
            Konfirmasi Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setConfirmError("") }}
              className={`h-11 border-zinc-200 pr-11 ${confirmError ? "border-red-300" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{confirmError}
            </p>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-4">
        <Button
          onClick={handleActivate}
          disabled={loading || !password || !confirm}
          className="w-full h-12 bg-[#4ecb71] hover:bg-[#3ab861] text-[#1a5c35] font-semibold rounded-xl text-base disabled:opacity-50"
        >
          {loading ? "Mengaktifkan..." : "Aktifkan Akun"}
        </Button>
      </div>
    </div>
  )
}

export default function AktivasiPage() {
  return (
    <Suspense>
      <AktivasiContent />
    </Suspense>
  )
}
