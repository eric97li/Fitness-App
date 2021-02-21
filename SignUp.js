import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

export default class SignUp extends Component{
  constructor(props) {
    super(props)
    this.state={
      username: "",
      password: ""
    }


  }

  signup_field=()=>{
    const {username, password} = this.state

    if(username == "") {
        alert("Username or password missing!")
        return false
      } else if(password == "") {
        alert("Username or password missing!")
        return false
      } else if(password.length < 5) {
        alert("Field password must be 5 characters or longer.")
        return false
      }

      const data = {
        "username":username,
        "password":password
    };

      return fetch('https://mysqlcs639.cs.wisc.edu/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then(response => {
        //sign in navigate to the profile page
        if(response.status == 200){
          alert("Profile created")
        }
        //error
        else {
          alert("Username already taken!")
        }
      })

      
  }

  render() {
    return(
        <View style={{width: "100%", height :"100%", justifyContent: "center"
      , alignSelf: "center", alignContent: "center", alignItems: "center"
      }}>
        <TextInput placeholder={"Username"}
        onChangeText={(value)=> this.setState({username: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />
        <TextInput placeholder={"Password"} 
        onChangeText={(value)=> this.setState({password: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1, marginTop: "5%"}}
        />
            <View style={{marginTop: "10%", width: "80%"}}>
                <TouchableOpacity style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>this.signup_field()}
              >
                <Text style={{color: "white"}}> Sign Up </Text>
                </TouchableOpacity>
            </View>


              {/* <Text>{this.state.username}</Text>
              <Text>{this.state.password}</Text> */}

      </View>
    )
  }

}