import AnimatedSection from './AnimatedSection'

/**
 * Encabezado reutilizable para cada sección del portafolio.
 */
export default function SectionHeader({ title, subtitle, accent }) {
  return (
    <AnimatedSection animation="fade-up" className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                      bg-blue-500/10 border border-blue-500/20 text-blue-400 
                      text-sm font-medium mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        {accent}
      </div>
      <h2 className="section-title">
        {title}
      </h2>
      {subtitle && (
        <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="glow-line w-24 mx-auto mt-4" />
    </AnimatedSection>
  )
}
