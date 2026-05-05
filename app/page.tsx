import HeroCard from '@/components/sections/HeroCard'
import TechStack from '@/components/sections/TechStack'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(200px,auto)]">
        {/* Row 1: Hero + Tech Stack */}
        <HeroCard />
        <TechStack />

        {/* Row 2: Projects */}
        <ProjectsGrid />

        {/* Row 3: Experience + Contact */}
        <Experience />
        <Contact />
      </div>
    </main>
  )
}
