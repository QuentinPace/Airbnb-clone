
const GET_REVIEWS_SPOT = 'reviews/GET_REVIEWS_SPOT'

export const getAllReviewsOfSpot = reviews => {
    return {
        type: GET_REVIEWS_SPOT,
        reviews
    }
}

export const getAllReviewsOfSpotThunk = spotId => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    console.log(data)
    if(response.ok){
        dispatch(getAllReviewsOfSpot(data.Reviews))
    }
    return data
}

const initialState = [];

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REVIEWS_SPOT:
        return [ ...action.reviews ];
      default:
        return state;
    }
  };

export default reviewReducer