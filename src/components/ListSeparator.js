import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ListSeparator() {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'black',
    height: 1,
    marginHorizontal: 20,
  },
})
