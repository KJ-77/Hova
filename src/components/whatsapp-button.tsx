import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber = "79088963", // Replace with actual WhatsApp number
  message = "Hello! I'm interested in your chocolate products.",
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-hova-black border-2 border-hova-gold p-4 rounded-full shadow-lg hover:shadow-hova-gold/50 transition-shadow duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-hova-gold" />
    </motion.button>
  );
};

export default WhatsAppButton;
