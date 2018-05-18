import React, { Component } from 'react'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import { Loading, Restaurants, Splash } from 'screens'

const HomeNavigation = createBottomTabNavigator({
  Restaurants: {
    screen: Restaurants,
  },
})

const MainNavigaton = createStackNavigator({
  Home: HomeNavigation,
})

const RootNavigation = createSwitchNavigator(
  {
    Loading,
    Home: MainNavigaton,
    Splash,
  },
  {
    initialRouteName: 'Loading',
  }
)

export default class App extends Component {
  render() {
    return <RootNavigation />
  }
}
