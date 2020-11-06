import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {DrawerNavigator} from "./components/DrawerNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";
import {StackNavigator} from "./components/StackNavigator";

export default class App extends React.Component {
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  Welcome : {screen : WelcomeScreen},
  Drawer : {screen : DrawerNavigator},
  StackNavigator : {screen : StackNavigator},
})

const AppContainer = createAppContainer(SwitchNavigator);