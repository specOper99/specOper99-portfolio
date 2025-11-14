import { useEffect, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: 'Mohammad Nawfal',
  title: 'Creative Technologist | Product Engineer',
  tagline:
    'I design cinematic web moments and ship brave digital products where narrative, motion, and code feel inseparable.',
  location: 'Beirut, Lebanon',
  timezone: 'Asia/Beirut',
  currentMission: 'Leading immersive launchpads for founders & boutique studios',
  availability: "Accepting limited collaborations for Q1 '26",
  focus: ['Spatial web', 'Narrative design', 'Front-end systems'],
  metrics: [
    { label: 'Products launched', value: '24' },
    { label: 'Experiments per year', value: '32' },
    { label: 'Avg. launch uplift', value: '+37%' },
  ],
}

const storyBeats = [
  {
    year: '2025',
    title: 'Freelance Creative Partner',
    description:
      'Designing signature launch experiences for climate tech, wellness, and AI labs. Architecting front-end systems that behave like art installations.',
    impact: 'Built a modular ritual builder reused across 4 product suites.',
  },
  {
    year: '2023-2024',
    title: 'Lead Product Engineer | Lumen Labs',
    description:
      'Owned the zero-to-one narrative web stack for interactive documentaries. Directed motion language and led a squad of two designers + three devs.',
    impact: 'Cut launch timelines by 45% through custom scene composer.',
  },
  {
    year: '2021-2022',
    title: 'Senior Front-end | Northwind',
    description:
      'Scaled a design system for 7 product verticals and introduced world-building workshops for stakeholders.',
    impact: 'Reduced UI defect rate to <1.5% post-release.',
  },
  {
    year: '2017-2020',
    title: 'Founder | Studio Monsoon',
    description:
      'Bootstrapped a tiny lab crafting hybrid interactive stories, pop-up installations, and fintech front doors.',
    impact: 'Shipped 40+ micro experiences and learned to love constraints.',
  },
]

const projects = [
  {
    title: 'Orbital Atlas',
    description:
      'A planetary dashboard for a climate intelligence startup--fuses volumetric weather renders with human-scale storytelling.',
    stack: ['React', 'Three.js', 'WebAudio'],
    year: '2025',
    link: 'https://example.com/orbital-atlas',
  },
  {
    title: 'Pulse Rituals',
    description:
      'Personal operating system for creatives: tangible routines, ambient nudges, and breathable UI inspired by analog synths.',
    stack: ['Next.js', 'Framer Motion', 'Supabase'],
    year: '2024',
    link: 'https://example.com/pulse-rituals',
  },
  {
    title: 'Harbor One',
    description:
      'Interactive annual review for a fintech collective with sonic cues, kinetic typography, and narrative scroll states.',
    stack: ['Astro', 'GSAP', 'Cloudflare Workers'],
    year: '2023',
    link: 'https://example.com/harbor-one',
  },
]

const rituals = [
  {
    title: 'Analog mornings',
    detail: 'Sketching storyboards before touching a keyboard keeps narratives honest.',
    signal: 'Moleskine stack + ink-stained fingers on desk.',
  },
  {
    title: 'Motion club',
    detail: 'Weekly sessions exploring micro-interactions with collaborators globally.',
    signal: 'Playable prototypes in under 60 minutes.',
  },
  {
    title: 'Nightly soundwalks',
    detail: 'Capture ambient city textures and weave them into product soundscapes.',
    signal: 'Library of 400+ original loops.',
  },
]

const socialLinks = [
  { label: 'Email', href: 'mailto:hello@mohammadnawfal.com' },
  { label: 'Dribbble', href: 'https://dribbble.com/' },
  { label: 'GitHub', href: 'https://github.com/specOper99' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'storyline', label: 'Trajectory' },
  { id: 'portfolio', label: 'Selected Work' },
  { id: 'lab', label: 'Rituals' },
  { id: 'contact', label: 'Signal' },
]

const signalNotes = [
  { label: 'Response window', value: '< 24h' },
  { label: 'Best for', value: 'immersive launches, drop campaigns, creative tooling' },
  { label: 'Collab modes', value: 'Fractional leadership | Sprint partner | Advisory' },
]

const formatTime = (timezone) => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    })
    return formatter.format(new Date())
  } catch (err) {
    return 'local time'
  }
}

