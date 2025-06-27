import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeLogoProps {
  width?: number
  height?: number
  className?: string
}

export function ThemeLogo({ width = 32, height = 32, className = "" }: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div
        className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg ${className}`}
        style={{ width, height }}
      />
    )
  }

  const isDark = resolvedTheme === "dark"
  const logoSrc = isDark ? "/college-logo2.jpg" : "/college-logo.jpg"

  return (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="C Plus Logo"
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
      priority
    />
  )
}
