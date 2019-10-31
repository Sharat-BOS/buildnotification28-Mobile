import React, { Component } from "react";
import { AsyncStorage, Alert } from 'react-native';
import Profile from '../Presentational/profile';
import NetworkService from '../../Network/NetworkService';
import Constants from '../../Utilities/constants';
import Strings from '../../Resources/strings';
import Helper from '../../Utilities/helper';

import { connect } from "react-redux";
import {
  saveUserDetails,
} from "../../actions";

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.onPressSave = this.onPressSave.bind(this);
  }

  state = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth:"",
    gender:"",
    isLoading: false,
    errors: {
      firstNameEmpty: false,
      lastNameEmpty: false
    },
    
  };

  /*
    Load user details to display into the form from the Application state(Redux) if data exists, 
    otherwise get userId from the AsyncStorage(App local storage) and get userdetails from the Remote throught API call.
  */
  componentDidMount() {
    Helper.isEmpty(this.props.userDetails) ? this.getUserIdFromlS() : this.displayUserDetails(this.props.userDetails);
  }

  /* 
    Update user details to local state to render the form.
  */
  displayUserDetails (userDetails) {
    this.setState({
      userId: userDetails.id,
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      email: userDetails.email,
      phoneNumber: userDetails.hasOwnProperty('phonenumber') ? userDetails.phonenumber: '',
      dateOfBirth: userDetails.hasOwnProperty('dateOfBirth') ? userDetails.dateOfBirth: '',
      gender: userDetails.hasOwnProperty('gender') ? userDetails.gender: '',
    })
  }

  /* 
    Get user Id from from AsyncStorage (App local storage)
  */
  getUserIdFromlS() {
    try {
      AsyncStorage.getItem(Constants.USERID).then((userId) => {
        this.setState({ userId: userId }, function () {
          this.getUserProfileDetails(userId)
        })
      });
    } catch (error) {
      alert(Strings.error.errorMessage)
    }
  }

  /* 
    Get user profile details from server
  */
  getUserProfileDetails = (userId) => {

    this.setState({ isLoading: true });

    NetworkService.getUserProfileDetails(userId).then(response => {
      if (response.ok || response.status === 200) {
        response.json().then((responsejson) => {
          if (responsejson) {
            this.setState({
              firstName: responsejson.firstname,
              lastName: responsejson.lastname,
              email: responsejson.email,
              phoneNumber: responsejson.hasOwnProperty('phonenumber') ? 
              responsejson.phonenumber: 
              null,
              dateOfBirth: responsejson.hasOwnProperty('dateOfBirth') ?
               responsejson.dateOfBirth:
                null,
              gender: responsejson.hasOwnProperty('dateOgenderfBirth') ?
               responsejson.gender: 
               null,
              isLoading: false
            })
          }
        })
      }
    }).catch(error => {
        alert(Strings.error.errorMessage)
    });
  }

  /* 
    onChangetext in inputField update the state 
  */
  onChangeTextHandler = (name, errorKey, value) => {

    let error = this.state.errors;
    error[errorKey] = false;
    this.setState({ [name]: value, errors: error });
  }

  // Input fields validations 
  validateFields() {

    const { firstName, lastName, errors } = this.state;

    errors.firstNameEmpty = firstName.length === 0 ? true : false;
    errors.lastNameEmpty = lastName.length === 0 ? true : false;

    this.setState({ errors })

    return Helper.validateForm(errors);
  }

  /* 
    Display alert message on response of the API call with Success or failure,
    stop loader/spinner and Navigate to Home/App screen
  */
  alertMessage(message) {
    Alert.alert(message, "", [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false });
          this.props.navigation.goBack();
        }
      }
    ]);
  }

  /* 
    On press the save button update the user details
    to server, local & Application state redux.
  */
  onPressSave = () => {

    // Parameters 
    let params = {
      email: this.state.email.toLowerCase(),
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      phonenumber: this.state.phoneNumber,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender
    };

    // Start loader/spinner before API call
    this.setState({ isLoading: true });

    // stop here if form is invalid
    if (!this.validateFields()) {
       return;
    }

    //API call 
    NetworkService.updateUserProfile(this.state.userId, params).then(response => {
      if (response.ok || response.status === 200) {
        this.setState({ isLoading : false })
        response.json().then((responsejson) => {
          this.props.saveUserDetails(responsejson);
          this.alertMessage(Strings.success.profileUpdateSuccess)
        })
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    });
  };

  render() {
    return (
      <Profile
        data={this.state}
        onChangeTextHandler={this.onChangeTextHandler}
        onSaveBtnTapped={this.onPressSave}
        isLoading={this.isLoading} />
    );
  }
}

const mapStateToProps = state => {
  let { userDetails} = state.user;
  return { userDetails };
};

export default connect(mapStateToProps, {saveUserDetails})(ProfileContainer);