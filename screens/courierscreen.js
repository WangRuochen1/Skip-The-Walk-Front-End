import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
//import g_ls_length from'./global';

export default class CourierScreen extends React.Component {

  constructor(props){
    super(props);
    this.id_ls = 0;
    this.lng_ls = 5.0;
    this.lat_ls = 6.0;
    this.content_ls = 'abc'; 
    this.user_id_ls = '123';
    this.courier_id_ls = '456';  
    this.apptoken = 'abc';
   // this.state = {
     this.ls_length = 0;
   // 
    
}

//get order information
    list_order = (order_num) => {
      console.log("here");
        fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/order/list', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }).then((res) => {
                  res.json().then(result =>{
                    this.id_ls = result.data.list[order_num].id;
                    this.content_ls = result.data.list[order_num].content;
                    this.lat_ls = result.data.list[order_num].lat;
                    this.lng_ls = result.data.list[order_num].lng;
                    this.user_id_ls = result.data.list[order_num].userid;
                    this.courier_id_ls = result.data.list[order_num].courierid;  
                    this.forceUpdate(); 
                  })
              } 
              ).catch(error => console.log(error))
             }


     //get order list length
      //const{ls_length} = this.state;
       // this.setState({ls_length:ls_length+5})
      order_list_length = () => {
        // this.ls_length = 5;//这个是假数据，等下要去掉
        // this.forceUpdate();
        fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/order/list', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }).then((res) => {
                res.json().then(result=>{
                  console.log("result is :", result.data.list[0])
                  console.log("length is:", result.data.list.length)
                  this.ls_length = result.data.list.length;  
                })
                this.forceUpdate();
              } 
              ).catch(error => console.log(error))
      }

      renderButtons = () => {
        const buttons = [];
        for( let i = 0; i < this.ls_length; i++) {
           buttons.push(
           <Button
           onPress={()=>{this.list_order(i)}}
           title = {`order ${i}`}
           key = {i}
           ></Button>
          )
        }
        return buttons;
      }
   
      //accept order
      accept_order = () => {
        fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/order/accept', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 orderid: this.id_ls,
                 }),
              })
      }
    
      get_user_token = (id) => {
        fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/users/get_token', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              }).then((res) => {
                  this.apptoken = res.json()[id].apptoken;//这里看看这个id可能会有错
                  this.forceUpdate();
              } 
              ).catch(error => console.log(error))
      }
      
       //finish order
      finish_order (){//这个地方看看会不会有permission的问题
        this.get_user_token(this.id_ls);
        fetch('http://ec2-99-79-78-181.ca-central-1.compute.amazonaws.com:3000/push/token', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 token : this.apptoken, 
                 message: "finished"
                 }),
              })
      }




    render() {   
      return (
        <View style = {styles.container}>
        <Text>courier</Text>    
        <Button
                onPress={() => { this.props.navigation.navigate('DashboardScreen') }}
                title='back'>
           </Button>  
            
        <Button
                onPress={this.order_list_length.bind(this)}
                title='Get All Order'>
           </Button> 

           <Button
                onPress={this.accept_order.bind(this)}
                title='Accept Order'>
           </Button> 
           <Button
                onPress={this.finish_order.bind(this)}
                title='Finish Order'>
           </Button> 
          
          
           <Text>Order Content: {this.content_ls}</Text>
            {
                 this.ls_length != 0?(
                     <View>{this.renderButtons()}</View>
                     ):(
                       <View><Text>no order</Text></View>
                    )
                  }
            <Text>Total order number : {this.ls_length}</Text>
           <Text>Order ID :{this.id_ls}</Text>
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
    btn:{  
        width:60,  
        height:30,  
        borderWidth:1,  
        borderRadius:3,  
        borderColor:"black",  
        backgroundColor:"yellow",  
        justifyContent:"center",  
        alignItems:"center"  

    },
  });