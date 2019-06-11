import { actions } from '../actions/cart'

const NAME_LOCAL_STORAGE = 'listCartMovies'

const setItemsLocalStorage = data => localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify(data))

const cart = (state = {
  isFetching: false,
  cart: []
}, action) => {
  const { 
    REQUEST_CART, 
    RECEIVE_CART, 
    ADD, 
    DELETE, 
    DELETE_ALL 
  } = actions
  const type = {
    [REQUEST_CART]: () => {
      return Object.assign({}, state, {
        isFetching: true
      })
    },
    [RECEIVE_CART]: () => {
      return Object.assign({}, state, {
        isFetching: false,
        cart: action.items
      })
    },
    [ADD]: () => {
      const cart = [...state.cart, action.item]
      setItemsLocalStorage(cart)
      return Object.assign({}, state, {
        cart: cart
      }) 
    },
    [DELETE]: () => {
      const cart = [...state.cart].filter(item => item.id !== action.item.id)
      setItemsLocalStorage(cart)
      return Object.assign({}, state, {
        cart: cart
      })   
    },
    [DELETE_ALL]: () => {
      setItemsLocalStorage([])
      return Object.assign({}, state, {
        cart: []
      }) 
    },
    default: () => {
      return state
    }
  }
  return (type[action.type] || type.default)()
}

export default cart