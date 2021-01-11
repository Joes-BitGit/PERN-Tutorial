import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = () => {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

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
          {/* <tr>
            <td>Pho</td>
            <td>Cerritos</td>
            <td>$$</td>
            <td>rating</td>
            <td><button className="btn btn-warning">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <td>Pho</td>
            <td>Cerritos</td>
            <td>$$</td>
            <td>rating</td>
            <td><button className="btn btn-warning">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr> */}
        </tbody>
      </table>

    </div >
  )
}

export default RestaurantList
