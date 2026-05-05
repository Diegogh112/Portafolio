import { aboutDescription, personalInfo, education, certifications } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'

export default function About() {
  return (
    <section id="about" className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full 
                   bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <SectionHeader
          accent="Sobre mí"
          title="Quién soy"
          subtitle="Un poco de contexto sobre mi trayectoria y enfoque profesional"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Description */}
          <AnimatedSection animation="slide-left">
            <div className="space-y-5">
              {aboutDescription.map((paragraph, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <StatCard value="4+" label="Proyectos completados" />
                <StatCard value="2+" label="Años de experiencia" />
                <StatCard value="10+" label="Tecnologías dominadas" />
                <StatCard value="3" label="Certificaciones" />
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Education & Certifications */}
          <AnimatedSection animation="slide-right" delay={200}>
            <div className="space-y-6">
              {/* Education */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <GraduationIcon className="w-5 h-5 text-blue-400" />
                  Educación
                </h3>
                <div className="space-y-3">
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
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <CertIcon className="w-5 h-5 text-violet-400" />
                  Certificaciones
                </h3>
                <div className="space-y-2">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg 
                                 bg-dark-600 border border-slate-700/50 
                                 hover:border-violet-500/30 transition-colors"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{cert.name}</p>
                        <p className="text-slate-400 text-xs">{cert.issuer}</p>
                      </div>
                      <span className="text-violet-400 text-xs font-mono">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 
                              border border-blue-500/20">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-blue-400 font-semibold">Enfoque actual: </span>
                  Backend Development con Java/Spring Boot, Data Engineering con Python y 
                  soluciones de IA aplicada a problemas de negocio.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
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
