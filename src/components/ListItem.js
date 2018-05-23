import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemPressed: PropTypes.func,
}

export default function ListItem({ item, onItemPressed }) {
  return (
    <TouchableOpacity onPress={() => onItemPressed(item)}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },
})
