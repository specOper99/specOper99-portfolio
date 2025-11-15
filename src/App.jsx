import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: 'Mohammad Nawfal Abdulrahman Elias',
  title: 'Creative Technologist | Senior Software Engineer',
  tagline:
    'I develop mobile application moments and ship brave digital products where narrative, motion, and code feel inseparable.',
  location: 'Iraq',
  timezone: 'Asia/Baghdad',
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
    category: 'Climate launch',
    phase: 'Live',
    spotlight: '72% of visitors explore three or more climate scenes during the first session.',
    accent: '#7c9eff',
    stats: [
      { label: 'Role', value: 'Creative Engineering Lead' },
      { label: 'Timeline', value: '6 weeks' },
      { label: 'Stack depth', value: '3D + audio' },
    ],
  },
  {
    title: 'Pulse Rituals',
    description:
      'Personal operating system for creatives: tangible routines, ambient nudges, and breathable UI inspired by analog synths.',
    stack: ['Next.js', 'Framer Motion', 'Supabase'],
    year: '2024',
    link: 'https://example.com/pulse-rituals',
    category: 'Habit OS',
    phase: 'In rollout',
    spotlight: 'Adaptive ritual cards remix themselves based on time of day + biofeedback data.',
    accent: '#f38ecf',
    stats: [
      { label: 'Role', value: 'Product Engineer' },
      { label: 'Sprint cycles', value: '4' },
      { label: 'Modules', value: '18 ritual packs' },
    ],
  },
  {
    title: 'Harbor One',
    description:
      'Interactive annual review for a fintech collective with sonic cues, kinetic typography, and narrative scroll states.',
    stack: ['Astro', 'GSAP', 'Cloudflare Workers'],
    year: '2023',
    link: 'https://example.com/harbor-one',
    category: 'Fintech story',
    phase: 'Archived',
    spotlight: 'Scroll-synced ledger linework visualizes capital flows as living topology.',
    accent: '#8ff3d9',
    stats: [
      { label: 'Role', value: 'Narrative Director' },
      { label: 'Pages', value: '14 scenes' },
      { label: 'Result', value: '+37% investor time' },
    ],
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
  { id: 'skills', label: 'Skills' },
  { id: 'storyline', label: 'Trajectory' },
  { id: 'portfolio', label: 'Selected Work' },
  { id: 'lab', label: 'Skill Board' },
  { id: 'contact', label: 'Signal' },
]

const signalNotes = [
  { label: 'Response window', value: '< 24h' },
  { label: 'Best for', value: 'immersive launches, drop campaigns, creative tooling' },
  { label: 'Collab modes', value: 'Fractional leadership | Sprint partner | Advisory' },
]

const skills = [
  {
    handle: 'A',
    label: 'Spatial Systems',
    description:
      'Web-based worlds, multi-layer parallax, and narrative scenes that react to scroll, pointer, and audio cues.',
    stack: ['WebGL', 'Three.js', 'Framer Motion'],
    signal: 'A/B spatial states for each chapter',
  },
  {
    handle: 'B',
    label: 'Creative Ops',
    description:
      'Design systems that feel cinematic but stay maintainable—tokens, ritual libraries, and scene composers.',
    stack: ['Design Tokens', 'Storybook', 'GSAP'],
    signal: 'Modular ritual library shipped across suites',
  },
  {
    handle: 'C',
    label: 'Sound-Reactive UI',
    description:
      'Ambient soundwalks feed audio-reactive gradients, glowing HUDs, and subtle haptics that keep pages alive.',
    stack: ['Web Audio', 'Tone.js', 'Custom MIDI'],
    signal: 'Per-section sound cues mapped to state changes',
  },
  {
    handle: 'D',
    label: 'Launch Storytelling',
    description:
      'Campaign timelines, founder spotlights, and drop announcements sequenced like episodic releases.',
    stack: ['Next.js', 'MDX', 'Supabase'],
    signal: 'Drop composer with moment-by-moment pacing',
  },
  {
    handle: 'E',
    label: 'AI Companions',
    description:
      'Lightweight assistants for founders—guiding prompts, tone checkers, and adaptive onboarding flows.',
    stack: ['OpenAI', 'LangChain', 'Cloudflare Workers'],
    signal: 'Pattern library for voice + chat moments',
  },
]

