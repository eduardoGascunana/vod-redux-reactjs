import { actions } from '../actions/appearance'

const appearance = (state = {
  spinner: false,
  viewSelected: '',
  sideMenu: false
}, action) => {
  const { CHANGE_VIEW, SHOW_SIDE_MENU, SHOW_SPINNER } = actions
  const type = {
    [SHOW_SPINNER]: () => {
      return Object.assign({}, state, {
        spinner: action.show
      })
    },
    [CHANGE_VIEW]: () => {
      return Object.assign({}, state, {
        viewSelected: action.view
      })
    },
    [SHOW_SIDE_MENU]: () => {
      return Object.assign({}, state, {
        sideMenu: action.show
      })
    },
    default: () => {
      return state
    }
  }
  return (type[action.type] || type.default)()
}

export default appearance