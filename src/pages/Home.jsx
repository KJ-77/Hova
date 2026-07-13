import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Truck, Leaf, Gift, MapPin, ChevronDown } from 'lucide-react'
import { products, galleryImages, openWhatsApp } from '../data/products.js'
import { Reveal, SectionHeading, GoldButton } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'

// Both hero videos are Higgsfield-generated (kling3_0_turbo):
//  - HERO_VIDEO: looping chocolate-pour backdrop
//  - BOX_OPEN_VIDEO: image-to-video from the real Classic Box photo — the ribbon
//    unties and the lid slides off. Playback is scrubbed by scroll position.
// trimmed to only the pooling-drizzle shot (owner cut the dark stream-only opening)
const HERO_VIDEO = '/assets/hero-drizzle.mp4'
const HERO_BACKDROP = '/assets/herobg.jpg'
const BOX_OPEN_VIDEO = '/assets/box-open.mp4'
// iPhones (and many Androids) can't hardware-decode 120fps H.264 — they get
// a 60fps main-profile variant, which is equally smooth on a phone screen
const BOX_OPEN_VIDEO_MOBILE = '/assets/box-open-m.mp4'
const isMobileDevice = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)) // iPadOS reports as Mac

const TRUST_ITEMS = [
  { icon: Award, title: 'Belgian Craftsmanship', text: 'Handcrafted by master chocolatiers' },
  { icon: Truck, title: 'Free Delivery', text: 'Across Lebanon in 1–2 days' },
  { icon: Leaf, title: '100% Natural', text: 'No artificial flavors or preservatives' },
  { icon: Gift, title: 'Gift-Ready', text: 'Premium packaging with every box' },
]

/*
 * Pinned cinematic hero, 300vh tall. The sticky screen shows:
 *   scroll 0      → chocolate-pour video + HOVA logo only
 *   scroll ~0.7vh → logo fades, the real Classic Box (video) fades in
 *   scroll →2vh   → the box video is scrubbed: ribbon unties, lid slides off,
 *                   revealing the gold pralines; caption + CTAs fade in
 */
