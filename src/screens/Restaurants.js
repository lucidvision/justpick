import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { Card, Swiper } from 'components'
import { addRestaurant } from 'redux/restaurants'
import { fetchRestaurants } from 'api/google'

class Restaurants extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  state = {
    restaurants: [],
    status: null,
  }
  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setRestaurants()
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
          return this.setRestaurants()
        }

        this.setState(() => ({ status }))
      })
      .catch(error => console.warn('error asking Location permission: ', error))
  }
  setRestaurants = () => {
    Location.getCurrentPositionAsync().then(({ coords }) => {
      fetchRestaurants(coords).then(res => {
        const restaurants = res.data.results
        this.setState({ restaurants })
        console.log(restaurants)
      })
    })
  }
  handleSwipeRight = restaurant => {
    this.props.dispatch(addRestaurant(restaurant))
  }
  renderCard = restaurant => {
    return <Card restaurant={restaurant} />
  }
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          data={this.state.restaurants}
          onSwipeRight={this.handleSwipeRight}
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

export default connect()(Restaurants)
