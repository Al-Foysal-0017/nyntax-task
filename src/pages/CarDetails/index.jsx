import React from 'react'
import {Link, useLocation} from 'react-router-dom';

const CarDetails = () => {
    const location = useLocation();
    const {car} = location.state
  return (
    <div className="pb-24 dark:bg-dark dark:text-white">
      <div className="container">
        <h1 data-aos="fade-up" className="pt-20 mb-10 text-3xl font-bold text-black capitalize dark:text-white">
            This Car Details
        </h1>
        <div className="min-h-screen border- border-gray-300">
          <div className="">
              <div
                data-aos="fade-up"
                className="flex flex-col items-center space-y-3 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px">
                  <img
                    src={car.imageURL}
                    alt=""
                    className="w-full h-[320px] object-contain sm:translate-x-8"
                  />
                </div>
                <div className='flex flex-col items-center text-xl'>
                    <div className='mt-20 text-primary font-bold text-3xl'>{`${car.make} ${car.model} (${car.year})`}</div>
                    <div className="text-xl mt-8">Type: {car.type}</div>
                    <div>Seats: {car.seats}</div>
                    <div>Bags: {car.bags}</div>
                    <div className="text-sm text-gray-500">Features: {car.features.join(', ')}</div>
                    <div className="flex">Rates: &nbsp;&nbsp;
                            <p>$&nbsp;&nbsp;{car.rates.hourly}/H</p>&nbsp;&nbsp;&nbsp;
                            <p>{car.rates.daily}/D</p>&nbsp;&nbsp;&nbsp;
                            <p>{car.rates.weekly}/W</p>

                    </div>
                    <Link to="/book-car">
                        <button className="mt-10 mb-20 button-outline transition duration-500">
                            Book This Car
                        </button>
                    </Link>
                </div>
              </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default CarDetails