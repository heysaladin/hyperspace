import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Kepi } from "@/components/kepi"

export default function SplashPage() {
  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-between px-6 py-12">
      {/* Spacer top */}
      <div className="flex-1" />

      {/* Center content */}
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <Kepi variant="large" size={140} />
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight text-[#1e1e30]">ezer</p>
          <p className="text-sm text-zinc-500 mt-2">Kelola KPI kamu dengan mudah</p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-3 py-4">
          {/* Animated dots */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#4ecb71] animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "900ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-[#4ecb71] animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "900ms" }}
            />
            <span
              className="w-2 h-2 rounded-full bg-[#4ecb71] animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "900ms" }}
            />
          </div>
          <p className="text-xs text-zinc-400 tracking-wide">Memuat...</p>
        </div>

        {/* CTA button */}
        <Link href="/login" className="block w-full">
          <Button className="w-full h-12 bg-[#1e1e30] hover:bg-[#2a2a42] text-white font-semibold rounded-2xl text-base shadow-lg">
            Masuk
          </Button>
        </Link>

        {/* Register hint */}
        <p className="text-sm text-zinc-500 text-center">
          Belum punya akun?{" "}
          <Link href="/daftar" className="text-[#1a5c35] font-semibold">Daftar</Link>
        </p>
      </div>

      {/* Spacer bottom */}
      <div className="flex-1" />

      {/* Bottom version */}
      <p className="text-xs text-zinc-300">v1.0.0 &middot; ezer KPI</p>
    </div>
  )
}
