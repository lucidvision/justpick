import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { ContentText, Heading } from 'components'
import { MARGIN, PADDING } from 'styles'

class Pick extends Component {
  static propTypes = {
    pick: PropTypes.object.isRequired,
  }
  render() {
    const { pick } = this.props
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../images/test.png')} />
        <View style={styles.info}>
          <Heading style={[styles.name, styles.margin]} text={pick.name} />
          <ContentText style={styles.margin} text={`Rating: ${pick.rating}`} />
          <ContentText
            style={styles.margin}
            text={pick.opening_hours.open_now ? 'Open Now' : 'Closed'}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    padding: PADDING.MD,
  },
  margin: {
    marginBottom: MARGIN.MD,
  },
  name: {
    textAlign: 'center',
  },
}

const mapStateToProps = state => {
  return {
    pick: state.pick,
  }
}

export default connect(mapStateToProps)(Pick)
