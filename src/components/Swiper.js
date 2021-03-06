import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.3 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Swiper extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    onPickingComplete: PropTypes.func,
    renderCard: PropTypes.func,
  }

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      },
    })

    this.state = {
      panResponder,
      position,
      index: 0,
      data: props.data,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        index: 0,
        data: nextProps.data,
      }
    }

    return null
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction) {
    const { index, position } = this.state
    const { onSwipeLeft, onSwipeRight, onPickingComplete, data } = this.props
    const item = data[index]

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(index)
    position.setValue({ x: 0, y: 0 })

    if (index + 1 >= data.length) {
      onPickingComplete()
    } else {
      this.setState(prevState => ({ index: prevState.index + 1 }))
    }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start()
  }

  getRotateStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-90deg', '0deg', '90deg'],
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    }
  }

  getScaleStyle() {
    const { position } = this.state
    const scale = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [1, 0.9, 1],
    })

    return {
      transform: [{ scale }],
    }
  }

  renderCards() {
    const deck = this.props.data.map((item, index) => {
      if (index < this.state.index) {
        return null
      }

      if (index === this.state.index) {
        return (
          <Animated.View
            key={index}
            style={[this.getRotateStyle(), styles.card, styles.topCard]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      if (index === this.state.index + 1) {
        return (
          <Animated.View
            key={index}
            style={[this.getScaleStyle(), styles.card, { zIndex: 98 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return (
        <Animated.View
          key={index}
          style={[styles.card, { transform: [{ scale: 0.9 }], zIndex: -index }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      )
    })

    return Platform.OS === 'android' ? deck : deck.reverse()
  }

  render() {
    return <View style={styles.container}>{this.renderCards()}</View>
  }
}

const styles = {
  container: {
    flex: 1,
    elevation: 4,
  },
  topCard: {
    shadowColor: 'rgba(137, 137, 137, 0.8)',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: {
      height: 8,
    },
    zIndex: 99,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}

export default Swiper