const presenceSignals = [
  {
    label: 'West Coast founder',
    action: 'Replaying Orbital Atlas deck with their product team.',
    time: '2m ago',
    location: 'San Francisco · PST',
    strength: 'Signal strong',
    accent: '#7c9eff',
  },
  {
    label: 'Design studio drop',
    action: 'Pinning Skill Console patterns for next launch.',
    time: '14m ago',
    location: 'Amsterdam · CET',
    strength: 'Curiosity high',
    accent: '#f38ecf',
  },
  {
    label: 'Wellness collective',
    action: 'Requesting micro-sprint availability for Q1.',
    time: '33m ago',
    location: 'Singapore · SGT',
    strength: 'Awaiting reply',
    accent: '#8ff3d9',
  },
]

const formatTime = (timezone) => {
  if (!timezone) return ''
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(new Date())
  } catch (error) {
    console.error('Failed to format time', error)
    return ''
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
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.35
      let currentSection = sections[0]?.id ?? ''

      for (const section of sections) {
        const node = document.getElementById(section.id)
        if (!node) continue
        const rect = node.getBoundingClientRect()

        if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
          currentSection = section.id
          break
        }

        if (rect.top > viewportAnchor) {
          currentSection = section.id
          break
        }

        currentSection = section.id
      }

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections])

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, ratio)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="floating-nav" aria-label="Section navigation">
      <div className="nav-track" aria-hidden="true">
        <span style={{ height: `${scrollProgress}%` }} />
      </div>
      <div className="nav-links">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={activeSection === section.id ? 'is-active' : ''}
            aria-current={activeSection === section.id ? 'location' : undefined}
            onFocus={() => setActiveSection(section.id)}
          >
            <span>{section.label}</span>
            <div className="nav-dot" />
          </a>
        ))}
      </div>
    </nav>
  )
}

