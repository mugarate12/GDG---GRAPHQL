import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'

const Input = (props) => {

  return (
    <View style={[styles.container, props.style]} >
      <TextInput
        style={[styles.input, props.input]}
        onChangeText={props.onchange}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor='white'
        selectionColor='white'
      />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    width: '100%',
    maxHeight: 60,
    // borderRadius: 15,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    borderLeftColor: '#333',
    borderRightColor: '#333',
    borderRadius: 5,
    // borderTopColor: 'grey',
    // borderBottomColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'

  },
  input: {

    fontSize: 15,
    width: '100%',
    backgroundColor: '#3D4039',
    color: 'white'
    // borderWidth: 2,
    // borderColor: 'red'

  }

})

export default Input;
