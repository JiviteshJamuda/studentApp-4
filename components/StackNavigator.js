
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// import AllAssignments from "../screens/AllAssignments";
// import CheckAssignment from "../screens/CheckAssignment";
import ViewAssignmentDetails from "../screens/ViewAssignmentDetails";
import ViewFeedback from "../screens/ViewFeedback";
import { DrawerNavigator } from "./DrawerNavigator";
import NotificationDetails from "../screens/NotificationDetails"

export const StackNavigator = createStackNavigator({
  Home : {
    screen : DrawerNavigator,
    navigationOptions:{
      headerShown : false
    }
  },
  ViewAssignmentDetails : {
    screen : ViewAssignmentDetails,
    navigationOptions:{
      headerShown : false
    }
  },
  ViewFeedback : {
    screen : ViewFeedback,
    navigationOptions : {
      headerShown : false
    }
  },
  NotificationDetails : {
    screen : NotificationDetails,
    navigationOptions : {
      headerShown : false
    }
  },
},
  {
    initialRouteName: 'Home'
  },
);
