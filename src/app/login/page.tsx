"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

type ErrorType = "invalid" | "inactive" | "invited" | null

const ERROR_MESSAGES: Record<NonNullable<ErrorType>, string> = {
  invalid: "Email atau password salah. Periksa kembali dan coba lagi.",
  inactive: "Akunmu sudah dinonaktifkan. Hubungi admin perusahaanmu.",
  invited: "Akun belum diaktifkan. Cek email undangan dan selesaikan aktivasi terlebih dahulu.",
}

// Demo: trigger different error states by email prefix
function simulateLogin(email: string, password: string): ErrorType | "ok" {
  if (!email || !password) return "invalid"
  if (email.startsWith("inactive")) return "inactive"
  if (email.startsWith("invited")) return "invited"
  if (password.length < 4) return "invalid"
  return "ok"
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<ErrorType>(null)
  const [loading, setLoading] = useState(false)

  function handleLogin() {
    setError(null)
    setLoading(true)
    setTimeout(() => {
      const result = simulateLogin(email, password)
      setLoading(false)
      if (result === "ok") {
        router.push("/")
      } else {
        setError(result)
      }
    }, 800)
  }

  function handleGoogleSSO() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#1e1e30] flex items-center justify-center shadow-lg">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16L13 21L24 10" stroke="#4ecb71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold tracking-tight text-[#1e1e30]">ezer</p>
            <p className="text-sm text-zinc-500 mt-1">Kelola KPI kamu dengan mudah</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm space-y-4">

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 leading-snug">{ERROR_MESSAGES[error]}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="kamu@perusahaan.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null) }}
              className={`h-11 bg-white border-zinc-200 ${error === "invalid" ? "border-red-300 focus-visible:ring-red-300" : ""}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</Label>
              <Link href="/lupa-password" className="text-xs text-zinc-400 hover:text-zinc-600">
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null) }}
                className={`h-11 bg-white border-zinc-200 pr-11 ${error === "invalid" ? "border-red-300 focus-visible:ring-red-300" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full h-11 bg-[#1e1e30] hover:bg-[#2a2a42] text-white font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? "Memverifikasi..." : "Masuk"}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400 shrink-0">atau masuk dengan</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Google SSO */}
          <Button
            variant="outline"
            onClick={handleGoogleSSO}
            disabled={loading}
            className="w-full h-11 rounded-xl border-zinc-200 font-medium text-zinc-700 gap-2.5"
          >
            <GoogleIcon />
            Masuk dengan Google
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 px-6 text-center space-y-3">
        <p className="text-sm text-zinc-500">
          Belum punya akun?{" "}
          <Link href="/daftar" className="text-[#1a5c35] font-semibold hover:underline">
            Daftar sebagai Admin
          </Link>
        </p>
        <p className="text-xs text-zinc-300">v1.0.0</p>
      </div>
    </div>
  )
}
