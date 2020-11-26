import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, ScrollView, SnapshotViewIOS } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class TotalMarks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId : firebase.auth().currentUser.email,
            totalMarks : "",
            recievedMarks : "",
        }
    }

    getMarks=()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({ 
                    totalMarks : doc.data().total_marks,
                    recievedMarks : doc.data().recieved_marks,
                })
            })
        })
    }
    
    async componentDidMount(){
        await this.getMarks();
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <MyHeader title="Report Card" navigation={this.props.navigation}/>
                </View>
                <Card style={{justifyContent:"center"}}>
                    <View style={{margin:10}}>
                        <Text style={styles.text}>Recieved Marks : {this.state.recievedMarks}</Text>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={styles.text}>Total Marks : {this.state.totalMarks}</Text>
                    </View>
                </Card>                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    text : {
        fontWeight:"bold",
    }
})