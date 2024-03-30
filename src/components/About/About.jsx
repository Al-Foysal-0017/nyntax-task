import React from "react";
import darkCar from "../../assets/supercar5.png";
import lightCar from "../../assets/supercar7.png";
import { Link } from "react-router-dom";

const About = ({theme}) => {
  return (
    <div className="dark:bg-dark bg-slate-100 min-h-screen sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="600">
            <img
              src={theme === "dark" ? darkCar : lightCar}
              alt=""
              className={`sm:scale-125 sm:-translate-x-11 drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] ${theme === "dark" ? 'max-h-[200px]' : 'max-h-[300px]'}`}
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, magnam! Tenetur odio quo et maxime?
              </p>
              <p data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                tempora.
              </p>
              <div>
                <Link to="/book-car">
                  <button data-aos="fade-up" className="button-outline transition duration-500">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
