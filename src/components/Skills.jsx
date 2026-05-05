import { useState } from 'react'
import { skills } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const CATEGORY_COLORS = {
  Backend: { bar: 'from-blue-500 to-cyan-500', badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  Frontend: { bar: 'from-violet-500 to-purple-500', badge: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  'Data & BI': { bar: 'from-emerald-500 to-teal-500', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  Tools: { bar: 'from-amber-500 to-orange-500', badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Backend')

  return (
    <section id="skills" className="py-24 bg-dark-800 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-1/3 h-full 
                   bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <SectionHeader
          accent="Habilidades"
          title="Stack tecnológico"
          subtitle="Tecnologías que uso para construir soluciones robustas y escalables"
        />

        {/* Category tabs */}
        <AnimatedSection animation="fade-up" className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(skills).map((category) => {
            const colors = CATEGORY_COLORS[category]
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  border focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  ${activeCategory === category
                    ? `bg-gradient-to-r ${colors.bar} text-white border-transparent shadow-lg`
                    : `bg-dark-600 text-slate-400 border-slate-700/50 hover:text-white hover:border-slate-500`
                  }
                `}
              >
                {category}
              </button>
            )
          })}
        </AnimatedSection>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {skills[activeCategory]?.map((skill, i) => (
            <AnimatedSection
              key={skill.name}
              animation="fade-up"
              delay={Math.min(i * 100, 400)}
            >
              <SkillCard
                skill={skill}
                colors={CATEGORY_COLORS[activeCategory]}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Tech cloud — all technologies */}
        <AnimatedSection animation="fade-up" delay={300} className="mt-16">
          <div className="text-center mb-6">
            <p className="text-slate-500 text-sm font-mono">// todas las tecnologías</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(skills)
              .flat()
              .map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 text-sm rounded-lg bg-dark-600 text-slate-400 
                             border border-slate-700/50 hover:text-white hover:border-blue-500/30 
                             transition-all duration-200 cursor-default"
                >
                  {skill.icon} {skill.name}
                </span>
              ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function SkillCard({ skill, colors }) {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <div
      ref={ref}
      className="card group hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label={skill.name}>
            {skill.icon}
          </span>
          <span className="text-white font-medium text-sm">{skill.name}</span>
        </div>
        <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${colors.badge}`}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-1000 ease-out`}
          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name}: ${skill.level}%`}
        />
      </div>
    </div>
  )
}
