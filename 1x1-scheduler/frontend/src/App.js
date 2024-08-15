import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentModal from './PaymentModal';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    mentorName: '',
    date: '',
    timeSlot: '',
    areaOfInterest: '',
    isPremium: false,
    duration: 30,
  });
  const [schedules, setSchedules] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [price, setPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Fetch mentors and available slots here
    setMentors(['Mentor1', 'Mentor2']);
    setAvailableSlots([
      { start: '9:00', end: '9:30' },
      { start: '9:30', end: '10:00' }
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMentorChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      mentorName: e.target.value
    }));
  };

  const calculatePrice = (duration, isPremium) => {
    let basePrice = 0;
    switch (duration) {
      case 30:
        basePrice = 2000;
        break;
      case 45:
        basePrice = 3000;
        break;
      case 60:
        basePrice = 4000;
        break;
      default:
        basePrice = 2000;
    }
    return isPremium ? basePrice + 1000 : basePrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/scheduler', formData);
      setSchedules([...schedules, response.data]);

      // Set payment details and open modal
      setPaymentDetails({
        ...formData,
        price: calculatePrice(formData.duration, formData.isPremium)
      });
      setModalIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPaymentDetails(null);
  };

  return (
    <div className="App">
      <h1>1x1 Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
        />
        <select
          name="mentorName"
          value={formData.mentorName}
          onChange={handleMentorChange}
          disabled={formData.isPremium}
        >
          <option value="">Select Mentor</option>
          {mentors.map(mentor => (
            <option key={mentor} value={mentor}>
              {mentor}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="areaOfInterest"
          placeholder="Area of Interest"
          value={formData.areaOfInterest}
          onChange={handleChange}
        />
        <label>
          Premium Service
          <input
            type="checkbox"
            name="isPremium"
            checked={formData.isPremium}
            onChange={handleChange}
          />
        </label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
        <select
          name="timeSlot"
          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
        >
          <option value="">Select Time Slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={`${slot.start}-${slot.end}`}>
              {slot.start} - {slot.end}
            </option>
          ))}
        </select>
        <div>
          <h3>Total Cost: ${price}</h3>
        </div>
        <button type="submit">Create Schedule</button>
      </form>

      <h2>All Schedules</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule._id}>
            {schedule.studentName} with {schedule.mentorName} on {new Date(schedule.date).toLocaleDateString()} - 
            {schedule.startTime} to {schedule.endTime} - 
            {schedule.areaOfInterest} - 
            {schedule.isPremium ? 'Premium' : 'Standard'} - ${schedule.price}
          </li>
        ))}
      </ul>

      {paymentDetails && (
        <PaymentModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          paymentDetails={paymentDetails}
        />
      )}
    </div>
  );
};

export default App;
