import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, ToastAndroid  } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

export default class ViewAssignmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            docId : "",
            question : this.props.navigation.getParam("details")["question"],
            subject : this.props.navigation.getParam("details")["subject"],
            answer : "",
            emailId : firebase.auth().currentUser.email,
            name : "",
            assignmentId : this.props.navigation.getParam("details")["assignment_id"],
            totalMarks : this.props.navigation.getParam("details")["total_marks"],
        };
        this.requestRef = null;
    }   // this.props.navigation.getParam("details")["request_id"],

    getStudentDetails = async()=>{
        this.requestRef = await db.collection("users").where("email_id", "==", this.state.emailId)
        .onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    name : doc.data().first_name + " " + doc.data().last_name,
                    docId : doc.id,
                })
            })
        })
    }

    submitAnswer = ()=>{
        if (this.state.answer === "" || this.state.answer === " ") {
            ToastAndroid.showWithGravityAndOffset(
                "Enter your answer before submitting",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        } else {
            db.collection("all_answers").add({
                "answer" : this.state.answer,
                "student_name" : this.state.name,
                "student_email_id" : this.state.emailId,
                "assignment_id" : this.state.assignmentId,
                "marks" : null,
                "feedback" : null,
                "question" : this.state.question,
                "subject" : this.state.subject,
                "total_marks" : this.state.totalMarks
            })
            
            ToastAndroid.showWithGravityAndOffset(
                "Anser submitted successfully",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        }
        this.setState({ answer : "" })
    }

    componentDidMount(){
        this.getStudentDetails();
    }

    componentWillUnmount(){
        this.requestRef()
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header
                        placement="left"
                        leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}} color="yellow"/>}
                        centerComponent={{text:"Assignment Details", style:{fontSize:25, fontWeight:"bold", color:"white"}}}
                        backgroundColor="purple"
                    />
                </View>
                <View>
                    <Card>
                        <Text style={styles.question}>{this.state.question}</Text>
                        <Text>{this.state.subject}</Text>
                        <View style={{marginTop:30, alignItems:"center"}}> 
                            <TextInput style={styles.answerBox}
                                placeholder="type your answer/paste link from google drive"
                                value={this.state.answer}
                                onChangeText={(text)=>{ this.setState({ answer : text }) }}
                                multiline
                            />
                            <TouchableOpacity style={styles.button} 
                                onPress={()=>{ this.submitAnswer() }}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    question : {
        fontWeight:"bold",
        fontSize:20,
    },
    answerBox : {
        borderWidth : 2,
        height : 150,
        borderRadius : 10,    
    },
    button : {
        borderWidth:2,
        borderColor:"#a759be",
        margin:10,
        height:30,
        width:100,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
        color:"#a759be",
        fontWeight:"bold",

    }
})