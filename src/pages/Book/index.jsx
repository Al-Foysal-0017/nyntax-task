import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import TotalCharges from '../../components/TotalCarges/TotalCharges';
import "./Book.css"

function AccountSettings() {
    const navigate = useNavigate();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [reservationData, setReservationData] = useState({
        reservation_ID: '',
        pickup_Date: '',
        return_Date: '',
        duration: '',
        discount: '',
    });

    const [week, setWeek] = useState(0);
    const [day, setDay] = useState(0);

    const [vehicleData, setVehicleData] = useState({
        vehicle_Type: '',
        vehicle: ''
    });

    const [customerInfo, setCustomerInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });

    const [additionalCharges, setAdditionalCharges] = useState({
        collision_Damage_Waiver: false,
        liability_Insurance: false,
        rental_Tax: false,
    });

    const handleReservationChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'return_Date') {
          const returnDate = new Date(value);
          if (returnDate <= today) {
            toast.error("Return date should be after today. Please select a valid return date.");
            return;
          }
          if (returnDate <= reservationData.pickup_Date) {
            toast.error("Return date should be after pickup date. Please select a valid return date.");
          }
        }
    
        setReservationData({
          ...reservationData,
          [name]: value,
        });
      };

    const handleVehicleDataChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
          ...vehicleData,
          [name]: value,
        });
    };

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
          ...customerInfo,
          [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setAdditionalCharges({
          ...additionalCharges,
          [name]: checked,
        });
    };

    const sedanOptions = [
        { value: 'Toyota Camry (2022)', label: 'Toyota Camry (2022)' },
        { value: 'Honda Civic (2021)', label: 'Honda Civic (2021)' }
      ];
    
    const suvOptions = [
        { value: 'Ford Escape (2023)', label: 'Ford Escape (2023)' },
        { value: 'Chevrolet Tahoe (2022)', label: 'Chevrolet Tahoe (2022)' }
    ];
    
    const vehicleOptions = vehicleData.vehicle_Type === 'Sedan' ? sedanOptions : suvOptions;

    const rentalRates = {
        'Toyota Camry (2022)': { daily: 70, weekly: 400 },
        'Honda Civic (2021)': { daily: 60, weekly: 350 },
        'Ford Escape (2023)': { daily: 90, weekly: 500 },
        'Chevrolet Tahoe (2022)': { daily: 100, weekly: 600 }
    };

    const calculateTotal = () => {
        let total = 0;
      
        // Calculate daily charge based on selected vehicle
        const dailyCharge = rentalRates[vehicleData.vehicle]?.daily * (isNaN(day) ? 0 : day) || 0;
        total += dailyCharge;
      
        // Calculate weekly charge based on selected vehicle
        const weeklyCharge = rentalRates[vehicleData.vehicle]?.weekly * (isNaN(week) ? 0 : week) || 0;
        total += weeklyCharge;
      
        // Add additional charges
        if (additionalCharges.collision_Damage_Waiver) {
          total += 9;
        }
        if (additionalCharges.liability_Insurance) {
          total += 15;
        }
        if (additionalCharges.rental_Tax) {
          total += (total * 11.5) / 100; // Adding 11.5% of the total
        }
      
        return total.toFixed(2); // Format total with two decimal places
    };
      
    const total = calculateTotal(); // Calculate total

    useEffect(() => {
        const pickupDate = new Date(reservationData.pickup_Date);
        const returnDate = new Date(reservationData.return_Date);
    
        // Check if both pickup_Date and return_Date are set
        if (pickupDate && returnDate) {
          const durationInMilliseconds = returnDate - pickupDate;
          const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));
    
          const weeks = Math.floor(durationInDays / 7);
          const remainingDays = durationInDays % 7;

          setWeek(weeks);
          setDay(remainingDays);
    
          setReservationData((prevState) => ({
            ...prevState,
            duration: `${weeks} Week${weeks === 1 ? '' : 's'} and ${remainingDays} Day${remainingDays === 1 ? '' : 's'}`,
          }));
        }
      }, [reservationData.pickup_Date, reservationData.return_Date]);
    

    // redirecting to invoice component
    const redirectToInvoice = () => {
        // Check if required fields are not empty
        if (
            !reservationData.pickup_Date ||
            !reservationData.return_Date ||
            !vehicleData.vehicle_Type ||
            !vehicleData.vehicle ||
            !customerInfo.first_name ||
            !customerInfo.last_name ||
            !customerInfo.email ||
            !customerInfo.phone
        ) {
            toast.error("Please fill all the required fields.")
            return;
        }

        navigate("/invoice", {
            state: {
                day,
                week,
                additionalCharges,
                total,
                reservationData,
                vehicleData,
                customerInfo,
                rentalRates
            },
        });
    };
  return (
    <>
    <Toaster
        position="top-center"
        reverseOrder={false}
    />
    <div className='dark:bg-dark dark:text-white pb-40'>
        <section className='container py-2 md:py-0 min-h-screen '>
            <h1 className="pt-20 pb-10 text-3xl font-bold capitalize">
                Reservation
            </h1>
            {/* First, Middle, Last side */}
            <div className='flex w-full flex-col xl:flex-row gap-3'>
                {/* First, Middle side */}
                <div className='flex gap-3 lg:flex-row flex-col xl:w-4/6 w-full'>
                    {/* First side */}
                    <div className='lg:w-1/2 w-full flex flex-col gap-3'>
                        <div className='flex w-full flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                            <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-white">
                                Reservation Details
                            </h1>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="username">Reservation ID</label>
                                <input 
                                    type="text"
                                    id="reservation_ID"
                                    name="reservation_ID"
                                    value={reservationData.reservation_ID}
                                    onChange={handleReservationChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="date">
                                    Pickup Date<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                    type="date"
                                    id="pickup_Date"
                                    name="pickup_Date"
                                    value={reservationData.pickup_Date}
                                    onChange={handleReservationChange}
                                    min={today.toISOString().split('T')[0]} // Set min date to today
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="date">
                                    Return Date<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                    type="date"
                                    id="return_Date"
                                    name="return_Date"
                                    value={reservationData.return_Date}
                                    onChange={handleReservationChange}
                                    min={tomorrow.toISOString().split('T')[0]} // Set min date to tomorrow
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="username">Duration</label>
                                <input 
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    value={reservationData.duration}
                                    onChange={handleReservationChange}
                                    readOnly
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="username">Discount</label>
                                <input 
                                    placeholder='$ 0.00'
                                    readOnly
                                    type="text"
                                    id="discount"
                                    name="discount"
                                    value={reservationData.discount}
                                    onChange={handleReservationChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                        </div>
                        <div className='flex w-full flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                            <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-white">
                                Vehicle Information
                            </h1>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="vehicle_Type">
                                Vehicle Type<span className='text-red-500'>*</span>
                                </label>
                                <select
                                id="vehicle_Type"
                                name="vehicle_Type"
                                value={vehicleData.vehicle_Type}
                                onChange={handleVehicleDataChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                <option value="" disabled>Select</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="vehicle">
                                Vehicle<span className='text-red-500'>*</span>
                                </label>
                                <select
                                id="vehicle"
                                name="vehicle"
                                value={vehicleData.vehicle}
                                onChange={handleVehicleDataChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                <option value="" disabled>Select</option>
                                {vehicleOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Middle side */}
                    <div className='lg:w-1/2 w-full flex flex-col gap-3'>
                        <div className='flex w-full flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                            <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-white">
                                Customer Information
                            </h1>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="first_name">
                                    First Name<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={customerInfo.first_name}
                                    onChange={handleCustomerChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="last_name">
                                    Last Name<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={customerInfo.last_name}
                                    onChange={handleCustomerChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="email">
                                    Email<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                     type="email"
                                     id="email"
                                     name="email"
                                     value={customerInfo.email}
                                     onChange={handleCustomerChange} 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="phone">
                                    Phone<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleCustomerChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                />
                            </div>
                        </div>
                        <div className='flex w-full flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                            <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-white">
                                Additional Charges
                            </h1>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="collision_Damage_Waiver"
                                        name="collision_Damage_Waiver"
                                        checked={additionalCharges.collision_Damage_Waiver}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    />
                                    <label htmlFor="collision_Damage_Waiver" className="ms-2 text-black dark:text-gray-200">Collision Damage Waiver</label>
                                </div>
                                <span>$9.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="liability_Insurance"
                                        name="liability_Insurance"
                                        checked={additionalCharges.liability_Insurance}
                                        onChange={handleCheckboxChange} 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    />
                                    <label htmlFor="liability_Insurance" className="ms-2 text-black dark:text-gray-200">Liability Insurance</label>
                                </div>
                                <span>$15.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="rental_Tax"
                                        name="rental_Tax"
                                        checked={additionalCharges.rental_Tax}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    />
                                    <label htmlFor="rental_Tax" className="ms-2 text-black dark:text-gray-200">Rental Tax</label>
                                </div>
                                <span>11.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='xl:w-1/3 w-full'>
                    {/* Last cide */}
                    <div className='totalChargesBg borderBlue w-full flex flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                        <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-white">
                            Charges Summary
                        </h1>
                        <TotalCharges 
                            day={day} 
                            week={week} 
                            additionalCharges={additionalCharges} 
                            total={total}
                            rentalRates={rentalRates}
                            vehicleData={vehicleData}
                        />
                    </div>
                    <button onClick={redirectToInvoice} className="w-full mt-4 rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-white">
                        Invoice
                    </button>
                </div>
            </div>
        </section>
    </div>
    </>
  );
}

export default AccountSettings;
