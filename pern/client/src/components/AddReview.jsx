import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  // 3 states: for each input field
  // getter and setter
  const [name, setName] = useState('');
  const [rating, setRating] = useState('RATING');
  const [review, setReview] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // url, body
    RestaurantFinder.post(`/${id}/addReview`, {
      name,
      review,
      rating
    })
    // history.push('/');

    // history.push(location.pathname);
    window.location = window.location.pathname;
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">NAME</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control" placeholder="NAME" />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">RATING</label>
            <select name="" id="rating" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
              <option disabled>RATING</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">REVIEW</label>
          <textarea id="review" cols="30" rows="10" className="form-control" value={review} onChange={e => setReview(e.target.value)}></textarea>
        </div>
        <button type='submit' onClick={handleSubmitReview} className="btn btn-primary">SUBMIT</button>
      </form>
    </div>
  )
}

export default AddReview
