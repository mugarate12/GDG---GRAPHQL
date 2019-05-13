import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';

// meus imports
import Input from './../components/Input';
import axiosInstance from './../config/axiosConfig';

export default class SearchUser extends Component {

  state = {

    username: '',
    user: false

  }

  getuser = async (username) => {

    await AsyncStorage.getItem('userToken');

    let query = `
    query{
      user(username: "${username}"){
        name,
        username
      }
    }
    `; 

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({query, variables}))
      .then((graphqlData) => {

        if (graphqlData.data.errors) {

          Alert.alert(graphqlData.data.errors[0].message);

        }else{

          // console.log(graphqlData.data);
          this.setState({
            user: graphqlData.data.data.user
          });

        }

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  showuser = () => {

    return (
      <View style={styles.containerUser} >
        <Text style={styles.txtUsername} >@{this.state.user.username}</Text>
        <Text style={styles.txtName} >{this.state.user.name}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.containerHeader} >
          <Input
            style={styles.inputIncrement}
            value={this.state.username}
            onchange={username => this.setState({ username })}
            placeholder='pesquise por username'
            input={styles.input}
          />
          <TouchableOpacity
            onPress={() => this.getuser(this.state.username)}
            style={styles.containerbtn}
          >
            <Text style={styles.txtBtn} >Ir</Text>
          </TouchableOpacity>
        </View>

        {!!this.state.user ? this.showuser() : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#3D4039',
    flex: 1,

  },
  containerHeader: {

    flexDirection: 'row',
    maxHeight: 60

  },
  containerbtn: {

    flex: 0.2,
    borderWidth: 4,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'

  },
  containerUser: {

    borderWidth: 2,
    borderColor: '#2B2547',
    width: '100%',
    // maxHeight: 60,
    paddingHorizontal: 10,

  },
  inputIncrement: {

    paddingBottom: 10,
    paddingTop: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#474239'

  },
  txtBtn: {

    fontSize: 16,
    color: 'white'

  },
  txtUsername: {

    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    paddingBottom: 15

  },
  txtName: {

    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
    paddingBottom: 5

  },
  input: {
    
  }

});