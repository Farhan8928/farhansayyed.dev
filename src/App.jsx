import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Strip from './sections/Strip.jsx'
import Work from './sections/Work.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Stack from './sections/Stack.jsx'
import Contact from './sections/Contact.jsx'
import { AccentProvider } from './lib/accent.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AccentProvider>
        <div className="relative min-h-screen bg-base text-zinc-100">
          <Nav />
          <main>
            <Hero />
            <Strip />
            <Work />
            <Skills />
            <Experience />
            <Stack />
            <Contact />
          </main>
        </div>
      </AccentProvider>
    </MotionConfig>
  )
}
