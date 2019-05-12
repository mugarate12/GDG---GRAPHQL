import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';

// meus imports
import axiosInstance from './../config/axiosConfig';

export default class Feed extends Component {

  componentDidMount() {

    this.getposts();

  }

  state = {

    posts: []

  }

  getposts = async () => {

    const value = await AsyncStorage.getItem('userToken');
    console.log(value);

    let query = `
    query{
      postByFriends{
        id,
        content,
        likes,
        author{
          username,
          name
        }
      }
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((graphqlData) => {

        if (graphqlData.data.errors) {

          Alert.alert(`${graphqlData.data.errors[0].message}`);

        } else {

          this.setState({ posts: graphqlData.data.data.postByFriends });

        }

        console.log(graphqlData.data.data.postByFriends);

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  addlike = async (idPost) => {

    await AsyncStorage.getItem('userToken');

    let query = `
    mutation {
      addLike(idPost: ${idPost})
    }
    `

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((graphqlData) => {

        if(graphqlData.data.errors){

          Alert.alert(graphqlData.data.errors[0].message);

        }else{

          this.getposts();

        }

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));

  }

  removeLike = async (idPost) => {

    await AsyncStorage.getItem('userToken');

    let query = `
    mutation{
      removeLike(idPost: ${idPost})
    }
    `;

    let variables = {};

    await axiosInstance.post('/graphql', JSON.stringify({ query, variables }))
      .then((graphqlData) => {

        if(graphqlData.data.errors){

          Alert.alert(graphqlData.data.errors[0].message);

        } else{

          this.getposts();

        }

      })
      .catch((err) => Alert.alert(`${err.name} : ${err.message}`));
  }

  _renderItem = ({ item }) => {

    return (
      <View style={styles.containerPost} >
        <View style={styles.containerPostHeader}>
          <Text style={styles.userText} >{item.author.name}</Text>
          <Text style={styles.userText} >@{item.author.username}</Text>
        </View>

        <Text style={styles.userText} >{item.content}</Text>

        <View style={styles.containerPostBtns} >
          <Text style={styles.userText} >likes: {`${item.likes}`}</Text>
          <View style={styles.containerLikes} >
            <TouchableOpacity
              style={styles.btnLike}
              onPress={() => this.addlike(item.id)}
            >
              <Text style={styles.userText} >Add Like</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLike}
              onPress={() => this.removeLike(item.id)}
            >
              <Text style={styles.userText} >Deslike</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )

  }

  render() {
    return (
      <ScrollView style={styles.container} >
        <FlatList
          data={this.state.posts}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#3D4039',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'

  },
  containerPost: {

    flex: 1,
    maxHeight: 200,
    width: '100%',
    // borderWidth: 2,
    // borderColor: 'red',
    paddingHorizontal: 5,
    paddingBottom: 8,
    borderBottomColor: '#474239',
    borderBottomWidth: 5

  },
  containerPostHeader: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10

  },
  containerPostBtns: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10

  },
  containerLikes: {

    flexDirection: 'row',

  },
  userText: {

    fontSize: 20,
    color: 'white'

  },
  btnLike: {

    paddingLeft: 5

  }

});
