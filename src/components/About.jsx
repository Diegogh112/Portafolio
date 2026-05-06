import { aboutDescription, education, certifications, experience } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'

export default function About() {
  return (
    <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-full 
                   bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 space-y-14">
        <SectionHeader
          accent="Sobre mí"
          title="Quién soy"
          subtitle="Un poco de contexto sobre mi trayectoria y enfoque profesional"
        />

        {/* ── Fila 1: Descripción + Stats ── */}
        <AnimatedSection animation="fade-up">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Texto */}
            <div className="lg:col-span-2 space-y-4">
              {aboutDescription.map((paragraph, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
              {/* Enfoque actual */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 
                              border border-blue-500/20 mt-2">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-blue-400 font-semibold">Enfoque actual: </span>
                  Transformación digital de operaciones mediante Python, Power BI, VBA e
                  inteligencia artificial, aplicando análisis de datos y mejora continua de procesos.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="5+" label="Proyectos en GitHub" />
              <StatCard value="2" label="Empresas (prácticas)" />
              <StatCard value="15+" label="Tecnologías" />
              <StatCard value="7" label="Certificaciones" />
              <StatCard value="10mo" label="Ciclo universitario" />
              <StatCard value="B2" label="Inglés" />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Fila 2: Experiencia + Educación ── */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experiencia */}
          <AnimatedSection animation="slide-left">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-emerald-400" />
              Experiencia
            </h3>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="card">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-white font-medium">{exp.role}</p>
                      <p className="text-emerald-400 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-slate-500 text-xs font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-slate-300 border border-slate-600/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Educación */}
          <AnimatedSection animation="slide-right" delay={100}>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <GraduationIcon className="w-5 h-5 text-blue-400" />
              Educación
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-medium">{edu.degree}</p>
                      <p className="text-blue-400 text-sm">{edu.institution}</p>
                      <p className="text-slate-400 text-sm mt-1">{edu.description}</p>
                    </div>
                    <span className="text-slate-500 text-xs font-mono whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actividades extracurriculares */}
            <h3 className="text-white font-semibold text-lg mt-8 mb-4 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-amber-400" />
              Actividades extracurriculares
            </h3>
            <div className="space-y-3">
              {[
                { text: '1er Puesto — Club Apptitud 2023-2 (UPC)', icon: '🏆' },
                { text: 'Talleres de liderazgo y trabajo en equipo', icon: '🤝' },
                { text: 'Formación en metodologías ágiles (Scrum)', icon: '🔄' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-dark-600 border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* ── Fila 3: Certificaciones en grid ── */}
        <AnimatedSection animation="fade-up" delay={100}>
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <CertIcon className="w-5 h-5 text-violet-400" />
            Certificaciones
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl
                           bg-dark-600 border border-slate-700/50 
                           hover:border-violet-500/30 hover:-translate-y-0.5
                           transition-all duration-200"
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{cert.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-violet-400 text-xs font-mono ml-3 flex-shrink-0">{cert.year}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="p-4 rounded-xl bg-dark-600 border border-slate-700/50 text-center
                    hover:border-blue-500/30 transition-colors">
      <p className="text-2xl font-bold gradient-text">{value}</p>
      <p className="text-slate-400 text-xs mt-1">{label}</p>
    </div>
  )
}

function GraduationIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )
}

function CertIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function BriefcaseIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function StarIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}
