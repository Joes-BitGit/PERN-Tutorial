import React from 'react'

const AddRestaurant = () => {
  return (
    <div className="mb-4">
      <form action="" method="post">
        <div className="form-row">
          <div className="col">
            <input type="text" name="" id="" className="form-control" placeholder='NAME' />
          </div>
          <div className="col">
            <input type="text" name="" id="" className="form-control" placeholder='location' />
          </div>
          <div className="col">
            <select name="" id="" className='custom-select my-1 mr-sm-2'>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
