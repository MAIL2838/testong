import { useTheme } from "../ThemeProvider"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-105",
        isDark 
          ? "bg-zinc-900 border border-zinc-700 shadow-lg" 
          : "bg-white border border-zinc-200 shadow-md hover:shadow-lg",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="flex justify-between items-center w-full relative">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 z-10",
            isDark 
              ? "translate-x-0 bg-zinc-800 shadow-md" 
              : "translate-x-8 bg-yellow-100 shadow-md"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-3.5 h-3.5 text-blue-200" 
              strokeWidth={2}
            />
          ) : (
            <Sun 
              className="w-3.5 h-3.5 text-yellow-600" 
              strokeWidth={2}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 absolute",
            isDark 
              ? "right-0 opacity-30" 
              : "left-0 opacity-30"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-3.5 h-3.5 text-zinc-500" 
              strokeWidth={2}
            />
          ) : (
            <Moon 
              className="w-3.5 h-3.5 text-zinc-400" 
              strokeWidth={2}
            />
          )}
        </div>
      </div>
    </div>
  )
}