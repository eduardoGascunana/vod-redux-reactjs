import { actions } from '../actions/categories'

const categories = (state = {
  isFetching: false,
  categories: []
}, action) => {
  const { 
    RECEIVE_CATEGORIES, 
    REQUEST_CATEGORIES
  } = actions
  const type = {
    [REQUEST_CATEGORIES]: () => {
      return Object.assign({}, state, {
        isFetching: true
      })
    },
    [RECEIVE_CATEGORIES]: () => {
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.items
      })
    },
    default: () => {
      return state
    }
  }
  return (type[action.type] || type.default)()
}

export default categories