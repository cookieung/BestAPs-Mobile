/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from './firebase';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


class History extends Component {

  render(){
    return (<MyListView />);
  }
}


class MyListView extends Component {
  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };

    this.itemsRef = firebase.database().ref().child('auth').child(0).child('activity');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef){

    // let items = [{title:'Item 1'},{title: 'Item 2'}]

    itemsRef.on('value',(snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          title : child.val().name,
          date : child.val().date,
          _key: child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });



  }

  pressRow(item){
    Alert.alert("Click "+item);
  }

  renderRow(item){
    return(
      <TouchableHighlight onPress={() =>{
        this.pressRow(item);
      }}>
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.date}</Text>
        </View>
      </TouchableHighlight>
    );
  }


  
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

class Secured extends Component {

  constructor(){
    super();
    this.state = {
      viewHistory : false
    }
  }

  userLogout(e) {
      this.props.onLogout();
      e.preventDefault();
  }

  switchToHistory(e) {
      this.setState({
        viewHistory: !this.state.viewHistory
      });
  }
   
  render() {

      if(this.state.viewHistory){
        return (
          <ScrollView style={{padding: 20}}>
          <Text style={{fontSize: 27}}>
              {`History ${this.props.firstname}`}
          </Text>
          <History />
          <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Button color="#841584" onPress={(e) => this.switchToHistory(e)} title="Switch"/>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
          </View>
      </ScrollView>
        );
      }

      return (
          <ScrollView style={{padding: 20}}>
              <Text style={{fontSize: 27}}>
                  {`Welcome ${this.props.firstname}`}
              </Text>
              <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Image
                style={{width: 150, height: 150}}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              />
              </View>
              <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Button color="#841584" onPress={(e) => this.switchToHistory(e)} title="Switch"/>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
              </View>

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
    this.props.onLogin(e);
  }

  userSignUp(e){
    this.props.onSignUp(e);
  }

  toggleRoute(e){
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    e.preventDefault();
  }

  render () {

      let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
      
      if(this.state.route === 'SignUp'){
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
              <TextInput 
                  placeholder='Firstname'
                  autoCapitalize='none'
                  autoCorrect={false} 
                  autoFocus={true} 
                  keyboardType='default'
                  value={this.state.firstname} 
                  onChangeText={(text) => this.setState({ firstname: text })} />
              <TextInput 
                  placeholder='Lastname'
                  autoCapitalize='none'
                  autoCorrect={false} 
                  autoFocus={true} 
                  keyboardType='default'
                  value={this.state.lastname} 
                  onChangeText={(text) => this.setState({ lastname: text })} />
              <View style={{margin: 7}}/>
              <Button onPress={(e) => this.userSignUp(e)} title={this.state.route}/>
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

    this.ref = firebase.database().ref().child('auth');

    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  
  componentWillMount(){
    this.auths = this.getAuths(this.ref);
  }

  componentDidMount(){
    this.auths = this.getAuths(this.ref);
  }


  getAuths(itemsRef){
    
        // let items = [{title:'Item 1'},{title: 'Item 2'}]
        let auths = [];
        itemsRef.on('value',(snap) => {

          snap.forEach((child) => {
            auths.push({
              title : child.val().title,
              _key: child.key
            });
          });
        });
        return auths;
    
    
  }

  writeUserData(data) {

    let userId = this.auths.length +1;
    
    firebase.database().ref('auth/' + userId+'/').set({
      id: userId,
      carbon_footprint: 0,
      auth: data
    });
  }



  addActivity(data) {
    
        let userId = this.auths.length;
        
        firebase.database().ref('auth/' + userId+'/').set({
          id: userId,
          carbon_footprint: 0,
          auth: data
        });
  }
    

  doLogin(){
    

    this.auths.forEach((auth) => {
      Alert.alert(auth.title+"");
      // if((auth.auth.username === this.state.username) && (auth.auth.password === this.state.password)) {
      //   this.setState({
      //     isLogin: true
      //   });
      // }
    });

    
    Alert.alert("handle Login"+ this.state.username+", "+this.state.isLogin);
  }

  doLogout(){
    this.setState({
      isLogin: false,
      username: '',
      password: ''
    });
    Alert.alert("handle Logout");
  }

  handleLogin(state){
    this.setState({
      username : state.username,
      password: state.password,
      inputs: state
    });

  }

  handleSignUp(state){
    this.setState({
      username : state.username,
      password: state.password,
      firstname: state.firstname,
      lastname: state.lastname,
      inputs: state
    });

  }

  doSignUp(e){
    this.writeUserData(this.state.inputs);
    
    Alert.alert("Create Account"+ this.state.firstname);
    e.preventDefault();
  }

  render() {
    if (this.state.isLogin) {
      return <Secured username={this.state.username} onLogout={this.doLogout}/>;
    } else {
      return <Login 
      isSuccess={this.state.isLogin} 
      handleDataLogin={(nextState) => this.handleLogin(nextState)}
      handleDataSignUp={(nextState) => this.handleSignUp(nextState)}
      onLogin={this.doLogin} onSignUp={(e) => this.doSignUp(e)}/>;
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
  card:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 5
  },
  title: {
    fontSize: 20
  }
});
