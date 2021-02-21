import React, { Component } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

export default class Profile extends Component{
  constructor(props) {
    super(props)
    this.state={
        admin:false,
        firstName:"",
        lastName: "",
        username:"",
        goalDailyActivity: "",
        goalDailyCalories: "",
        goalDailyCarbohydrates: "",
        goalDailyFat: "",
        goalDailyProtein: "",

        firstNameLocal:"",
        lastNameLocal: "",
        goalDailyActivityLocal: "",
        goalDailyCaloriesLocal: "",
        goalDailyCarbohydratesLocal: "",
        goalDailyFatLocal: "",
        goalDailyProteinLocal: "",

    }

  }

  //get & set profile information
  componentDidMount(){
    //   this.setState({firstName: "Bob"})

    let infoURL = "https://mysqlcs639.cs.wisc.edu/users/" + this.props.username
    
    return fetch(infoURL, {
        method: 'GET',
        headers: {
            'x-access-token': this.props.token
        }
    })
    .then(response => response.json())
    .then(response => {
        //set for the temp state
        this.setState({firstName: response.firstName});
        this.setState({lastName: response.lastName});
        this.setState({goalDailyActivity: response.goalDailyActivity.toString()});
        this.setState({goalDailyCalories: response.goalDailyCalories.toString()});
        this.setState({goalDailyCarbohydrates: response.goalDailyCarbohydrates.toString()});
        this.setState({goalDailyFat: response.goalDailyFat.toString()});
        this.setState({goalDailyProtein: response.goalDailyProtein.toString()});

        //set for the local state/what's in the server
        this.setState({firstNameLocal: response.firstName});
        this.setState({lastNameLocal: response.lastName});
        this.setState({goalDailyActivityLocal: response.goalDailyActivity.toString()});
        this.setState({goalDailyCaloriesLocal: response.goalDailyCalories.toString()});
        this.setState({goalDailyCarbohydratesLocal: response.goalDailyCarbohydrates.toString()});
        this.setState({goalDailyFatLocal: response.goalDailyFat.toString()});
        this.setState({goalDailyProteinLocal: response.goalDailyProtein.toString()});
    })
  }

  //update data
  updateData = () =>{
    let infoURL = "https://mysqlcs639.cs.wisc.edu/users/" + this.props.username
    
    const data = {
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "goalDailyActivity":this.state.goalDailyActivity,
        "goalDailyCalories":this.state.goalDailyCalories,
        "goalDailyCarbohydrates":this.state.goalDailyCarbohydrates,
        "goalDailyFat":this.state.goalDailyFat,
        "goalDailyProtein":this.state.goalDailyProtein
    };

    return fetch(infoURL, {
        method: 'PUT',
        headers: {
            'x-access-token': this.props.token,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        
        if(response.status == 200){
          //set for the local, server state/what has been submitted for update
          this.setState({firstNameLocal: this.state.firstName});
          this.setState({lastNameLocal: this.state.lastName});
          this.setState({goalDailyActivityLocal: this.state.goalDailyActivity});
          this.setState({goalDailyCaloriesLocal: this.state.goalDailyCalories});
          this.setState({goalDailyCarbohydratesLocal: this.state.goalDailyCarbohydrates});
          this.setState({goalDailyFatLocal: this.state.goalDailyFat});
          this.setState({goalDailyProteinLocal: this.state.goalDailyProtein});

          alert("Profile updated")
        }
        //error
        else {
          alert("Invalid token")
        }
      })


  }



  render() {
    //   console.log(this.props.token)
      return(
        <View style={{width: "50%", height :"95%", justifyContent: "center"
        , alignSelf: "center", alignContent: "center", alignItems: "center"
        }}>
        
    <Text style={{marginTop: "12%"}}>First name : {this.state.firstNameLocal}</Text>
        <TextInput placeholder={"First name"}
        onChangeText={(value)=> this.setState({firstName: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

    <Text style={{marginTop: "5%"}}>Last name : {this.state.lastNameLocal}</Text>
        <TextInput placeholder={"Last name"}
        onChangeText={(value)=> this.setState({lastName: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

    <Text style={{marginTop: "5%"}}>Goal Daily Activity : {this.state.goalDailyActivityLocal}</Text>
        <TextInput placeholder={"Goal Daily Activity"}
        onChangeText={(value)=> this.setState({goalDailyActivity: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />   

        <Text style={{marginTop: "5%"}}>Goal Daily Calories : {this.state.goalDailyCaloriesLocal}</Text>
        <TextInput placeholder={"Goal Daily Calories"}
        onChangeText={(value)=> this.setState({goalDailyCalories: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

        <Text style={{marginTop: "5%"}}>Goal Daily Carbohydrates : {this.state.goalDailyCarbohydratesLocal}</Text>
        <TextInput placeholder={"Goal Daily Carbohydrates"}
        onChangeText={(value)=> this.setState({goalDailyCarbohydrates: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

        <Text style={{marginTop: "5%"}}>Goal Daily Fat : {this.state.goalDailyFatLocal}</Text>
        <TextInput placeholder={"Goal Daily Fat"}
        onChangeText={(value)=> this.setState({goalDailyFat: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

        <Text style={{marginTop: "5%"}}>Goal Daily Protein : {this.state.goalDailyProteinLocal}</Text>
        <TextInput placeholder={"Goal Daily Protein"}
        onChangeText={(value)=> this.setState({goalDailyProtein: value})}
        style={{ height: 42, width: "80%", borderBottomWidth: 1}}
        />

        <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Update button" accessibilityHint="Activate to update profile now" style={{ borderWidth : 1, height : 42, width: "80%"
              , justifyContent : "center", alignItems: "center", borderRadius: 40 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>this.updateData()}
              >
                <Text style={{color: "white"}}> Update </Text>
                </TouchableOpacity>
            </View>
            

        </View>
      )
  }

}