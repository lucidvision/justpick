import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { ContentText, Heading } from 'components'
import { fetchPhoto } from 'api/google'
import { MARGIN, PADDING } from 'styles'

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
        {/* {this.state.image ? (
          <Image style={styles.image} source={{ uri: this.state.image }} />
        ) : (
          <ActivityIndicator />
        )} */}
        <Image style={styles.image} source={require('../images/test.png')} />
        <View style={styles.info}>
          <Heading
            style={[styles.name, styles.margin]}
            text={restaurant.name}
          />
          <ContentText
            style={styles.margin}
            text={`Rating: ${restaurant.rating}`}
          />
          <ContentText
            style={styles.margin}
            text={restaurant.opening_hours.open_now ? 'Open Now' : 'Closed'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 10,
    height: '60%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    padding: PADDING.MD,
  },
  margin: {
    marginBottom: MARGIN.MD,
  },
  name: {
    textAlign: 'center',
  },
})
