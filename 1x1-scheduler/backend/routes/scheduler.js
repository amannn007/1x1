const express = require('express');
const router = express.Router();
const Scheduler = require('../models/Scheduler');

// Pricing based on duration
const getPrice = (duration, isPremium) => {
  const basePrices = {
    30: 2000,
    45: 3000,
    60: 4000,
  };

  let price = basePrices[duration] || 0;
  if (isPremium) {
    price += 1000; // Additional charge for premium service
  }

  return price;
};

// Create a new schedule
router.post('/', async (req, res) => {
  const { studentName, mentorName, date, areaOfInterest, isPremium, duration } = req.body;

  try {
    let selectedMentor = mentorName;
    let availableSlot;

    if (isPremium) {
      // Premium service: use selected mentor
      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59); // End of the day
      availableSlot = await findAvailableSlot(selectedMentor, startTime, endTime, duration);
      if (availableSlot.start === availableSlot.end) {
        return res.status(400).json({ error: 'Selected mentor is not available' });
      }
    } else {
      // Non-premium service: find mentor based on area of interest
      const mentorAssignment = await findMentorByInterest(areaOfInterest);
      if (!mentorAssignment) {
        return res.status(400).json({ error: 'No available mentor for the selected area of interest' });
      }
      selectedMentor = mentorAssignment.mentor;
      availableSlot = mentorAssignment.slot;
    }

    const price = getPrice(duration, isPremium);

    const newSchedule = new Scheduler({
      studentName,
      mentorName: selectedMentor,
      date,
      areaOfInterest,
      isPremium,
      startTime: availableSlot.start,
      endTime: availableSlot.end,
      mentorAssigned: !isPremium, // Mentor assigned automatically if not premium
      duration,
      price,
    });

    await newSchedule.save();
    res.status(201).json({
      ...newSchedule.toObject(),
      startTime: newSchedule.startTime.toISOString(),
      endTime: newSchedule.endTime.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
