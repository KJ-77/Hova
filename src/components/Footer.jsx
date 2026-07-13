import { MapPin, MessageCircle } from 'lucide-react'
import { openWhatsApp } from '../data/products.js'

export default function Footer() {
  return (
    <footer className="py-14 px-4 border-t border-hova-gold/20 bg-hova-black">
      <div className="max-w-7xl mx-auto text-center">
        <img src="/assets/hova-logo-light.png" alt="HOVA — Piece of Joy" className="h-14 w-auto mx-auto mb-8" />

        <div className="flex items-center justify-center gap-8 mb-8 text-hova-muted text-sm">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-hova-gold" /> Beirut, Lebanon
          </span>
          <button
            onClick={() => openWhatsApp()}
            className="flex items-center gap-2 hover:text-hova-gold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-hova-gold" /> WhatsApp
          </button>
          {/* TODO: add Instagram/social links once handles are confirmed */}
        </div>

        <div className="gold-hairline w-48 mx-auto mb-8" />
        <p className="text-hova-muted text-sm">
          © {new Date().getFullYear()} HOVA Chocolates. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
