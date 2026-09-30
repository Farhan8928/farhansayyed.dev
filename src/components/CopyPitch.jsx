import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { pitch } from '../data/pitch.js'

// A recruiter's next step is usually to forward the candidate to a hiring
// manager. This writes that message for them.
export default function CopyPitch({ className = 'btn' }) {
  const [copied, setCopied] = useState(false)
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(pitch)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = pitch
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied. Paste it to your hiring manager' : 'Copy a 3-line pitch for your hiring manager'}
    </button>
  )
}
