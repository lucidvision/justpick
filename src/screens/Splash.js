import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

class Splash extends Component {
  static propTypes = {}
  state = {}
  render() {
    return (
      <View style={styles.container}>
        <Text>Splash</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    marginTop: 10,
  },
}

export default Splash
