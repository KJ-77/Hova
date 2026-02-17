import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from "lucide-react";
import WhatsAppButton from "@/components/whatsapp-button";
import { getProductBySlug } from "@/data/products";

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [autoScrollKey, setAutoScrollKey] = useState(0);
  const maxVisibleThumbs = 5;

  // Get product details
  const product = getProductBySlug(slug || "");

  // Redirect to home if product not found
  if (!product) {
    navigate("/");
    return null;
  }

  const currentMedia = product.images[currentImageIndex];
  const currentIsVideo = isVideo(currentMedia);

  // Advance to next slide
  const advanceSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % product.images.length
    );
  }, [product.images.length]);

  // Auto-scroll: for images use 3s timer, for videos the onEnded callback handles it
  useEffect(() => {
    if (currentIsVideo) return;

    const timeout = setTimeout(advanceSlide, 3000);
    return () => clearTimeout(timeout);
  }, [currentImageIndex, autoScrollKey, currentIsVideo, advanceSlide]);

  // Keep thumbnail carousel in sync with current image
  useEffect(() => {
    if (currentImageIndex < thumbStartIndex) {
      setThumbStartIndex(currentImageIndex);
    } else if (currentImageIndex >= thumbStartIndex + maxVisibleThumbs) {
      setThumbStartIndex(Math.min(
        currentImageIndex - maxVisibleThumbs + 1,
        product.images.length - maxVisibleThumbs
      ));
    }
  }, [currentImageIndex, thumbStartIndex, product.images.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setAutoScrollKey((prev) => prev + 1);
  };

  const handleOrderWhatsApp = () => {
    const phoneNumber = "79088963";
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
            {/* Main Image / Video */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {currentIsVideo ? (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <video
                    src={currentMedia}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={advanceSlide}
                  />
                </motion.div>
              ) : (
                <motion.img
                  key={currentImageIndex}
                  src={currentMedia}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-hova-black/50 to-transparent pointer-events-none" />
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
                  .map((media, i) => {
                    const index = thumbStartIndex + i;
                    const isVid = isVideo(media);
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
                        {isVid ? (
                          <video
                            src={media}
                            className="w-full h-full object-cover"
                            muted
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={media}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {isVid && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play className="h-6 w-6 text-white drop-shadow-lg" fill="white" />
                          </div>
                        )}
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

            {/* Order Button */}
            <Button
              onClick={handleOrderWhatsApp}
              className="w-full bg-hova-gold text-hova-black hover:bg-hova-gold-dark font-medium py-6 text-lg tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
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
