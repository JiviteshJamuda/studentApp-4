import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid, Alert, ScrollView, Button } from "react-native";
import firebase from "firebase";
import db from "../config";
import { Header, Card, Icon } from "react-native-elements";

export default class ViewFeedback extends React.Component{
    constructor(props){
        super(props);
        this.state={
            feedback : this.props.navigation.getParam("details")["feedback"],
            marks : this.props.navigation.getParam("details")["marks"],
            totalMarks : this.props.navigation.getParam("details")["total_marks"],
            question : this.props.navigation.getParam("details")["question"],
            subject : this.props.navigation.getParam("details")["subject"],
            answer : this.props.navigation.getParam("details")["answer"],
        }
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header placement="left"
                        leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}} color="yellow"/>}
                        centerComponent={{text:"View Feedback", style:{fontSize:25, fontWeight:"bold", color:"white"}}}
                        backgroundColor="purple"
                    />
                </View>
                <View>
                    <Card title="Assignment Details">
                        <Text>Question : {this.state.question}</Text>
                        <Text>Subject : {this.state.subject}</Text>
                        <Text>Answer : {this.state.answer}</Text>
                    </Card>
                    <Card title="Feedback">
                        <Text>{this.state.feedback}</Text>
                    </Card>
                    <Card title="Marks">
                        <Text>{this.state.marks} out of {this.state.totalMarks}</Text>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}