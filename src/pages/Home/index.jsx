import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = ({theme}) => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Hero  theme={theme}/>
      <About theme={theme}/>
      <Testimonial />
      <Contact />
    </div>
  )
}

export default Home