import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native'
import { fetchPhoto } from 'api/google'

const {width, height} = Dimensions.get('window')

const fbImage = 'https://graph.facebook.com/259389830744794/picture?height=500'

export default class Card extends Component {
  static propTypes = {
    onLeftSwiped: PropTypes.func.isRequired,
    onRightSwiped: PropTypes.func.isRequired,
    restaurant: PropTypes.object.isRequired
  }

  pan = new Animated.ValueXY()

  cardPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx:this.pan.x, dy:this.pan.y },
    ]),
    onPanResponderRelease: (e, {dx}) => {
      const absDx = Math.abs(dx)
      const direction = absDx / dx

      if (absDx > 120) {
        this.completeSwipe(direction)
      } else {
        this.resetPosition()
      }
    },
  })

  state = {
    image: ''
  }

  componentDidMount() {
    const { photos } = this.props.restaurant
    fetchPhoto(photos[0].photo_reference).then(res => {
      const image = res.request.responseURL
      this.setState({ image })
    })
  }

  completeSwipe = direction => {
    Animated.decay(this.pan, {
      velocity: {x:3 * direction, y:0},
      deceleration: 0.995,
    }).start(() => this.handleSwipeCompleted(direction))
  }

  handleSwipeCompleted = direction => {
    const { onLeftSwiped, onRightSwiped, restaurant } = this.props
    direction === 1 ? onRightSwiped(restaurant) : onLeftSwiped(restaurant)
  }

  resetPosition = () => {
    Animated.spring(this.pan, {
      toValue: { x:0, y:0 },
      friction: 4.5,
    }).start()
  }

  render() {
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-10deg', '0deg', '10deg'],
    })
    const animatedStyle = {
      transform: [
        {translateX: this.pan.x},
        {translateY: this.pan.y},
        {rotate: rotateCard},
      ],
    }

    return (
      <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.card, animatedStyle]}>
        {this.state.image ? (
          <Image style={styles.image} source={{ uri: this.state.image }} />
        ) : (
          <Text>Loading...</Text>
        )}
        <Text>{this.props.restaurant.name}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: width - 20,
    height: height * 0.7,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
  image: {
    flex: 1
  }
})
