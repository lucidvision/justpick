import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { AppModal, Button, Card, Heading } from 'components'
import {
  addPicklist,
  addShortlist,
  setPick,
  setRestaurants,
  transferRestaurants,
} from 'reducer'
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
    shortlist: PropTypes.array.isRequired,
  }

  state = {
    index: 0,
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
    // this.props.dispatch(setRestaurants(dummyRestaurants))
    Location.getCurrentPositionAsync().then(({ coords }) => {
      fetchRestaurants(coords).then(res => {
        const restaurants = res.data.results
        this.props.dispatch(setRestaurants(restaurants))
        console.log(restaurants)
      })
    })
  }

  handleLeftSwiped = () => {
    const { restaurants, shortlist } = this.props
    if (restaurants.length - 1 === this.state.index && shortlist.length === 0) {
      this.setState({
        index: 0,
        showModal: true
      })
    }
    this.handlePickingCompleted()
  }

  handleRightSwiped = restaurant => {
    this.props.dispatch(addShortlist(restaurant))
    this.handlePickingCompleted()
  }

  handlePickingCompleted = () => {
    if (this.state.index === this.props.restaurants.length - 1) {
      if (this.props.shortlist.length === 1) {
        const restaurant = this.props.restaurants[0]
        this.fetchAndSetRestaurants()
        this.props.dispatch(setPick(restaurant))
        this.props.dispatch(addPicklist(restaurant))
        this.props.navigation.navigate('Pick')
      } else {
        this.props.dispatch(transferRestaurants())
      }
      this.setState({ index: 0 })
      return
    }
    this.setState(prevState => ({ index: prevState.index + 1 }))
  }

  handlePressButton = () => {
    this.fetchAndSetRestaurants()
    this.setState({ showModal: false })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.restaurants.map(restaurant => {
          return <Card key={restaurant.name} onLeftSwiped={this.handleLeftSwiped} onRightSwiped={this.handleRightSwiped} restaurant={restaurant} />
        })}
        <AppModal
          visible={this.state.showModal}
          onRequestClose={this.handlePressButton}
        >
          <Heading text="You ran out of options. Please try again." />
          <View style={styles.buttonGroupRight}>
            <Button label={'CONFIRM'} onPress={this.handlePressButton} />
          </View>
        </AppModal>
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
    shortlist: state.shortlist,
  }
}

export default connect(mapStateToProps)(Restaurants)