function HeroSequence() {
  const [vh, setVh] = useState(800)
  const videoRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState(null)

  // Fully pre-download the scrub video into memory before wiring it up.
  // Streaming isn't good enough here: scroll seeks jump to arbitrary times,
  // and any not-yet-buffered region would freeze the animation (this is why
  // the deployed site felt broken vs localhost). Until it's ready we show the
  // box photo — identical to the video's first frame.
  useEffect(() => {
    let objectUrl
    let cancelled = false
    const src = isMobileDevice() ? BOX_OPEN_VIDEO_MOBILE : BOX_OPEN_VIDEO
    // index.html starts this download before the bundle is even parsed —
    // reuse that promise; fall back to fetching here (e.g. client-side nav)
    const pending =
      window.__boxVideo && window.__boxVideo.src === src
        ? window.__boxVideo.blob
        : fetch(src).then((r) => r.blob())
    pending
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setVideoSrc(objectUrl)
      })
      .catch(() => !cancelled && setVideoSrc(src))
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  useEffect(() => {
    const update = () => setVh(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // scrub the box video with scroll: map p ∈ [0.35, 0.95] → video time.
  // Inertial: every frame the playhead glides toward the scroll target instead
  // of snapping, so discrete wheel steps read as one continuous motion — in
  // both directions (opening on scroll down, closing on scroll up).
  useEffect(() => {
    let raf = 0
    let playhead = 0
    const tick = () => {
      const v = videoRef.current
      if (v && v.duration) {
        const p = Math.min(1, window.scrollY / (window.innerHeight * 2))
        const t = Math.min(1, Math.max(0, (p - 0.35) / 0.6))
        const target = t * (v.duration - 0.05)
        playhead += (target - playhead) * 0.14
        if (Math.abs(target - playhead) < 0.003) playhead = target
        if (Math.abs(v.currentTime - playhead) > 0.001) v.currentTime = playhead
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const { scrollY } = useScroll()
  const boxOpacity = useTransform(scrollY, [vh * 0.5, vh * 0.85], [0, 1])
  const boxScale = useTransform(scrollY, [vh * 0.5, vh * 1.1], [0.9, 1])
  const logoOpacity = useTransform(scrollY, [0, vh * 0.55], [1, 0])
  const logoScale = useTransform(scrollY, [0, vh * 0.55], [1, 0.92])
  const logoVisibility = useTransform(logoOpacity, (o) => (o < 0.03 ? 'hidden' : 'visible'))
  const capOpacity = useTransform(scrollY, [vh * 1.6, vh * 1.9], [0, 1])
  const capY = useTransform(scrollY, [vh * 1.6, vh * 1.9], [30, 0])
  const capVisibility = useTransform(capOpacity, (o) => (o < 0.03 ? 'hidden' : 'visible'))
  const hintOpacity = useTransform(scrollY, [0, vh * 1.7, vh * 1.95], [1, 1, 0])

  return (
    <section className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {HERO_VIDEO ? (
            <video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.25) contrast(1.04)' }}
            />
          ) : (
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BACKDROP})` }} />
          )}
          <div className="absolute inset-0 bg-hova-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.78)_85%)]" />
        </div>

        {/* phase 1-2: the real Classic Box opening (scroll-scrubbed video) */}
        <motion.div
          style={{ opacity: boxOpacity, scale: boxScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="relative h-[72vh] md:h-[80vh] aspect-square max-w-[94vw] overflow-hidden"
            style={{
              maskImage: 'radial-gradient(ellipse 72% 72% at center, black 55%, transparent 98%)',
              WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at center, black 55%, transparent 98%)',
            }}
          >
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onError={() => {
                  // decode failure (e.g. an older phone): drop to the 60fps file directly
                  if (videoSrc !== BOX_OPEN_VIDEO_MOBILE) setVideoSrc(BOX_OPEN_VIDEO_MOBILE)
                }}
              />
            ) : (
              <img
                src="/assets/classic-1.jpeg"
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </motion.div>

        {/* phase 0: logo lockup only */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale, visibility: logoVisibility }}
          className="relative z-10 text-center px-4 pointer-events-none"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-hova-gold text-xs md:text-sm tracking-[0.5em] mb-6 uppercase"
          >
            Luxury Belgian Chocolates
          </motion.p>
          {/* the real HŌVA wordmark (from the brand PDF) — includes the gold tagline */}
          <motion.h1
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="flex justify-center"
          >
            <img
              src="/assets/hova-logo-light.png"
              alt="HOVA — Piece of Joy"
              className="h-36 md:h-52 w-auto"
            />
          </motion.h1>
        </motion.div>

        {/* scrim so the caption stays readable over the bright gold interior */}
        <motion.div
          style={{ opacity: capOpacity }}
          className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-hova-black via-hova-black/70 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* phase 2: box caption + CTAs, once the lid is open */}
        <motion.div
          style={{ opacity: capOpacity, y: capY, visibility: capVisibility }}
          className="absolute inset-x-0 bottom-14 md:bottom-16 z-10 text-center px-4 pointer-events-none"
        >
          <p className="text-hova-gold text-xs tracking-[0.4em] uppercase mb-3">The Classic Box</p>
          <p className="text-white/90 font-display text-2xl md:text-3xl font-light mb-6">
            35 handcrafted pieces · five signature flavors
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <Link to="/product/classic-box">
              <GoldButton>Discover the Box</GoldButton>
            </Link>
            <GoldButton variant="outline" onClick={() => openWhatsApp(`Hello! I'd like to order The Classic Box from HOVA ($${products[0].price}).`)}>
              Order on WhatsApp
            </GoldButton>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-hova-gold/70 flex flex-col items-center gap-1 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', inquiryReason: '', message: '' })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const msg = `Hello HOVA! ${form.inquiryReason ? `[${form.inquiryReason}] ` : ''}My name is ${form.firstName} ${form.lastName}.\n\n${form.message}\n\nEmail: ${form.email}`
    openWhatsApp(msg)
  }

  const inputCls =
    'w-full bg-hova-black border border-hova-gold/30 text-white placeholder:text-hova-muted/60 focus:border-hova-gold focus:outline-none px-4 py-3 text-sm transition-colors'

  return (
    <section id="contact" className="py-24 px-4 md:px-8 lg:px-16 bg-hova-black-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Get in Touch" title="Contact Us" className="mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="w-full h-[320px] lg:h-full min-h-[320px] border border-hova-gold/20 rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33016.655458463276!2d35.48368274137904!3d33.88925221106324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e1!3m2!1sen!2slb!4v1770933084962!5m2!1sen!2slb"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Beirut Location"
              />
            </div>
            <p className="flex items-center gap-2 text-hova-muted text-sm mt-4">
              <MapPin className="w-4 h-4 text-hova-gold" /> Beirut, Lebanon — free delivery nationwide
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" required placeholder="First Name" value={form.firstName} onChange={update} className={inputCls} />
                <input name="lastName" required placeholder="Last Name" value={form.lastName} onChange={update} className={inputCls} />
              </div>
              <input name="email" type="email" required placeholder="Email" value={form.email} onChange={update} className={inputCls} />
              <select name="inquiryReason" required value={form.inquiryReason} onChange={update} className={inputCls}>
                <option value="" disabled>Inquiry Reason</option>
                <option>Asking a Question</option>
                <option>Submitting an Order</option>
                <option>Partnership Inquiry</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
              <textarea name="message" required rows={5} placeholder="Tell us how we can help you..." value={form.message} onChange={update} className={`${inputCls} resize-none`} />
              <GoldButton className="w-full">Send via WhatsApp</GoldButton>
              <p className="text-hova-muted/70 text-xs text-center">
                Your message opens in WhatsApp — we reply within the hour.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const t = setTimeout(
        () => document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' }),
        100,
      )
      return () => clearTimeout(t)
    }
  }, [location.state])

  return (
    <div className="min-h-screen bg-hova-black">
      <HeroSequence />

      {/* ============ TRUST STRIP ============ */}
      <section id="trust" className="border-y border-hova-gold/15 bg-hova-black-light">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center gap-2 py-8 px-4 border-hova-gold/10 [&:not(:first-child)]:border-l">
                <item.icon className="w-6 h-6 text-hova-gold" strokeWidth={1.25} />
                <p className="text-white text-sm tracking-[0.12em] uppercase mt-1">{item.title}</p>
                <p className="text-hova-muted text-xs">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ COLLECTION ============ */}
      <section id="products" className="py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="The Collection" title="Signature Creations" className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('/assets/about-bg.png')] bg-cover bg-fixed bg-center" />
        <div className="max-w-4xl mx-auto relative">
          <SectionHeading eyebrow="About Us" title="Welcome to the World of HOVA" className="mb-10" />
          <Reveal delay={0.1}>
            <p className="text-hova-muted text-lg text-center leading-relaxed mb-6">
              A pinnacle of elegance and luxury in the realm of chocolates. Crafted with a passion for
              excellence, HOVA is more than just a chocolate brand — it's an embodiment of refined taste
              and indulgence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-hova-muted text-lg text-center leading-relaxed">
              Our unique approach involves blending distinctive flavor profiles with sustainable sourcing
              practices. From velvety dark chocolate to tantalizing blends, each HOVA chocolate is a
              celebration of excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="py-24 px-4 md:px-8 lg:px-16 bg-hova-black-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Gallery" title="Our Craftsmanship" className="mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <Reveal key={src + i} delay={(i % 3) * 0.1}>
                <div className="relative aspect-square overflow-hidden group">
                  <img
                    src={src}
                    alt="HOVA craftsmanship"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-hova-gold/0 group-hover:bg-hova-gold/15 transition-colors duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GIFTING / CORPORATE ============ */}
      <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/gifting-bg.png')" }}
        />
        <div className="absolute inset-0 bg-hova-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-hova-black via-transparent to-hova-black" />
        <div className="max-w-3xl mx-auto text-center relative">
          <Reveal>
            <Gift className="w-8 h-8 text-hova-gold mx-auto mb-6" strokeWidth={1} />
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-6 leading-snug">
              Corporate Gifting &amp; Special Occasions
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-hova-muted text-lg leading-relaxed mb-10">
              Weddings, corporate events, hotels and boutiques — HOVA creates bespoke chocolate
              experiences with custom packaging and volume arrangements.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <GoldButton
              variant="outline"
              onClick={() => openWhatsApp('Hello! I would like to discuss a partnership / bulk order with HOVA.')}
            >
              Discuss a Partnership
            </GoldButton>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
