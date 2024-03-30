import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import CarList from "../../components/CarList/CarList";
import AppStoreBanner from "../../components/AppStoreBanner/AppStoreBanner";
import Contact from "../../components/Contact/Contact";
import Testimonial from "../../components/Testimonial/Testimonial";
// import Footer from "../../components/Footer/Footer";

const Home = ({theme}) => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {/* <Navbar theme={theme} setTheme={setTheme} /> */}
      <Hero  theme={theme}/>
      <About theme={theme}/>
      {/* <Services /> */}
      {/* <CarList /> */}
      <Testimonial />
      {/* <AppStoreBanner /> */}
      <Contact />
      
    </div>
  )
}

export default Home