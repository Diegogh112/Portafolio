import { useState } from 'react'
import { projects } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'
import Badge from './ui/Badge'

const CATEGORIES = ['Todos', 'Backend', 'Frontend']

const BADGE_VARIANTS = {
  Backend: 'blue',
  Frontend: 'violet',
  Data: 'amber',
  AI: 'emerald',
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [expandedId, setExpandedId] = useState(null)

  const filtered =
    activeFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 bg-dark-900 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 
                   bg-gradient-to-tr from-violet-600/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <SectionHeader
          accent="Proyectos"
          title="Lo que he construido"
          subtitle="Proyectos reales que demuestran mis habilidades técnicas y capacidad de resolución de problemas"
        />

        {/* Filter tabs */}
        <AnimatedSection animation="fade-up" className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-dark-600 text-slate-400 border border-slate-700/50 hover:text-white hover:border-blue-500/30'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <AnimatedSection
              key={project.id}
              animation="fade-up"
              delay={Math.min(i * 100, 500)}
            >
              <ProjectCard
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
              />
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No hay proyectos en esta categoría aún.
          </p>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, isExpanded, onToggle }) {
  return (
    <article
      className={`
        relative flex flex-col rounded-xl border transition-all duration-300 overflow-hidden
        bg-dark-600 border-slate-700/50
        hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10
        hover:-translate-y-1
        ${project.featured ? 'ring-1 ring-blue-500/20' : ''}
      `}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label={project.title}>
              {project.icon}
            </span>
            <div>
              <h3 className="text-white font-semibold text-base leading-tight">
                {project.title}
              </h3>
              <Badge variant={BADGE_VARIANTS[project.category] || 'blue'} className="mt-1">
                {project.category}
              </Badge>
            </div>
          </div>
          {project.featured && (
            <span className="flex-shrink-0 px-2 py-0.5 text-xs rounded-full 
                             bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ⭐ Destacado
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Expandable: Problem & Solution */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-64 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-3 pt-2 border-t border-slate-700/50">
            <div>
              <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
                🔴 Problema
              </p>
              <p className="text-slate-400 text-sm">{project.problem}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                🟢 Solución
              </p>
              <p className="text-slate-400 text-sm">{project.solution}</p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-slate-300 
                         border border-slate-600/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-700/50">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-400 
                       hover:text-white transition-colors"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GitHubIcon className="w-4 h-4" />
            Código
          </a>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-400 
                         hover:text-blue-300 transition-colors"
              aria-label={`Ver demo de ${project.title}`}
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Demo
            </a>
          )}

          <button
            onClick={onToggle}
            className="ml-auto flex items-center gap-1 text-xs text-slate-500 
                       hover:text-slate-300 transition-colors focus:outline-none"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Menos' : 'Más detalles'}
            <ChevronIcon
              className={`w-3 h-3 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </article>
  )
}

// ── Icons ──────────────────────────────────────────────────────
function GitHubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