const StatusHUD = ({ profile, localTime, theme, onToggleTheme, onOpenMenu }) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(Math.round(Math.min(100, Math.max(0, ratio))))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside className="status-hud" aria-live="polite">
      <div className="hud-left">
        <span className="status-pill" aria-label="Live collaboration status">
          <span className="status-dot" aria-hidden="true" />
          Online now
        </span>
        <div className="hud-meta">
          <p>{profile.name}</p>
          <span>
            {profile.location} · {localTime}
          </span>
        </div>
      </div>

      <div className="hud-tools">
        <div className="scroll-chip" aria-label="Scroll progress">
          <span>{scrollProgress}%</span>
          <small>scroll</small>
        </div>
        <button className="menu-toggle" type="button" onClick={onOpenMenu} aria-haspopup="dialog">
          <span>Menu</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="theme-toggle" type="button" onClick={onToggleTheme}>
          <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          <div className="toggle-indicator" aria-hidden="true">
            <div data-theme-indicator={theme} />
          </div>
        </button>
      </div>
    </aside>
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

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const [tiltStyle, setTiltStyle] = useState({})
  const [copyLabel, setCopyLabel] = useState('Copy brief')

  const prefersFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches

  const handlePointerMove = (event) => {
    if (!prefersFinePointer()) return
    const node = cardRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    const rotateY = ((relativeX - rect.width / 2) / rect.width) * 16
    const rotateX = ((relativeY - rect.height / 2) / rect.height) * -16

    setTiltStyle({
      transform:
        `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
    })
  }

  const resetTilt = () => setTiltStyle({})

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.description)
      setCopyLabel('Copied!')
      setTimeout(() => setCopyLabel('Copy brief'), 1800)
    } catch {
      setCopyLabel('Copy blocked')
      setTimeout(() => setCopyLabel('Copy brief'), 2000)
    }
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      style={{ '--index': index, '--accent': project.accent, ...tiltStyle }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerUp={resetTilt}
    >
      <div className="project-beacon">
        <div className="beacon-grid">
          <div>
            <p className="beacon-label">Mode</p>
            <strong>{project.category}</strong>
          </div>
          <div>
            <p className="beacon-label">Phase</p>
            <strong>{project.phase}</strong>
          </div>
          <div>
            <p className="beacon-label">Launch</p>
            <strong>{project.year}</strong>
          </div>
        </div>
        <p className="beacon-spotlight">{project.spotlight}</p>
        <div className="beacon-radar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="project-stage">
        <div className="stage-grid">
          <div className="stage-screen">
            <div className="stage-top">
              <span className="stage-category">{project.category}</span>
              <span className="stage-phase">{project.phase}</span>
            </div>
            <p className="stage-spotlight">{project.spotlight}</p>
            <div className="stage-stack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="stage-overlay" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="project-body">
        <div className="project-meta">
          <p>{project.year}</p>
          <span>{project.stack.join(' | ')}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="project-stats">
          {project.stats.map((stat) => (
            <li key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="project-actions">
        <a className="primary-link" href={project.link} target="_blank" rel="noreferrer">
          Explore case study
        </a>
        <button type="button" onClick={handleCopy} className="ghost-link">
          {copyLabel}
        </button>
      </div>
    </article>
  )
}

const SkillConsole = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState(skills[0])
  const [keyTrail, setKeyTrail] = useState([])
  const [hint, setHint] = useState('Press any letter or number key to shuffle focus areas.')
  const skillCount = skills.length

  const routeSkillForKey = useCallback(
    (key) => {
      if (!skillCount) return
      const index = key.charCodeAt(0) % skillCount
      const nextSkill = skills[index]
      setActiveSkill(nextSkill)
      setHint(`Key ${key} routed to ${nextSkill.label}`)
      setKeyTrail((prev) => [key, ...prev].slice(0, 6))
    },
    [skillCount, skills]
  )

  useEffect(() => {
    const handleKey = (event) => {
      if (event.metaKey || event.altKey || event.ctrlKey) return
      const key = event.key.toUpperCase()
      if (!/^[A-Z0-9]$/.test(key)) return
      const target = event.target
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }

      event.preventDefault()
      routeSkillForKey(key)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [routeSkillForKey])

  const handleSkillSelect = (skill, source) => {
    setActiveSkill(skill)
    setHint(`${skill.label} locked via ${source}`)
  }

  return (
    <div className="skill-console">
      <div className="skill-left">
        <div className="skill-prompt">
          <p className="kicker">Input playground</p>
          <h3>Tap any key to rotate capabilities.</h3>
          <p className="skill-hint" aria-live="polite">
            {hint}
          </p>
        </div>

        <div className="skill-trail" aria-live="polite">
          {keyTrail.length ? (
            keyTrail.map((key, index) => <span key={`${key}-${index}`}>{key}</span>)
          ) : (
            <span className="trail-placeholder">Awaiting input</span>
          )}
        </div>

        <div className="skill-grid">
          {skills.map((skill) => (
            <button
              key={skill.label}
              type="button"
              className={`skill-chip${activeSkill.label === skill.label ? ' is-active' : ''}`}
              onClick={() => handleSkillSelect(skill, 'chip tap')}
              onMouseEnter={() => handleSkillSelect(skill, 'hover cue')}
              aria-pressed={activeSkill.label === skill.label}
            >
              <span>{skill.label}</span>
              <small>{skill.stack.join(' · ')}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="skill-detail" aria-live="polite">
        <div className="skill-handle">Key {activeSkill.handle}</div>
        <h3>{activeSkill.label}</h3>
        <p>{activeSkill.description}</p>
        <ul className="skill-tags">
          {activeSkill.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="skill-signal">{activeSkill.signal}</p>
      </div>
    </div>
  )
}

const SkillBoardSection = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState(skills[0])
  const boardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    if (!skills.length) return undefined
    const rotation = setInterval(() => {
      setActiveSkill((prev) => {
        if (!prev) return skills[0]
        const currentIndex = skills.findIndex((skill) => skill.label === prev.label)
        const nextIndex = (currentIndex + 1) % skills.length
        return skills[nextIndex]
      })
    }, 5200)
    return () => clearInterval(rotation)
  }, [skills])

  const prefersFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches

  const handlePointerMove = (event) => {
    if (!prefersFinePointer()) return
    const node = boardRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    const rotateY = ((relativeX - rect.width / 2) / rect.width) * 10
    const rotateX = ((relativeY - rect.height / 2) / rect.height) * -10
    setTilt({ rotateX, rotateY })
  }

  const resetTilt = () => setTilt({ rotateX: 0, rotateY: 0 })

  return (
    <section id="lab" className="skill-board">
      <SectionHeading
        kicker="Skill stage"
        title="3D operating grid"
        subheading="A living board highlighting the disciplines in rotation right now."
      />

      <div className="board-layout">
        <div
          ref={boardRef}
          className="board-surface"
          style={{ transform: `perspective(1300px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          onPointerUp={resetTilt}
        >
          <div className="board-network" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={`grid-${index}`} />
            ))}
          </div>

          <div className="board-grid">
            {skills.map((skill) => (
              <button
                key={skill.label}
                type="button"
                className={`board-card${activeSkill?.label === skill.label ? ' is-active' : ''}`}
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
              >
                <span className="card-handle">{skill.handle}</span>
                <strong>{skill.label}</strong>
                <small>{skill.stack.join(' · ')}</small>
                <span className="card-spark" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="board-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="board-detail" aria-live="polite">
          <p className="kicker">Signal lock</p>
          <h3>{activeSkill?.label}</h3>
          <p>{activeSkill?.description}</p>
          <p className="detail-signal">{activeSkill?.signal}</p>

          <ul className="detail-stack">
            {activeSkill?.stack.map((item, index) => (
              <li key={item}>
                <span>{item}</span>
                <div className="spectrum-track">
                  <div style={{ width: `${90 - index * 12}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="board-spectrum">
            {skills.slice(0, 3).map((skill) => (
              <div key={skill.label} className="spectrum-card">
                <p>{skill.label}</p>
                <span>{skill.stack.length} modules</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const HeroSection = ({ profile, localTime, presenceSignals }) => {
  const heroVisualRef = useRef(null)
  const [heroMotion, setHeroMotion] = useState({ rotateX: 0, rotateY: 0 })
  const [presenceIndex, setPresenceIndex] = useState(0)

  const prefersFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches

  const handleHeroPointer = (event) => {
    if (!prefersFinePointer()) return
    const node = heroVisualRef.current
    if (!node) return

    const rect = node.getBoundingClientRect()
    const relativeX = event.clientX - rect.left
    const relativeY = event.clientY - rect.top
    const rotateY = ((relativeX - rect.width / 2) / rect.width) * 10
    const rotateX = ((relativeY - rect.height / 2) / rect.height) * -10
    setHeroMotion({ rotateX, rotateY })
  }

  const resetHeroPointer = () => setHeroMotion({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    if (!presenceSignals?.length) return undefined
    const ticker = setInterval(() => {
      setPresenceIndex((prev) => (prev + 1) % presenceSignals.length)
    }, 4200)
    return () => clearInterval(ticker)
  }, [presenceSignals?.length])

  const activePresence = presenceSignals?.[presenceIndex]

  return (
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

        <div className="hero-telemetry">
          <div className="telemetry-card" aria-live="polite">
            <p className="kicker">Live signal</p>
            <h4>{activePresence?.label || 'Signal stable'}</h4>
            <p>{activePresence?.action || 'Visitors are exploring the latest launch systems.'}</p>
            <div className="telemetry-meta">
              <span>{activePresence?.time || 'moments ago'}</span>
              <span>{activePresence?.location || profile.location}</span>
            </div>
          </div>

          <div className="presence-radar" role="list">
            {presenceSignals?.map((signal) => (
              <article key={signal.label} className="presence-card" role="listitem">
                <div className="presence-header">
                  <span className="presence-dot" style={{ background: signal.accent, color: signal.accent }} />
                  <p>{signal.label}</p>
                  <small>{signal.time}</small>
                </div>
                <p className="presence-action">{signal.action}</p>
                <div className="presence-meta">
                  <span>{signal.location}</span>
                  <strong>{signal.strength}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={heroVisualRef}
        className="hero-visual"
        style={{
          transform: `perspective(1200px) rotateX(${heroMotion.rotateX}deg) rotateY(${heroMotion.rotateY}deg)`,
        }}
        onPointerMove={handleHeroPointer}
        onPointerLeave={resetHeroPointer}
        onPointerUp={resetHeroPointer}
      >
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
  )
}

const SkillsSection = ({ skills }) => (
  <section id="skills" className="skills">
    <SectionHeading
      kicker="Skill console"
      title="Interactive capability matrix"
      subheading="Hit any key (or tap the chips) to shuffle the disciplines I mix into narrative product launches."
    />
    <SkillConsole skills={skills} />
  </section>
)

const StorylineSection = ({ storyBeats }) => {
  const [activeBeat, setActiveBeat] = useState(storyBeats[0])

  return (
    <section id="storyline" className="storyline">
      <SectionHeading
        kicker="Trajectory"
        title="Orbit log"
        subheading="Milestones that shaped how I compose digital experiences."
      />
      <div className="story-layout">
        <div className="story-grid">
          {storyBeats.map((beat) => (
            <article
              key={beat.year}
              className={activeBeat.year === beat.year ? 'is-active' : ''}
              onMouseEnter={() => setActiveBeat(beat)}
              onFocus={() => setActiveBeat(beat)}
              tabIndex={0}
            >
              <div className="year-chip">{beat.year}</div>
              <h3>{beat.title}</h3>
              <p>{beat.description}</p>
              <p className="impact">{beat.impact}</p>
            </article>
          ))}
        </div>

        <div className="story-spotlight" aria-live="polite">
          <p className="kicker">Now exploring</p>
          <h3>{activeBeat.title}</h3>
          <p>{activeBeat.description}</p>
          <p className="impact">{activeBeat.impact}</p>
        </div>
      </div>
    </section>
  )
}

const PortfolioSection = ({ projects }) => (
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
)

const ContactSection = ({ signalNotes, socialLinks, profile }) => (
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
      <p>
        Copyright {new Date().getFullYear()} {profile.name}. Crafted in a single, intentional
        take.
      </p>
      <div className="socials">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  </section>
)

const GlobalMenu = ({ onClose, sections, socialLinks, theme, onToggleTheme }) => {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [status, setStatus] = useState('Ready for commands')
  const panelRef = useRef(null)
  const searchRef = useRef(null)

  const emailLink = socialLinks.find((link) => link.href.startsWith('mailto:'))
  const emailAddress = emailLink ? emailLink.href.replace('mailto:', '') : 'hello@mohammadnawfal.com'

  useEffect(() => {
    const focusTimer = requestAnimationFrame(() => searchRef.current?.focus())

    const handleTabTrap = (event) => {
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTabTrap)
    return () => {
      cancelAnimationFrame(focusTimer)
      document.removeEventListener('keydown', handleTabTrap)
    }
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const sectionCommands = sections.map((section) => ({
    id: `section-${section.id}`,
    type: 'section',
    label: section.label,
    meta: section.id,
    metaLabel: `/${section.id}`,
    keywords: section.id,
  }))

  const actionCommands = [
    {
      id: 'action-copy-email',
      type: 'action',
      label: 'Copy email address',
      meta: emailAddress,
      metaLabel: emailAddress,
      keywords: 'email clipboard',
      autoClose: false,
      handler: async () => {
        try {
          await navigator.clipboard.writeText(emailAddress)
          setStatus('Email copied to clipboard')
        } catch {
          setStatus('Clipboard access blocked')
        }
      },
    },
    {
      id: 'action-toggle-theme',
      type: 'action',
      label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      meta: 'appearance',
      metaLabel: 'Appearance',
      keywords: 'theme appearance',
      autoClose: false,
      handler: () => {
        onToggleTheme()
        setStatus(`Theme set to ${theme === 'dark' ? 'light' : 'dark'}`)
      },
    },
  ]

  const socialCommands = socialLinks.map((link) => ({
    id: `social-${link.label}`,
    type: 'social',
    label: `Open ${link.label}`,
    meta: link.href,
    metaLabel: link.href.replace(/^https?:\/\//, '').replace('mailto:', ''),
    keywords: link.label.toLowerCase(),
    href: link.href,
  }))

  const allCommands = [...sectionCommands, ...actionCommands, ...socialCommands]

  const filteredCommands = allCommands.filter((command) => {
    if (!query) return true
    const target = `${command.label} ${command.metaLabel} ${command.keywords || ''}`.toLowerCase()
    return target.includes(query.toLowerCase())
  })

  const commandCount = filteredCommands.length
  const highlightedIndex = commandCount === 0 ? 0 : Math.min(activeIndex, commandCount - 1)

  const handleCommandSelect = async (command) => {
    if (!command) return

    if (command.type === 'section') {
      onClose()
      requestAnimationFrame(() => {
        const node = document.getElementById(command.meta)
        node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    if (command.type === 'social') {
      const target = command.href.startsWith('mailto:') ? '_self' : '_blank'
      window.open(command.href, target, 'noreferrer')
      onClose()
      return
    }

    if (command.type === 'action') {
      await command.handler()
      if (command.autoClose !== false) {
        onClose()
      }
    }
  }

  const handleKeyNavigation = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => {
        if (commandCount === 0) return 0
        const normalized = Math.min(prev, commandCount - 1)
        return (normalized + 1) % commandCount
      })
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => {
        if (commandCount === 0) return 0
        const normalized = Math.min(prev, commandCount - 1)
        return (normalized - 1 + commandCount) % commandCount
      })
    } else if (event.key === 'Enter') {
      event.preventDefault()
      handleCommandSelect(filteredCommands[highlightedIndex])
    }
  }

  const activeId = filteredCommands[highlightedIndex]?.id

  return (
    <div className="command-overlay" role="presentation" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="command-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Global navigation menu"
        aria-activedescendant={activeId ? `command-${activeId}` : undefined}
        ref={panelRef}
        onKeyDown={handleKeyNavigation}
      >
        <div className="command-header">
          <div>
            <p className="kicker">Command palette</p>
            <h3>Jump anywhere in the orbit</h3>
          </div>
          <button type="button" className="ghost-link" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="command-search">
          <span aria-hidden="true">⌘K</span>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            placeholder="Type a command or search for a section"
            aria-label="Search commands"
          />
        </div>

        <div className="command-results" role="listbox">
          {filteredCommands.length === 0 ? (
            <p className="command-empty">No matches. Try a different keyword.</p>
          ) : (
            <ul>
              {filteredCommands.map((command, index) => (
                <li key={command.id}>
                  <button
                    type="button"
                    id={`command-${command.id}`}
                    role="option"
                    aria-selected={highlightedIndex === index}
                    className={`command-item${highlightedIndex === index ? ' is-active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleCommandSelect(command)}
                  >
                    <div>
                      <span className="command-title">{command.label}</span>
                      <small>{command.metaLabel}</small>
                    </div>
                    <span className="command-type">{command.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="command-status" aria-live="polite">
          {status}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [localTime, setLocalTime] = useState(formatTime(profile.timezone))
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme-preference')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(formatTime(profile.timezone)), 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.dataset.theme = theme
    window.localStorage.setItem('theme-preference', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleShortcut = (event) => {
      const key = event.key.toLowerCase()
      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault()
        setIsMenuOpen((prev) => !prev)
      }
      if (key === 'escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <div className="site-shell">
      <CursorGlow />
      <div className="noise-layer" aria-hidden="true" />
      <StatusHUD
        profile={profile}
        localTime={localTime}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMenu={openMenu}
      />
      <FloatingNav sections={sections} />

      <main>
        <HeroSection profile={profile} localTime={localTime} presenceSignals={presenceSignals} />
        <SkillsSection skills={skills} />
        <StorylineSection storyBeats={storyBeats} />
        <PortfolioSection projects={projects} />
        <SkillBoardSection skills={skills} />
        <ContactSection signalNotes={signalNotes} socialLinks={socialLinks} profile={profile} />
      </main>
      {isMenuOpen ? (
        <GlobalMenu
          onClose={closeMenu}
          sections={sections}
          socialLinks={socialLinks}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : null}
    </div>
  )
}

export default App
