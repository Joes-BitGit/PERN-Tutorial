import React, { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
// forms are usually controlled by html, however react wants to control all state in an application
// need to make forms a controlled component
const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("PRICE RANGE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: price
      });

      addRestaurants(response.data.data.restaurant);
    } catch (err) {
      console.log("ERR, handleSubmit: ", err);
    }
  }

  return (
    <div className="mb-4">
      <form action="" method="post">
        <div className="form-row">
          <div className="col">
            <input value={name} onChange={e => setName(e.target.value)} type="text" name="" id="" className="form-control" placeholder='NAME' />
          </div>
          <div className="col">
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" name="" id="" className="form-control" placeholder='LOCATION' />
          </div>
          <div className="col">
            <select value={price} onChange={e => setPrice(e.target.value)} name="" id="" className='custom-select my-1 mr-sm-2'>
              <option disabled>PRICE RANGE</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
