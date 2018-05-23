import React from 'react'
import PropTypes from 'prop-types'
import { Modal, StyleSheet, View } from 'react-native'
import { COLOR } from 'styles'

AppModal.propTypes = {
  children: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default function AppModal(props) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>{props.children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
})
