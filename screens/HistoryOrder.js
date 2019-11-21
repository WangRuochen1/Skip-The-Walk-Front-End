import React from "react"; 
import {StyleSheet,View,Image,Text,TouchableOpacity,ImageBackground,Button,TextInput,Platform,
  PixelRatio} from 'react-native'; 
import "../global";
import Modal from "react-native-modal";
import { URL, PORT} from '../src/conf';

export default class OrderScreen extends React.Component{
   
   
 state = { 
    refreshing: false,
    myArray: [],
  }

get_history_order = () => {
        
    fetch(`${URL}:${PORT}/order_history`, {  //这个路由？？？？？
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }).then((res) => {
              res.json().then(result =>{
                console.log(result);
                for(j = 0; j < result.data.list.length; j++){
                  var joined = this.state.myArray.concat(result.data.list[j]);
                  this.setState({ myArray: joined });
                }
                console.log(this.state.myArray);
              })
          } 
          ).catch((error) => console.log(error));

    }

}