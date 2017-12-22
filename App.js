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
    {
      if(this.state.route === 'Login'){
        this.props.handleDataLogin(nextState);
      }else if(this.state.route === 'SignUp'){
        this.props.handleDataSignUp(nextState);
      }
    }
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
      
      if(this.state.route === "SignUp"){
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
      else if(this.state.route === "Login" )
      {
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


}



export default class App extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      isLogin : false,
      username:'',
      password: ''
    }
    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  doLogin(){
    this.setState({
      isLogin: true
    });
    Alert.alert("handle Login"+ this.state.username);
  }

  doLogout(){
    this.setState({
      isLogin: false,
      username: '',
      password: ''
    });
    Alert.alert("handle Logout");
  }

  handleLogin(name,pass){
    this.setState({
      username : name,
      password: pass
    });

  }

  render() {
    if (this.state.isLogin) {
      return <Secured username={this.state.username} onLogout={this.doLogout}/>;
    } else {
      return <Login 
      isSuccess={this.state.isLogin} 
      handleDataLogin={(nextState) => this.handleLogin(nextState.username,nextState.password)}
      onLogin={this.doLogin}/>;
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
