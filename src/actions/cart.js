const NAME_LOCAL_STORAGE = 'listCartMovies'

const requestItem = () => {
  return {
    type: actions.REQUEST_CART
  }
}

const receiveItems = (data) => {
  return {
    type: actions.RECEIVE_CART,
    items: data
  }
}

const actions = {
  REQUEST_CART: 'request_cart',
  RECEIVE_CART: 'receive_cart',
  ADD: 'add_item_to_cart',
  DELETE: 'delete_item_to_cart',
  DELETE_ALL: 'delete_all_items_cart',
  changeItem: function ({ item, isAdd }) {
    return {
      type: isAdd ? actions.ADD : actions.DELETE,
      item
    }
  },
  deleteAll: function () {
    return {
      type: this.DELETE_ALL
    }
  }
}

const fetchCart = () => {
  return (dispatch) => {
    dispatch(requestItem())
    const data = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
    dispatch(receiveItems(data))
  }
}

export { actions, fetchCart }