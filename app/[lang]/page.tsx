import { notFound } from 'next/navigation'
import HeroCard from '@/components/sections/HeroCard'
import TechStack from '@/components/sections/TechStack'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import { getDictionary, hasLocale } from './dictionaries'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
      <HeroCard dict={dict.hero} />
      <TechStack dict={dict.tech} />
      <ProjectsGrid dict={dict.projects} />
      <Experience dict={dict.experience} />
      <Contact dict={dict.contact} />
    </main>
  )
}
