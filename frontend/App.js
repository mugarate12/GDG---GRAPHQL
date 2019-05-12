import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';

// meus imports
import AppContainer from './src/Navigation';
import reducers from './src/reducers/index';

const store = applyMiddleware(thunk)(createStore)(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}  >
        <AppContainer />
      </Provider>
    );
  }
}