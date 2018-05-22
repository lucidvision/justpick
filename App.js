import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import devTools from 'remote-redux-devtools'
import { Account, Loading, Restaurants, Splash } from 'screens'
import restaurants from 'redux/restaurants'

const HomeTabs = createBottomTabNavigator({
  Restaurants: {
    screen: Restaurants,
  },
  Account: {
    screen: Account,
  },
})

const MainStack = createStackNavigator({
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      headerTitle: 'Just Pick',
    },
  },
})

const RootNavigation = createSwitchNavigator(
  {
    Loading,
    Home: MainStack,
    Splash,
  },
  {
    initialRouteName: 'Loading',
  }
)

const store = createStore(restaurants, devTools())

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar translucent />
          <RootNavigation />
        </View>
      </Provider>
    )
  }
}
