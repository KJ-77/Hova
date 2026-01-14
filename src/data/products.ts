// ============================================
// PRODUCT DATA - Easy Configuration
// ============================================
// Update product images, names, prices, descriptions, and specifications here
// Images should be imported at the top and referenced in the products array

// Import product images
import product1 from "../assets/Product1.jpg";
import display1 from "../assets/display1.jpg";
import display2 from "../assets/display2.jpg";
import display3 from "../assets/display3.jpg";
import display4 from "../assets/display4.jpg";
import display5 from "../assets/display5.jpg";
import display6 from "../assets/display6.jpg";

// Product interface
export interface Product {
  id: number;
  name: string;
  image: string; // Main image used on home page
  images: string[]; // Gallery images for product detail page
  price: number;
  shortDescription: string;
  fullDescription: string;
  specifications: Array<{
    label: string;
    value: string;
  }>;
  features: string[];
}

// ============================================
// PRODUCTS ARRAY - Update your products here
// ============================================
export const products: Product[] = [
  // ===== PRODUCT 1: Dark Chocolate Collection =====
  {
    id: 1,
    name: "Dark Chocolate Collection",
    image: product1,
    images: [product1, display1, display2, display3, display4],
    price: 89,
    shortDescription: "Rich, velvety dark chocolate crafted from premium cocoa beans",
    fullDescription:
      "Indulge in our exquisite Dark Chocolate Collection, meticulously crafted from the finest single-origin cocoa beans. Each piece embodies the perfect balance of intense cocoa flavor and subtle sweetness, delivering a sophisticated taste experience that lingers on the palate. Our master chocolatiers have perfected this blend to create a luxurious chocolate that appeals to the most discerning connoisseurs.",
    specifications: [
      { label: "Weight", value: "500g" },
      { label: "Pieces per Box", value: "24 pieces" },
      { label: "Cocoa Content", value: "70%" },
      { label: "Origin", value: "Ecuador" },
      { label: "Shelf Life", value: "12 months" },
      { label: "Storage", value: "Cool, dry place (15-18°C)" },
    ],
    features: [
      "100% natural ingredients",
      "No artificial preservatives",
      "Gluten-free",
      "Suitable for vegetarians",
      "Premium gift packaging included",
      "Handcrafted by master chocolatiers",
    ],
  },

  // ===== PRODUCT 2: Milk Chocolate Delights =====
  {
    id: 2,
    name: "Milk Chocolate Delights",
    image: display2, // TODO: Replace with actual product image
    images: [display2, display1, display3, display4, display5],
    price: 79,
    shortDescription: "Smooth, creamy milk chocolate with a perfect balance of sweetness",
    fullDescription:
      "Experience the perfect harmony of smooth, creamy milk chocolate in our Milk Chocolate Delights collection. Made with the finest milk and cocoa, each piece melts luxuriously on your tongue, releasing layers of rich, sweet flavor. This collection represents the pinnacle of traditional chocolate-making, combining time-honored techniques with modern precision.",
    specifications: [
      { label: "Weight", value: "450g" },
      { label: "Pieces per Box", value: "20 pieces" },
      { label: "Cocoa Content", value: "35%" },
      { label: "Origin", value: "Belgium" },
      { label: "Shelf Life", value: "10 months" },
      { label: "Storage", value: "Cool, dry place (15-18°C)" },
    ],
    features: [
      "Premium Belgian chocolate",
      "Smooth, creamy texture",
      "No artificial flavors",
      "Perfect for gifting",
      "Elegant packaging",
      "Suitable for all ages",
    ],
  },

  // ===== PRODUCT 3: White Chocolate Dreams =====
  {
    id: 3,
    name: "White Chocolate Dreams",
    image: display3, // TODO: Replace with actual product image
    images: [display3, display1, display2, display4, display6],
    price: 85,
    shortDescription: "Luxurious white chocolate with hints of vanilla",
    fullDescription:
      "Dive into the creamy indulgence of our White Chocolate Dreams collection. Made from the purest cocoa butter and enhanced with Madagascar vanilla, these delicate pieces offer a sublime sweetness that enchants the senses. Each chocolate is a testament to the art of balancing richness with refinement, creating an unforgettable taste experience.",
    specifications: [
      { label: "Weight", value: "400g" },
      { label: "Pieces per Box", value: "18 pieces" },
      { label: "Cocoa Butter Content", value: "33%" },
      { label: "Origin", value: "Switzerland" },
      { label: "Shelf Life", value: "8 months" },
      { label: "Storage", value: "Cool, dry place (15-18°C)" },
    ],
    features: [
      "Pure cocoa butter",
      "Madagascar vanilla beans",
      "Delicate, smooth texture",
      "Premium Swiss quality",
      "Beautiful presentation",
      "Perfect for special occasions",
    ],
  },

  // ===== PRODUCT 4: Truffle Selection =====
  {
    id: 4,
    name: "Truffle Selection",
    image: display4, // TODO: Replace with actual product image
    images: [display4, display1, display2, display3, display5],
    price: 120,
    shortDescription: "Handcrafted truffles with exotic flavor combinations",
    fullDescription:
      "Discover our exquisite Truffle Selection, where artistry meets flavor in perfect harmony. Each truffle is handcrafted by our master chocolatiers, featuring innovative combinations of premium chocolate with exotic ingredients like passion fruit, champagne, and rare spices. These luxurious confections are designed to surprise and delight even the most sophisticated palates.",
    specifications: [
      { label: "Weight", value: "350g" },
      { label: "Pieces per Box", value: "16 truffles" },
      { label: "Cocoa Content", value: "60-70%" },
      { label: "Origin", value: "France" },
      { label: "Shelf Life", value: "6 months" },
      { label: "Storage", value: "Refrigerate (4-8°C)" },
    ],
    features: [
      "Handrolled truffles",
      "Exotic flavor combinations",
      "French craftsmanship",
      "Limited availability",
      "Luxury gift box",
      "Fresh ingredients only",
    ],
  },

  // ===== PRODUCT 5: Assorted Gift Box =====
  {
    id: 5,
    name: "Assorted Gift Box",
    image: display5, // TODO: Replace with actual product image
    images: [display5, display1, display2, display3, display6],
    price: 150,
    shortDescription: "A curated selection of our finest chocolates",
    fullDescription:
      "Our Assorted Gift Box is the perfect way to experience the full spectrum of HOVA's chocolate mastery. This carefully curated collection features a selection of our most beloved pieces, from rich dark chocolate to creamy milk chocolate and delicate white chocolate. Each box tells a story of craftsmanship, quality, and passion for the finest chocolate.",
    specifications: [
      { label: "Weight", value: "750g" },
      { label: "Pieces per Box", value: "36 pieces" },
      { label: "Variety", value: "Dark, Milk, White" },
      { label: "Origin", value: "Multi-origin" },
      { label: "Shelf Life", value: "12 months" },
      { label: "Storage", value: "Cool, dry place (15-18°C)" },
    ],
    features: [
      "Three chocolate varieties",
      "Perfect for sharing",
      "Premium gift packaging",
      "Includes flavor guide",
      "Suitable for all preferences",
      "Best seller collection",
    ],
  },

  // ===== PRODUCT 6: Premium Reserve =====
  {
    id: 6,
    name: "Premium Reserve",
    image: display6, // TODO: Replace with actual product image
    images: [display6, display1, display2, display4, display5],
    price: 250,
    shortDescription: "Our most exclusive collection for the discerning palate",
    fullDescription:
      "The Premium Reserve represents the absolute pinnacle of chocolate excellence. This exclusive collection features rare single-origin cocoa from the world's most prestigious plantations, combined with the finest ingredients sourced globally. Each piece is a masterpiece, created in limited quantities to ensure uncompromising quality. Reserved for true connoisseurs, this collection embodies luxury in every bite.",
    specifications: [
      { label: "Weight", value: "600g" },
      { label: "Pieces per Box", value: "20 pieces" },
      { label: "Cocoa Content", value: "75-85%" },
      { label: "Origin", value: "Single-origin selection" },
      { label: "Shelf Life", value: "18 months" },
      { label: "Storage", value: "Cool, dry place (15-18°C)" },
    ],
    features: [
      "Single-origin rare cocoa",
      "Limited production",
      "Numbered certificate of authenticity",
      "Luxury wooden box",
      "Collector's item",
      "Ultimate gift for connoisseurs",
    ],
  },
];

// Helper function to get product by ID
export const getProductById = (id: number | string): Product | undefined => {
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  return products.find((product) => product.id === productId);
};
