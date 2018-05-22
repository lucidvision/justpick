const SET_RESTAURANTS = 'SET_RESTAURANTS'
const ADD_SHORTLIST = 'ADD_SHORTLIST'
const TRANSFER_RESTAURANTS = 'TRANSFER_RESTAURANTS'

export const setRestaurants = restaurants => {
  return {
    type: SET_RESTAURANTS,
    restaurants,
  }
}

export const addShortlist = restaurant => {
  return {
    type: ADD_SHORTLIST,
    restaurant,
  }
}

export const transferRestaurants = () => {
  return {
    type: TRANSFER_RESTAURANTS,
  }
}

const initialState = {
  restaurants: [],
  shortlist: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      }
    case ADD_SHORTLIST:
      return {
        ...state,
        shortlist: [...state.shortlist, action.restaurant],
      }
    case TRANSFER_RESTAURANTS:
      return {
        ...state,
        restaurants: state.shortlist,
        shortlist: [],
      }
    default:
      return state
  }
}
