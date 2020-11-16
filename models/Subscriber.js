const mongoose = require('mongoose');

// Mongoose Schema
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Mongoose Model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;