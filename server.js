require('dotenv').config();

const express = require('express'); // that pulls in the express library

const mongoose = require ('mongoose'); // to connect us to the mongoose library

// Create app variable to configure our server
const app = express();

// Create DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error)); // lets us know if there were problems connecting to the db

db.once('open', () => console.log('Connected to db')); // lets us know once when we connected to the db

// Set-up our server to accept JSON; 
app.use(express.json()); // app.use() allows us to use any middleware that we want; MIDDLEWARE is code that runs when the server gets a request, but before it gets passed to your route;

// Create our ROUTES
const subscribersRouter = require ('./routes/subscribers');
app.use('/subscribers', subscribersRouter);




app.listen(3000, () => console.log('Server is running on port 3000'));

