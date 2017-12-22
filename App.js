/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Secured extends Component {
  userLogout(e) {
      this.props.onLogout();
      e.preventDefault();
  }
   
  render() {
      return (
          <ScrollView style={{padding: 20}}>
              <Text style={{fontSize: 27}}>
                  {`Welcome ${this.props.username}`}
              </Text>
              <View style={{margin: 20}}/>
              <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
          </ScrollView>
      );
  }
}

class Login extends Component {
  constructor (props) {
      super(props);
      this.state = {
          route: 'Login',
          username: '',
          password: ''
      };
  }

	componentWillUpdate(nextProps, nextState) {
		if (this.state != nextState)
      this.props.handleDataLogin(nextState.username, nextState.password);
	}


  userLogin(e){
    this.props.onLogin();
  }

  toggleRoute(e){
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    e.preventDefault();
  }

  render () {
      let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
      return (
          <ScrollView style={{padding: 20}}>
              <Text style={{fontSize: 27}}>{this.state.route}</Text>
              <TextInput 
                  placeholder='Username'
                  autoCapitalize='none'
                  autoCorrect={false} 
                  autoFocus={true} 
                  keyboardType='email-address'
                  value={this.state.username} 
                  onChangeText={(text) => this.setState({ username: text })} />
              <TextInput 
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false} 
                  secureTextEntry={true} 
                  value={this.state.password} 
                  onChangeText={(text) => this.setState({ password: text })} />
              <View style={{margin: 7}}/>
              <Button onPress={(e) => this.userLogin(e)} title={this.state.route}/>
              <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.toggleRoute(e)}>{alt}</Text>
          </ScrollView>
      );
  }


}



export default class App extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLogin : false,
      username:'',
      password: ''
    }
  }

  handleLogin(name,pass){
    this.setState({
      username : name,
      password: pass
    });
    Alert.alert("handle Login"+ this.state.username);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Secured />;
    } else {
      return <Login 
      isSuccess={this.state.isLogin} 
      handleDataLogin={(username,password) => this.setState({username: username,password: password})}
      onLogin={(username,password) => this.handleLogin(username,password)}/>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
