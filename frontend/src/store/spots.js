//import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAll'
const GET_ONE_SPOT = 'spots/getOne' 

export const getAllSpots = spots => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const getOneSpot = spot => {
  return {
    type: GET_ONE_SPOT,
    spot
  }
}

export const getOneSpotThunk = spotId => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)
  const data = await response.json()
  dispatch(getOneSpot(data))
  return data
}

export const getAllSpotsThunk = () => async dispatch => {
    const response = await fetch('/api/spots')
    const data = await response.json()
    dispatch(getAllSpots(data.Spots))
    return data
}

const initialState = [];

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_SPOTS:
        return [ ...action.spots ];
      case GET_ONE_SPOT: 
        return [action.spot];
      default:
        return state;
    }
  };

export default spotReducer