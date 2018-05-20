const ADD_RESTAURANT = 'ADD_RESTAURANT'

export const addRestaurant = restaurant => {
  return {
    type: ADD_RESTAURANT,
    restaurant,
  }
}

const initialState = {
  restaurants: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.restaurant],
      }
    default:
      return state
  }
}
