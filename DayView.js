import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

export default class DayView extends Component{
  constructor(props) {
    super(props)
    this.state={
      activities: [],
      todayActivities: [],
      todayDate: new Date(),

      goalDailyActivity: "",
      totalTodayActivity: ""
    }

  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //parse for today's activities
      let tempTodayExercises = [];
      let tempTodayActivity = 0;
      for(let i = 0; i < this.props.exercises.length; i++) {
        var d = new Date(this.props.exercises[i].date);
        if(d.toDateString() == this.state.todayDate.toDateString()) {
          tempTodayExercises.push(this.props.exercises[i]);
          tempTodayActivity += this.props.exercises[i].duration;
        }
      }
      this.setState({activities: tempTodayExercises});
      this.setState({totalTodayActivity: tempTodayActivity.toString()});

      //retrieve goal daily activity
      let infoURL = "https://mysqlcs639.cs.wisc.edu/users/" + this.props.username
    
      return fetch(infoURL, {
          method: 'GET',
          headers: {
              'x-access-token': this.props.token
          }
      })
      .then(response => response.json())
      .then(response => {
          //set goal activity info
          this.setState({goalDailyActivity: response.goalDailyActivity.toString()});
      })

    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    // console.log(this.props.exercises)
    
 
      return(
        <View>
          <View>
          {<ListItem bottomDivider>
          <ListItem.Content style={{alignItems:"center"}}>
              <Text style={{fontSize: 20}}>Exercises for Today: </Text>
          </ListItem.Content>
          </ListItem>
          }
          </View>
        
        <View>
        {
            this.state.activities.map((x, i) => (
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{x.name}</ListItem.Title>
                        <ListItem.Subtitle>Calories: {x.calories}</ListItem.Subtitle>
                        <ListItem.Subtitle>Date: {x.date}</ListItem.Subtitle>
                        <ListItem.Subtitle>Duration: {x.duration}</ListItem.Subtitle>
                        <ListItem.Subtitle>Id: {x.id}</ListItem.Subtitle>
                        <ListItem.Title style = {{ flexDirection: "row"}} >
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))
        }
        </View>

      
        <View>
        {<ListItem bottomDivider>
          <ListItem.Content style={{alignItems:"center"}}>
              <Text style={{fontSize: 20}}>Today vs. Daily Goal Activity: </Text>
              <Text>Goal Activity: {this.state.goalDailyActivity}</Text>
              <Text>Today Activity: {this.state.totalTodayActivity}</Text>
          </ListItem.Content>
          </ListItem>
          }
        </View>

        </View>
      )
  }

}