import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WhatsAppButton from "@/components/whatsapp-button";
import { products } from "@/data/products";
import display1 from "../assets/display1.jpg";
import display2 from "../assets/display2.jpg";
import display3 from "../assets/display3.jpg";
import display4 from "../assets/display4.jpg";
import display5 from "../assets/display5.jpg";
import display6 from "../assets/display6.jpg";
import herobg from "../assets/herobg.jpg";

// ============================================
// IMAGE PLACEHOLDERS - Modify paths here
// ============================================
const IMAGES = {
  hero: herobg,
  gallery: [
    display1,
    display2,
    display3,
    display4,
    display5,
    display6,
  ],
};

// ============================================
// EMAILJS CONFIG - Add your credentials here
// ============================================
const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
};

// Reusable animated section wrapper
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TruncatedText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <div className="relative">
      <p ref={textRef} className="text-hova-muted text-sm overflow-hidden max-h-[3.75rem]">
        {text}
      </p>
      {isTruncated && (
        <div className="absolute bottom-0 right-0 h-5 w-2/5 bg-gradient-to-r from-transparent to-hova-black-light pointer-events-none" />
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryReason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryReason: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          inquiry_reason: formData.inquiryReason,
          message: formData.message,
        },
        EMAILJS_CONFIG.publicKey
      );
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        inquiryReason: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-hova-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-6xl md:text-8xl font-light text-white mb-4 tracking-[0.3em] -mr-[0.3em]"
          >
            HOVA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-hova-gold text-xl md:text-2xl tracking-[0.2em] -mr-[0.2em] font-light"
          >
            PIECE OF JOY
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <Button
              variant="outline"
              className="border-hova-gold text-hova-gold hover:bg-hova-gold hover:text-hova-black px-8 py-6 text-lg tracking-wider transition-all duration-300"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Collection
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-hova-gold/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-hova-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-hova-gold text-sm tracking-[0.3em] mb-4 text-center">
              ABOUT US
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <h3 className="text-3xl md:text-4xl text-white font-light text-center mb-8 leading-relaxed">
              Welcome to the World of HOVA
            </h3>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-hova-muted text-lg text-center leading-relaxed mb-6">
              A pinnacle of elegance and luxury in the realm of chocolates. Crafted with a passion
              for excellence, HOVA is more than just a chocolate brand — it's an embodiment of
              refined taste and indulgence.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-hova-muted text-lg text-center leading-relaxed">
              Our unique approach involves blending distinctive flavor profiles with sustainable
              sourcing practices. From velvety dark chocolate to tantalizing blends, each HOVA
              chocolate is a celebration of excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-hova-black-light">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-hova-gold text-sm tracking-[0.3em] mb-4">
              GALLERY
            </h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">
              Our Craftsmanship
            </h3>
          </AnimatedSection>

          <motion.div
            ref={useRef(null)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {IMAGES.gallery.map((image, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="relative aspect-square overflow-hidden group"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-hova-gold/0 group-hover:bg-hova-gold/20 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-hova-gold text-sm tracking-[0.3em] mb-4">
              OUR COLLECTION
            </h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">
              Premium Chocolates
            </h3>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp} className="h-full">
                <Card className="bg-hova-black-light border-hova-gold/20 overflow-hidden group hover:border-hova-gold/50 transition-colors duration-300 h-full">
                  <div className="relative h-80 overflow-hidden -mt-6">
                    <div
                      className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-110 z-30"
                      style={{ backgroundImage: `url(${product.image})`}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hova-black-light to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white font-light text-xl">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TruncatedText text={product.shortDescription} />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 mt-auto">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-hova-gold text-2xl font-light">
                        ${product.price}
                        {/* <span className="text-hova-muted text-sm">  500g</span> */}
                      </span>
                    </div>
                    <Button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="w-full bg-hova-gold/10 text-hova-gold border border-hova-gold/30 hover:bg-hova-gold hover:text-hova-black font-medium py-5 tracking-wider transition-all duration-300"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-hova-black-light">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-hova-gold text-sm tracking-[0.3em] mb-4">
              GET IN TOUCH
            </h2>
            <h3 className="text-3xl md:text-4xl text-white font-light">
              Contact Us
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <AnimatedSection>
              <div className="w-full h-[400px] bg-hova-black border border-hova-gold/20 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33016.655458463276!2d35.48368274137904!3d33.88925221106324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e1!3m2!1sen!2slb!4v1770933084962!5m2!1sen!2slb"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Beirut Location"
                />
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-hova-black border-hova-gold/30 text-white placeholder:text-hova-muted focus:border-hova-gold"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-hova-black border-hova-gold/30 text-white placeholder:text-hova-muted focus:border-hova-gold"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-hova-black border-hova-gold/30 text-white placeholder:text-hova-muted focus:border-hova-gold"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryReason" className="text-white">
                    Inquiry Reason
                  </Label>
                  <Select
                    value={formData.inquiryReason}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger className="bg-hova-black border-hova-gold/30 text-white focus:border-hova-gold">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent className="bg-hova-black border-hova-gold/30">
                      <SelectItem value="question" className="text-white hover:bg-hova-gold/20">
                        Asking a Question
                      </SelectItem>
                      <SelectItem value="order" className="text-white hover:bg-hova-gold/20">
                        Submitting an Order
                      </SelectItem>
                      <SelectItem value="partnership" className="text-white hover:bg-hova-gold/20">
                        Partnership Inquiry
                      </SelectItem>
                      <SelectItem value="feedback" className="text-white hover:bg-hova-gold/20">
                        Feedback
                      </SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-hova-gold/20">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-hova-black border-hova-gold/30 text-white placeholder:text-hova-muted focus:border-hova-gold resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-hova-gold text-hova-black hover:bg-hova-gold-dark font-medium py-6 tracking-wider transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-center"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-center"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-hova-gold/20">
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
      <WhatsAppButton />
    </div>
  );
};

export default Home;
