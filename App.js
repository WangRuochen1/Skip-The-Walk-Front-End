import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  createAppContainer } from 'react-navigation';
import {createStackNavigator,} from 'react-navigation-stack';
import {createBottomTabNavigator,} from 'react-navigation-tabs';

import OpenPage from "./screens/OpenPage";
import LoginScreen from "./screens/login_screen";
import DashboardScreen from "./screens/dashboard";
import CustomerScreen from "./screens/customerscreen";
import CourierScreen from "./screens/courierscreen";
import CourierMap from "./screens/couriermap";
import OrderPage from "./screens/OrderPage";
import Setting from "./screens/setting";
//  import DashboardStack from "./screens/dashboard";
//  import CustomerStack from "./screens/customerscreen";


// const  DashboardStack= createStackNavigator({
//   LoginScreen: { screen: LoginScreen },
//   CourierScreen: { screen: CourierScreen },
//   CustomerScreen: { screen: CustomerScreen },
// });

// const CustomerStack = createStackNavigator({
//   DashboardScreen: { screen: DashboardScreen },
// });
// const SettingsStack = createStackNavigator({
//   SettingsScreen: { screen: SettingsScreen },
//   DetailsScreen: { screen: DetailsScreen },
// });

export default class App extends React.Component {
  render() {
    return <APPNavigator/>;
  }
}

const APPNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      OpenPage: {screen: OpenPage},
      Setting:  {screen: Setting},
      OrderPage: {screen: OrderPage},
      DashboardScreen: { screen: DashboardScreen },
      CustomerScreen: { screen: CustomerScreen},
      CourierScreen: {screen: CourierScreen},
      CourierMap: {screen: CourierMap},
      
    },
    // {
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarIcon: ({ focused, tintColor }) => {
    //       const { routeName } = navigation.state;
    //       let iconName;
    //       if (routeName === 'Dashboard') {
    //         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    //       } else if (routeName === 'Customer') {
    //         iconName = `ios-options${focused ? '' : '-outline'}`;
    //       }
  
    //       // You can return any component that you like here! We usually use an
    //       // icon component from react-native-vector-icons
    //       return <Ionicons name={iconName} size={25} color={tintColor} />;
    //     },
    //   }),
    //   tabBarOptions: {
    //     activeTintColor: 'tomato',
    //     inactiveTintColor: 'gray',
    //   },
    // }
  )
);

