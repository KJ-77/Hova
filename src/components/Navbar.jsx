import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { openWhatsApp } from '../data/products.js'

const LINKS = [
  { label: 'Collection', anchor: 'products' },
  { label: 'About', anchor: 'about' },
  { label: 'Craftsmanship', anchor: 'gallery' },
  { label: 'Contact', anchor: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (anchor) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: anchor } })
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-hova-black/90 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img src="/assets/hova-logo-light.png" alt="HOVA — Piece of Joy" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <button
              key={l.anchor}
              onClick={() => goTo(l.anchor)}
              className="text-sm tracking-[0.15em] uppercase text-white/80 hover:text-hova-gold transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => openWhatsApp()}
            className="flex items-center gap-2 border border-hova-gold text-hova-gold px-5 py-2 text-xs tracking-[0.2em] uppercase hover:bg-hova-gold hover:text-hova-black transition-all duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Order Now
          </button>
        </nav>

        <button
          className="md:hidden text-hova-gold p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-hova-black/95 backdrop-blur-md"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <button
                  key={l.anchor}
                  onClick={() => goTo(l.anchor)}
                  className="text-left text-white/90 tracking-[0.15em] uppercase text-sm py-1"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openWhatsApp() }}
                className="flex items-center justify-center gap-2 border border-hova-gold text-hova-gold px-5 py-3 text-xs tracking-[0.2em] uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
