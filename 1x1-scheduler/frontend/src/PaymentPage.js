import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { state } = location;
  const { price, studentName, mentorName, date, startTime, endTime } = state || {};

  const handlePayment = () => {
    // Simulate payment processing here
    alert(`Payment of $${price} for ${studentName} with ${mentorName} on ${date} from ${startTime} to ${endTime} processed successfully!`);
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {state ? (
        <>
          <p>Student Name: {studentName}</p>
          <p>Mentor Name: {mentorName}</p>
          <p>Date: {date}</p>
          <p>Time Slot: {startTime} - {endTime}</p>
          <p>Total Cost: ${price}</p>
          <button onClick={handlePayment}>Pay Now</button>
        </>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
};

export default PaymentPage;
