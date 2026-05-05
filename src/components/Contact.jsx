import { useState } from 'react'
import { personalInfo } from '../data/portfolio'
import SectionHeader from './ui/SectionHeader'
import AnimatedSection from './ui/AnimatedSection'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!form.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!form.message.trim()) newErrors.message = 'El mensaje es requerido'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Construye el mailto link como fallback simple
    const subject = encodeURIComponent(form.subject || `Contacto desde portafolio — ${form.name}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

    setStatus('success')
    setForm(INITIAL_FORM)
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="py-24 bg-dark-900 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-radial from-blue-600/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <SectionHeader
          accent="Contacto"
          title="Hablemos"
          subtitle="¿Tienes un proyecto en mente o quieres colaborar? Escríbeme."
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — Contact info */}
          <AnimatedSection animation="slide-left">
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                Estoy abierto a oportunidades de trabajo, proyectos freelance y 
                colaboraciones interesantes. No dudes en contactarme.
              </p>

              <div className="space-y-4">
                <ContactItem
                  icon={<MailIcon className="w-5 h-5" />}
                  label="Email"
                  value={personalInfo.email}
                  href={`mailto:${personalInfo.email}`}
                  color="blue"
                />
                <ContactItem
                  icon={<LinkedInIcon className="w-5 h-5" />}
                  label="LinkedIn"
                  value="linkedin.com/in/tu-usuario"
                  href={personalInfo.linkedin}
                  color="blue"
                />
                <ContactItem
                  icon={<GitHubIcon className="w-5 h-5" />}
                  label="GitHub"
                  value="github.com/tu-usuario"
                  href={personalInfo.github}
                  color="violet"
                />
                <ContactItem
                  icon={<LocationIcon className="w-5 h-5" />}
                  label="Ubicación"
                  value={personalInfo.location}
                  href={null}
                  color="emerald"
                />
              </div>

              {/* Availability card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 
                              border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold text-sm">Disponible</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Actualmente disponible para posiciones de tiempo completo, 
                  prácticas profesionales y proyectos freelance.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Form */}
          <AnimatedSection animation="slide-right" delay={200}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
              aria-label="Formulario de contacto"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Diego Gutierrez"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <FormField
                label="Asunto"
                name="subject"
                type="text"
                placeholder="¿De qué quieres hablar?"
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-1.5"
                >
                  Mensaje <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto o propuesta..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`
                    w-full px-4 py-3 rounded-xl bg-dark-600 border text-slate-200 
                    placeholder-slate-500 text-sm resize-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                    transition-colors duration-200
                    ${errors.message ? 'border-rose-500/50' : 'border-slate-700/50 hover:border-slate-600'}
                  `}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-rose-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary flex items-center justify-center gap-2 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <SpinnerIcon className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    Enviar mensaje
                  </>
                )}
              </button>

              {/* Success message */}
              {status === 'success' && (
                <div
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 
                             text-emerald-400 text-sm text-center"
                  role="status"
                >
                  ✅ ¡Mensaje preparado! Se abrirá tu cliente de correo.
                </div>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ── Sub-components ─────────────────────────────────────────────
function FormField({ label, name, type, placeholder, value, onChange, error, required }) {
  const id = `field-${name}`
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-4 py-3 rounded-xl bg-dark-600 border text-slate-200 
          placeholder-slate-500 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
          transition-colors duration-200
          ${error ? 'border-rose-500/50' : 'border-slate-700/50 hover:border-slate-600'}
        `}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactItem({ icon, label, value, href, color }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  }

  const content = (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-600 border border-slate-700/50 
                    hover:border-blue-500/30 transition-all duration-200 group">
      <div className={`p-2.5 rounded-lg border ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">
          {value}
        </p>
      </div>
    </div>
  )

  return href ? (
    <a href={href} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}

// ── Icons ──────────────────────────────────────────────────────
function MailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

function GitHubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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

function SendIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}
