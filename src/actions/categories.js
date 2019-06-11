const requestItem = () => {
  return {
    type: actions.REQUEST_CATEGORIES
  }
}

const receiveItems = (data) => {
  return {
    type: actions.RECEIVE_CATEGORIES,
    items: data
  }
}

const actions = {
  REQUEST_CATEGORIES: 'request_categories',
  RECEIVE_CATEGORIES: 'receive_categories' 
}

const fetchCategories = () => {
  return (dispatch) => {
    dispatch(requestItem())
    return fetch("./data/Categories.json")
      .then(response => response.json())
      .then(data => dispatch(receiveItems(data)))
  }
}

export { actions, fetchCategories }