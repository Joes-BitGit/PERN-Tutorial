import React from 'react'

const RestaurantList = () => {
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
          <tr>
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
          </tr>
        </tbody>
      </table>

    </div >
  )
}

export default RestaurantList
