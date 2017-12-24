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


class ActivityHistory extends Component {

  render(){
    return (<MyListView activity={this.props.activity}/>);
  }
}


class MyListView extends Component {
  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };



    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount(){
    this.getItems(this.props.activity);
  }

  componentDidMount(){
    this.getItems(this.props.activity);
  }

  getItems(itemsRef){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(itemsRef)
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
          <Text style={styles.title}>{item.name}</Text>
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

  constructor(props){
    super(props);
    this.state = {
      viewHistory : false
    }


    this.refAuth = this.props.currentUser;
  }


  getHistory(itemsRef){
    
    
        let histories = [];
        itemsRef.on('value',(snap) => {
    
    
          snap.forEach((child) => {
            this.setState({
              [child.key] : child.val()
            });
          });
        });
        
        
  }
    
  componentDidMount(){
    this.profile = this.getProfile(this.refAuth);
  }

  componentWillMount(){
    this.profile = this.getProfile(this.refAuth);
  }

  getProfile(refAuth){
    let profile = {
      userId: this.props.currentUser.userId,
      username: this.props.currentUser.username,
      password: this.props.currentUser.password,
      firstname: this.props.currentUser.firstname,
      lastname: this.props.currentUser.lastname,
      email: this.props.currentUser.email,
    };
    this.getHistory(this.props.histories);
    return profile;

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
              {`History ${this.profile.username}`}
          </Text>
          <ActivityHistory activity={this.state.activity}/>
          <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Button color="#841584" onPress={(e) => this.switchToHistory(e)} title="Profile"/>
                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
          </View>
      </ScrollView>
        );
      }

      return (
          <ScrollView style={{padding: 20}}>
              <Text style={{fontSize: 27}}>
                  {`Welcome ${this.profile.username}`}
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
              <Text style={{fontSize: 27}}>
                  {`Carbon : ${this.state.carbon_footprint}`}
              </Text>
              <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Button color="#841584" onPress={(e) => this.switchToHistory(e)} title="Activities"/>
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
      isLogin : false
    }

    this.ref = firebase.database().ref();

    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  
  componentWillMount(){
    this.auths = this.getAuths(this.ref.child('auth'));

  }

  componentDidMount(){
    this.auths = this.getAuths(this.ref.child('auth'));

  }


  getAuths(itemsRef){
    
        // let items = [{title:'Item 1'},{title: 'Item 2'}]
        let auths = [];
        itemsRef.on('value',(snap) => {

          snap.forEach((child) => {
            auths.push({
              userId: child.val().userId,
              username: child.val().username,
              password: child.val().password,
              firstname: child.val().firstname,
              lastname: child.val().lastname,
              email: child.val().email,
              _key: child.key
            });
          });
        });
        return auths;
    
    
  }

 
  writeUserData(data) {

    let userId = this.auths.length +1;
    
    firebase.database().ref('auth/' + userId+'/').set({
      userId: userId,
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      email: "fake" 
    });

    firebase.database().ref('history/' + userId+'/').set({
      userId : userId,
      carbon_footprint : 0,
      activity : [ {
        id : 1,
        date : "1.1.11",
        name : "Activity1"
    }]
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

  checkAccount(username,password){
    for(let i = 0 ; i< this.auths.length ; i++){
      let auth = this.auths[i];
      if((auth.username === username) && (auth.password === password )) {
        return auth;
      }
    }
    return null;
  }
    

  doLogin(){

    let auth = this.checkAccount(this.state.inputs.username,this.state.inputs.password);


    if(auth === null){
      Alert.alert("Invalid Account");
    }else{
      this.setState({
        isLogin: true,
        currentSession: auth
      });
      this.histories = this.ref.child('history').child(auth.userId);
    }
        
    
  }

  doLogout(){
    this.setState({
      isLogin: false,
      currentSession : ''
    });
    this.histories = null;
    Alert.alert("handle Logout");
  }

  handleChange(state){
    this.setState({
      inputs: state
    });

  }


  doSignUp(e){
    this.writeUserData(this.state.inputs);
    
    Alert.alert("Create Account"+ this.state.firstname);
    this.doLogin();
    e.preventDefault();
  }

  render() {
    if (this.state.isLogin) {
      return <Secured currentUser={this.state.currentSession} histories={this.histories} onLogout={this.doLogout}/>;
    } else {
      return <Login 
      isSuccess={this.state.isLogin} 
      handleDataLogin={(nextState) => this.handleChange(nextState)}
      handleDataSignUp={(nextState) => this.handleChange(nextState)}
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
