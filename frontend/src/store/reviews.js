import { csrfFetch } from "./csrf"

const GET_REVIEWS_SPOT = 'reviews/GET_REVIEWS_SPOT'
const GET_REVIEWS_OF_CURRENT = 'reviews/GET_REVIEWS_OF_CURRENT'

export const getAllReviewsOfSpot = reviews => {
    return {
        type: GET_REVIEWS_SPOT,
        reviews
    }
}

export const getReviewsOfCurrent = userReviews => {
  return {
    type: GET_REVIEWS_OF_CURRENT,
    userReviews
  }
}

export const getAllReviewsOfSpotThunk = spotId => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    if(response.ok){
        dispatch(getAllReviewsOfSpot(data.Reviews))
    }
    return data
}

export const getReviewsOfCurrentThunk = () => async dispatch => {
  const response = await csrfFetch('/api/reviews/current')
  const data = await response.json()
  if(response.ok){
    dispatch(getReviewsOfCurrent(data.Reviews))
  }
}

const initialState = { spotReviews: [], currentUser: [] };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REVIEWS_SPOT:
        return {spotReviews: [ ...action.reviews ], currentUser: [...state.currentUser]};
      case GET_REVIEWS_OF_CURRENT:
        return {spotReviews: [...state.spotReviews], currentUser: [...action.userReviews]}
      default:
        return state;
    }
  };

export default reviewReducer