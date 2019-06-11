import { actions } from '../actions/movies'

const NAME_LOCAL_STORAGE = 'listItemsRateModified'

const setItemsLocalStorage = data => localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify(data))

const movies = (state = {
  category: '',
  movies: [],
  completeMovies: [],
  infoDetail: {},
  rateStoraged: []
}, action) => {
  const { 
    REQUEST_MOVIES, 
    RECEIVE_MOVIES, 
    COMPLETE_INFO_MOVIES,
    SET_ITEM_CART, 
    MODIFY_RATE, 
    GET_RATE_STORAGED, 
    // GET_ITEMS_CACHED, 
    SAVE_RATE_LOCAL_STORAGE,
    SET_INFO_DETAIL 
  } = actions
  const type = {
    /* [SET_ITEM_CART]: () => {
      return [...state.movies].find(cover => cover.id === action.id).isAddCart = action.isAdd
    }, */
    [MODIFY_RATE]: () => {
      const { id, rate } = action.item
      const movies = [...state.movies]
      movies.find(cover => cover.id === id).rate = rate
      // const item = movies.find(cover => cover.id === id)
      // item.rate = rate
      // setItemsLocalStorage(item)
      return Object.assign({}, state, {
        movies: movies
      })      
    },
    [COMPLETE_INFO_MOVIES]: () => {
      const { cart, category } = action
      return Object.assign({}, state, {
        completeMovies: state.movies.map(item => {
          item.isAddCart = cart.find(data => data.id === item.id) ? true : false
          item.nameCategory = category
          return item
        })
      })
    },
    [REQUEST_MOVIES]: () => {            
      return Object.assign({}, state, {
        category: action.category
      })
    },
    [RECEIVE_MOVIES]: () => {
      return Object.assign({}, state, {
        category: action.category,
        movies: action.items
      })
    },
    [SET_INFO_DETAIL]: () => {
      return Object.assign({}, state, {
        infoDetail: action.item
      })
    },
    /* [GET_ITEMS_CACHED]: () => {
      // return this.listByCategory
    }, */    
    [GET_RATE_STORAGED]: () => {
      /* const list = JSON.parse(localStorage(NAME_LOCAL_STORAGE)) || []
      return action.data.map(item => {
        const storaged = list.find(store => store.id === item.id)
        item.rate = storaged ? storaged.rate : item.rate
        return item
      }) */
      return Object.assign({}, state, {
        rateStoraged: JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
      })      
    },
    [SAVE_RATE_LOCAL_STORAGE]: () => {
      const list = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
      const index = list.findIndex(store => action.item.id === store.id)
      if (index !== -1) {
        list[index].rate = action.item.rate
        localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify(list))
      } else {
        localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify([...list, action.item]))
      }
      return Object.assign({}, state, {
        rateStoraged: list
      })              
    },
    default: () => {
      return state;
    }    
  }
  return (type[action.type] || type.default)()
}

export default movies