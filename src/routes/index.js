import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import { Account, Loading, Pick, PickList, Restaurants, Splash } from 'screens'

const HomeTabs = createBottomTabNavigator({
  Restaurants: {
    screen: Restaurants,
  },
  Picks: {
    screen: PickList,
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
  Pick: {
    screen: Pick,
    navigationOptions: {
      headerTitle: 'Your Pick',
    },
  },
})

export default createSwitchNavigator(
  {
    Loading,
    Home: MainStack,
    Splash,
  },
  {
    initialRouteName: 'Loading',
  }
)
