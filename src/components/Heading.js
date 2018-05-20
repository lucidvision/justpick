import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { COLOR, FONT_SIZE } from 'styles'

Heading.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  text: PropTypes.string.isRequired,
}

Heading.defaultProps = {
  style: [],
}

export default function Heading(props) {
  return <Text style={[styles.heading, props.style]}>{props.text}</Text>
}

const styles = StyleSheet.create({
  heading: {
    fontSize: FONT_SIZE.LG,
    color: COLOR.text,
  },
})
