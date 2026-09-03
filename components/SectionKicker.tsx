import ScrambleText from '@/components/ScrambleText'

// Editorial section header: index number · label · hairline running to the edge.
// The label is the section's real heading (h2) — page has exactly one h1
// (HeroCard), each section below it is an h2, sub-items inside are h3.
export default function SectionKicker({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <span className="micro text-[0.7rem] text-secondary-container">{index}</span>
      <h2 className="micro text-[0.7rem] text-outline">
        <ScrambleText text={label} />
      </h2>
      <span className="hairline flex-1 border-t" />
    </div>
  )
}
