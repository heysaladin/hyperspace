"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TopBar } from "@/components/top-bar"
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"

function StrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  const label = score === 0 ? "" : score === 1 ? "Lemah" : score === 2 ? "Cukup" : score === 3 ? "Kuat" : "Sangat Kuat"
  const color = score <= 1 ? "bg-red-400" : score === 2 ? "bg-amber-400" : score === 3 ? "bg-blue-400" : "bg-[#4ecb71]"

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${i <= score ? color : "bg-zinc-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score <= 1 ? "text-red-500" : score === 2 ? "text-amber-500" : score === 3 ? "text-blue-500" : "text-[#1a5c35]"}`}>
        {label}
      </p>
      <ul className="space-y-0.5">
        {[
          { ok: checks[0], label: "Minimal 8 karakter" },
          { ok: checks[1], label: "Huruf kapital (A-Z)" },
          { ok: checks[2], label: "Angka (0-9)" },
          { ok: checks[3], label: "Karakter khusus (!@#…)" },
        ].map((c) => (
          <li key={c.label} className={`flex items-center gap-1.5 text-xs ${c.ok ? "text-[#1a5c35]" : "text-zinc-400"}`}>
            {c.ok ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <XCircle className="w-3 h-3 shrink-0" />}
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GantiPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const newStrengthChecks = [
    newPassword.length >= 8,
    /[A-Z]/.test(newPassword),
    /[0-9]/.test(newPassword),
    /[^A-Za-z0-9]/.test(newPassword),
  ]
  const newIsStrong = newStrengthChecks.filter(Boolean).length >= 3
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== ""
  const isValid =
    currentPassword.trim() !== "" &&
    newPassword !== currentPassword &&
    newIsStrong &&
    passwordsMatch

  function handleSave() {
    if (!isValid) return
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Ganti Password" backHref="/profil" />

      <main className="flex-1 overflow-y-auto px-4 pt-5 pb-28 space-y-5">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-700 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Password berhasil diubah.
          </div>
        )}

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 space-y-5">
            {/* Current password */}
            <div>
              <Label htmlFor="current" className="text-sm font-medium">
                Password Saat Ini <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="current"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Masukkan password saat ini"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11 rounded-xl border-zinc-200 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <Label htmlFor="new" className="text-sm font-medium">
                Password Baru <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="new"
                  type={showNew ? "text" : "password"}
                  placeholder="Buat password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 rounded-xl border-zinc-200 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <StrengthBar password={newPassword} />
              {newPassword && newPassword === currentPassword && (
                <p className="text-xs text-red-500 mt-1">Password baru tidak boleh sama dengan password saat ini.</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <Label htmlFor="confirm" className="text-sm font-medium">
                Konfirmasi Password Baru <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ulangi password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`h-11 rounded-xl pr-11 ${
                    confirmPassword && !passwordsMatch
                      ? "border-red-300 focus-visible:ring-red-300"
                      : "border-zinc-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">Password tidak cocok.</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-xs text-[#1a5c35] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Password cocok.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#f5f5f0] border-t border-zinc-200 px-4 py-3 z-40">
        <Button
          onClick={handleSave}
          disabled={!isValid || saving}
          className="w-full h-12 rounded-xl font-semibold bg-[#4ecb71] hover:bg-[#3ab862] text-[#1a5c35] text-base disabled:opacity-40"
        >
          {saving ? "Menyimpan…" : "Simpan Password"}
        </Button>
      </div>
    </div>
  )
}
