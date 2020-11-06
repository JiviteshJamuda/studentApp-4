import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu  from './SideBarMenu';

import AllAsignments from "../screens/AllAssignments";
import MarkedAssignments from "../screens/MarkedAssignments"

export const DrawerNavigator = createDrawerNavigator(
    {
        AllAsignments : {screen : AllAsignments},
        MarkedAssignments : {screen : MarkedAssignments},
    },
    {contentComponent : SideBarMenu},
    {initialRouteName : "AllAssignments"},
)