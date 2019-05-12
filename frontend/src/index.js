import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';

// meus imports
import axiosInstance from './config/axiosConfig';
import axios from 'axios';

export default class index extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text> textInComponent </Text>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('B')}
        >
          <View style={{ height: 60, width: 100 }} >
            <Text style={{ fontSize: 30 }} >APERTAR</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={async () => {

            let query = `
            query {
              users {
                id,
                username
              }
            }
            `;

            let variables = {};

            axiosInstance.post('/graphql', JSON.stringify({query, variables})).then((result) => console.log(result.data.data));
            
          }}
        >
          <View style={{ height: 60, width: 100, paddingTop: 60, borderColor: '#333', borderRadius: 25, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }} >
            <Text style={{ fontSize: 20 }} >Req</Text>
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