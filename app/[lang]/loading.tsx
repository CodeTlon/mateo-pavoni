import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 pt-28 md:pt-32 pb-16 flex flex-col gap-12 md:gap-8">
      {/* Hero + tech stack row */}
      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-8 flex flex-col gap-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-2/3 max-w-xl" />
        </div>
        <div className="md:col-span-4">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      {/* Projects grid (full width) */}
      <Skeleton className="h-96 w-full" />

      {/* Experience + contact row */}
      <div className="grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-8">
          <Skeleton className="h-72 w-full" />
        </div>
        <div className="md:col-span-4">
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    </main>
  )
}
