import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import devTools from 'remote-redux-devtools'
import Routes from 'routes'
import restaurants from 'redux/restaurants'

const store = createStore(restaurants, devTools())

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
