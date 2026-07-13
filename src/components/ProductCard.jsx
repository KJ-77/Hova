import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '../data/products.js'

/* Product card with a 3D perspective tilt that follows the cursor. */
export default function ProductCard({ product, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -py * 7, y: px * 9 })
  }

  const orderNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openWhatsApp(`Hello! I'd like to order the ${product.brandName} ($${product.price}).`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      style={{ perspective: 1100 }}
    >
      <Link to={`/product/${product.slug}`} className="block group">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          className="card-luxe rounded-sm overflow-hidden transition-transform duration-200 will-change-transform"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.brandName}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              style={{ transform: 'translateZ(30px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hova-black/85 via-transparent to-transparent" />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-hova-black/80 backdrop-blur-sm border border-hova-gold/60 text-hova-gold text-[10px] tracking-[0.25em] uppercase px-3 py-1.5">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl text-white font-light leading-tight">{product.name}</h3>
                <p className="text-hova-gold text-lg mt-1">${product.price}</p>
              </div>
              <button
                onClick={orderNow}
                aria-label={`Order ${product.name} on WhatsApp`}
                className="shrink-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-hova-gold text-hova-black p-3 rounded-full hover:bg-hova-gold-bright"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-5 pt-4">
            <p className="text-hova-muted text-sm leading-relaxed line-clamp-2">{product.shortDescription}</p>
            <p className="text-hova-gold/80 text-xs tracking-[0.25em] uppercase mt-4 group-hover:text-hova-gold transition-colors">
              View Details →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
