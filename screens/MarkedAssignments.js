import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, Button } from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header, Icon, ListItem } from "react-native-elements";

export default class MarkedAssignments extends React.Component {
    constructor(props){
        super(props);
        this.state={
            allMarkedAssignments : [],
            emailId : firebase.auth().currentUser.email,
            name : "",
        }
        this.requestRef = null
    }
    
    getAllMarkedAssignments = async()=>{
        this.requestRef = await db.collection("all_answers").where("student_email_id", "==", this.state.emailId)
        .onSnapshot(snapshot=>{
            this.requestRef = db.collection("all_answers").where("marks", "!=", null)
            .onSnapshot(snapshot=>{
                var allMarkedAssignments = snapshot.docs.map(doc=> doc.data())
                this.setState({
                    allMarkedAssignments : allMarkedAssignments,
                })
            })
        })
    }

    async componentDidMount(){
        await this.getAllMarkedAssignments();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,i}) =>{
        return (
          <ListItem
            key={i}
            title={item.question}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.subject}
            rightElement={
                <TouchableOpacity style={styles.viewButton}  onPress={()=>{this.props.navigation.navigate("ViewFeedback", {details : item})}}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
          />
        )
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header
                        placement="left"
                        leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}} color="yellow"/>}
                        centerComponent={{text:"Marked Assignments", style:{fontSize:25, fontWeight:"bold", color:"white"}}} 
                        backgroundColor="purple"
                    />
                    
                    {
                        this.state.allMarkedAssignments === [] ?
                        (
                            <Text>Loading ...</Text>
                        ):
                        (
                            <View>
                                <FlatList
                                    data={this.state.allMarkedAssignments}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewButton : {
        borderWidth:2,
        height:30,
        width:60,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        borderColor:"#a759be",
    },
    viewButtonText : {
        fontWeight:"bold",
        fontSize:15,
        color:"#a759be"
    }
})