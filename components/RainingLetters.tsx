"use client"

import { useEffect, useState } from "react"

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
const COUNT = 160

// Site-wide raining-letters backdrop. Fixed behind all content, transparent so the
// surface colour + section chrome show through. Colours come from theme tokens, so it
// flips with light/dark automatically (.rain-idle / .rain-active in globals.css).
export default function RainingLetters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [active, setActive] = useState<Set<number>>(new Set())
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setEnabled(true)
    const chars: Character[] = []
    for (let i = 0; i < COUNT; i++) {
      chars.push({
        char: CHARSET[Math.floor(Math.random() * CHARSET.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }
    setCharacters(chars)
  }, [])

  // Flicker a few random glyphs into the accent colour.
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      const next = new Set<number>()
      const n = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < n; i++) next.add(Math.floor(Math.random() * COUNT))
      setActive(next)
    }, 90)
    return () => clearInterval(id)
  }, [enabled])

  // Fall + recycle at the bottom.
  useEffect(() => {
    if (!enabled) return
    let raf: number
    const tick = () => {
      setCharacters((prev) =>
        prev.map((c) => ({
          ...c,
          y: c.y + c.speed,
          ...(c.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: CHARSET[Math.floor(Math.random() * CHARSET.length)],
          }),
        })),
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  if (!enabled) return null

  // ponytail: 160 spans re-rendered per frame via React state — fine as a faint bg.
  // If it janks on low-end devices, move to a single <canvas>.
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {characters.map((c, i) => (
        <span
          key={i}
          className={active.has(i) ? "rain-active" : "rain-idle"}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `translate(-50%, -50%) ${active.has(i) ? "scale(1.25)" : "scale(1)"}`,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "1.4rem",
            transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
            willChange: "transform, top",
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  )
}
