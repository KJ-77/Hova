// ============================================
// PRODUCT DATA - Easy Configuration
// ============================================
// Update product images, names, prices, descriptions, and specifications here
// Images should be imported at the top and referenced in the products array

// Import product images
import product1_1 from "../assets/Classic/first.jpeg";
import product1_2 from "../assets/Classic/second.jpeg";
import product1_3 from "../assets/Classic/third.jpeg";
import product1_4 from "../assets/Classic/fourth.jpeg";
import product1_5 from "../assets/Classic/fifth.jpeg";
import product1_6 from "../assets/Classic/sixth.jpeg";
import product1_7 from "../assets/Classic/seventh.jpeg";
import product1_8 from "../assets/Classic/eighth.jpeg";

//===========================================================================

import product2_1 from "../assets/Pink1/first.jpg";
import product2_2 from "../assets/Pink1/second.jpg";
import product2_3 from "../assets/Pink1/third.mp4";
import product2_4 from "../assets/Pink1/fourth.png";
import product2_5 from "../assets/Pink1/fifth.png";
import product2_6 from "../assets/Pink1/sixth.png";

//===========================================================================

import product3_1 from "../assets/CrispyCheese/first.png";
import product3_2 from "../assets/CrispyCheese/second.jpg";
import product3_3 from "../assets/CrispyCheese/third.jpg";
import product3_4 from "../assets/CrispyCheese/fourth.png";
import product3_5 from "../assets/CrispyCheese/fifth.png";
import product3_6 from "../assets/CrispyCheese/movie.mp4";

//===========================================================================

import product4_1 from "../assets/Pistachio/first.jpeg";
import product4_2 from "../assets/Pistachio/second.jpeg";
import product4_3 from "../assets/Pistachio/third.jpeg";
import product4_4 from "../assets/Pistachio/fourth.jpeg";

//===========================================================================

import product5_1 from "../assets/Pink2/first.jpeg";
import product5_2 from "../assets/Pink2/second.jpeg";
import product5_3 from "../assets/Pink2/third.jpeg";

//===========================================================================

import product6_1 from "../assets/RedBox/first.jpeg";
import product6_2 from "../assets/RedBox/second.png";
import product6_3 from "../assets/RedBox/third.jpeg";
import product6_4 from "../assets/RedBox/fourth.jpeg";

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
    name: "The Classic Box from HOVA",
    image: product1_1,
    images: [product1_1, product1_2, product1_3, product1_4, product1_5, product1_6, product1_7, product1_8],
    price: 40,
    shortDescription: "A refined selection of 35 handcrafted chocolates, thoughtfully composed to offer variety, balance, and depth.",
    fullDescription:
      "Each set includes five distinct flavors, with seven pieces of each, designed to create a complete tasting experience. Flavors include:\n\nCoffee Filling (Choco Spresso)\nA bold, rich coffee filling with a smooth finish and a subtle sense of freshness.\n\nSalted Caramel Filling\nSoft, balanced caramel with a gentle touch of salt for a refined contrast.\n\nCaramel Pecan Filling\nSmooth caramel paired with lightly crisp pecans, offering warmth and texture in every bite.\n\nGianduja Filling\nA harmonious blend of hazelnut and pistachio, layered and elegant.\n\nPistachio Cream Filling\nRich and velvety, crafted for a deeply satisfying finish.\n\nEvery piece in the Classic Box is carefully made to reflect HOVA's attention to detail and commitment to quality.\nPerfect as a gift — or as a personal indulgence — this box is designed to turn any moment into a piece of joy.",
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
    name: "Caramel Pecan from HOVA",
    image: product2_1,
    images: [product2_1, product2_2, product2_3, product2_4, product2_5, product2_6],
    price: 34,
    shortDescription: "A smooth caramel center engulfed in authentic Belgian chocolate, finished with roasted pecans.",
    fullDescription:
      "Sweet caramel, rich Belgian chocolate, and lightly salted pecans are layered in a perfect harmony.",
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
    name: "Crispy Cheese from HOVA",
    image: product3_1,
    images: [product3_1, product3_2, product3_3, product3_4, product3_5, product3_6],
    price: 28,
    shortDescription: "A refined combination of a smooth mascarpone filling wrapped in a light, crispy exterior.",
    fullDescription:
      "Each piece is carefully crafted to deliver a perfect balance between creamy richness and delicate crunch.",
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
    name: "Pistachio Cream from HOVA",
    image: product4_1,
    images: [product4_1, product4_2, product4_3, product4_4],
    price: 28,
    shortDescription: "Savor the rich crunch of premium pistachios enveloped in silk-smooth, creamy artisanal chocolate.",
    fullDescription:
      "This elegantly boxed collection is the ultimate masterclass in buttery, nutty decadence.",
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
    name: "Caramel Pecan from HOVA",
    image: product5_1,
    images: [product5_1, product5_2, product5_3],
    price: 36,
    shortDescription: "Experience the buttery snap of toasted pecans and salted caramel croquant, perfectly balanced within smooth, premium chocolate. ",
    fullDescription:
      "Presented in our iconic pink box, it’s a chic, textured indulgence that tastes even better than it looks.",
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
    name: "Wafers from HOVA",
    image: product6_1,
    images: [product6_1, product6_2, product6_3, product6_4],
    price: 40,
    shortDescription: "Wrapped in a striking crimson case, these artisanal wafers feature delicate, airy layers enveloped in smooth, high-end chocolate.",
    fullDescription:
      "It is a masterclass in texture, offering a refined snap that feels every bit as luxurious as its elegant presentation.",
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
