// TAJ diamond monogram — placeholder geometry until the brand SVG path arrives.
export default function Mark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M20 2 38 20 20 38 2 20Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 10 30 20 20 30 10 20Z" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M20 16 24 20 20 24 16 20Z" fill="currentColor" />
    </svg>
  )
}
