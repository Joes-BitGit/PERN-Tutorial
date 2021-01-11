import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
  // list of restaurants that are fetched from the backend server
  // init: empty array
  const [restaurants, setRestaurants] = useState([]);


  return (
    // JS object in value, this is where all components have access
    // update state: pass setRestaurants
    <RestaurantsContext.Provider
      value={{
        restaurants: restaurants,
        setRestaurants: setRestaurants
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  )
}
