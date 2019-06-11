import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Core from './Core'

const store = configureStore()

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Core />
      </Provider>
    )
  }
}