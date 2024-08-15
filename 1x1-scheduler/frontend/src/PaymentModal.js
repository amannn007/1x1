import React from 'react';
import Modal from 'react-modal';
import './PaymentModal.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const PaymentModal = ({ isOpen, onRequestClose, paymentDetails }) => {
  const { price, studentName, mentorName, date, startTime, endTime } = paymentDetails || {};

  const handlePayment = () => {
    // Simulate payment processing here
    alert(`Payment of $${price} for ${studentName} with ${mentorName} on ${date} from ${startTime} to ${endTime} processed successfully!`);
    onRequestClose(); // Close the modal after payment
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="PaymentModal">
        <h1>Payment Page</h1>
        {paymentDetails ? (
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
    </Modal>
  );
};

export default PaymentModal;
