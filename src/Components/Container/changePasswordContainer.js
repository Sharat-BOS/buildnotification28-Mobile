import React, { Component } from "react";
import { AsyncStorage, Alert } from 'react-native';
import NetworkService from '../../Network/NetworkService';
import Constants from '../../Utilities/constants';
import Strings from '../../Resources/strings';
import ChangePassword from '../Presentational/changePassword';
import Helper from '../../Utilities/helper';

export default class ChangePasswordContainer extends Component {

  constructor(props) {
    super(props);
    this.onPressSave = this.onPressSave.bind(this);
  }

  /* 
    Initial state 
  */
  state = {
    userId: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPasword: '',
    errors: {
      currentPasswordEmpty: false,
      newPasswordError: false,
      confirmNewPaswordError: false,
      passwordNotMatches: false
    }
  };

  /* 
    Component life cycle 
  */
  componentDidMount() {
    this.getUserIdFromlocalStorage();
  }

  /* 
     Update state properties with onChangeText for every Inputfield.
     Changing the Error status message.
  */
  onChangeTextHandler = (name, fErrorKey, sErrorKey, value) => {

    let error = this.state.errors
    error[fErrorKey] = false;
    if (sErrorKey != null) {
      error[sErrorKey] = false;
    }
    this.setState({ [name]: value, errors: error });
  }

  /*
   Get userId from App local storage and assign to state props 
  */
  getUserIdFromlocalStorage() {
    try {
      AsyncStorage.getItem(Constants.USERID).then((userId) => {
        this.setState({ userId: userId })
      });
    } catch (error) {
      alert(Strings.error.errorMessage)
    }
  }

  /* 
   Change password button action
  */
  onPressSave = () => {

    // stop here if form is invalid
    if (!this.validateFields()) {
      return;
    }

    if (this.state.userId) {
      // If userid exists in component state property, call Change password API to change the user password
      this.changePasswordApiCall(this.state.userId)
    } else {
      // Fetch userid from the App local storage and call Change password API to change the user password
      try {
        AsyncStorage.getItem(Constants.USERID).then((userId) => {
          this.changePasswordApiCall(userId)
        });
      } catch (error) {
        alert(Strings.error.errorMessage)
      }
    }
  };

  /* 
  Change password API call with current and new passwords as parameters 
  */
  changePasswordApiCall() {

    let params = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
    };

    NetworkService.changePassword(this.state.userId, params).then(response => {
      if (response.ok || response.status === 200) {
        this.alertMessage(Strings.success.passwordChangedSuccessfully, true)
      } else if (response.status === 400) {
        this.alertMessage(Strings.error.currentPasswordIncorrect, false)
      } else {
        this.alertMessage(Strings.error.errorMessage, false)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage, false)
    });

  }
  /*
  Display user with valid message in Alert popup
  */
  alertMessage(message, success) {
    Alert.alert(message, "", [
      {
        text: "OK",
        onPress: () => {
          if (success)
            this.props.navigation.goBack();
        }
      }
    ]);
  }

  // validating input fields  
  validateFields() {

    const { currentPassword, newPassword, confirmNewPasword, errors } = this.state;

    errors.currentPasswordEmpty = currentPassword.trim().length > 0 ? false : true;
    errors.newPasswordError = Helper.isPasswordValid(newPassword);
    errors.confirmNewPaswordError = Helper.isPasswordValid(confirmNewPasword);
    errors.passwordNotMatches = newPassword != confirmNewPasword ? true : false;

    this.setState({ errors }); // Update state with errors 

    // Checking the form with field validation
    return Helper.validateForm(errors);
  }

  render() {
    return (
      <ChangePassword
        data={this.state}
        onChangeTextHandler={this.onChangeTextHandler}
        onSaveBtnTapped={this.onPressSave} />
    );
  }
}
