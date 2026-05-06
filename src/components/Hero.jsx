import { personalInfo } from '../data/portfolio'

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <line x1="0" y1="25" x2="40" y2="25" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="60" y1="25" x2="100" y2="25" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="0" y1="75" x2="30" y2="75" stroke="#8b5cf6" strokeWidth="0.8"/>
              <line x1="70" y1="75" x2="100" y2="75" stroke="#8b5cf6" strokeWidth="0.8"/>
              {/* Vertical lines */}
              <line x1="25" y1="0" x2="25" y2="40" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="25" y1="60" x2="25" y2="100" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="75" y1="0" x2="75" y2="30" stroke="#8b5cf6" strokeWidth="0.8"/>
              <line x1="75" y1="70" x2="75" y2="100" stroke="#8b5cf6" strokeWidth="0.8"/>
              {/* Corner connectors */}
              <line x1="40" y1="25" x2="40" y2="50" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="40" y1="50" x2="60" y2="50" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="60" y1="50" x2="60" y2="25" stroke="#3b82f6" strokeWidth="0.8"/>
              <line x1="30" y1="75" x2="30" y2="55" stroke="#8b5cf6" strokeWidth="0.8"/>
              <line x1="30" y1="55" x2="70" y2="55" stroke="#8b5cf6" strokeWidth="0.8"/>
              <line x1="70" y1="55" x2="70" y2="75" stroke="#8b5cf6" strokeWidth="0.8"/>
              {/* Nodes / solder points */}
              <circle cx="25" cy="25" r="2.5" fill="#3b82f6"/>
              <circle cx="75" cy="25" r="2" fill="#3b82f6" fillOpacity="0.6"/>
              <circle cx="25" cy="75" r="2" fill="#8b5cf6" fillOpacity="0.6"/>
              <circle cx="75" cy="75" r="2.5" fill="#8b5cf6"/>
              <circle cx="40" cy="50" r="1.5" fill="#60a5fa"/>
              <circle cx="60" cy="50" r="1.5" fill="#60a5fa"/>
              <circle cx="50" cy="50" r="3" fill="none" stroke="#60a5fa" strokeWidth="0.8"/>
              {/* IC chip outline */}
              <rect x="42" y="38" width="16" height="12" rx="1" fill="none" stroke="#60a5fa" strokeWidth="0.6"/>
              {/* Binary text hints */}
              <text x="2" y="12" fontSize="5" fill="#3b82f6" fillOpacity="0.5" fontFamily="monospace">01</text>
              <text x="80" y="48" fontSize="5" fill="#8b5cf6" fillOpacity="0.5" fontFamily="monospace">10</text>
              <text x="52" y="95" fontSize="5" fill="#3b82f6" fillOpacity="0.5" fontFamily="monospace">11</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full 
                   bg-blue-600/20 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full 
                   bg-violet-600/20 blur-3xl animate-pulse-slow animate-delay-300"
        aria-hidden="true"
      />
      {/* Extra orb top-right for depth */}
      <div
        className="absolute top-10 right-10 w-64 h-64 rounded-full 
                   bg-cyan-600/10 blur-3xl animate-pulse-slow animate-delay-200"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="section-container relative z-10 text-center px-4">
        {/* Status badge */}
        <div></div>

        {/* Name */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 
                       animate-fade-up leading-tight">
          Hola, soy{' '}
          <span className="gradient-text block sm:inline">
            {personalInfo.name}
          </span>
        </h1>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up animate-delay-100">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
          <p className="text-xl sm:text-2xl font-mono text-blue-400 font-medium">
            {personalInfo.title}
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
        </div>

        {/* Description */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 
                      leading-relaxed animate-fade-up animate-delay-200">
          {personalInfo.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 
                        animate-fade-up animate-delay-300">
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FolderIcon className="w-5 h-5" />
            Ver proyectos
          </button>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <GitHubIcon className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="/Portafolio/cv-diego-gutierrez.pdf"
            download
            className="w-full sm:w-auto flex items-center justify-center gap-2
                       px-6 py-3 border border-emerald-500/50 text-emerald-400 font-semibold rounded-lg
                       hover:bg-emerald-500/10 hover:border-emerald-400
                       transition-all duration-300 hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-dark-900"
          >
            <DownloadIcon className="w-5 h-5" />
            Descargar CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-12 
                        animate-fade-up animate-delay-400">
          <SocialLink href={personalInfo.github} label="GitHub">
            <GitHubIcon className="w-5 h-5" />
          </SocialLink>
          <SocialLink href={personalInfo.linkedin} label="LinkedIn">
            <LinkedInIcon className="w-5 h-5" />
          </SocialLink>
          <SocialLink href={`mailto:${personalInfo.email}`} label="Email">
            <MailIcon className="w-5 h-5" />
          </SocialLink>
        </div>

        {/* Location */}
        <p className="text-slate-500 text-sm mt-6 animate-fade-up animate-delay-500 
                      flex items-center justify-center gap-1">
          <LocationIcon className="w-4 h-4" />
          {personalInfo.location}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-1 text-slate-500 
                     hover:text-blue-400 transition-colors focus:outline-none"
          aria-label="Ir a la siguiente sección"
        >
          <span className="text-xs font-mono">scroll</span>
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

// ── Inline SVG Icons ──────────────────────────────────────────
function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 
                 text-slate-400 hover:text-white hover:border-blue-500/50 
                 hover:bg-blue-500/10 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
    >
      {children}
    </a>
  )
}

function GitHubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function FolderIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function DownloadIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}
