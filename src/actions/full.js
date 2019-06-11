import { actions as actionsMovies, fetchMovies } from './movies'
import { fetchCategories } from './categories'
import { fetchCart, actions as actionsCart } from './cart'
import { actions as actionsAppearance } from './appearance'

const initProcess = (category) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsAppearance.showSpinner(true))))
      .then(() => dispatch(fetchMovies(category)))
      .then(() => dispatch(fetchCategories()))
      .then(() => dispatch(fetchCart()))
      .then(() => {
        const { reducerMovies, reducerCart } = getState()
        return dispatch(actionsMovies.completeInfoMovies(reducerMovies.movies, reducerMovies.category, reducerCart.cart))
      })
      .then(() => dispatch(actionsAppearance.showSpinner(false)))
    }
}

const getMovies = (category, view) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsAppearance.showSpinner(true))))
      .then(() => dispatch(actionsAppearance.changeView(view)))
      .then(() => dispatch(fetchMovies(category)))
      .then(() => {
        const { reducerMovies, reducerCart } = getState()
        return dispatch(actionsMovies.completeInfoMovies(reducerMovies.movies, reducerMovies.category, reducerCart.cart))
      })
      .then(() => dispatch(actionsAppearance.showSpinner(false)))      
  }
}

const getDetail = (info, view) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsAppearance.showSpinner(true))))
      .then(() => dispatch(actionsAppearance.changeView(view)))
      .then(() => dispatch(actionsMovies.setInfoDetail(info)))
      .then(() => dispatch(actionsAppearance.showSpinner(false)))  
  }
}

const fullChangeView = (view) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsAppearance.showSpinner(true))))
      .then(() => dispatch(actionsAppearance.changeView(view)))
      .then(() => dispatch(actionsAppearance.showSpinner(false)))
  }
}

const changeItemCart = (info) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsCart.changeItem(info))))
      .then(() => {
        const { reducerMovies, reducerCart } = getState()
        return dispatch(actionsMovies.completeInfoMovies(reducerMovies.movies, reducerMovies.category, reducerCart.cart))
      })
      .then(() => {
        const { reducerMovies } = getState()
        return dispatch(actionsMovies.setInfoDetail({ ...reducerMovies.infoDetail, ...{ isAddCart: info.isAdd }} ))
      })
  }
}

const modifyRate = (item) => {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => resolve(dispatch(actionsMovies.modifyRate(item))))
      .then(() => dispatch(actionsMovies.saveRateLocalStorage(item)))
      .then(() => {
        const { reducerMovies, reducerCart } = getState()
        return dispatch(actionsMovies.completeInfoMovies(reducerMovies.movies, reducerMovies.category, reducerCart.cart))
      })
  }
}

const deleteCart = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => resolve(dispatch(actionsCart.deleteAll())))
      .then(() => {
        const { reducerMovies, reducerCart } = getState()
        return dispatch(actionsMovies.completeInfoMovies(reducerMovies.movies, reducerMovies.category, reducerCart.cart))
      })
  }
}

export { initProcess, getMovies, getDetail, changeItemCart, fullChangeView, deleteCart, modifyRate }