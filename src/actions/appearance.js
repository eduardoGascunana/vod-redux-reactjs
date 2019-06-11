const actions = {
  SHOW_SPINNER: 'show_spinner',
  CHANGE_VIEW: 'change_view',
  SHOW_SIDE_MENU: 'show_side_menu',
  showSpinner: function (show) {
    return {
      type: this.SHOW_SPINNER,
      show
    }
  },
  changeView: function (view) {
    return {
      type: this.CHANGE_VIEW,
      view
    }
  },
  showSideMenu: function (show) {
    return {
      type: this.SHOW_SIDE_MENU,
      show
    }
  }
}

export { actions }

