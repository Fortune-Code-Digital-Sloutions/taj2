'use client'

// Detects a playable video slot without racing hydration: if the file was
// already loaded before React attached listeners, readyState catches it.
import { useEffect, useState } from 'react'

export default function useVideoReady(videoRef) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return undefined

    const mark = () => {
      v.dataset.ok = '1'
      setReady(true)
    }
    const fail = () => {
      v.dataset.ok = '0'
      setReady(false)
    }

    if (v.readyState >= 1) {
      mark()
      return undefined
    }
    v.addEventListener('loadedmetadata', mark, { once: true })
    v.addEventListener('error', fail, { once: true })
    return () => {
      v.removeEventListener('loadedmetadata', mark)
      v.removeEventListener('error', fail)
    }
  }, [videoRef])

  return ready
}
