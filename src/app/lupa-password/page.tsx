"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function LupaPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit() {
    if (email.trim()) {
      setSent(true)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f5f5f0]">
      <TopBar title="Lupa Password" backHref="/login" />

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-12 space-y-4">
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5 space-y-4">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#4ecb71]" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-zinc-800">Link terkirim!</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Link reset password sudah dikirim ke email kamu.
                  </p>
                </div>
                <p className="text-xs text-zinc-400">
                  Cek folder inbox atau spam kamu.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Masukkan email yang terdaftar. Kami akan mengirimkan link untuk mereset password kamu.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="kamu@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-white border-zinc-200"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-11 bg-[#4ecb71] hover:bg-[#3ab861] text-white font-semibold rounded-xl"
                >
                  Kirim Link Reset
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
