import React from 'react';
import { StyleSheet, Text, View,Button,TextInput } from 'react-native';

export default class CustomerScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {user_text: ''};
}
  get_order_info = ()=>{
      let content = 'order content';
      let lat = '123.456703';
      let lng = '456.789001';
      this.place_order(content,lat,lng);
  }
 
  place_order = (content,lat,lng) => {
    fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/order/place', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             content:(user_text) => this.setState({user_text}),//这里可能有问题，明天看看
             lat:lat,
             lng:lng
            }),
        })
  }

  
    render() {
      return (
        <View style = {styles.container}>
        <Text>CustomerScreen</Text>  
        <Button
                onPress={() => { this.props.navigation.navigate('DashboardScreen') }}
                title='back'>
           </Button>  
           <TextInput  placeholder="Order Information"
                            underlineColorAndroid={'transparent'}//去掉下划线
                            //将文本写入state
                            onChangeText={(user_text) => this.setState({user_text})}/>
           <Button
                onPress={this.get_order_info.bind(this)}
                title='Place Order'>
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