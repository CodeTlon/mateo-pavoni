import ScrambleText from '@/components/ScrambleText'

// Editorial section header: index number · label · hairline running to the edge.
export default function SectionKicker({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <span className="micro text-[0.7rem] text-secondary-container">{index}</span>
      <ScrambleText className="micro text-[0.7rem] text-outline" text={label} />
      <span className="hairline flex-1 border-t" />
    </div>
  )
}
