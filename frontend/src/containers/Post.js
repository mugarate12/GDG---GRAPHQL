import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';

// meus imports
import Input from './../components/Input';
import axiosInstance from './../config/axiosConfig';

export default class Post extends Component {

  state = {

    txtPost: ''

  }

  post = async (content) => {

    await AsyncStorage.getItem('userToken');

    console.log(content);

    let query = `
    mutation{
      createPost(input: {
        content: "${content}"
      }){
        id,
        content
      }
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({query, variables}))
      .then((graphqlData) => {

        if(graphqlData.data.errors){

          Alert.alert(graphqlData.data.errors[0].message)

        } else {

          console.log(graphqlData.data);
          this.props.navigation.navigate('UserProfile');

        }

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.containerHeader} >
          <TouchableOpacity
            style={styles.containerBtnPost}
            onPress={() => this.post(this.state.txtPost)}
          >
            <Text style={styles.txtBtn} >Postar</Text>
          </TouchableOpacity>
        </View>
        <Input
          style={styles.inputIncrement}
          value={this.state.txtPost}
          onchange={txtPost => this.setState({ txtPost })}
          placeholder='conteúdo do post'
          input={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#3D4039',
    flex: 1

  },
  containerHeader: {

    maxHeight: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end'

  },
  containerBtnPost: {

    maxHeight: 60,
    flex: 0.2,
    borderColor: '#333',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
  inputIncrement: {

    maxHeight: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'

  },
  input: {

    height: '100%',
    flex: 1

  },
  txtBtn: {

    color: 'white'

  }

});