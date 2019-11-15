import React from "react";
import { StyleSheet, Text, Image, View, Button, TextInput, 
  PanResponder,TouchableOpacity, TimePickerAndroid, Alert, ToastAndroid } from "react-native";
import MapView, { AnimatedRegion, Marker, ProviderPropType } from "react-native-maps";
import SocketIOClient from "socket.io-client";
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { URL, PORT, WebSocketPORT } from '../src/conf'
import {createStackNavigator,} from 'react-navigation-stack';

import runicon from "../assets/run.png";
import locateicon from "../assets/locate.png";



import DashboardScreen from "/Users/wangxiaogou/goodProject/screens/dashboard";


/* A random latitude and longitude, required for declaring animated Marker*/
const LATITUDE = 49.267941;
const LONGITUDE = -123.247360;

export default class CustomerScreen extends React.Component {

  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {

      },
      onPanResponderMove: (evt, gestureState) => {

      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {

      },
      onPanResponderTerminate: (evt, gestureState) => {

      },
    });
    this.state = {
      user_text: "",
      showOderInfo: false,
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
      position: {
        latitude: 49.267941,
        longitude: -123.247360,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.0200
      },
      orderTime: {
        hour: -1,
        minute: -1
      }
    };
    /* Connect to server socket 
    * join socket io room by order id
    * listen to event 'locationOut', and update Marker position
    */
    this.socket = SocketIOClient(`${URL}:${WebSocketPORT}`);
    this.socket.on("locationOut", (data) => {
      let location = {
        latitude: JSON.parse(data.location).lat,
        longitude: JSON.parse(data.location).lng
      };
      //update position on map
      this.setPosition(location);
      this.animate(location);
    });
  }

  /* update the postion on map */
  setPosition = (position) => {
    this.setState({
      position: {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00200
      }
    });
  }

  /* locate courier's position and move to current location */
  locate = (position) => {
    this.setState({
      region: position
    })
  }

  /* Triggered when the region on map changes, update region state to current region */
  onRegionChange(region) {
    this.setState({ region });
  }

  /* Animation */
  animate(location) {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude: location.latitude,
      longitude: location.longitude
    };
    coordinate.timing(newCoordinate).start();
  }

  get_order_info = () => {
    if (this.state.user_text === "") {
      Alert.alert('Invalid order', 'Please enter order content!');
      return;
    }
    if (this.state.orderTime.hour === -1) {
      Alert.alert('Invalid order', 'Please enter a time!');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      this.place_order(position.coords.latitude, position.coords.longitude);
    }, (err) => console.log(err));
  }

  /* place a order */
  place_order = (lat, lng) => {
    fetch(`${URL}:${WebSocketPORT}/order/place`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: this.state.user_text,
        lat: lat,
        lng: lng
      }),
    }).then(() => {
      this.setState({ showOderInfo: false });
      ToastAndroid.showWithGravityAndOffset(
        'Order Placed!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    })
  }

  /* show place order form */
  toggleModal = () => {
    this.setState({ showOderInfo: !this.state.showOderInfo });
  };

  /* Make sure modal is closed */
  componentWillUnmount() {
    this.setState({ showOderInfo: false });
  }

  /* Time picker */
  async pickTime() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({
          orderTime: {
            hour: hour,
            minute: minute
          }
        })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          style={{ flex: 1 }} >
          <Marker.Animated
            ref={(marker) => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            image={runicon}
          />
        </MapView>
        {/* TODO: Movavle view, try put it under the map.... */}
        <View style={styles.calloutView} {...this._panResponder.panHandlers} />

        {/* TODO: AUTOcomplete google search, put it some where.... */}
        {/* <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              position:'absolute',
              top: 20,
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              position: 'absolute',
              top: 30,
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              position: 'absolute',
              top: 40,
              color: '#1faadb'
            },
          }}
          currentLocation={false}
        /> */}
        <View style={{ position: "absolute", top: 50, height: 60, marginVertical: 20 }}>
          <Button
            onPress={() => { this.props.navigation.navigate("DashboardScreen"); }}
            title="back"
            color="green">
          </Button>
        </View>
        <View style={{ position: "absolute", top: 100, height: 100, marginVertical: 20 }}>
          <Button
            onPress={this.toggleModal}
            title="Place Order"
            color="#ff9900">
          </Button>
        </View>

        <Modal isVisible={this.state.showOderInfo}>
          <View style={{ position: "absolute", bottom: 200, alignSelf: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white', marginVertical: 20 }}>Enter Order Information</Text>
            <TextInput
              placeholder="Order Information"
              underlineColorAndroid={"transparent"}
              onChangeText={(user_text) => this.setState({ user_text })}
              style={{ marginVertical: 20 }} />
            <Button title="Cancel" onPress={this.toggleModal} />
            <Button title="Pick a time"
              onPress={this.pickTime.bind(this)} />
            <Button title="Place!"
              onPress={this.get_order_info.bind(this)} />
          </View>
        </Modal>
        <TouchableOpacity style={{ position: "absolute", bottom: 80, right: 20, borderColor: 'black' }}
          onPress={() => this.locate(this.state.position)} >
          <Image source={locateicon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
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
  btn: {
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 10,
    borderColor: "black",
    backgroundColor: "yellow",
    borderStyle: "dotted"
  },
  calloutView: {
    position: 'absolute',
    top: 20,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  },
});