import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, ListSeparator } from 'components'
import { setPick } from 'reducer'

class PickList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    picklist: PropTypes.array.isRequired,
  }
  handlePressPick = restaurant => {
    this.props.dispatch(setPick(restaurant))
    this.props.navigation.navigate('Pick')
  }
  renderItem = ({ item }) => {
    return <ListItem item={item} onItemPressed={this.handlePressPick} />
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.picklist}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ListSeparator}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
}

const mapStateToProps = state => {
  return {
    picklist: state.picklist,
  }
}

export default connect(mapStateToProps)(PickList)
