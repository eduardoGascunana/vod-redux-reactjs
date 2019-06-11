import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { actions as actionsCategories } from './actions/categories'
import { initProcess, getMovies, getDetail, changeItemCart, fullChangeView, deleteCart, modifyRate } from './actions/full';
import { actions as actionsAppearance } from './actions/appearance'
import Header from './components/header/Header'
import ViewHome from './layout/ViewHome/ViewHome'
import ViewList from './layout/ViewList/ViewList'
import ViewDetail from './layout/ViewDetail/ViewDetail';
import ViewCart from './layout/ViewCart/ViewCart';
import constants from './common/constants.js'
import styles from './common/css/styles.css'

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
    this.onClickHeaderItem = this.onClickHeaderItem.bind(this)
    this.onClickIconDelete = this.onClickIconDelete.bind(this)
    this.onClickEmptyCart = this.onClickEmptyCart.bind(this)
    this.onClickAccess = this.onClickAccess.bind(this)
    this.onSideMenu = this.onSideMenu.bind(this)
  }
  componentWillMount () {
    this.props.initProcess(constants.CATEGORY_INIT)
  }
  componentDidUpdate() {
    window.onpopstate = function (ev) {
      const path = ev.currentTarget.location.pathname
      let pathName = process.env && process.env.PUBLIC_URL && path.includes(process.env.PUBLIC_URL)
        ? path.slice(process.env.PUBLIC_URL.length)
        : path
      pathName = pathName.split('/')
      if ((pathName[0] === '' && pathName[1] === '') || pathName[1] === constants.VIEW.HOME) {
        this.props.getMovies(constants.CATEGORY_INIT, constants.VIEW.HOME)
      } else if (pathName[1] === constants.VIEW.LIST) {
        this.props.getMovies(pathName[2], constants.VIEW.LIST)
      } else {
        this.props.fullChangeView(pathName[1])
      }
    }.bind(this)
  }
  onClickMenuItem (index, history) {
    const category = this.props.categories[index].name
    this.props.getMovies(category, this.props.viewSelected)
    history.push(`/${constants.VIEW.LIST}/${category}`) 
  }
  onClickCover (info, history) {
    this.props.getDetail(info, constants.VIEW.DETAIL)
    history.push(`/${constants.VIEW.DETAIL}/${info.nameCategory}/${info.id}`)
  }
  onClickIconCart (info) {
    this.props.changeItemCart(info, info.isAdd)
  }
  onClickRating (info) {
    this.props.modifyRate(info)
  }
  onClickHeaderItem (view, history) {
    if (view === constants.VIEW.HOME) {
      this.props.getMovies(constants.CATEGORY_INIT, view)       
    } else {
      this.props.fullChangeView(view)
    }
    history.push(`/${view}`)    
  }
  onClickIconDelete (info) {
    this.props.changeItemCart(info, info.isAdd)
  }
  onClickEmptyCart () {
    this.props.deleteCart()
  }
  onClickAccess ({ category, view }, history) {
    this.props.getMovies(category, view)
    history.push(`/${view}/${category}`)    
  }
  onSideMenu (show) {
    this.props.showSideMenu(show)
  }
  render () {
    const { ROUTE } = constants
    const { 
      viewSelected, 
      sideMenu, 
      loading, 
      movies, 
      categories, 
      category, 
      infoDetail,
      cart 
    } = this.props
    return (
      <main className={styles.main} >
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route render={props => (
              <Header
                {...props}
                viewSelected={viewSelected}
                handleClick={this.onClickHeaderItem}
                showSideMenu={sideMenu}
                handleSideMenu={this.onSideMenu}
              />
            )} />
            <Switch>
              <Route path={ROUTE.HOME} render={props => (
                <ViewHome
                  {...props}
                  loading={loading}
                  movies={movies}
                  handleClickAccess={this.onClickAccess}
                />
              )} />
              <Route path={ROUTE.LIST} render={props => (
                <ViewList
                  {...props}
                  loading={loading}
                  movies={$.extend(true, [], movies)}
                  categories={categories}
                  categorySelected={category}
                  handleClickCover={this.onClickCover}
                  handleClickIconCart={this.onClickIconCart}
                  handleClickRating={this.onClickRating}
                  handleClickMenuItem={this.onClickMenuItem}
                  showSideMenu={sideMenu}
                  handleSideMenu={this.onSideMenu}
                />
              )} />
              <Route path={ROUTE.DETAIL} render={props => (
                <ViewDetail
                  {...props}
                  loading={loading}
                  data={infoDetail}
                  handleClickIconCart={this.onClickIconCart}
                  handleClickRating={this.onClickRating}
                />
              )} />
              <Route path={ROUTE.CART} render={props => (
                <ViewCart
                  {...props}
                  loading={loading}
                  data={cart}
                  handleClickIconDelete={this.onClickIconDelete}
                  handleClickEmptyCart={this.onClickEmptyCart}
                />
              )} />
            </Switch>
            <footer className={styles.mainFooter}>
              <div>Eduardo Gascuñana Martos</div>
              <a href="https://www.linkedin.com/in/eduardo-gascu%C3%B1ana-martos-84269b37/">Linkedin</a>
            </footer>
          </div>
        </BrowserRouter>
      </main>
    )
  }
}

Core.PropTypes = {
  completeMovies: PropTypes.array,
  movies: PropTypes.array,
  category: PropTypes.string,
  infoDetail: PropTypes.object,
  categories: PropTypes.array,
  cart: PropTypes.array,
  viewSelected: PropTypes.string,
  spinner: PropTypes.bool,
  sideMenu: PropTypes.bool,
  dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { completeMovies, movies, category, infoDetail } = state.reducerMovies
  const { categories } = state.reducerCategories
  const { cart } = state.reducerCart
  const { viewSelected, spinner, sideMenu } = state.reducerAppearance
  return {
    viewSelected: viewSelected || constants.CATEGORY_INIT,
    category,
    completeMovies,
    movies,
    categories,
    cart,
    sideMenu,
    loading: spinner,
    infoDetail 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initProcess: (category) => dispatch(initProcess(category)),
    getMovies: (category, view) => dispatch(getMovies(category, view)),
    showSideMenu: (show) => dispatch(actionsAppearance.showSideMenu(show)),
    getNameCategory: (index) => dispatch(actionsCategories.getNameCategory(index)),
    getDetail: (info, view) => dispatch(getDetail(info, view)),
    modifyRate: (item) => dispatch(modifyRate(item)),
    changeItemCart: (item, isAdd) => dispatch(changeItemCart({ item, isAdd })),
    fullChangeView: (view) => dispatch(fullChangeView(view)),
    deleteCart: () => dispatch(deleteCart())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Core)