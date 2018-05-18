import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { fetchPhoto } from 'api/google'

export default class Card extends Component {
  static propTypes = {
    restaurant: PropTypes.object.isRequired,
  }
  state = {
    image: '',
  }
  componentDidMount() {
    const { photos } = this.props.restaurant
    // fetchPhoto(photos[0].photo_reference).then(res => {
    //   const image = res.request.responseURL
    //   this.setState({ image })
    // })
  }
  render() {
    const { restaurant } = this.props
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../images/test.png')} />
        <Text>{restaurant.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  image: {
    height: 500,
    width: '100%',
    resizeMode: 'contain',
  },
})
