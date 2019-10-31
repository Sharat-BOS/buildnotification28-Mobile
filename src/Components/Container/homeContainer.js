import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  AsyncStorage
}
  from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import Constants from '../../Utilities/constants';
import Strings from '../../Resources/strings';
import NetworkService from '../../Network/NetworkService';
import Helper from '../../Utilities/helper';
import { connect } from "react-redux";
import {
  saveUserDetails,
} from "../../actions";

class HomeContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: props.userId != null ? props.userId : null,
      userDetails: null,
      testdata: null
    };
  }

  /* 
  Custom the top navigation bar with buttons and header titles
  */

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
          <View style={CommonStyles.menuBtn}>
            <Image
              style={{ width: 22, height: 22 }}
              resizeMode="cover"
              source={require("../../Assets/Images/menu.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      ),
    };
  };
  
  /* 
  Component life cycle method
  On focus of component check the userid from 
  App local storage if it is exists use id to get the userdeails from the Remote 
  */
  componentDidMount() {

    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        if (Helper.isEmpty(this.props.userDetails)) {
          Helper.isEmpty(this.props.userId) ?
            this.getUserIdFromlS() :
            this.getUserProfileDetails(this.state.userId);
        } else {
          this.displayUserDetails();
        }

      });
  }

  /*
  Clear/Remove any observers/listener
  */
  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  displayUserDetails() {
    this.setState({
      userDetails: this.props.userDetails,
    })
  }

  /* 
   Get user id from App local storage which is already stored
  */
  getUserIdFromlS() {
    try {
      AsyncStorage.getItem(Constants.USERID).then((userId) => {
        this.getUserProfileDetails(userId)
      });
    } catch (error) {
      this.alertMessage(Strings.error.errorMessage)
    }
  }

  /* 
   Get userdetails from remote
  */

  getUserProfileDetails = (userId) => {

    this.setState({ isLoaderVisible: true });

    NetworkService.getUserProfileDetails(userId).then(response => {
      if (response.ok) {
        response.json().then((responsejson) => {
          if (responsejson) {
            this.props.saveUserDetails(responsejson);
            this.setState({ userDetails: responsejson })
          }
        })
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    });

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 16, marginTop: 30 }}> Your program goes here...  </Text>
          <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={require('../../Assets/Images/placeholder.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
});

const mapStateToProps = state => {
  let { userId, userDetails } = state.user;
  return { userId, userDetails };
};

export default connect(mapStateToProps, { saveUserDetails })(HomeContainer);