// Central place for business info. The live site used wa.me/79088963 (missing
// Lebanon's country code) — WhatsApp requires full international format.
export const WHATSAPP_NUMBER = '96179088963'
export const WHATSAPP_DEFAULT_MESSAGE = "Hello! I'm interested in your chocolate products."

export const openWhatsApp = (message = WHATSAPP_DEFAULT_MESSAGE) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

export const products = [
  {
    id: 1,
    slug: 'classic-box',
    name: 'The Classic Box',
    brandName: 'The Classic Box from HOVA',
    accent: '#c9a557',
    // matches the real packaging: charcoal-black box, black satin ribbon, gold embossed logo
    boxStyle: { base: '#1a1a20', lid: '#111116', ribbon: '#26262b', label: 'HOVA' },
    badge: 'Signature',
    image: '/assets/classic-1.jpeg',
    images: [
      '/assets/classic-1.jpeg', '/assets/classic-tray.jpg', '/assets/classic-2.jpeg',
      '/assets/classic-3.jpeg', '/assets/classic-4.jpeg', '/assets/classic-5.jpeg',
      '/assets/classic-6.jpeg', '/assets/classic-7.jpg', '/assets/classic-8.jpeg',
    ],
    price: 35,
    shortDescription:
      'A refined selection of 35 handcrafted chocolates, thoughtfully composed to offer variety, balance, and depth.',
    fullDescription: `Each set includes five distinct flavors, with seven pieces of each, designed to create a complete tasting experience. Flavors include:

Coffee Filling (Choco Spresso)
A bold, rich coffee filling with a smooth finish and a subtle sense of freshness.

Salted Caramel Filling
Soft, balanced caramel with a gentle touch of salt for a refined contrast.

Caramel Pecan Filling
Smooth caramel paired with lightly crisp pecans, offering warmth and texture in every bite.

Gianduja Filling
A harmonious blend of hazelnut and pistachio, layered and elegant.

Pistachio Cream Filling
Rich and velvety, crafted for a deeply satisfying finish.

Every piece in the Classic Box is carefully made to reflect HOVA's attention to detail and commitment to quality.
Perfect as a gift — or as a personal indulgence — this box is designed to turn any moment into a piece of joy.`,
    specifications: [
      { label: 'Weight', value: '500g' },
      { label: 'Pieces per Box', value: '35 pieces' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Cool, dry place (15-18°C)' },
    ],
    features: [
      '100% natural ingredients', 'No artificial preservatives', 'Gluten-free',
      'Suitable for vegetarians', 'Premium gift packaging included', 'Handcrafted by master chocolatiers',
    ],
  },
  {
    id: 2,
    slug: 'caramel-pecan',
    name: 'Caramel Pecan',
    brandName: 'Caramel Pecan from HOVA',
    accent: '#b8783c',
    boxStyle: { base: '#1a130c', lid: '#241a10', ribbon: '#b8783c', label: 'HOVA' },
    badge: 'Best Seller',
    image: '/assets/pecan-1.jpg',
    images: [
      '/assets/pecan-1.jpg', '/assets/pecan-2.jpg', '/assets/pecan-3.mp4',
      '/assets/pecan-4.jpeg', '/assets/pecan-5.jpeg', '/assets/pecan-6.jpeg',
    ],
    price: 30,
    shortDescription:
      'A smooth caramel center engulfed in authentic Belgian chocolate, finished with roasted pecans.',
    fullDescription:
      'Sweet caramel, rich Belgian chocolate, and lightly salted pecans are layered in a perfect harmony.',
    specifications: [
      { label: 'Weight', value: '450g' },
      { label: 'Pieces per Box', value: '20 pieces' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Cool, dry place (15-18°C)' },
    ],
    features: [
      'Premium Belgian chocolate', 'Smooth, creamy texture', 'No artificial flavors',
      'Perfect for gifting', 'Elegant packaging', 'Suitable for all ages',
    ],
  },
  {
    id: 3,
    slug: 'crispy-cheese',
    name: 'Crispy Cheese',
    brandName: 'Crispy Cheese from HOVA',
    accent: '#e8d9b0',
    boxStyle: { base: '#f0e8d8', lid: '#e6dcc6', ribbon: '#c9a557', label: 'HOVA' },
    badge: null,
    image: '/assets/cheese-1.jpeg',
    images: [
      '/assets/cheese-1.jpeg', '/assets/cheese-2.jpg', '/assets/cheese-3.jpg',
      '/assets/cheese-4.jpeg', '/assets/cheese-5.jpeg', '/assets/cheese-6.mp4',
    ],
    price: 25,
    shortDescription:
      'A refined combination of a smooth mascarpone filling wrapped in a light, crispy exterior.',
    fullDescription:
      'Each piece is carefully crafted to deliver a perfect balance between creamy richness and delicate crunch.',
    specifications: [
      { label: 'Weight', value: '400g' },
      { label: 'Pieces per Box', value: '14 pieces' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Cool, dry place (15-18°C)' },
    ],
    features: [
      'Pure cocoa butter', 'Madagascar vanilla beans', 'Delicate, smooth texture',
      'Premium Belgian quality', 'Beautiful presentation', 'Perfect for special occasions',
    ],
  },
  {
    id: 4,
    slug: 'pistachio-cream',
    name: 'Pistachio Cream',
    brandName: 'Pistachio Cream from HOVA',
    accent: '#9dbd7e',
    boxStyle: { base: '#182012', lid: '#121a0d', ribbon: '#9dbd7e', label: 'HOVA' },
    badge: 'Limited',
    image: '/assets/pistachio-1.jpeg',
    images: [
      '/assets/pistachio-1.jpeg', '/assets/pistachio-2.jpeg',
      '/assets/pistachio-3.jpeg', '/assets/pistachio-4.jpeg',
    ],
    price: 25,
    shortDescription:
      'Savor the rich crunch of premium pistachios enveloped in silk-smooth, creamy artisanal chocolate.',
    fullDescription:
      'This elegantly boxed collection is the ultimate masterclass in buttery, nutty decadence.',
    specifications: [
      { label: 'Weight', value: '350g' },
      { label: 'Pieces per Box', value: '16 pistachios' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Refrigerate (4-8°C)' },
    ],
    features: [
      'Handrolled pistachios', 'Exotic flavor combinations', 'Belgian craftsmanship',
      'Limited availability', 'Luxury gift box', 'Fresh ingredients only',
    ],
  },
  {
    id: 5,
    slug: 'caramel-pecan-pink',
    name: 'Caramel Pecan — Pink Edition',
    brandName: 'Caramel Pecan from HOVA',
    accent: '#e8a0b4',
    boxStyle: { base: '#f2c7d3', lid: '#eab6c6', ribbon: '#ffffff', label: 'HOVA' },
    badge: 'Iconic',
    image: '/assets/pink-1.jpeg',
    images: ['/assets/pink-1.jpeg', '/assets/pink-2.jpeg', '/assets/pink-3.jpeg'],
    price: 30,
    shortDescription:
      'Experience the buttery snap of toasted pecans and salted caramel croquant, perfectly balanced within smooth, premium chocolate.',
    fullDescription:
      "Presented in our iconic pink box, it's a chic, textured indulgence that tastes even better than it looks.",
    specifications: [
      { label: 'Weight', value: '750g' },
      { label: 'Pieces per Box', value: '15 pieces' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Cool, dry place (15-18°C)' },
    ],
    features: [
      'Three chocolate varieties', 'Perfect for sharing', 'Premium gift packaging',
      'Includes flavor guide', 'Suitable for all preferences', 'Best seller collection',
    ],
  },
  {
    id: 6,
    slug: 'wafers',
    name: 'Wafers',
    brandName: 'Wafers from HOVA',
    accent: '#b03a3a',
    boxStyle: { base: '#7a1f1f', lid: '#641717', ribbon: '#c9a557', label: 'HOVA' },
    badge: "Collector's",
    image: '/assets/wafers-cover.jpg',
    images: [
      '/assets/wafers-cover.jpg', '/assets/wafers-2.png',
      '/assets/wafers-3.jpeg', '/assets/wafers-4.jpeg',
    ],
    price: 35,
    shortDescription:
      'Wrapped in a striking crimson case, these artisanal wafers feature delicate, airy layers enveloped in smooth, high-end chocolate.',
    fullDescription:
      'It is a masterclass in texture, offering a refined snap that feels every bit as luxurious as its elegant presentation.',
    specifications: [
      { label: 'Weight', value: '600g' },
      { label: 'Pieces per Box', value: '30 pieces' },
      { label: 'Delivery Time', value: '1-2 Days' },
      { label: 'Origin', value: 'Belgium' },
      { label: 'Delivery Charge', value: 'Free Delivery' },
      { label: 'Storage', value: 'Cool, dry place (15-18°C)' },
    ],
    features: [
      'Single-origin rare cocoa', 'Limited production', 'Numbered certificate of authenticity',
      'Luxury box', "Collector's item", 'Ultimate gift for connoisseurs',
    ],
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const galleryImages = [
  '/assets/gallery-1.jpg', '/assets/gallery-2.jpg', '/assets/classic-8.jpeg',
  '/assets/pistachio-2.jpeg', '/assets/pistachio-4.jpeg', '/assets/pistachio-3.jpeg',
]

export const isVideo = (src) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
