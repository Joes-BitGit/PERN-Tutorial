import React from 'react'

//  receives prop that represents the rating
const StarRating = (props) => {
  const stars = [];
  for (let index = 1; index <= 5; index++) {
    // Fill Star
    if (index <= props.rating) {
      stars.push(<i class="fas fa-star"></i>);
    } else if (index === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
      stars.push(<i class="fas fa-star-half-alt"></i>)
    } else {
      stars.push(<i class="far fa-star"></i>);
    }
  }
  return (
    <>
      {stars}
    </>
  )
}

export default StarRating
