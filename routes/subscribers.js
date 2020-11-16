const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Create REST end points

// GET all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err){
    res.status(500).json({message: err.message});
  }                        
});

// GET one subscriber
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// POST - create one subscribers
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  })
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// PATCH - update only the info the user passes, not everything (PUT)
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name !== null){
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel !== null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
const updatedSubscriber = await res.subscriber.save();
res.json(updatedSubscriber);
  } catch (err){
    res.status(400).json({message: err.message});
  }
});

// DELETE - remove one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({message: 'Deleted subscriber'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
 
// Create Middleware (to avoid repeating the code)
async function getSubscriber (req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if(subscriber === null ){
      return res.status(404).json({message: 'Cannot find subscriber'});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  res.subscriber = subscriber;
  next(); // allows us to move on to the next piece of middlware or the actual request itself
}

module.exports = router;