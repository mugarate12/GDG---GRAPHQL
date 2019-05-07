import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

export default class index extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text> textInComponent </Text>
        <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('B')}
        >
          <View style={{height: 60, width: 100}} >
            <Text style={{fontSize: 30}} >APERTAR</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  }

});