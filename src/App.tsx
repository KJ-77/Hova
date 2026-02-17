import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/home";
import ProductDetail from "./pages/product-detail";
import ScrollToTop from "./components/scroll-to-top";

const App = () => {
  return (
    <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
        <Analytics />
    </Router>
  );
};

export default App;
