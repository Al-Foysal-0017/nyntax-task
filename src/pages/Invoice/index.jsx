import React from "react";
import CarPng from "../../assets/supercar7.png";
import TotalCharges from "../../components/TotalCarges/TotalCharges";
import { useLocation } from "react-router-dom";
// sm:p-16 pb-6
const Invoice = () => {
  const location = useLocation();
  const { day, week, additionalCharges, total, reservationData, vehicleData, customerInfo } = location.state;
  return (
    <div className="pb-14 min-h-screen dark:bg-dark bg-slate-100 sm:grid sm:place-items-center duration-300">
      <div className="container">
        <h1 className="mt-20 mb-10 text-3xl font-bold text-black capitalize dark:text-black">
            Booking Info
        </h1>
        <div className="p-16 bg-white grid grid-cols-1 lg:grid-cols-2 place-items-cente"> 
          <div className="">
            <img
              src={CarPng}
              alt=""
              width={250}
            />

            <div className="">
              <div className="text-primary font-bold">Nyntax</div>
              <div className="">Car Rental</div>
              <div>nyntax@gmail.com</div>
              <div>Dhaka, Bangladesh</div>
            </div>

            <div className="mt-16">
                <h1
                    className="mb-1 text-xl sm:text-2xl font-bold font-serif"
                >
                    Renter Info
                </h1>
                <div>
                  <span className="font-bold text-gray-600">Name: </span>{`${customerInfo?.first_name} ${customerInfo?.last_name}`}
                </div>
                <div><span className="font-bold text-gray-600">Email: </span>{customerInfo?.email}</div>
                <div><span className="font-bold text-gray-600">Phone: </span>{customerInfo?.phone}</div>
            </div>

            <div className="mt-12">
                <h1
                    className="mb-1 text-xl sm:text-2xl font-bold font-serif"
                >
                    Reservation Details
                </h1>
                <div><span className="font-bold text-gray-600">Reservation ID: </span>{reservationData?.reservation_ID}</div>
                <div><span className="font-bold text-gray-600">Pickup Date: </span>{reservationData?.pickup_Date}</div>
                <div><span className="font-bold text-gray-600">Return Date: </span>{reservationData?.return_Date}</div>
                <div><span className="font-bold text-gray-600">Duration: </span>{reservationData?.duration}</div>
                <div><span className="font-bold text-gray-600">Discount: </span>{reservationData?.discount}</div>
            </div>
          </div>
          
          
          <div className="border-black border-">
            <div className="mt-12">
                <h1
                    className="mb-1 text-xl sm:text-2xl font-bold font-serif"
                >
                    Vehicle Information
                </h1>
                <div><span className="font-bold text-gray-600">Vehicle Type: </span>{vehicleData?.vehicle_Type}</div>
                <div><span className="font-bold text-gray-600">Vehicle: </span>{vehicleData?.vehicle}</div>
            </div>

            <div className="mt-12">
                <h1
                    className="mb-1 text-xl sm:text-2xl font-bold font-serif"
                >
                    Additional Charges
                </h1>
                {additionalCharges.collision_Damage_Waiver && 
                  <div>
                    <span className="font-bold text-gray-600">Collision Damage Waiver: </span>$9.00
                  </div>
                }
                {additionalCharges.liability_Insurance &&
                  <div>
                    <span className="font-bold text-gray-600">Liability Insurance: </span>$15.00
                  </div>
                }
                {additionalCharges.rental_Tax && 
                  <div>
                    <span className="font-bold text-gray-600">Rental Tax: </span>11%
                  </div>
                }
            </div>
            <div className="space-y- mt-12">
              <h1
                className="text-2xl sm:text-3xl font-bold font-serif"
              >
                Charges Summary
              </h1>
              <div className='w-full flex flex-col gap-6 p-6 mx-auto rounded-md shadow-md dark:bg-gray-800'>
                        <h1 className="bookBottomBorder text-xl font-bold text-black capitalize dark:text-black">
                            Charges Summary
                        </h1>
                        <TotalCharges
                            day={day} 
                            week={week} 
                            additionalCharges={additionalCharges} 
                            total={total}
                        />
                        {/* <table className="table-auto">
                        <thead>
                            <tr>
                                <td className='font-bold'>Charge</td>
                                <td className='font-bold'>Unit</td>
                                <td className='font-bold'>Rate</td>
                                <td className='font-bold'>Total</td>
                            </tr>
                        </thead>
                        <div style={{marginTop:'12px'}}></div>
                        <tbody>
                            <tr>
                            <td>Daily</td>
                            <td>00</td>
                            <td>$99.00</td>
                            <td>00</td>
                            </tr>


                            <tr>
                            <td>Weekly</td>
                            <td>1</td>
                            <td>$390.00</td>
                            <td>00</td>
                            </tr>

                            <tr>
                            <td>C.D.W.</td>
                            <td>-</td>
                            <td>$9.00</td>
                            <td>$9.00</td>
                            </tr>

                            <tr>
                            <td>Liability In.</td>
                            <td>-</td>
                            <td>$15.00</td>
                            <td>$15.00</td>
                            </tr>
                            
                            <tr>
                            <td>Rental Tax</td>
                            <td>-</td>
                            <td>11.5%</td>
                            <td>11.5%</td>
                            </tr>

                            <div style={{marginTop:'20px'}}></div>
                            <tr>
                            <td className='font-bold'>Total</td>
                            <td></td>
                            <td></td>
                            <td className='font-bold'>$3455.00</td>
                            </tr>
                        </tbody>
                        </table> */}
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
