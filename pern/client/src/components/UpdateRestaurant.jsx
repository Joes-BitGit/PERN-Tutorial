import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      // console.log(response.data.data);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPrice(response.data.data.restaurant.price_range);
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: price
    });
    history.push("/")
    // console.log(updatedRestaurant);
  }

  return (
    <div>

      <form action="">
        <div className="form-group">
          <label htmlFor="name">NAME</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">LOCATION</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            type="text"
            name="location"
            id="location"
            className="form-control"

          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">PRICE RANGE</label>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            name="price_range"
            id="price_range"
            className="form-control"
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">SUBMIT</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
