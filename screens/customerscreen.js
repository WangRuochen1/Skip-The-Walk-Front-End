import React from "react";
import { StyleSheet, Text, View,Button,TextInput,Alert } from "react-native";
import MapView, {AnimatedRegion, Marker, ProviderPropType} from "react-native-maps";
import SocketIOClient from "socket.io-client";
import runicon from "/Users/wangxiaogou/goodProject/assets/run.png";


const LATITUDE = 49.267941;
const LONGITUDE = -123.247360;
let interval;

export default class CustomerScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    user_text: "",
    region: {
      latitude: 49.267941,
      longitude: -123.247360,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.0200
    },
    text: "",
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0
    }),   
    };
    this.socket = SocketIOClient("http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:8000");
    this.socket.on("locationOut", (data) => {
      console.log(JSON.parse(data.location));
      let location = {
        latitude:JSON.parse(data.location).lat, 
        longitude: JSON.parse(data.location).lng};
      this.setPosition(location);
      this.animate(location);
    });
  }



  setPosition = (position) => {
    console.log(position.longitude);
    this.setState({
      region: {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00200
      }
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }


  animate(location) {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude: location.latitude,  
      longitude: location.longitude  
    };

    coordinate.timing(newCoordinate).start();
}


  get_order_info = () => {
      let lat = this.state.region.latitude;
      let lng = this.state.region.longitude;
      this.place_order(lat,lng);
  }
 
  place_order = (lat,lng) => {
    fetch("http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/order/place", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
             content:this.state.user_text,
             lat:lat,
             lng:lng
            }),
        });
  }


  
    render() {
      return (
        <View style = {styles.container}>
           <MapView 
        provider={this.props.provider}
        region={this.state.region} 
        onRegionChange={() => this.onRegionChange}
        style ={{flex:1}} >
           <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            image = {runicon}
          />
        </MapView>
     
      
       
        <Button style={{position: "absolute", bottom: 10,}}
                onPress={() => { this.props.navigation.navigate("DashboardScreen"); }}
                title="back"
                color="green">
           </Button>  
           <View style = {{position: "absolute", top:20,margin:20 }}>
             <Text style = {{fontSize:20,fontWeight:"bold"}}>Enter Order Information</Text>
           <TextInput 
                      placeholder="Order Information"
                      underlineColorAndroid={"transparent"}
                     onChangeText={(user_text) => this.setState({user_text})}/>
            </View>
           <Button style={{position: "absolute", bottom: 40,margin:16}}
                onPress={this.get_order_info.bind(this)}
                title="Place Order"
                color= "#ff9900">
           </Button>  
      </View>
      );
    }
  
  
  }
  

  CustomerScreen.propTypes = {
    provider: ProviderPropType,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      padding: 0,
    },
    btn:{   
      borderWidth:1,  
      borderRadius:3, 
      margin: 10,
      padding: 10, 
      borderColor:"black",  
      backgroundColor:"yellow",  
      borderStyle: "dotted"
  },
  });