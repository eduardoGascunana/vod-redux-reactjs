import { combineReducers } from 'redux'
import reducerCart from './cart'
import reducerCategories from './categories'
import reducerMovies from './movies'
import reducerAppearance from './appearance'

const reducers = combineReducers({
  reducerCart,
  reducerCategories,
  reducerMovies,
  reducerAppearance
})

export default reducers