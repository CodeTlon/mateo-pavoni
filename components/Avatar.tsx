'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary-container border-4 border-surface shadow-xl flex items-center justify-center shrink-0 relative z-10">
        <span
          className="text-2xl md:text-3xl font-bold text-secondary-container"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          MP
        </span>
      </div>
    )
  }

  return (
    <div className="w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-surface shadow-xl shrink-0 relative z-10 bg-primary-container">
      <Image
        src="/mateo.jpg"
        alt="Mateo Pavoni"
        width={288}
        height={288}
        className="object-cover object-top w-full h-full"
        onError={() => setFailed(true)}
        priority
      />
    </div>
  )
}
