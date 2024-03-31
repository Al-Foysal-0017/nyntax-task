import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import BookingCar from "./pages/Book";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/scrollToTop";
import Invoice from "./pages/Invoice";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";

const App = () => {
      const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      const element = document.documentElement;
    
      useEffect(() => {
        if (theme === "dark") {
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [theme]);
    
      React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);
  return (
    <div>
      <ScrollToTop />
      <Navbar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/" element={<Home theme={theme}/>} />
        <Route path="/book-car" element={<BookingCar />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details" element={<CarDetails />} />
      </Routes>
      <Footer/>
    </div>
    
  );
};

export default App;
