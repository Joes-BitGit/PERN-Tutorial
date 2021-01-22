// entry point into backend
// responsibility: creating and init express app, starting and listening to given port
require('dotenv').config();

// Express framework entry point
const express = require('express');

// Cors package
const cors = require('cors')

// Imports db/index.js
const db = require('./db');

// Init Express using 'app'
const app = express();

// Middleware helper
const morgan = require('morgan');

// express middleware that attaches to the request under body
app.use(cors());

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
    // const results = await db.query('SELECT * FROM restaurants');
    const results = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;");
    response.status(200).send({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurant: results.rows
      }
    });
  } catch (error) {
    console.log('ERR, get all restaurants:', error);
    response.status(400)
  }

});

// Get a restaurant
app.get('/api/v1/restaurants/:id', async (request, response) => {
  try {
    const restaurant = await db.query('SELECT * FROM restaurants WHERE id=$1', [request.params.id]);

    const review = await db.query('SELECT * FROM reviews WHERE restaurant_id=$1', [request.params.id]);

    response.status(200).json({
      staus: 'success',
      data: {
        restaurant: restaurant.rows[0],
        review: review.rows
      }
    })
  } catch (error) {
    console.log('ERR, Get A Restaurant:', error);
  }

});


// Create A Restaurant
app.post('/api/v1/restaurants', async (request, response) => {
  try {
    const results = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *;',
      [request.body.name, request.body.location, request.body.price_range]);
    // console.log(results.rows);
    response.status(201).json({
      staus: 'success',
      data: {
        restaurant: results.rows[0],
      }
    })

  } catch (err) {
    console.log('ERR, Create a Restaurant: ', err);
  }
});

// Update Restaurant
app.put('/api/v1/restaurants/:id', async (request, response) => {
  // console.log(request.params);
  // console.log(request.body);
  try {
    const results = await db.query(
      'UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *;',
      [request.body.name, request.body.location, request.body.price_range, request.params.id]
    );
    // console.log(results.rows[0]);
    response.status(200).json({
      staus: 'success',
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (err) {
    console.log('ERR, UPDATE: ', err);
  }
});

// Delete Restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  // console.log(res);
  try {
    const results = await db.query('DELETE FROM restaurants WHERE id=$1;', [req.params.id]);
    // console.log(results);
    res.status(204).json({
      status: 'succes',
    })
  } catch (err) {
    console.log('ERR, Delete Restaurant: ', err);
  }

});


app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id,name,review, rating) values ($1,$2,$3,$4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]);
    // console.log("results addReview: ", results);
    res.status(201).json({
      status: 'success',
      data: {
        review: results.rows[0]
      }
    })

  } catch (err) {
    console.log("ERR, addReview: ", err);
  }
})

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`server up and running on PORT ${PORT}`);
});