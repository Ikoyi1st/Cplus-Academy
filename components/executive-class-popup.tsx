"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useState } from "react"

type PopupState = "open" | "minimized"

export function ExecutiveClassPopup() {
  const [popupState, setPopupState] = useState<PopupState>("open")

  const openPopup = () => {
    setPopupState("open")
  }

  const minimizePopup = () => {
    setPopupState("minimized")
  }

  return (
    <>
      {popupState === "open" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Close executive classes popup"
              onClick={minimizePopup}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>

            <Image
              src="/executive-class.jpeg"
              alt="Executive classes flyer"
              width={800}
              height={1000}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      )}

      {popupState === "minimized" && (
        <button
          type="button"
          onClick={openPopup}
          className="fixed bottom-4 right-4 z-[90] flex w-24 flex-col items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/10 transition hover:scale-105 sm:w-28"
          aria-label="Open executive classes popup"
        >
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/executive-class.jpeg"
              alt="Executive classes flyer preview"
              width={112}
              height={140}
              className="h-auto w-full"
            />
          </div>
          <span className="text-center text-xs font-semibold leading-tight text-slate-700">Executive Classes</span>
        </button>
      )}
    </>
  )
}
