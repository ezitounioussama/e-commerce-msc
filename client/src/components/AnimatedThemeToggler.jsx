import { IconMoon, IconSun } from '@tabler/icons-react'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '../lib/utils'
import { useTheme } from '../hooks/useTheme'

function getRevealValues(el) {
  const { top, left, width, height } = el.getBoundingClientRect()
  const cx = left + width / 2
  const cy = top + height / 2
  const maxRad = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))
  return { cx, cy, maxRad }
}

function runClipAnimation(el, toKeyframes, options) {
  el.animate(toKeyframes, options)
}

async function animateThemeToggle(button, toggleTheme) {
  const hasViewTransitions = typeof document.startViewTransition === 'function'
  const { cx, cy, maxRad } = getRevealValues(button)

  if (!hasViewTransitions) {
    flushSync(toggleTheme)
    runClipAnimation(
      document.documentElement,
      [
        { clipPath: `circle(0px at ${cx}px ${cy}px)`, opacity: 0.98 },
        { clipPath: `circle(${maxRad}px at ${cx}px ${cy}px)`, opacity: 1 },
      ],
      { duration: 650, easing: 'ease-in-out' }
    )
    return
  }

  await document.startViewTransition(() => flushSync(toggleTheme)).ready

  runClipAnimation(
    document.documentElement,
    { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRad}px at ${cx}px ${cy}px)`] },
    { duration: 700, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
  )
}

export default function AnimatedThemeToggler({ className }) {
  const { isDark, toggleTheme } = useTheme()
  const buttonRef = useRef(null)

  return (
    <button
      ref={buttonRef}
      onClick={() => animateThemeToggle(buttonRef.current, toggleTheme)}
      className={cn(className)}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <IconSun size={24} /> : <IconMoon size={24} />}
    </button>
  )
}
