import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

class Loading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  state = {}
  componentDidMount() {
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default Loading
