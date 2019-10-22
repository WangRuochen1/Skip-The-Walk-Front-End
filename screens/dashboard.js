import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

//dashboard is for notification
export default class DashboardScreen extends React.Component {
  
  

  
  render() {
    return (
      <View style = {styles.container}>
      <Text>DashboardScreen</Text>    

      <Button
                onPress={() => { this.props.navigation.navigate('LoginScreen') }}
                title='Jump back to login'>
           </Button>

     <Button
                onPress={() => { this.props.navigation.navigate('CourierScreen') }}
                title='I want to be courier'>
           </Button>

     <Button
                onPress={() => { this.props.navigation.navigate('CustomerScreen') }}
                title='I want to be customer'>
           </Button>
    </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});