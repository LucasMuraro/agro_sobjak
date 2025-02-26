// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const Event = require('../models/event');

const validateEvent = (req, res, next) => {
  try {
    const event = new Event(req.body);
    event.validate();
    req.body = event;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

router.post('/', validateEvent, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', validateEvent, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;