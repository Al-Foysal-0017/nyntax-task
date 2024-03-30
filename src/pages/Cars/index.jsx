import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCars(data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="pb-24 dark:bg-dark dark:text-white">
      <div className="container">
        <h1 data-aos="fade-up" className="pt-20 mb-10 text-3xl font-bold text-black capitalize dark:text-white">
            Our Cars
        </h1>
        <div className="min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-16">
            {cars.map((car) => (
              <div
              key={car.id}
                data-aos="fade-up"
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={car.imageURL}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{`${car.make} ${car.model} (${car.year})`}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                        <div className="flex">
                            <p>$&nbsp;&nbsp;{car.rates.hourly}/H</p>&nbsp;&nbsp;&nbsp;
                            <p>{car.rates.daily}/D</p>&nbsp;&nbsp;&nbsp;
                            <p>{car.rates.weekly}/W</p>
                        </div>
                        <Link to="/book-car">Book Car</Link>
                  </div>
                    <div className="flex">
                        <p>Seats: {car.seats};</p>&nbsp;&nbsp;&nbsp;
                        <p>Bags: {car.bags}</p>
                    </div>
                    <p className="text-sm text-gray-500">Features: {car.features.join(', ')}</p>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  {car.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default CarList;
