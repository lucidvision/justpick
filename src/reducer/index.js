const ADD_PICKLIST = 'ADD_PICKLIST'
const ADD_SHORTLIST = 'ADD_SHORTLIST'
const SET_PICK = 'SET_PICK'
const SET_RESTAURANTS = 'SET_RESTAURANTS'
const TRANSFER_RESTAURANTS = 'TRANSFER_RESTAURANTS'

export const addPicklist = restaurant => {
  return {
    type: ADD_PICKLIST,
    restaurant,
  }
}

export const addShortlist = restaurant => {
  return {
    type: ADD_SHORTLIST,
    restaurant,
  }
}

export const setPick = restaurant => {
  return {
    type: SET_PICK,
    restaurant,
  }
}

export const setRestaurants = restaurants => {
  return {
    type: SET_RESTAURANTS,
    restaurants,
  }
}

export const transferRestaurants = () => {
  return {
    type: TRANSFER_RESTAURANTS,
  }
}

export const initialState = {
  pick: {},
  picklist: [],
  restaurants: [],
  shortlist: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PICKLIST:
      return {
        ...state,
        picklist: [...state.picklist, action.restaurant],
      }
    case ADD_SHORTLIST:
      return {
        ...state,
        shortlist: [...state.shortlist, action.restaurant],
      }
    case SET_PICK:
      return {
        ...state,
        pick: action.restaurant,
      }
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
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
