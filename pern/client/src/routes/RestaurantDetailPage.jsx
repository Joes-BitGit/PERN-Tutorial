import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';

import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
  // paramteres of the the rotuing
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // retrieve data restaurant 
        const response = await RestaurantFinder.get(`/${id}`);
        console.log("fetch data detailpage:", response.data);
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
