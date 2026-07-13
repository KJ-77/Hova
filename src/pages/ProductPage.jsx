import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, MessageCircle } from 'lucide-react'
import { getProductBySlug, products, openWhatsApp, isVideo } from '../data/products.js'
import { Reveal, GoldButton } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'

// 3D product viewer intentionally disabled for now (ProductViewer3D.jsx kept
// for when the owner wants it back)

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug || '')

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveIndex(0)
  }, [slug])

  const next = useCallback(() => {
    if (!product) return
    setActiveIndex((i) => (i + 1) % product.images.length)
  }, [product])

  useEffect(() => {
    if (!product || isVideo(product.images[activeIndex])) return
    const t = setTimeout(next, 3500)
    return () => clearTimeout(t)
  }, [activeIndex, product, next])

  if (!product) {
    navigate('/')
    return null
  }

  const active = product.images[activeIndex]
  const order = () =>
    openWhatsApp(`Hello! I'm interested in the ${product.brandName} ($${product.price}). Could you provide more information?`)
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-hova-black pt-24 pb-28 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-hova-muted hover:text-hova-gold text-sm tracking-[0.15em] uppercase transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ------- media column ------- */}
          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {isVideo(active) ? (
                <video
                  src={active}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-square object-cover rounded-lg border border-hova-gold/20"
                />
              ) : (
                <img
                  src={active}
                  alt={product.brandName}
                  className="w-full aspect-square object-cover rounded-lg border border-hova-gold/20"
                />
              )}
            </motion.div>

            {/* thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveIndex(i)}
                  className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border transition-all ${
                    i === activeIndex ? 'border-hova-gold' : 'border-hova-gold/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  {isVideo(src) ? (
                    <video src={src} muted className="w-full h-full object-cover" />
                  ) : (
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ------- info column ------- */}
          <div>
            {product.badge && (
              <span className="inline-block border border-hova-gold/60 text-hova-gold text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl text-white font-light leading-tight">
              {product.brandName}
            </h1>
            <p className="text-hova-gold text-3xl font-light mt-4">${product.price}</p>
            <p className="text-hova-muted text-lg leading-relaxed mt-6">{product.shortDescription}</p>

            <div className="hidden lg:flex gap-4 mt-8">
              <GoldButton onClick={order} className="flex-1 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp
              </GoldButton>
            </div>
            <p className="hidden lg:block text-hova-muted/70 text-xs mt-3 text-center">
              Free delivery across Lebanon · 1–2 days · Pay on delivery
            </p>

            {/* specs */}
            <div className="mt-10 border border-hova-gold/15 rounded-sm divide-y divide-hova-gold/10">
              {product.specifications.map((s) => (
                <div key={s.label} className="flex justify-between px-5 py-3.5 text-sm">
                  <span className="text-hova-muted">{s.label}</span>
                  <span className="text-white">{s.value}</span>
                </div>
              ))}
            </div>

            {/* features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-sm text-hova-muted">
                  <Check className="w-4 h-4 text-hova-gold shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* full description */}
        <Reveal className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-hova-gold text-sm tracking-[0.3em] uppercase text-center mb-8">
            About this Product
          </h2>
          <p className="text-white/85 text-lg leading-relaxed whitespace-pre-line">{product.fullDescription}</p>
        </Reveal>

        {/* cross-sell */}
        <div className="mt-24">
          <h2 className="font-display text-3xl text-white font-light text-center mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {others.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* sticky mobile order bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-hova-black/95 backdrop-blur-md border-t border-hova-gold/25 px-4 py-3 flex items-center gap-4">
        <div className="leading-tight">
          <p className="text-white text-sm font-medium truncate max-w-[38vw]">{product.name}</p>
          <p className="text-hova-gold text-lg">${product.price}</p>
        </div>
        <button
          onClick={order}
          className="flex-1 flex items-center justify-center gap-2 bg-hova-gold text-hova-black py-3.5 text-xs tracking-[0.2em] uppercase font-medium"
        >
          <MessageCircle className="w-4 h-4" /> Order via WhatsApp
        </button>
      </div>
    </div>
  )
}
