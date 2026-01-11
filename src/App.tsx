import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./pages/product-detail";
// import Navbar from "./components/navbar";


const App = () => {
  return (
    <Router>
        <Routes>

          <Route path="/" element= {<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>

      </Router>
  );
};

export default App;
