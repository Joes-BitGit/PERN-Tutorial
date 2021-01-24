import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = () => {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  // fetch from backend server
  // as soon as the components mounts onto screen
  useEffect(() => {
    // useEffect is synchronous to avoid race conditions async must be used inside the hook
    const fetchData = async () => {
      // You can await here
      try {
        // axios instance
        const response = await RestaurantFinder.get('/');
        // set our state
        setRestaurants(response.data.data.restaurant);

      } catch (err) {
        console.log('ERR, RestaurantList.jsx: ', err);
      }
    }
    fetchData();
  }, []); // effect doesn't need props or state also to not rerender everytime component mounts



  const handleDelete = async (e, id) => {
    e.stopPropagation()
    // logic
    try {
      const del = await RestaurantFinder.delete(`/${id}`);

      setRestaurants(restaurants.filter((restaurant) => {
        return restaurant.id !== id
      }))
    } catch (err) {
      console.log('ERR, handleDelete: ', err);
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    history.push(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 Reviews</span>
    } else {
      return (
        <>
          <StarRating rating={restaurant.average_rating} />
          <span className="text-warning ml-1">({restaurant.count})</span>
        </>
      );
    }

  }

  return (
    <div className='list-group'>
      <table className="table table-dark table-hover">
        <thead >
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Reviews</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            // if restaurants exists run the function to displays
            restaurants && restaurants.map((rest) => {
              return (
                <tr key={rest.id} onClick={() => handleRestaurantSelect(rest.id)}>
                  <td >{rest.name}</td>
                  <td >{rest.location}</td>
                  <td >{"$".repeat(rest.price_range)}</td>
                  <td >{renderRating(rest)}</td>
                  <td>
                    <button onClick={(e) => handleUpdate(e, rest.id)} className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    {/* reference of a function not the function itself */}
                    <button onClick={(e) => handleDelete(e, rest.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default RestaurantList
