import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Header, Icon, ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class AllAssignments extends React.Component {
    constructor(props){
        super(props);
        this.state={
            allAssignments : []
        };
        this.requestRef = null;
    }

    getAllAssignments = ()=>{
        this.requestRef = db.collection("all_assignments")
        .onSnapshot(snapshot=>{
            var allAssignments = snapshot.docs.map(doc=> doc.data())
            this.setState({
                allAssignments : allAssignments,
            })
        })
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
                <TouchableOpacity style={styles.viewButton}  onPress={()=>{ this.props.navigation.navigate("ViewAssignmentDetails", {"details" : item}) }}>
                    <Text style={styles.viewButtonText}>Read</Text>
                </TouchableOpacity>
            }
            bottomDivider
          />
        )
    }

    async componentDidMount(){
        await this.getAllAssignments();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header
                        placement="left"
                        leftComponent={<Icon name="menu" onPress={()=>{ this.props.navigation.toggleDrawer() }} color="yellow"/>}
                        centerComponent={{text:"All Assignments", style:{fontSize:25, fontWeight:"bold", color:"white"}}} 
                        backgroundColor="purple"
                    />
                    <FlatList
                        data={this.state.allAssignments}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    />
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