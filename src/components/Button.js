import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { FONT_SIZE } from 'styles'

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default function Button(props) {
  return (
    <TouchableHighlight style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.label}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 2,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: FONT_SIZE.MD,
    textAlign: 'center',
  },
})
