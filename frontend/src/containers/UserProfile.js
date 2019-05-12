import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList
} from 'react-native';

import axiosInstance from './../config/axiosConfig';

export default class UserProfile extends Component {

  state = {

    user: false

  }

  componentWillMount() {

    this.getUser();

  }

  getUser = async () => {

    let query = `
    query {
      user(username: "Cicraninho"){
        name,
        username,
        about,
        posts{
          id,
          content
        }

      }
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((graphqlData) => {

        if (graphqlData.data.errors) {

          Alert.alert(graphqlData.data.errors[0].message);

        } else {

          console.log(graphqlData.data.data.user)

          this.setState({
            user: graphqlData.data.data.user
          });

        }

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  renderUser = () => {

    return (
      <View style={styles.containerUser} >
        <Text style={styles.txtName} >{this.state.user.name}</Text>
        <Text style={styles.txtUsername} >{this.state.user.username}</Text>
        <Text style={styles.txtAbout} >{this.state.user.about}</Text>
        <FlatList
          data={this.state.user.posts}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    )

  }

  _renderItem = ({ item }) => {

    return (
      <View style={styles.containerPost}>
        <Text style={styles.postUser} >@{this.state.user.username}</Text>
        <Text style={styles.postContent} >{item.content}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container} >
        {!!this.state.user ? this.renderUser() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#3D4039',
    flex: 1,

  },
  containerUser: {

    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10

  },
  txtName: {

    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 5

  },
  txtUsername: {

    fontSize: 15,
    color: 'white',
    paddingBottom: 10

  },
  txtAbout: {

    color: 'white',
    fontSize: 18,
    paddingBottom: 25

  },
  containerPost: {

    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 5
    
  },
  postUser: {

    fontSize: 16,
    color: 'white',
    paddingBottom: 5

  },
  postContent: {

    color: 'white',
    fontSize: 15

  }

});
