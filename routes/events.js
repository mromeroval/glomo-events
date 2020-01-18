const express =  require('express');
const router = express.Router();
const events = require('../db/events.json');

// API for Events

// Get all events
router.get('/',(req,res) => {
    res.json(events);
})

// Gets individual event
router.get('/:id', (req, res) => {
    const found = events.some(event => event.id === parseInt(req.params.id))
    if (found){
        res.json(events.filter(event => event.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg:`Event with the id of ${req.params.id} doesn't exist`});
    }
});

module.exports = router;
