import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator,createBottomTabNavigator } from "react-navigation";


//import LoginScreen from "./screens/login_screen";
import DashboardScreen from "./screens/dashboard";
import CustomerScreen from "./screens/customerscreen";
import CourierScreen from "./screens/courierscreen";
import CourierMap from "./screens/couriermap";
//import OpenPage from "./screens/OpenPage";
// import Navigate_bar from "./screens/navigation";
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//import TabNavigator from 'react-native-tab-navigator';

export default class App extends React.Component {

  render() {
      return (  
             <AppNavigator/> 
      );  
    
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: { screen: CourierScreen },
  Settings: { screen: DashboardScreen },
});

/* Navigation between each map
*/
const AppSwitchNavigator = createSwitchNavigator({
 // OpenPage : OpenPage,
 // LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  CourierScreen: CourierScreen,
  CustomerScreen: CustomerScreen,
  CourierMap: CourierMap,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
//const Tabcontainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  myImage:{
    width:22,
    height:22,
}

});
