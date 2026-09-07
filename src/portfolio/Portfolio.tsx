import './portfolio.css'
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

export function Portfolio() {
  return (
    <div className="pf pf-sky pf-grain relative min-h-screen overflow-x-clip">
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
