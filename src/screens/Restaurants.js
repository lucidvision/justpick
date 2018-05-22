import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { AppModal, Card, Heading, Swiper } from 'components'
import {
  setRestaurants,
  addShortlist,
  transferRestaurants,
} from 'redux/restaurants'
import { fetchRestaurants } from 'api/google'

const dummyRestaurants = [
  {
    name: 'Rest 1',
    rating: 4.1,
    opening_hours: '',
  },
  {
    name: 'Rest 2',
    rating: 4.2,
    opening_hours: '',
  },
  {
    name: 'Rest 3',
    rating: 4.3,
    opening_hours: '',
  },
]

class Restaurants extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    restaurants: PropTypes.array.isRequired,
  }
  state = {
    showModal: false,
    status: null,
  }
  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          this.fetchAndSetRestaurants()
          return
        }

        this.setState(() => ({ status }))
        this.askPermission()
      })
      .catch(error => {
        console.warn('Error getting Location permission: ', error)
        this.setState(() => ({ status: 'undetermined' }))
      })
  }
  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.fetchAndSetRestaurants()
        }

        this.setState(() => ({ status }))
      })
      .catch(error => {
        console.warn('error asking Location permission: ', error)
        this.setState(() => ({ status: 'undetermined' }))
      })
  }
  fetchAndSetRestaurants = () => {
    Location.getCurrentPositionAsync().then(({ coords }) => {
      fetchRestaurants(coords).then(res => {
        const restaurants = res.data.results
        this.props.dispatch(setRestaurants(dummyRestaurants))
        console.log(restaurants)
      })
    })
  }
  handleSwipeLeft = restaurant => {}
  handleSwipeRight = restaurant => {
    this.props.dispatch(addShortlist(restaurant))
  }
  handlePickingComplete = () => {
    this.props.dispatch(transferRestaurants())
    if (this.props.restaurants.length === 1) {
      this.props.navigation.navigate('Pick')
    }
  }
  renderCard = restaurant => {
    return <Card restaurant={restaurant} />
  }
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          data={this.props.restaurants}
          onSwipeLeft={this.handleSwipeLeft}
          onSwipeRight={this.handleSwipeRight}
          onPickingComplete={this.handlePickingComplete}
          renderCard={this.renderCard}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants,
  }
}

export default connect(mapStateToProps)(Restaurants)
