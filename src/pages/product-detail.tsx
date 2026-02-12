import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp-button";
import { getProductById } from "@/data/products";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const maxVisibleThumbs = 5;

  // Get product details
  const product = getProductById(id || "1");

  // Redirect to home if product not found
  if (!product) {
    navigate("/");
    return null;
  }

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % product.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleInquireNow = () => {
    const phoneNumber = "79088963"; // Same number as WhatsApp button
    const message = `Hello! I'm interested in the ${product.name}. Could you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-hova-black">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-hova-black/95 backdrop-blur-sm border-b border-hova-gold/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-hova-gold hover:text-hova-gold/80 hover:bg-hova-gold/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Image Carousel */}
          <motion.div variants={fadeIn} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hova-black/50 to-transparent" />
            </div>

            {/* Thumbnail Gallery Carousel */}
            <div className="flex items-center gap-2">
              {product.images.length > maxVisibleThumbs && (
                <button
                  onClick={() => setThumbStartIndex((prev) => Math.max(0, prev - 1))}
                  disabled={thumbStartIndex === 0}
                  className="shrink-0 p-1 text-hova-gold disabled:text-hova-gold/20 hover:text-hova-gold/80 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              <div className="grid grid-cols-5 gap-2 flex-1">
                {product.images
                  .slice(thumbStartIndex, thumbStartIndex + maxVisibleThumbs)
                  .map((image, i) => {
                    const index = thumbStartIndex + i;
                    return (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                          currentImageIndex === index
                            ? "ring-2 ring-hova-gold scale-105"
                            : "ring-1 ring-hova-gold/20 hover:ring-hova-gold/50"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`absolute inset-0 transition-colors duration-300 ${
                            currentImageIndex === index
                              ? "bg-hova-gold/0"
                              : "bg-black/40 hover:bg-black/20"
                          }`}
                        />
                      </button>
                    );
                  })}
              </div>
              {product.images.length > maxVisibleThumbs && (
                <button
                  onClick={() =>
                    setThumbStartIndex((prev) =>
                      Math.min(product.images.length - maxVisibleThumbs, prev + 1)
                    )
                  }
                  disabled={thumbStartIndex >= product.images.length - maxVisibleThumbs}
                  className="shrink-0 p-1 text-hova-gold disabled:text-hova-gold/20 hover:text-hova-gold/80 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={fadeIn} className="space-y-8">
            {/* Product Name and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl text-white font-light mb-4 tracking-wide">
                {product.name}
              </h1>
              <p className="text-hova-gold text-3xl font-light">
                ${product.price}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-hova-muted text-lg leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Specifications */}
            <Card className="bg-hova-black-light border-hova-gold/20">
              <CardContent className="p-6">
                <h3 className="text-hova-gold text-sm tracking-[0.2em] mb-4">
                  SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-hova-muted text-sm">{spec.label}</p>
                      <p className="text-white font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Button */}
            <Button
              onClick={handleInquireNow}
              className="w-full bg-hova-gold text-hova-black hover:bg-hova-gold-dark font-medium py-6 text-lg tracking-wider transition-all duration-300"
            >
              Inquire Now
            </Button>
          </motion.div>
        </motion.div>

        {/* Full Description Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-20"
        >
          <h2 className="text-hova-gold text-sm tracking-[0.3em] mb-6">
            ABOUT THIS PRODUCT
          </h2>
          <p className="text-white text-lg leading-relaxed mb-12 whitespace-pre-line">
            {product.fullDescription}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-hova-black-light border border-hova-gold/20 p-4 rounded-lg"
              >
                <p className="text-white text-sm">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-hova-gold/20 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-2xl text-white tracking-[0.3em] mb-2">HOVA</h4>
            <p className="text-hova-gold text-sm tracking-[0.2em] mb-6">
              PIECE OF JOY
            </p>
            <p className="text-hova-muted text-sm">
              © {new Date().getFullYear()} HOVA Chocolates. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="1234567890" message={`Hello! I'm interested in the ${product.name}.`} />
    </div>
  );
};

export default ProductDetail;
