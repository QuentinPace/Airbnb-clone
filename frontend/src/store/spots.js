import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAll'
const GET_ONE_SPOT = 'spots/getOne'
const GET_CURRENT_SPOTS = 'spots/getCurrent'

export const getCurrentSpots = spots => {
  return {
    type: GET_CURRENT_SPOTS,
    spots
  }
}

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

export const getCurrentSpotsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current')
  const data = await response.json()
  if(response.ok){
    dispatch(getAllSpots(data.Spots))
  }
  return data
}

export const getOneSpotThunk = spotId => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)
  const data = await response.json()
  dispatch(getOneSpot(data))
  return data
}

export const editSpotThunk = (updatedSpotObj, spotId) => async () => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedSpotObj)
  })
  const data = await response.json()
  if(response.ok){
    return data.id
  }
}

export const createSpotThunk = (spotObj, previewImgUrl, imagesArr) => async () => {
  const response = await csrfFetch('/api/spots', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotObj)
  })
  const data = await response.json()
  if(response.ok){
    //dispatch(createSpot())
    const previewImgRes = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: previewImgUrl,
        preview: true
      })
    })
    if(previewImgRes.ok){
      for(let i = 0; i < imagesArr.length; i++){
        let imageRes = await csrfFetch(`/api/spots/${data.id}/images`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: imagesArr[i],
            preview: false
          })
        })
        if(!imageRes.ok){
          throw new Error('regular image failed')
        }
      }
      return data.id
    }
    else{
      throw new Error('preview image failed')
    }
  }
  else{
    throw new Error('create spot failed')
  }
}



export const getAllSpotsThunk = () => async dispatch => {
    const response = await fetch('/api/spots')
    const data = await response.json()
    dispatch(getAllSpots(data.Spots))
    return data
}

export const deleteSpotThunk = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'delete'
  })
  const data = await response.json()
  if(response.ok){
    dispatch(getCurrentSpotsThunk())
    return data
  }

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