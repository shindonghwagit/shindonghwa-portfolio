import './ohh.css'
import { IntroLoader } from './components/IntroLoader'
import { Topbar } from './components/Topbar'
import { Ruler } from './components/Ruler'
import { Cursors } from './components/Cursors'
import { Clouds } from './components/Clouds'
import { ChatWidget } from './components/ChatWidget'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Certifications } from './sections/Certifications'
import { Cta } from './sections/Cta'
import { Footer } from './sections/Footer'

export function OhhLanding() {
  return (
    <div className="ohh ohh-sky ohh-grain relative min-h-screen overflow-x-hidden">
      <IntroLoader />
      <Clouds />
      <Ruler />
      <Topbar />
      <Cursors />
      <ChatWidget />

      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Certifications />
        <Cta />
      </main>

      <Footer />
    </div>
  )
}
