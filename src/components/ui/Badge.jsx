/**
 * Badge de tecnología reutilizable con variantes de color.
 */
const variants = {
  blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  slate: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
}

export default function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
