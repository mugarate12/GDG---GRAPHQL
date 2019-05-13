import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// meus imports
import Input from './../components/Input';
import SignBtn from './../components/SigninOrsignupButton';
import { signup } from './../actions/signinOrsignupActions';
import axiosInstance from './../config/axiosConfig';

const mapStateToProps = (state) => {

  return ({

    token: state.signOrsingup.token

  });

}

const mapDispatchToProps = () => {

  return {

    signup

  }

}

export class SigninOrSingup extends Component {

  state = {

    name: '',
    username: '',
    email: '',
    password: 'majuge123',
    usernameORemail: 'MorfeusMateus',
    login: true

  }

  loginOrRegister = () => {

    if (this.state.login) return (
      <View style={styles.container} >
        <Input input={styles.input} style={styles.input} value={this.state.name} onchange={name => this.setState({ name })} placeholder='digite um nome' />
        <Input input={styles.input} style={styles.input} value={this.state.username} onchange={username => this.setState({ username })} placeholder='digite um username' />
        <Input input={styles.input} style={styles.input} value={this.state.email} onchange={email => this.setState({ email })} placeholder='digite um email' />
        <Input input={styles.input} style={styles.input} value={this.state.password} onchange={password => this.setState({ password })} placeholder='digite um password' />
        <SignBtn type='Create' option='signup' name={this.state.name} username={this.state.username} email={this.state.email} password={this.state.password} navigation={this.props.navigation} ></SignBtn>
        <TouchableOpacity
          style={styles.containerTxtLogin}
          onPress={() => { this.setState({ login: !this.state.login }) }}
        >
          <Text style={styles.textlogin} >Não tem login? Clique aqui</Text>
        </TouchableOpacity>
      </View>
    );

    if (!this.state.login) return (
      <View style={styles.container} >
        <Input input={styles.input} style={styles.input} value={this.state.usernameORemail} onchange={usernameORemail => this.setState({ usernameORemail })} placeholder='email ou usuario' />
        <Input input={styles.input} style={styles.input} value={this.state.password} onchange={password => this.setState({ password })} placeholder='digite um password' />
        <SignBtn type='Login' option='signin' usernameORemail={this.state.usernameORemail} password={this.state.password} navigation={this.props.navigation} ></SignBtn>
        <TouchableOpacity
          style={styles.containerTxtLogin}
          onPress={() => { this.setState({ login: !this.state.login }) }}
        >
          <Text style={styles.textlogin} >Tem cadastro? Clique aqui</Text>
        </TouchableOpacity>
      </View>
    )


  }


  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3D4039' }} behavior='height' enabled>
        {this.loginOrRegister()}
      </KeyboardAvoidingView>
    )
  }
};

const styles = StyleSheet.create({

  container: {

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
    // borderWidth: 2,
    // borderColor: 'red',
    width: Dimensions.get('screen').width / 1.2,
    maxHeight: Dimensions.get('screen').height / 1.6

  },
  input: {

    // flex: 2,
    marginBottom: 10

  },
  containerTxtLogin: {

    paddingTop: 15

  },
  textlogin: {

    color: 'white'

  },
  input: {


    
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(SigninOrSingup);
