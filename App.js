import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import DayView from "./DayView";
import Exercise from "./Exercise";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      username: "",
      exercises: []
    }
    this.setToken = this.setToken.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.getExercises= this.getExercises.bind(this);
  }

  setToken(x) {
    this.setState({token: x})
  }

  setUsername(y) {
    this.setState({username: y})
  }

  getExercises(z) {
    this.setState({exercises: z})
  }

  createExerciseTabNavigator(props) {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
      <Tab.Screen name="Profile" options={{
        tabBarIcon: () => {
          let iconName = `md-contact`;
          return <Ionicons name={iconName} size={25}/>;
        }
      }}>
        {props => <Profile {...props} token={this.state.token} username={this.state.username}/>}</Tab.Screen>
    <Tab.Screen name="Today" options={{
        tabBarIcon: () => {
          let iconName = `md-sunny`;
          return <Ionicons name={iconName} size={25}/>;
        }
      }}>{props => <DayView {...props} token={this.state.token} username={this.state.username} exercises={this.state.exercises}/>}</Tab.Screen>
    <Tab.Screen name="Exercise" options={{
        tabBarIcon: () => {
          let iconName = `md-walk`;
          return <Ionicons name={iconName} size={25}/>;
        }
      }}>{props => <Exercise {...props} token={this.state.token} username={this.state.username}  getExercisesCallBack={this.getExercises}/>}</Tab.Screen>
    </Tab.Navigator>
    );
  }

  render() {
    // console.log(this.state.username)
    // console.log(this.state.exercises);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Login"
          options={{title: 'Welcome'}}
        >
          {props => <Login {...props} setTokenCallBack={this.setToken} setUsernameCallBack={this.setUsername}/>}
          </Stack.Screen>
        <Stack.Screen name="Sign Up" component={SignUp}/>
        <Stack.Screen name="Health And Fitness"> 
          {(props)=>this.createExerciseTabNavigator(props)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
