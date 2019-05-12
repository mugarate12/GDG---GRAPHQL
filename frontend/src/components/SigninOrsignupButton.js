import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native';

import axiosInstance from './../config/axiosConfig';

const SigninOrsignupButton = (props) => {

  const signin = async (emailORusername, password) => {

    let identifyUser = emailORusername.indexOf('@') >= 0 ? `email: "${emailORusername}"` : `username: "${emailORusername}"`;

    let query = `
    query {
      loginUser(input: {
        ${identifyUser}
        password: "${password}"
      }){
        token
      }
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({query, variables}))
      .then((graphQlData) => {

        if(graphQlData.data.errors){ 
          
          // console.log(graphQlData.data.errors[1])

          Alert.alert(`${graphQlData.data.errors[0].message}`)
          // console.log(graphQlData.data)
          
        }else {

          axiosInstance.defaults.headers.common['Authorization'] = `bearer ${graphQlData.data.data.loginUser.token}`;
  
          props.navigation.navigate('B');
        
        }


      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  const signup = async (name, username, email, password) => {

    let query = `
    mutation{
      createUser(input: {
        name: "${name}",
        username: "${username}",
        email: "${email}",
        password: "${password}"
      }){
        token
      }
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((graphQlData) => {
        
        if(graphQlData.data.errors) {

          Alert.alert(`${graphQlData.data.errors[0].message}`)
        
        }else {

          axiosInstance.defaults.headers.common['Authorization'] = `bearer ${graphQlData.data.data.createUser.token}`;
  
          props.navigation.navigate('B');

        }


      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }


  return (
    <View style={styles.container} >
      <TouchableOpacity
        onPress={() => props.option === 'signin' ? signin(props.usernameORemail, props.password) : signup(props.name, props.username, props.email, props.password)}
      >
        <Text style={styles.textBtn} >{props.type}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    width: Dimensions.get('window').width / 4,
    maxHeight: 80,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#333',
    borderRightColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textBtn: {

    fontSize: 16,
    color: 'white'

  }

})

export default SigninOrsignupButton;
