import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import devTools from 'remote-redux-devtools'
import Routes from 'routes'
import reducer from 'reducer'

const store = createStore(reducer, devTools())

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar translucent />
          <Routes />
        </View>
      </Provider>
    )
  }
}
