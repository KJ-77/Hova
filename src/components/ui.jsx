import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <Reveal>
        <p className="text-hova-gold text-xs md:text-sm tracking-[0.35em] mb-4 uppercase">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light">{title}</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="gold-hairline w-32 mx-auto mt-6" />
      </Reveal>
    </div>
  )
}

export function GoldButton({ children, onClick, variant = 'solid', className = '' }) {
  const styles =
    variant === 'solid'
      ? 'bg-hova-gold text-hova-black hover:bg-hova-gold-bright'
      : 'border border-hova-gold text-hova-gold hover:bg-hova-gold hover:text-hova-black'
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 text-sm tracking-[0.2em] uppercase transition-all duration-300 ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
