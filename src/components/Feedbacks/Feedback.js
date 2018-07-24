import React from 'react';
import Rating from 'react-rating';

const Feedback = ({feedback}) => {
  console.log(feedback.score)
  return(
    <div className='feedback'>
      <p>
        <Rating
          initialRating={feedback.score}
          emptySymbol="fa fa-star-o text-warning"
          fullSymbol="fa fa-star text-warning"
          fractions={2}
          readonly={true}
        />
        <span className='text-primary ml-2'>
          Đã mua hàng
        </span>
      </p>
      <i className="mt-0">by {feedback.owner.name}</i>
      <p className={`text-${feedback.kind}`}>{feedback.note}</p>
    </div>
  );
}

export default Feedback;