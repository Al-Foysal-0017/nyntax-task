
const TotalCharges = ({ day, week, additionalCharges, total }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <td className='font-bold'>Charge</td>
          <td className='font-bold'>Unit</td>
          <td className='font-bold'>Rate</td>
          <td className='font-bold'>Total</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Daily</td>
          <td>{isNaN(day) ? 0 : day}</td>
          <td>$99.00</td>
          <td>${isNaN(day) ? 0 : (day * 99).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Weekly</td>
          <td>{isNaN(week) ? 0 : week}</td>
          <td>$390.00</td>
          <td>${isNaN(week) ? 0 : (week * 390).toFixed(2)}</td>
        </tr>
        {additionalCharges?.collision_Damage_Waiver &&
          <tr>
            <td>C.D.W.</td>
            <td>-</td>
            <td>$9.00</td>
            <td>$9.00</td>
          </tr>}
        {additionalCharges?.liability_Insurance &&
          <tr>
            <td>Liability In.</td>
            <td>-</td>
            <td>$15.00</td>
            <td>$15.00</td>
          </tr>}
        {additionalCharges?.rental_Tax &&
          <tr>
            <td>Rental Tax</td>
            <td>-</td>
            <td>11.5%</td>
            <td>11.5%</td>
          </tr>}
        <tr>
          <td className='font-bold'>Total</td>
          <td></td>
          <td></td>
          <td className='font-bold'>${(total * 1).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalCharges;