const CursorGlow = () => {
  const glowRef = useRef(null)

  useEffect(() => {
    const handlePointer = (event) => {
      if (!glowRef.current) return
      glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    window.addEventListener('pointermove', handlePointer)
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
}

const FloatingNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.2 }
    )

    sections.forEach((section) => {
      const target = document.getElementById(section.id)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="floating-nav" aria-label="Section navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? 'is-active' : ''}
        >
          <span>{section.label}</span>
          <div className="nav-dot" />
        </a>
      ))}
    </nav>
  )
}

const SectionHeading = ({ kicker, title, subheading }) => (
  <header className="section-heading">
    <p className="kicker">{kicker}</p>
    <div>
      <h2>{title}</h2>
      <p>{subheading}</p>
    </div>
  </header>
)

const ProjectCard = ({ project, index }) => (
  <article className="project-card" style={{ '--index': index }}>
    <div className="project-meta">
      <p>{project.year}</p>
      <span>{project.stack.join(' | ')}</span>
    </div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <a href={project.link} target="_blank" rel="noreferrer">
      {'Visit case study ->'}
    </a>
  </article>
)

const RitualCard = ({ ritual }) => (
  <article className="ritual-card">
    <div>
      <p className="kicker">Signal</p>
      <p className="signal">{ritual.signal}</p>
    </div>
    <h3>{ritual.title}</h3>
    <p>{ritual.detail}</p>
  </article>
)

function App() {
  const [localTime, setLocalTime] = useState(formatTime(profile.timezone))

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(formatTime(profile.timezone)), 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="site-shell">
      <CursorGlow />
      <div className="noise-layer" aria-hidden="true" />
      <FloatingNav sections={sections} />

      <main>
        <section id="hero" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Portfolio | 2025 Edition</p>
            <h1>
              {profile.name}
              <span>{profile.title}</span>
            </h1>
            <p className="lead">{profile.tagline}</p>

            <div className="hero-tags">
              {profile.focus.map((focus) => (
                <span key={focus}>{focus}</span>
              ))}
            </div>

            <div className="status-card">
              <div>
                <p>Currently</p>
                <strong>{profile.currentMission}</strong>
              </div>
              <div>
                <p>Time in {profile.location}</p>
                <strong>{localTime}</strong>
              </div>
              <div>
                <p>Availability</p>
                <strong>{profile.availability}</strong>
              </div>
            </div>

            <div className="cta-row">
              <a className="primary-cta" href="#portfolio">
                Dive into the work
              </a>
              <a className="ghost-cta" href="mailto:hello@mohammadnawfal.com">
                Book a micro-sprint
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbital-shell">
              <div className="glow-ring" />
              <div className="core-card">
                <p>Since 2017</p>
                <h3>
                  Building <span>bold</span>
                  <br /> entry points
                </h3>
                <p className="microcopy">Crafted from Beirut | shipping worldwide</p>
              </div>
              <ul className="metric-stack">
                {profile.metrics.map((metric) => (
                  <li key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="storyline" className="storyline">
          <SectionHeading
            kicker="Trajectory"
            title="Orbit log"
            subheading="Milestones that shaped how I compose digital experiences."
          />
          <div className="story-grid">
            {storyBeats.map((beat) => (
              <article key={beat.year}>
                <div className="year-chip">{beat.year}</div>
                <h3>{beat.title}</h3>
                <p>{beat.description}</p>
                <p className="impact">{beat.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <SectionHeading
            kicker="Selected work"
            title="Launch systems with personality"
            subheading="Each build is treated as a micro world with bespoke scripts, motion scores, and adaptive theming."
          />

          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="lab" className="lab">
          <SectionHeading
            kicker="Rituals"
            title="Creative operating system"
            subheading="The daily practices that keep the work distinct."
          />

          <div className="ritual-grid">
            {rituals.map((ritual) => (
              <RitualCard key={ritual.title} ritual={ritual} />
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <SectionHeading
            kicker="Signal"
            title="Ready for bold launches"
            subheading="Drop a note if you're building something that needs an unforgettable front door."
          />

          <div className="contact-panel">
            <div>
              <p>
                I sync best with founders, studios, and product leaders who value experimentation, cinematic craft, and fast iteration.
              </p>
              <ul>
                {signalNotes.map((note) => (
                  <li key={note.label}>
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <a className="primary-cta" href="mailto:hello@mohammadnawfal.com">
              Compose an intro email
            </a>
          </div>

          <footer className="footer">
            <p>Copyright {new Date().getFullYear()} {profile.name}. Crafted in a single, intentional take.</p>
            <div className="socials">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
