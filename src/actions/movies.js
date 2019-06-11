const requestItem = (category) => {
  return {
    type: actions.REQUEST_MOVIES,
    category
  }
}

const receiveItems = (category, data) => {
  return {
    type: actions.RECEIVE_MOVIES,
    category,
    items: data
  }
}

const actions = {
  REQUEST_MOVIES: 'request_movies',
  RECEIVE_MOVIES: 'receive_movies',
  COMPLETE_INFO_MOVIES: 'complete_info_movies',
  SET_ITEM_CART: 'set_item_cart',
  MODIFY_RATE: 'modify_rate',
  GET_RATE_STORAGED: 'get_rate_storaged',
  SAVE_RATE_LOCAL_STORAGE: 'get_rate_local_storage',
  SET_INFO_DETAIL: 'set_info_detail',
  completeInfoMovies: function (movies, category, cart) {
    return {
      type: this.COMPLETE_INFO_MOVIES,
      movies,
      category,
      cart
    }
  },
  setItemCart: function (item) {
    return {
      type: this.SET_ITEM_CART,
      item
    }
  },
  modifyRate: function (item) {
    return {
      type: this.MODIFY_RATE,
      item
    }
  },
  getRateStoraged: function () {
    return {
      type: this.GET_RATE_STORAGED
    }
  },
  saveRateLocalStorage: function (item) {
    return {
      type: this.SAVE_RATE_LOCAL_STORAGE,
      item
    }
  },
  setInfoDetail: function (item) {
    return {
      type: this.SET_INFO_DETAIL,
      item
    }
  }
}

const fetchMovies = (category) => {
  return (dispatch, getState) => {
    dispatch(requestItem(category))
    return fetch("/data/" + category +".json")
      .then(response => response.json())
      .then(data => dispatch(receiveItems(category, data )))
      .then(() => dispatch(actions.getRateStoraged()))
      .then(() => {
        const { movies, rateStoraged } = getState().reducerMovies
        const moviesFull = movies.map(item => {
          const storaged = rateStoraged.find(store => store.id === item.id)
          item.rate = storaged ? storaged.rate : item.rate
          return item
        })
        return moviesFull
      })
  }
}

export { actions, fetchMovies }