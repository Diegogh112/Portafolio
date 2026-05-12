import { useState } from 'react'
import { skills } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'

const CATEGORY_COLORS = {
  Backend:    { active: 'from-blue-500 to-cyan-500',    pill: 'text-blue-400 bg-blue-500/10 border-blue-500/20',    card: 'hover:border-blue-500/40 hover:shadow-blue-500/10' },
  Frontend:   { active: 'from-violet-500 to-purple-500', pill: 'text-violet-400 bg-violet-500/10 border-violet-500/20', card: 'hover:border-violet-500/40 hover:shadow-violet-500/10' },
  'Data & BI':{ active: 'from-emerald-500 to-teal-500', pill: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', card: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10' },
  Tools:      { active: 'from-amber-500 to-orange-500', pill: 'text-amber-400 bg-amber-500/10 border-amber-500/20',   card: 'hover:border-amber-500/40 hover:shadow-amber-500/10' },
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Backend')
  const colors = CATEGORY_COLORS[activeCategory]

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
            const c = CATEGORY_COLORS[category]
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  border focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  ${activeCategory === category
                    ? `bg-gradient-to-r ${c.active} text-white border-transparent shadow-lg`
                    : 'bg-dark-600 text-slate-400 border-slate-700/50 hover:text-white hover:border-slate-500'
                  }
                `}
              >
                {category}
              </button>
            )
          })}
        </AnimatedSection>

        {/* Skills grid — cards without bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {skills[activeCategory]?.map((skill, i) => (
            <AnimatedSection
              key={skill.name}
              animation="fade-up"
              delay={Math.min(i * 80, 400)}
            >
              <div
                className={`
                  flex items-center gap-3 p-4 rounded-xl
                  bg-dark-600 border border-slate-700/50
                  hover:shadow-lg hover:-translate-y-0.5
                  transition-all duration-200 ${colors.card}
                `}
              >
                <span className="text-2xl shrink-0" role="img" aria-label={skill.name}>
                  {skill.icon}
                </span>
                <span className="text-white text-sm font-medium leading-tight">
                  {skill.name}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* All technologies — grouped by category */}
        <AnimatedSection animation="fade-up" delay={300} className="mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => {
              const c = CATEGORY_COLORS[category]
              return (
                <div key={category} className="space-y-3">
                  <p className={`text-xs font-semibold uppercase tracking-widest px-2 ${c.pill.split(' ')[0]}`}>
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill.name}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border ${c.pill} transition-all duration-200 hover:-translate-y-0.5`}
                      >
                        <span aria-hidden="true">{skill.icon}</span>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
