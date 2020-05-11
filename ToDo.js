import React from 'react';
import {View, Text,TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native';
import PropTypes from 'prop-types';

const {height,width} = Dimensions.get('window')

export default class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.state = { isEditing:false, toDovalue: props.text };
    }
    static propTypes = {
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        deleteToDo : PropTypes.func.isRequired,
        id : PropTypes.string.isRequired,
        uncompletedToDo : PropTypes.func.isRequired,
        completedToDo : PropTypes.func.isRequired,
        updateToDo : PropTypes.func.isRequired
    }
    render(){
        const { isEditing, toDovalue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;
        return(
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle,isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
                </TouchableOpacity>
                {isEditing ? (
                <TextInput style={[styles.input,styles.text,isCompleted ? styles.completedText : styles.uncompletedText]} 
                    value={toDovalue} multiline={true} onChangeText={this._controllInput} onBlur={this._endEditing}/>) 
                    : (
                <Text style={[styles.text,isCompleted ? styles.completedText : styles.uncompletedText]}>
                    {text}
                </Text>
                )}
            </View>
            {isEditing ? (  
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._endEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✅</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>🖌</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut={event => {
                        event.stopPropagation
                        deleteToDo(id) }}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}    
        </View>
    )}
    _toggleComplete = (event) =>{
        event.stopPropagation();
        const {isCompleted, uncompletedToDo, completedToDo, id} = this.props;
        if(isCompleted){
            uncompletedToDo(id);
        }else{
            completedToDo(id);
        }
    }
    _startEditing = (event) =>{
        event.stopPropagation();
        this.setState({
            isEditing: true,
        })
    }
    _endEditing = (event) =>{
        event.stopPropagation();
        const {toDovalue} = this.state;
        const {id,  updateToDo} = this.props;
        updateToDo(id,toDovalue);
        this.setState({
            isEditing: false
        })
    }
    _controllInput = (text) =>{
        this.setState({
            toDovalue:text
        })
    }
}

const styles = StyleSheet.create({
    container:{
        width:width-50,
        borderBottomColor:'#bbb',
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    text:{
        fontWeight:'normal',
        fontSize:20,
        marginVertical :20,
    },
    circle:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:20,
        borderColor:'red',
        borderWidth:3
    },
    completedCircle:{
        borderColor: '#bbb'
    },
    uncompletedCircle:{
        borderColor: '#F23657'
    },
    completedText:{
        color:'#bbb',
        textDecorationLine:'line-through'
    },
    uncompletedText:{
        color:'#353535'
    },
    column:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        width:width/2
    },
    actions:{
        flexDirection:'row'
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    },
    actionText:{
        fontSize:25
    },
    input:{
        width: width/2,
    }
})