//import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAll'

export const getAllSpots = spots => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
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
      default:
        return state;
    }
  };

export default spotReducer