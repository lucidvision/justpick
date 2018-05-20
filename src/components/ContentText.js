import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { FONT_SIZE, COLOR } from 'styles'

ContentText.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  text: PropTypes.string,
}

ContentText.defaultProps = {
  style: [],
}

export default function ContentText(props) {
  return <Text style={[styles.content, props.style]}>{props.text}</Text>
}

const styles = StyleSheet.create({
  content: {
    fontSize: FONT_SIZE.MD,
    color: COLOR.text,
  },
})
