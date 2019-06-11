import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.css'
import MenuItem from '../menuItem/MenuItem'
import constants from '../../common/constants'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      indexSelected: 0
    }
    this.onClickItem = this.onClickItem.bind(this)
  }
  onClickItem (index) {
    this.props.handleClickMenuItem && this.props.handleClickMenuItem(index)
    this.setState({
      indexSelected: index
    })
  }
  render () {
    const indexSelected = this.props.categorySelected === constants.CATEGORY_INIT
      ? 0
      : this.props.categories.findIndex(item => item.name === this.props.categorySelected)
    const listItems = this.props.categories.map((item, index) => {
      return (
        <li 
          key={index}
          className={styles.li}>
          <MenuItem
            index={index}
            title={item.name}
            isSelected={index === indexSelected}
            handleClick={this.onClickItem}
          />
        </li>
      )
    })
    return (
      <aside>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {listItems}
          </ul>
        </nav>
      </aside>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.array,
  categorySelected: PropTypes.string
}

export default Menu