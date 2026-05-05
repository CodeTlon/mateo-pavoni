'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Avatar() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-primary-container border-2 border-surface-container-high flex items-center justify-center shrink-0 relative z-10">
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
    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-surface-container-high shrink-0 relative z-10 bg-primary-container">
      <Image
        src="/mateo.jpg"
        alt="Mateo Pavoni"
        width={144}
        height={144}
        className="object-cover object-top w-full h-full"
        onError={() => setFailed(true)}
        priority
      />
    </div>
  )
}
