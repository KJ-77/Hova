import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
// import Navbar from "./components/navbar";


const App = () => {
  return (
    <Router>
        <Routes>
          
          <Route path="/" element= {<Home />} />
          {/* <Route path="/*" element={<NotFoundPage />} /> */}
        </Routes>
     
      </Router>
  );
};

export default App;
