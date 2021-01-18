import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
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
        // console.log(response.data);
        // store it in this global state
        setSelectedRestaurants(response.data.data.restaurant);
      } catch (err) {
        console.log('ERR, Detail Page: ', err);
      }
    };
    fetchData();
  }, [])

  return (
    <div>
      <h1 className="text-center">{selectedRestaurants && <StarRating rating={3.2} />}</h1>
    </div>
  )
}

export default RestaurantDetailPage
