import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CarPng from "../../assets/supercar7.png";
import TotalCharges from "../../components/TotalCarges/TotalCharges";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const pdfRef = useRef();
  const location = useLocation();
  const { day, week, additionalCharges, total, reservationData, vehicleData, customerInfo } = location.state;

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('nyntax-invoice.pdf');
    });
  };

  const printContent = () => {
    const printableContent = document.getElementById('printable-content');
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(printableContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Please allow popups for this site');
    }
  };

  return (
    <div className="pb-14 min-h-screen dark:bg-dark bg-slate-100 sm:grid sm:place-items-center duration-300">
      <div className="container flex flex-col items-center">
        <h1 className="mt-20 mb-10 text-3xl font-bold text-black capitalize dark:text-white">
          Booking Info
        </h1>
        <div className="flex gap-2 mb-8">
          <button onClick={downloadPDF} data-aos="fade-down" className="text-sm button-outline">
            Download
          </button>
          <button onClick={printContent} data-aos="fade-down" className="text-sm button-outline">
            Print
          </button>
        </div>
        <div ref={pdfRef} id="printable-content" className="p-16 bg-white" style={{ width: "210mm", height: "297mm" }}>
          <div className="grid grid-cols-2 place-items-cente">
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
              <p className="text-sm pr-8 pt-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type book.
              </p>
            </div>

            <div className="border-black border-">
              <div className="mt-8">
                <h1 className="mb-1 text-xl sm:text-2xl font-bold font-serif">
                  Renter Info
                </h1>
                <div>
                  <span className="font-bold text-gray-600">Name: </span>{`${customerInfo?.first_name} ${customerInfo?.last_name}`}
                </div>
                <div><span className="font-bold text-gray-600">Email: </span>{customerInfo?.email}</div>
                <div><span className="font-bold text-gray-600">Phone: </span>{customerInfo?.phone}</div>
              </div>
              <div className="mt-4">
                <h1 className="mb-1 text-xl sm:text-2xl font-bold font-serif">
                  Reservation Details
                </h1>
                {reservationData?.reservation_ID &&
                  <div><span className="font-bold text-gray-600">Reservation ID: </span>{reservationData?.reservation_ID}</div>}
                <div><span className="font-bold text-gray-600">Pickup Date: </span>{reservationData?.pickup_Date}</div>
                <div><span className="font-bold text-gray-600">Return Date: </span>{reservationData?.return_Date}</div>
                {reservationData?.duration &&
                  <div><span className="font-bold text-gray-600">Duration: </span>{reservationData?.duration}</div>}
                {reservationData?.discount &&
                  <div><span className="font-bold text-gray-600">Discount: </span>{reservationData?.discount}</div>}
              </div>
              <div className="mt-4">
                <h1 className="mb-1 text-xl sm:text-2xl font-bold font-serif">
                  Vehicle Information
                </h1>
                <div><span className="font-bold text-gray-600">Vehicle Type: </span>{vehicleData?.vehicle_Type}</div>
                <div><span className="font-bold text-gray-600">Vehicle: </span>{vehicleData?.vehicle}</div>
              </div>

              <div className="mt-4">
                <h1 className="mb-1 text-xl sm:text-2xl font-bold font-serif">
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
            </div>
          </div>

          <div className="space-y- mt-8">
            <h1 className="mt-24 mb-2 text-2xl sm:text-3xl font-bold font-serif">
              Charges Summary
            </h1>
            <div className='w-full flex flex-col gap-6 p-6 mx-auto rounded-md shadow-md'>
              <TotalCharges
                day={day}
                week={week}
                additionalCharges={additionalCharges}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
