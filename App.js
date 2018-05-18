import React, { Component } from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { Loading, Restaurants, Splash } from 'screens'

const RootNavigation = createSwitchNavigator(
  {
    Loading,
    Restaurants,
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
