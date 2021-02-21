import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'
import { Modal, TouchableHighlight, TouchableOpacity, TextInput, View, Text, Button, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class Exercise extends Component{
  constructor(props) {
    super(props)
    this.state={
        // activities: [{name:"", calories:"", duration:"", date:"", id:"" }],
        activities: [],

        modalVisible: false,
        editModalVisible: false,

        activityName: "",
        duration: "",
        calories: "",

        date: new Date(),
        mode: 'date',
        show: false,

        editActivityName: "",
        editDuration: "",
        editCalories: "",
        editDate: new Date(),
        toEditID: "",
        editMode: 'date',
        editShow: false
    }

  }

  componentDidMount() {
      return fetch("https://mysqlcs639.cs.wisc.edu/activities", {
          method: 'GET',
          headers: {
              'x-access-token': this.props.token
          }
      })
      .then(response => response.json())
      .then(response => {
          let activities = response.activities;
        //   set array of activities
        if(activities.length > 0) {
          this.setState({activities: activities});
          this.props.getExercisesCallBack(activities);
        }
        //   console.log(activities);
      })
  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setEditModalVisible = (visible, ID, name, calories, date, duration) => {
    this.setState({ editModalVisible: visible });
    this.setState({toEditID: ID});
    this.setState({activityName: name});
    this.setState({calories: calories});
    this.setState({date: new Date(date)});
    this.setState({duration: duration});
   
  }

  manageEditModalVisible = (visible) => {
    this.setState({ editModalVisible: visible });
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'Android' ? true : false,
      date,
    });
  }

  editSetDate = (event, editDate) => {
    editDate = editDate || this.state.editDate;
    this.setState({
      editShow: Platform.OS === 'Android' ? true : false,
      editDate,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
  }

  editShow = editMode => {
    this.setState({
      editShow: true,
      editMode,
    })
  }

  editDatePicker = () => {
    this.editShow('date');
  }

  editTimePicker = () => {
    this.editShow('time');
  }

  addActivity = () => {

    const data = {
      "name": this.state.activityName,
      "duration": this.state.duration,
      "calories": this.state.calories,
      "date": this.state.date
    };

    return fetch("https://mysqlcs639.cs.wisc.edu/activities", {
      method: "POST",
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data) 
    })
    .then(response => {
      if(response.status == 200) {

        alert("Activity Added")

        return fetch("https://mysqlcs639.cs.wisc.edu/activities", {
          method: 'GET',
          headers: {
              'x-access-token': this.props.token
          }
      })
      .then(response => response.json())
      .then(response => {
          let activities = response.activities;
        //   set array of activities
        
        this.setState({activities: activities});
        this.props.getExercisesCallBack(activities);
        //   console.log(activities);
      })
      }
      else {
        alert("Token expired and or missing fields");
      }
    })
  }

  removeActivity = (ID) => {

    let removeURL = "https://mysqlcs639.cs.wisc.edu/activities/" + ID

    return fetch(removeURL, {
      method: 'DELETE',
      headers: {
        'x-access-token': this.props.token
      },
    })
    .then(response => {
      if(response.status == 200) {

        alert("Activity Removed");

        return fetch("https://mysqlcs639.cs.wisc.edu/activities", {
          method: 'GET',
          headers: {
              'x-access-token': this.props.token
          }
      })
      .then(response => response.json())
      .then(response => {
          let activities = response.activities;
        //   set array of activities
        
        this.setState({activities: activities});
        this.props.getExercisesCallBack(activities);
        //   console.log(activities);
      })

      }
      else{
        alert("Token Expired");
      }
    })
  }

  editActivity = (ID) => {
    let editURL = "https://mysqlcs639.cs.wisc.edu/activities/" + ID

    const data = {
      "name": this.state.editActivityName,
      "duration": this.state.editDuration,
      "calories": this.state.editCalories,
      "date": this.state.editDate
    };

    return fetch(editURL, {
      method: 'PUT',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data)
    })
    .then(response => {
      if(response.status == 200) {
        alert("Activity Updated")

        return fetch("https://mysqlcs639.cs.wisc.edu/activities", {
          method: 'GET',
          headers: {
              'x-access-token': this.props.token
          }
      })
      .then(response => response.json())
      .then(response => {
          let activities = response.activities;
        //   set array of activities
        
        this.setState({activities: activities});
        this.props.getExercisesCallBack(activities);
        //   console.log(activities);
      })

      }
      else {
        alert("Error: Token Expired and or missing fields")
      }
    })
  }


  render() {
      const { modalVisible, editModalVisible, show, date, mode, editShow, editDate, editMode } = this.state;
      

      return(
        <View>

          <Modal visible={editModalVisible}>
              <View>
                <Text style={{fontSize: 30}}>Edit Activity</Text>

                <View style={{width: "100%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"
              }}>

            <Text style={{marginTop: "2.5%", fontSize: 20}}>Activity Name: {this.state.activityName}</Text>
                <TextInput placeholder={"Activity Name"}
                onChangeText={(value)=> this.setState({editActivityName: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />
              
            <Text style={{marginTop: "10%", fontSize: 20}}>Duration: {this.state.duration}</Text>
                <TextInput placeholder={"Duration"}
                onChangeText={(value)=> this.setState({editDuration: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />
              
    <View>
            <Text style={{marginTop: "5%", fontSize: 20}}>Date: {this.state.editDate.toDateString()}</Text>
        <View>
          <Button onPress={this.editDatePicker} title="Show date picker!" />
        </View>
            <Text style={{marginTop: "5%", fontSize: 20}}>Time: {this.state.editDate.toTimeString()}</Text>
        <View>
          <Button onPress={this.editTimePicker} title="Show time picker!" />
        </View>
        { editShow && <DateTimePicker value={editDate}
                    mode={editMode}
                    is24Hour={true}
                    display="default"
                    onChange={this.editSetDate} />
        }
      </View> 


      <Text style={{marginTop: "10%", fontSize: 20}}>Calories: {this.state.calories}</Text>
                <TextInput placeholder={"Calories"}
                onChangeText={(value)=> this.setState({editCalories: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />


                <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Update button" accessibilityHint="Activate to update activity now" style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 0 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.editActivity(this.state.toEditID);}}
              >
                <Text style={{color: "white"}}> Update </Text>
                </TouchableOpacity>
            </View>

                <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Close button" accessibilityHint="Activate to close edit activity pane" style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 0 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.manageEditModalVisible(!editModalVisible);}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>

              </View>

              </View>
          </Modal>
         
          <Modal visible={modalVisible}>
            <View>

              <Text style={{fontSize: 30}}>Add Activity</Text>

              <View style={{width: "100%", justifyContent: "center"
              , alignSelf: "center", alignContent: "center", alignItems: "center"
              }}>
                <Text style={{marginTop: "2.5%", fontSize: 20}}>Activity Name:</Text>
                <TextInput placeholder={"Activity Name"}
                onChangeText={(value)=> this.setState({activityName: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />

                <Text style={{marginTop: "10%", fontSize: 20}}>Duration:</Text>
                <TextInput placeholder={"Duration"}
                onChangeText={(value)=> this.setState({duration: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />

    <View>
            <Text style={{marginTop: "5%", fontSize: 20}}>Date: {this.state.date.toDateString()}</Text>
        <View>
          <Button onPress={this.datepicker} title="Show date picker!" />
        </View>
            <Text style={{marginTop: "5%", fontSize: 20}}>Time: {this.state.date.toTimeString()}</Text>
        <View>
          <Button onPress={this.timepicker} title="Show time picker!" />
        </View>
        { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
      </View> 

           
              <Text style={{marginTop: "10%", fontSize: 20}}>Calories:</Text>
                <TextInput placeholder={"Calories"}
                onChangeText={(value)=> this.setState({calories: value})}
                style={{ height: 42, width: "80%", borderBottomWidth: 1}}
                />
              



              <View style={{marginTop: "5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Add button" accessibilityHint="Activate to add activity now" style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 0 ,
              backgroundColor: "black", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.addActivity();}}
              >
                <Text style={{color: "white"}}> Add </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: "2.5%", width: "80%"}}>
                <TouchableOpacity accessible={true} accessibilityLabel="Close button" accessibilityHint="Activate to close Add activity pane" style={{ borderWidth : 1, height : 42, width: "60%"
              , justifyContent : "center", alignItems: "center", borderRadius: 0 ,
              backgroundColor: "white", alignSelf: "center", textAlign : "center"
              }}
              onPress={()=>{this.setModalVisible(!modalVisible);}}
              >
                <Text style={{color: "black"}}> Close </Text>
                </TouchableOpacity>
            </View>

            </View>

            </View>
          
          </Modal> 
          

          <View>
          {<ListItem bottomDivider>
          <ListItem.Content style={{alignItems:"center"}}>
            <Button accessible={true} accessibilityLabel="Add Exercise" color="green" title="Add Exercise" onPress={()=>{this.setModalVisible(!modalVisible);}}></Button>
          </ListItem.Content>
          </ListItem>
          }
          </View>
             
        <View>
        {
            this.state.activities.map((x, i) => (
                <ListItem key={i} bottomDivider>
                    <ListItem.Content accessible={true}>
                        <ListItem.Title>{x.name}</ListItem.Title>
                        <ListItem.Subtitle>Calories: {x.calories}</ListItem.Subtitle>
                        <ListItem.Subtitle>Date: {x.date}</ListItem.Subtitle>
                        <ListItem.Subtitle>Duration: {x.duration}</ListItem.Subtitle>
                        <ListItem.Subtitle>Id: {x.id}</ListItem.Subtitle>
                        <ListItem.Title style = {{ flexDirection: "row"}} >
                        <Button color="red"  title="Remove" onPress={()=>{this.removeActivity(x.id)}}></Button>
                        <Button color="orange" title="Edit" onPress={()=>{this.setEditModalVisible(!editModalVisible, x.id, x.name, x.calories, x.date, x.duration)}}></Button>
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))
        }
        </View>

        </View>
      );

  }

}