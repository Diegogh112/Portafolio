import { useState } from 'react'
import { useScrollPosition, useActiveSection } from '../hooks/useScrollAnimation'
import { personalInfo } from '../data/portfolio'

const NAV_LINKS = [
  { label: 'Inicio', href: 'home' },
  { label: 'Sobre mí', href: 'about' },
  { label: 'Proyectos', href: 'projects' },
  { label: 'Habilidades', href: 'skills' },
]

// Pre-computed outside the component so the array reference is stable
const NAV_HREFS = NAV_LINKS.map((l) => l.href)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollPosition(50)
  const activeSection = useActiveSection(NAV_HREFS)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="section-container flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-mono text-lg font-bold text-white hover:text-blue-400 
                     transition-colors duration-200 focus:outline-none"
          aria-label="Ir al inicio"
        >
          <span className="gradient-text">&lt;</span>
          {personalInfo.name.split(' ')[0]}
          <span className="gradient-text">/&gt;</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  ${activeSection === link.href
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 btn-outline text-sm py-2"
        >
          <GitHubIcon className="w-4 h-4" />
          GitHub
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white 
                     hover:bg-slate-700/50 transition-colors focus:outline-none
                     focus:ring-2 focus:ring-blue-500/50"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          bg-dark-800/95 backdrop-blur-md border-b border-slate-700/50
        `}
      >
        <ul className="section-container py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium 
                  transition-all duration-200 focus:outline-none
                  ${activeSection === link.href
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium 
                         text-blue-400 hover:text-blue-300 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              Ver GitHub
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

// ── Inline SVG Icons ──────────────────────────────────────────
function GitHubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
