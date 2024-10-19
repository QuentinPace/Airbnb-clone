import { useState } from 'react';
import { BsStarFill } from "react-icons/bs";

const StarRatingInput = ({ rating, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating)
  const starNums = [1, 2, 3, 4, 5]

  const handleClassName = starNumber => {
    if(starNumber > activeRating){
      return 'empty'
    }
    return 'filled'
  }

  const propsByStar = starNumber => {
    return {
      className: handleClassName(starNumber),
      onMouseEnter: () => setActiveRating(starNumber),
      onMouseLeave: () => setActiveRating(rating),
      onClick: () => onChange(starNumber)
    } 
  }

  return (
    <div className='star-rating-input-container'>
      <div className="rating-input">
        {starNums.map(num => {
          return (
            <div key={num} {...propsByStar(num)}>
              <BsStarFill />
            </div>
          )})}
    </div>
    <h3 className='stars-text'>Stars</h3>
  </div>
  );
};

export default StarRatingInput;