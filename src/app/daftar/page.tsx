"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react"

const PUBLIC_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"]

function getDomain(email: string) {
  return email.split("@")[1]?.toLowerCase() ?? ""
}

function isPublicDomain(email: string) {
  return PUBLIC_DOMAINS.includes(getDomain(email))
}

function validatePassword(pw: string) {
  if (pw.length < 8) return "Minimal 8 karakter"
  if (!/[A-Z]/.test(pw)) return "Minimal 1 huruf kapital"
  if (!/[0-9]/.test(pw)) return "Minimal 1 angka"
  return null
}

type Step = "form" | "success"

export default function DaftarPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("form")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [corpDomainError, setCorpDomainError] = useState(false)

  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: "" }))
    setCorpDomainError(false)
  }

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.companyName.trim()) e.companyName = "Nama perusahaan wajib diisi"
    if (!form.firstName.trim()) e.firstName = "Nama depan wajib diisi"
    if (!form.lastName.trim()) e.lastName = "Nama belakang wajib diisi"
    if (!form.email.includes("@")) e.email = "Format email tidak valid"
    if (!form.phone.trim()) e.phone = "Nomor telepon wajib diisi"
    const pwErr = validatePassword(form.password)
    if (pwErr) e.password = pwErr
    if (form.password !== form.confirmPassword) e.confirmPassword = "Password tidak cocok"
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    // Check corporate domain already registered (simulate)
    const domain = getDomain(form.email)
    if (!isPublicDomain(form.email) && domain === "competitor.com") {
      setCorpDomainError(true)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("success")
    }, 1200)
  }

  if (step === "success") {
    return (
      <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#4ecb71]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-zinc-800">Pendaftaran Berhasil!</h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
            Link aktivasi sudah dikirim ke{" "}
            <span className="font-semibold text-zinc-700">{form.email}</span>.
            Cek inbox atau folder spam kamu.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 max-w-xs">
          <p className="text-xs text-amber-700 leading-relaxed">
            Kamu belum bisa login sebelum mengaktifkan akun melalui link di email.
          </p>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="h-11 px-8 bg-[#1e1e30] hover:bg-[#2a2a42] text-white font-semibold rounded-xl"
        >
          Kembali ke Login
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-100 flex items-center px-4 py-3 gap-2">
        <Link href="/login">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-zinc-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex-1 text-center">
          <p className="text-[15px] font-semibold text-zinc-800">Buat Workspace</p>
        </div>
        <div className="w-8" />
      </div>

      <main className="flex-1 overflow-y-auto px-6 pt-5 pb-28 space-y-5">

        {/* Intro */}
        <div className="bg-[#f0faf4] rounded-2xl p-4">
          <p className="text-sm font-semibold text-[#1a5c35] mb-1">Untuk Organization Admin</p>
          <p className="text-xs text-[#2d6e47] leading-relaxed">
            Buat workspace baru untuk perusahaanmu. Setelah aktivasi, kamu bisa mengundang anggota tim.
          </p>
        </div>

        {/* Corporate domain error */}
        {corpDomainError && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700 leading-snug">
              Perusahaan dengan domain email ini sudah terdaftar. Silakan minta undangan ke admin perusahaanmu atau hubungi support.
            </p>
          </div>
        )}

        {/* Company */}
        <section className="space-y-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Perusahaan</p>
          <Field
            label="Nama Perusahaan"
            required
            error={errors.companyName}
          >
            <Input
              placeholder="PT. Contoh Jaya"
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              className={`h-11 border-zinc-200 ${errors.companyName ? "border-red-300" : ""}`}
            />
          </Field>
        </section>

        {/* Personal */}
        <section className="space-y-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Data Diri</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nama Depan" required error={errors.firstName}>
              <Input
                placeholder="Budi"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={`h-11 border-zinc-200 ${errors.firstName ? "border-red-300" : ""}`}
              />
            </Field>
            <Field label="Nama Belakang" required error={errors.lastName}>
              <Input
                placeholder="Santoso"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={`h-11 border-zinc-200 ${errors.lastName ? "border-red-300" : ""}`}
              />
            </Field>
          </div>
          <Field label="Email" required error={errors.email} hint={
            form.email.includes("@") && !isPublicDomain(form.email)
              ? "Domain perusahaan terdeteksi. Hanya satu workspace per domain."
              : undefined
          }>
            <Input
              type="email"
              placeholder="admin@perusahaan.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={`h-11 border-zinc-200 ${errors.email ? "border-red-300" : ""}`}
            />
          </Field>
          <Field label="Nomor Telepon" required error={errors.phone}>
            <Input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`h-11 border-zinc-200 ${errors.phone ? "border-red-300" : ""}`}
            />
          </Field>
        </section>

        {/* Password */}
        <section className="space-y-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Keamanan</p>
          <Field label="Password" required error={errors.password}
            hint="Min. 8 karakter, 1 huruf kapital, 1 angka">
            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className={`h-11 border-zinc-200 pr-11 ${errors.password ? "border-red-300" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
          <Field label="Konfirmasi Password" required error={errors.confirmPassword}>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                className={`h-11 border-zinc-200 pr-11 ${errors.confirmPassword ? "border-red-300" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
        </section>
      </main>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-4">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 bg-[#4ecb71] hover:bg-[#3ab861] text-[#1a5c35] font-semibold rounded-xl text-base disabled:opacity-50"
        >
          {loading ? "Mendaftarkan..." : "Buat Workspace"}
        </Button>
        <p className="text-center text-xs text-zinc-400 mt-2.5">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[#1a5c35] font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" /> {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  )
}
