import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import profileImg from './assets/profile.jpg'
import './App.css'

function CursorGlitter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Array<{
    x: number; y: number; vx: number; vy: number
    size: number; alpha: number; decay: number
    color: string
  }>>([])
  const mouse = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  const COLORS = [
    'rgba(167, 139, 218,',
    'rgba(139, 108, 193,',
    'rgba(180, 160, 230,',
    'rgba(120, 80, 200,',
    'rgba(200, 180, 255,',
  ]

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
    for (let i = 0; i < 2; i++) {
      particles.current.push({
        x: e.clientX + (Math.random() - 0.5) * 6,
        y: e.clientY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1 - 0.3,
        size: Math.random() * 1.2 + 0.4,
        alpha: 0.8,
        decay: Math.random() * 0.018 + 0.012,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const ps = particles.current
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        if (p.alpha <= 0) { ps.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${p.alpha})`
        ctx.fill()
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [onMove])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}

type SectionId =
  | 'home'
  | 'projects'
  | 'skills'
  | 'certificates'
  | 'achievements'
  | 'about'
  | 'contact'

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.477 2 2 6.49 2 12.029c0 4.426 2.865 8.18 6.842 9.504.5.094.684-.218.684-.486 0-.24-.009-.874-.014-1.716-2.782.606-3.369-1.345-3.369-1.345-.455-1.162-1.11-1.472-1.11-1.472-.908-.627.069-.615.069-.615 1.004.071 1.532 1.037 1.532 1.037.892 1.54 2.341 1.095 2.91.838.091-.654.35-1.095.636-1.347-2.221-.257-4.555-1.117-4.555-4.971 0-1.097.39-1.994 1.03-2.697-.104-.258-.447-1.295.098-2.7 0 0 .84-.27 2.75 1.03a9.523 9.523 0 0 1 2.504-.338 9.5 9.5 0 0 1 2.504.338c1.908-1.3 2.747-1.03 2.747-1.03.547 1.405.204 2.442.1 2.7.64.703 1.028 1.6 1.028 2.697 0 3.863-2.339 4.711-4.566 4.963.359.31.679.92.679 1.856 0 1.339-.012 2.419-.012 2.748 0 .27.18.584.689.485C19.14 20.205 22 16.453 22 12.03 22 6.49 17.523 2 12 2Z"
    />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.339 17.339H6.162V9.75H8.34v7.589ZM7.251 8.808a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm11.088 8.531h-2.177v-3.628c0-.865-.017-1.978-1.207-1.978-1.207 0-1.392.943-1.392 1.916v3.69h-2.177V9.75h2.089v1.033h.03c.291-.55 1.002-1.131 2.064-1.131 2.207 0 2.613 1.453 2.613 3.343v4.344Z"
    />
  </svg>
)

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12.04 2C6.59 2 2.18 6.41 2.18 11.86c0 1.78.47 3.5 1.36 5.02l-1.44 4.23 4.36-1.39c1.45.8 3.08 1.22 4.71 1.22h.01c5.45 0 9.86-4.41 9.86-9.86 0-2.63-1.03-5.11-2.91-6.98C17.15 3.03 14.68 2 12.04 2Zm5.8 13.97c-.26.73-1.35 1.33-1.84 1.36-.47.02-1.03.02-1.66-.1s-1.53-.5-2.64-1.04c-2.32-1.12-3.83-3.73-3.95-3.9-.12-.17-.94-1.25-.94-2.38s.6-1.69.81-1.92c.21-.23.46-.29.61-.29h.44c.14.01.33-.05.52.4.19.45.64 1.55.69 1.66.05.11.08.24.02.39-.06.15-.09.24-.17.36-.09.12-.19.26-.27.35-.09.09-.18.19-.08.36.1.17.43.71.92 1.15.64.57 1.18.75 1.35.84.17.09.27.08.37-.05.1-.12.43-.5.55-.67.12-.17.23-.14.39-.08.16.06 1.04.49 1.22.58.18.09.3.14.34.21.04.07.04.76-.22 1.49Z"
    />
  </svg>
)

const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M4 5h16a2 2 0 0 1 2 2v10c0 1.103-.897 2-2 2H4a2 2 0 0 1-2-2V7c0-1.103.897-2 2-2Zm8 7.236L4.803 7.5H4l8 5.764L20 7.5h-.803L12 12.236Z"
    />
  </svg>
)

type SocialLink = {
  id: 'github' | 'linkedin' | 'email' | 'whatsapp'
  label: string
  href: string
  icon: ReactNode
  target?: '_blank' | '_self'
  rel?: string
}

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/nes268',
    icon: <GithubIcon />,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/neshandra-g286',
    icon: <LinkedinIcon />,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:neshandra07@gmail.com',
    icon: <EnvelopeIcon />,
    target: '_self',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/916383433288?text=Hi%20Neshandra%20G%2C%20let%E2%80%99s%20connect%21',
    icon: <WhatsappIcon />,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]

const SPLASH_TEXT = "NESHANDRA G'S PORTFOLIO"
const EYEBROW_TEXT = "Hi, I'm Neshandra G"

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, 60)
    return () => clearTimeout(timer)
  }, [started, displayed, text])

  return (
    <span className="typewriter">
      {displayed}
      <motion.span
        className="typewriter-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  )
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="splash-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.h1
        className="splash-title"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.3 },
          },
        }}
        onAnimationComplete={(): void => {
          setTimeout(onComplete, 800)
        }}
      >
        {SPLASH_TEXT.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className={char === ' ' ? 'splash-space' : 'splash-char'}
            variants={{
              hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        className="splash-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [revealedSections, setRevealedSections] = useState<Set<SectionId>>(new Set(['home']))
  const [modalCertificate, setModalCertificate] = useState<{
    title: string
    issuer: string
    image: string
    externalUrl?: string
  } | null>(null)

  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    home: null,
    projects: null,
    skills: null,
    certificates: null,
    achievements: null,
    about: null,
    contact: null,
  })

  useEffect(() => {
    let ticking = false

    const findClosestSection = () => {
      const target = window.innerHeight * 0.35
      let closest: SectionId | null = null
      let closestDist = Infinity

      for (const [id, el] of Object.entries(sectionRefs.current)) {
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue

        const clampedTarget = Math.max(rect.top, Math.min(target, rect.bottom))
        const dist = Math.abs(clampedTarget - target)

        if (dist < closestDist) {
          closestDist = dist
          closest = id as SectionId
        }
      }

      if (closest) {
        setActiveSection((current) => (current === closest ? current : closest))
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          findClosestSection()
          ticking = false
        })
      }
    }

    if (showSplash) return

    window.addEventListener('scroll', onScroll, { passive: true })
    findClosestSection()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [showSplash])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId
            setRevealedSections((prev) => {
              if (prev.has(id)) return prev
              const next = new Set(prev)
              next.add(id)
              return next
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (showSplash) return

    const sections = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[]
    sections.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [showSplash])

  const registerSection = (id: SectionId) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element
  }

  const handleNavigate = (id: SectionId) => {
    setActiveSection((current) => (current === id ? current : id))

    const section = sectionRefs.current[id]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCertificateClick = (certificate: {
    title: string
    issuer: string
    image: string
    externalUrl?: string
  }) => {
    if (certificate.externalUrl) {
      window.open(certificate.externalUrl, '_blank', 'noopener,noreferrer')
      return
    }
    setModalCertificate(certificate)
  }

  const renderSectionContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'home':
        return (
          <div className="section-content hero">
            <motion.div
              className="home-layout"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="home-intro">
                <span className="eyebrow">
                  <Typewriter text={EYEBROW_TEXT} delay={600} />
                </span>
                <h1>Neshandra G</h1>
                <p className="hero-tagline">
                  Aspiring IT Professional | Passionate about AI, Full-Stack Development & Problem
                  Solving
                </p>
                <p className="hero-body">
                  A driven Information Technology student with a strong foundation in programming,
                  problem-solving, and modern technologies. A consistent performer, eager
                  to contribute to innovative tech solutions while continuously expanding real-world
                  development and system-building skills.
                </p>
              </div>
              <div className="home-profile">
                <div className="profile-orbit">
                  <motion.div
                    className="profile-shadow-ring"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="profile-glow"
                    animate={{
                      scale: [1, 1.12, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="profile-photo">
                    <img src={profileImg} alt="Neshandra G portrait" />
                  </div>
                  <motion.div
                    className="orbit-outline"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="home-info-pills"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                'Tambaram West, Chennai, India',
                'Full Stack Developer',
                'neshandra07@gmail.com',
              ].map((detail) => (
                <div key={detail} className="info-pill glass-card">
                  <span>{detail}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="home-socials"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="social-label">Connect</span>
              <div className="social-buttons" aria-label="Connect with Neshandra">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    className={`social-button ${link.id}`}
                    aria-label={link.label}
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon}
                    <span className="social-text">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )
      case 'projects':
        return (
          <div className="section-content projects">
            <div className="section-header">
              <h1>Projects</h1>
            </div>
            <motion.div
              className="projects-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              {[
                {
                  title: 'House Price Prediction',
                  description:
                    'Regression model predicting house prices using location, area, and amenity features with a full data pipeline covering cleaning, training, evaluation, and visualization.',
                  tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
                  codeUrl: '#',
                },
                {
                  title: 'Compliance & Startup Management Platform',
                  description:
                    'Dashboard enabling startups to manage compliance documents, legal filings, and reminders with scalable multi-database APIs and GridFS-powered document handling.',
                  tech: ['React.js', 'Tailwind CSS', 'Express.js', 'MongoDB', 'Node.js'],
                  codeUrl: '#',
                },
                {
                  title: 'STOCKQ — Stock Price Prediction System',
                  description:
                    'End-to-end stock price prediction system combining historical market data, regression-based ML models via a Flask backend, and a React.js frontend for interactive forecasting.',
                  tech: ['React.js', 'Python', 'Flask', 'ML', 'Tailwind CSS'],
                  codeUrl: '#',
                },
              ].map((project) => (
                <motion.article
                  key={project.title}
                  className="project-card"
                  variants={staggerItem}
                >
                  <div className="card-sheen" />
                  <div className="card-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tag-list">
                      {project.tech.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        )
      case 'skills':
        return (
          <div className="section-content skills-grid">
            <div className="section-header">
              <h1>Skills</h1>
            </div>
            <motion.ul
              className="skills-flat"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              {['C++', 'C Language', 'Python', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'DSA', 'Git', 'GitHub'].map((skill) => (
                <motion.li key={skill} variants={staggerItem}>
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )
      case 'certificates':
        return (
          <div className="section-content certificates-grid">
            <div className="section-header">
              <h1>Certificates</h1>
            </div>
            <motion.div
              className="certificate-gallery"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              {[
                {
                  title: 'Introduction to Modern AI',
                  issuer: 'Cisco Networking Academy',
                  image: 'cert-modern-ai.jpg',
                  externalUrl:
                    'https://drive.google.com/file/d/1QLjePvCB1YOF75o7fQgGsujT1Km7tgsT/view?usp=drivesdk',
                },
                {
                  title: 'Introduction to IoT and Digital Transformation',
                  issuer: 'Cisco Networking Academy',
                  image: 'cert-iot-dx.jpg',
                  externalUrl:
                    'https://drive.google.com/file/d/1H8ojZk43XvAHOAOsCg5R2pzweDYQXrg_/view?usp=drivesdk',
                },
                {
                  title: 'AWS Cloud Practitioner Essentials',
                  issuer: 'AWS Training',
                  image: 'cert-aws-cloud-practitioner.jpg',
                  externalUrl:
                    'https://drive.google.com/file/d/1u7-UVdjkQuUw9yRACL-OzkwUNMsfzMCO/view?usp=drivesdk',
                },
                {
                  title: 'Introduction to Internet of Things',
                  issuer: 'NPTEL',
                  image: 'cert-nptel-iot.jpg',
                  externalUrl:
                    'https://drive.google.com/file/d/14LUT7KScPQYf6GF9VY009sFhAA8sSL9V/view?usp=sharing',
                },
              ].map((certificate) => (
                <motion.div key={certificate.title} variants={staggerItem}>
                  <button
                    type="button"
                    className="certificate-card glass-card"
                    onClick={() => handleCertificateClick(certificate)}
                  >
                    <div className="certificate-thumb">
                      <span aria-hidden="true" className="certificate-glow" />
                      <span className="certificate-title">{certificate.title}</span>
                    </div>
                    <div className="certificate-meta">
                      <span>{certificate.title}</span>
                      <p>{certificate.issuer}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )
      case 'achievements':
        return (
          <div className="section-content achievements-section">
            <div className="section-header">
              <h1>Achievements</h1>
            </div>
            <motion.div
              className="achievements-list"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              <motion.div className="achievement-item glass-card" variants={staggerItem}>
                <span className="achievement-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></span>
                <div>
                  <h3>LeetCode: 300+ problems solved</h3>
                  <p>Consistent problem-solving across data structures, algorithms, and competitive programming.</p>
                </div>
              </motion.div>
              <motion.div className="achievement-item glass-card" variants={staggerItem}>
                <span className="achievement-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg></span>
                <div>
                  <h3><a href="https://drive.google.com/file/d/1E_TkE-e1wQ1jcO0xtJnrHQDYYyXsaE1p/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">AWS ImpactX Challenge IIT Bombay</a></h3>
                  <p>Finalist</p>
                </div>
              </motion.div>
              <motion.div className="achievement-item glass-card" variants={staggerItem}>
                <span className="achievement-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg></span>
                <div>
                  <h3><a href="https://drive.google.com/file/d/17Q0j5mByhHtDxFTfGETDEUKyRaUNwimz/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">Amaravati Quantum Valley Hackathon '25</a></h3>
                  <p>Finalist</p>
                </div>
              </motion.div>
              <motion.div className="achievement-item glass-card" variants={staggerItem}>
                <span className="achievement-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg></span>
                <div>
                  <h3>Zenith (Hyderabad) 2025</h3>
                  <p>Final Round</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )
      case 'about':
        return (
          <div className="section-content about-section">
            <h1>About Me</h1>
            <p>
              Aspiring IT professional specializing in full-stack development, with growing expertise
              in AI and a strong commitment to inclusive design. I enjoy building end-to-end
              solutions that turn complex problems into simple, meaningful user experiences.
            </p>
            <motion.div
              className="about-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              <motion.article className="glass-card" variants={staggerItem}>
                <h3>Education</h3>
                <p>B.Tech – Information Technology</p>
                <p>Chennai Institute of Technology</p>
                <span className="about-note">2024–2028</span>
                <span className="about-note">CGPA 9.13</span>
              </motion.article>
              <motion.article className="glass-card" variants={staggerItem}>
                <h3>Experience</h3>
                <ul className="about-list">
                  <li>
                    <strong>Frontend Developer – CITBIF</strong>
                    <span>May 2025 – Jun 2025</span>
                    <p>Built modular React + Tailwind interfaces, including upload flows and dashboards.</p>
                  </li>
                  <li>
                    <strong>AIML Intern – Edunet Foundation</strong>
                    <span>Oct 2025 – Nov 2025</span>
                    <p>Co-created EVBot, an AI assistant for EV maintenance and battery insights.</p>
                  </li>
                </ul>
              </motion.article>
              <motion.article className="glass-card" variants={staggerItem}>
                <h3>Organizations</h3>
                <ul className="about-list">
                  <li>
                    <strong>Impact</strong>
                    <p>Figma & Canva Designer crafting visual assets for events.</p>
                  </li>
                  <li>
                    <strong>Trojans</strong>
                    <p>Event Organizer coordinating tech-community experiences.</p>
                  </li>
                </ul>
              </motion.article>
            </motion.div>
          </div>
        )
      case 'contact':
        return (
          <div className="section-content contact-section">
            <h1>Contact</h1>
            <div className="contact-grid">
              <div className="glass-card contact-info">
                <h3>Get in Touch</h3>
                <motion.div
                  className="contact-details"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {[
                    {
                      label: 'Email',
                      value: 'neshandra07@gmail.com',
                      href:
                        'mailto:neshandra07@gmail.com?subject=Hello%20Neshandra&body=Hi%20Neshandra%2C%20',
                      icon: <EnvelopeIcon />,
                    },
                    {
                      label: 'Phone',
                      value: '+91 63834 33288',
                      href: 'tel:+916383433288',
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          role="img"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="currentColor"
                            d="M15.227 14.339a15.254 15.254 0 0 1-5.567-5.567l.018.035a2.11 2.11 0 0 1 .213-2.245l.002-.002L9.24 5.38c.169-.23.256-.5.256-.79 0-.379-.146-.735-.414-1.004L7.683 2.188A1.276 1.276 0 0 0 6.785 1.8a1.27 1.27 0 0 0-.651.18l-.002.001c-.912.536-1.577 1.386-1.873 2.39-.22.74-.335 1.54-.335 2.382 0 1.78.401 3.466 1.118 4.978l-.034-.078c.71 1.524 1.67 2.86 2.825 3.996l.001.001c1.135 1.13 2.47 2.088 3.931 2.833l.07.033c1.511.718 3.196 1.124 4.975 1.124.844 0 1.644-.116 2.409-.336 1.003-.296 1.853-.96 2.389-1.872l.009-.016c.142-.24.217-.525.217-.824 0-.362-.138-.69-.364-.934l.001.001-1.397-1.397c-.236-.235-.56-.381-.92-.381-.284 0-.543.086-.76.233l.005-.003-1.178.821a2.113 2.113 0 0 1-1.162.357h-.004a2.113 2.113 0 0 1-1.944-1.309l-.005-.014a.929.929 0 0 0-.258-.37l-.001-.001Z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      value: 'linkedin.com/in/neshandra-g286',
                      href: 'https://www.linkedin.com/in/neshandra-g286',
                      external: true,
                      icon: <LinkedinIcon />,
                    },
                  ].map((channel) => (
                    <motion.a
                      key={channel.label}
                      className="contact-detail"
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      variants={staggerItem}
                    >
                      <span className="detail-icon" aria-hidden="true">
                        {channel.icon}
                      </span>
                      <span className="detail-content">
                        <span className="detail-label">{channel.label}</span>
                        <span className="detail-value">{channel.value}</span>
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <CursorGlitter />
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="bg-orb orb-4" />
      </div>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {!showSplash && (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-text">Neshandra G</span>
        </div>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={[
                    'nav-link',
                    activeSection === item.id ? 'active' : '',
                  ]
                    .join(' ')
                    .trim()}
                  onClick={() => handleNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="app-main">
        <div className="section-stack">
          {NAV_ITEMS.map((item) => (
            <motion.section
              key={item.id}
              id={item.id}
              ref={registerSection(item.id)}
              className={[
                'content-card',
                `section-${item.id}`,
                item.id === 'home' ? 'home-active' : '',
              ]
                .join(' ')
                .trim()}
              data-active={activeSection === item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                revealedSections.has(item.id)
                  ? {
                      opacity: activeSection === item.id ? 1 : 0.5,
                      y: activeSection === item.id ? -6 : 0,
                      scale: activeSection === item.id ? 1.03 : 0.96,
                    }
                  : { opacity: 0, y: 40, scale: 0.95 }
              }
              transition={
                activeSection === item.id
                  ? { type: 'spring', stiffness: 260, damping: 22 }
                  : { type: 'spring', stiffness: 220, damping: 26 }
              }
            >
              {renderSectionContent(item.id)}
            </motion.section>
          ))}
        </div>
      </main>
      <AnimatePresence>
        {modalCertificate && (
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-backdrop" onClick={() => setModalCertificate(null)} />
            <motion.div
              className="modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="modal-header">
                <div>
                  <h2 id="certificate-modal-title">{modalCertificate.title}</h2>
                  <p>{modalCertificate.issuer}</p>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setModalCertificate(null)}
                  aria-label="Close certificate viewer"
                >
                  ×
                </button>
              </header>
              <div className="modal-body">
                <img
                  src={`/certificates/${modalCertificate.image}`}
                  alt={`${modalCertificate.title} certificate`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Neshandra G · Portfolio
        </p>
      </footer>
    </div>
      )}
    </>
  )
}

export default App
