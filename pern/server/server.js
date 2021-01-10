// entry point into backend
// responsibility: creating and init express app, starting and listening to given port
require('dotenv').config();

// Express framewor entry point
const express = require('express');

// Imports db/index.js
const db = require('./db');

// Init Express using 'app'
const app = express();

// Middleware helper
const morgan = require('morgan');

// express middleware that attaches to the request under body
app.use(express.json());

// middleware: explicit passing is needed
// next() function
// anything that route handler can do a middleware can do
// e.g.
// app.use((request, response, next) => {
//   console.log('middleware nation');
//   next();
// });

// express route handlers
// get all restaurants
app.get('/api/v1/restaurants', async (request, response) => {
  // returns a promise
  try {
    const results = await db.query('SELECT * FROM restaurants');
    console.log(results);
    response.status(200).send({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurant: results.rows
      }
    });
  } catch (error) {
    console.log('ERR: get all restaurants', error);
    response.status(400)
  }

});

// Get a restaurant
app.get('/api/v1/restaurants/:id', (request, response) => {
  console.log(request.params);
  response.status(200).json({
    staus: 'success',
    data: {
      restaurant: 'mcdonalds'
    }
  })
});

// Create A Restaurant
app.post('/api/v1/restaurants', (request, response) => {
  console.log(request.body);
  response.status(201).json({
    staus: 'success',
    data: {
      restaurant: 'mcdonalds'
    }
  })
});

// Update Restaurant
app.put('/api/v1/restaurants/:id', (request, response) => {
  console.log(request.params);
  console.log(request.body);
  response.status(200).json({
    staus: 'success',
    data: {
      restaurant: 'mcdonalds'
    }
  })
});

// Delete Restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'succes',
  })
});

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`server up and running on PORT ${PORT}`);
});