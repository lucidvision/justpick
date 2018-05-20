import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import { Loading, Restaurants, Splash } from 'screens'

const HomeTabs = createBottomTabNavigator({
  Restaurants: {
    screen: Restaurants,
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

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent />
        <RootNavigation />
      </View>
    )
  }
}
