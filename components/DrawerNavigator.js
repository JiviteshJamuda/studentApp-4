import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu  from './SideBarMenu';

import AllAsignments from "../screens/AllAssignments";
import MarkedAssignments from "../screens/MarkedAssignments";
import NotificationScreen from "../screens/NotificationScreen";
import TotalMarks from "../screens/TotalMarks";

export const DrawerNavigator = createDrawerNavigator(
    {
        AllAsignments : {screen : AllAsignments},
        MarkedAssignments : {screen : MarkedAssignments},
        NotificationScreen : {screen : NotificationScreen},
        TotalMarks : {screen : TotalMarks},
    },
    {contentComponent : SideBarMenu},
    {initialRouteName : "AllAssignments"},
)