import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Card, Swiper } from 'components'
import { fetchRestaurants } from 'api/google'

class Restaurants extends Component {
  static propTypes = {}
  state = {
    restaurants: [],
  }
  componentDidMount() {
    fetchRestaurants().then(res => {
      const restaurants = res.data.results
      this.setState({ restaurants })
    })
  }
  handleSwipeRight = () => {}
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
    padding: 20,
    backgroundColor: 'blue',
  },
}

export default Restaurants
