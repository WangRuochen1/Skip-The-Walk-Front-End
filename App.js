import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import {createStackNavigator,} from 'react-navigation-stack';
import {createBottomTabNavigator,} from 'react-navigation-tabs';

//import DashboardScreen from "./screens/dashboard";
//import  {DashBoardStack } from "./screens/dashboard";
//import CourierScreen from "./screens/courierscreen";
import OpenPage from "./screens/OpenPage";
import CustomerScreen from "./screens/customerscreen";
import CourierMap from "./screens/couriermap";
import OrderList from "./screens/OrderList";
import Setting from "./screens/setting";
import OrderScreen from "./screens/PlaceorderPage";
import AddressScreen from "./screens/address";

export default class App extends React.Component {
  render() {
    return <APPNavigator/>;
  }
}


// const APPNavigator = createAppContainer(
//   createSwitchNavigator({
//       OpenPage: {screen: OpenPage},
//       Setting:  {screen: Setting},
//       OrderList: {screen: OrderList},
//       OrderScreen:{screen: OrderScreen},
//       CustomerScreen: { screen: CustomerScreen},
//       CourierMap: {screen: CourierMap},
//       AddressScreen:{screen: AddressScreen},
//   })
// )

const APPNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      OpenPage: {screen: OpenPage},
      Setting:  {screen: Setting},
      OrderList: {screen: OrderList},
      OrderScreen:{screen: OrderScreen},
      CustomerScreen: { screen: CustomerScreen},
      CourierMap: {screen: CourierMap},
      AddressScreen:{screen: AddressScreen},
    },
 
  )
);



