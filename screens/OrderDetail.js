import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import "../global";
import { URL, PORT } from "../src/conf";
import TopBar from "../src/utils/TopBar";
import profilepic from "../assets/courier.png";
import despic from "../assets/destination.png";
import originpic from "../assets/origin.png";
import OrderView from "../src/utils/OrderView";
import dotpic from "../assets/dot.png";
import righticon from "../assets/arrow_right.png";
import CustomButton from "../src/utils/CustomButton";
import CustomLoading from "../src/utils/CustomLoading";

export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showloader: false
    };
  }
  /* Accept an order, update status, return error messages on error */
  accept_order = order_id => {
    fetch(`${URL}:${PORT}/order/accept`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        orderid: order_id
      })
    }).then(res => {
      res.json().then(result => {
        Alert.alert(result.message);
        this.props.navigation.navigate("OrderList");
      });
    });
  };

  get_user_token = async userid => {
    try {
      const res = await fetch(`${URL}:${PORT}/users/get_token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          //userid: global.user_id_ls,
          userid: userid
        })
      });
      res.json().then(result => {
        global.apptoken = result.data.apptoken;
        // this.forceUpdate();
      });
    } catch (error) {
      return console.log(error);
    }
  };

  finish_order = (order_id, userid) => {
    Alert.alert(
      "Have you finished the order?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            this.setState({
              showloader: true
            });
            this.get_user_token(userid).then(
              fetch(`${URL}:${PORT}/order/finish`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  orderid: order_id
                })
              }).then(res => {
                fetch(`${URL}:${PORT}/push`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  credentials: "include",
                  body: JSON.stringify({
                    token: global.apptoken,
                    message: "You order has been finished!"
                  })
                });
                res.json().then(result => {
                  setTimeout(() => {
                    this.setState({
                      showloader: false
                    });
                    if (result.errno == 0) {
                      this.props.navigation.navigate("OrderList");
                    } else {
                      Alert.alert(result.message);
                    }
                  }, 300);
                });
              })
            );
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const locFrom = this.props.navigation.getParam("locFrom", "");
    const locTo = this.props.navigation.getParam("locTo", "");
    var status = this.props.navigation.getParam("status", "");
    const id = this.props.navigation.getParam("id", "");
    const detail = this.props.navigation.getParam("detail", "");
    const time = this.props.navigation.getParam("time", "");
    const userid = this.props.navigation.getParam("userid", "");
    const phonenum = this.props.navigation.getParam("phonenum", "");
    return (
      <View style={styles.container}>
        <CustomLoading
        visible={this.state.showloader}
        />
        <TopBar onBackPress={() => this.props.navigation.navigate("OrderList")}>
          Order Detail
        </TopBar>
        <OrderView
          locFrom={locFrom}
          locTo={locTo}
          status={status}
          righticon={righticon}
          id={id}
          detail={detail}
          time={time}
          phonenum={phonenum}
          rich={true}
        />
        {status == 1 && (
          <CustomButton
            content="Accept"
            style={{ backgroundColor: "red" }}
            onPress={() => this.accept_order(id)}
          />
        )}
        {status == 0 && (
          <CustomButton
            content="Finish"
            style={{ backgroundColor: "#f55442" }}
            onPress={() => this.finish_order(id, userid)}
          />
        )}

        <CustomButton
          content="Cancel"
          style={{ backgroundColor: "blue" }}
          onPress={() => this.props.navigation.navigate("OrderList")}
          whitefont={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
