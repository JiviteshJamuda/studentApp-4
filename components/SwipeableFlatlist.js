import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config"

export default class SwipeableFlatlist extends React.Component {
    constructor(props){
        super(props);
        this.state={
            allNotifications : this.props.allNotifications
        };
    }

    updateMarkAsRead = (notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status" : "read", 
        })
    }

    onSwipeValueChange = (swipeData)=>{
        var allNotifications = this.state.allNotifications;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
            const newData = [...allNotifications];
            const prevIndex = allNotifications.findIndex(item=>{
                item.key === key;
            })
            this.updateMarkAsRead(allNotifications[prevIndex]);
            newData.splice(prevIndex, 1);
            this.setState({ allNotifications : newData });
        }         
    }

    renderItem = (data) =>{
        <Animated.View
            title={data.item.book_name}
            subtitle={data.item.message}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            leftElement={
                <Icon
                    name="book"
                    type="font-awesome"
                    color="#696969"
                />
            }
            bottomDivider
        ></Animated.View>       
    }

    renderHiddenItem = ()=>{
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}></Text>
            </View>
        </View>
    }

    render(){
        return(
            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    data={this.state.allNotifications}
                    rightOpenValue={-Dimensions.get("window").width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { backgroundColor: 'white', flex: 1, }, 
    backTextWhite: { color: '#FFF', fontWeight:'bold', fontSize:15 }, 
    rowBack: { alignItems: 'center', backgroundColor: '#29b6f6', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }, 
    backRightBtn: { alignItems: 'center', bottom: 0, justifyContent: 'center', position: 'absolute', top: 0, width: 100, }, 
    backRightBtnRight: { backgroundColor: '#29b6f6', right: 0, },
});