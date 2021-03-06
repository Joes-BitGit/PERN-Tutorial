import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';

import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
  // parameters of the routing
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // retrieve data restaurant 
        const response = await RestaurantFinder.get(`/${id}`);
        // console.log("fetch data detailpage:", response.data);
        // store it in this global state
        setSelectedRestaurants(response.data.data);
      } catch (err) {
        console.log('ERR, Detail Page: ', err);
      }
    };
    fetchData();
  }, [])

  return (
    <div>
      {selectedRestaurants && (
        <>
          <h1 className="text-center display-1">{selectedRestaurants.restaurant.name}</h1>
          <div className="text-center text-warning">
            <StarRating rating={selectedRestaurants.restaurant.average_rating} />
            <span className="text-warning">
              {
                !selectedRestaurants.restaurant.count
                  ? "(0)"
                  : `(${selectedRestaurants.restaurant.count})`
              }
            </span>

          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurants.review} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage
