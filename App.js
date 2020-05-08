import React from 'react';
import { ScrollView, Platform,TextInput, StyleSheet, Text, View, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import ToDo from './ToDo';
import {AppLoading} from 'expo';
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

const {height,width} = Dimensions.get('window')

const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ];
}

export default class App extends React.Component{
  state = {  
    newToDo:"",
    loadedToDos:false,
    toDos:{}
  };
  componentDidMount = ()=> {
    this._loadToDos()
  }
  render(){
    const {newToDo,loadedToDos,toDos} = this.state;
    console.log(toDos)
    if(!loadedToDos){
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor= '#F23657' />
        <Text style={styles.title}>GIHO'S TODO</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={'New to do'} 
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={'#999'}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo} /> 
          <ScrollView contentContainerStyle={styles.ToDos}>
            {Object.values(toDos).map(toDo => 
            <ToDo key={toDo.id} {...toDo} 
            deleteToDo={this._deleteToDo} 
            uncompletedToDo = {this._uncompletedToDo} 
            completedToDo = {this._completedToDo}
            updateToDo = {this._updateToDo} />)}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = text =>{
    this.setState({
      newToDo:text
  })
  }
  _loadToDos = () =>{
    this.setState({
      loadedToDos:true
    })
  }
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv4({random:seed()});
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    };
  }
  _uncompletedToDo = (id) =>{
    this.setState(prevState =>{
      const newState = {
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      return {...newState}
    })
  }
  _completedToDo = (id) =>{
    this.setState(prevState =>{
      const newState = {
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]:{
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      return {...newState}
    });
  };
  _updateToDo = (id, text) =>{
    this.setState(prevState=>{
      const newState = {
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id]: {...prevState.toDos[id], text:text}
        }
      }
      return {...newState}
    })
  }
  _deleteToDo = (id) =>{
    this.setState(prevState =>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return {...newState}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title:{
    color: 'white',
    fontSize : 30,
    marginTop : 40,
    fontWeight: '900',
    marginBottom : 30
  },
  card : {
    backgroundColor:'white',
    flex : 1,
    width : width-25,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor:'rgba(50,50,50)',
        shadowOpacity:0.5,
        shadowRadisu: 5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android :{
        elevation : 3,
      }
    })

  },
  input : {
    padding : 20,
    borderBottomColor : '#bbb',
    borderBottomWidth: 1,
    fontSize : 25
  },
  ToDos: {
    alignItems:'center'
  }
});
