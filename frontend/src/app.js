import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class app extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}} >
        <Text style={{fontSize: 30}} > Componente B </Text>
      </View>
    )
  }
}
