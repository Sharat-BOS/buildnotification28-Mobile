/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import Helper from '../../Utilities/helper';
import Signup from '../Presentational/signUp';
import Constants from '../../Utilities/constants';
import { connect } from "react-redux";
import { saveUserId } from "../../actions";
import NetworkService from '../../Network/NetworkService';
import Strings from '../../Resources/strings';

class SignUpContainer extends Component {

  constructor(props) {
    super(props);
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  // Initial state
  state = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    errors: {
      firstNameError: false,
      lastNameError: false,
      emailEmpty: false,
      emailError: false,
      confirmEmailEmpty: false,
      passwordError: false,
      confirmPasswordEmpty: false,
      emailNotMatched: false,
      passwordNotMatched: false,
    },
    isLoading: false,
  };


  // Form input fields validations
  validateFields() {

    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
      errors
    } = this.state;

    errors.firstNameError = firstName.trim().length > 0 ? false : true;
    errors.lastNameError = lastName.trim().length > 0 ? false : true;
    errors.emailEmpty = email.length === 0 ? true : false;
    errors.emailError = Helper.isEmailValid(email);
    errors.confirmEmailEmpty = confirmEmail.length === 0 ? true : false;
    errors.passwordError = Helper.isPasswordValid(password);
    errors.confirmPasswordEmpty = confirmPassword.trim().length === 0 ? true : false;
    errors.emailNotMatched = email != confirmEmail ? true : false;
    errors.passwordNotMatched = password != confirmPassword ? true : false;

    // Set state with error status 
    this.setState({ errors })

    // Checking the form with empty field validation
    return Helper.validateForm(errors);

  }

  onPressSubmit = () => {

    // stop here if form is invalid 
    if (!this.validateFields()) {
      return;
    }

    // Params to register a user
    let params = {
      username: this.state.email.toLowerCase(),
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      extensions: {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
      }
    };

    // Start loader/spinner before API call
    this.setState({ isLoading: true });

    // API call 
    NetworkService.signUp(params).then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        response.json().then((responsejson) => {
          this.storeData(responsejson.id)
        })
      } else if (response.status === 409) {
        this.alertMessage(Strings.error.userExists)
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    })

  };

  /* 
  Display Alert Message on success or failure with API calls by passing "Message".
  And stop spinner.
  */
  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false });
        }
      }
    ]);
  }

  /*
   Store userId into App local storage.
   After saving userId into navigate to HOME screen
  */
  async storeData(userId) {
    try {
      return await AsyncStorage.setItem(Constants.USERID, userId, () => {
        this.props.saveUserId(userId);
        this.props.navigation.navigate('Home');
      });
    } catch (error) {
      alert(Strings.error.errorMessage);
    }
  };

  /* 
     Update state properties with onChangeText for every Inputfield.
     Changing the Error status message.
  */
  onChangeTextHandler = (name, fErrorKey, sErrorKey, value) => {

    let error = this.state.errors;
    error[fErrorKey] = false;
    if (sErrorKey != null) {
      error[sErrorKey] = false
    }
    this.setState({ [name]: value, errors: error });
  }

  /*
    Render component 
  */
  render() {
    return (
      <Signup
        data={this.state}
        onPressSubmit={this.onPressSubmit}
        onChangeTextHandler={this.onChangeTextHandler}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default connect(null, { saveUserId })(SignUpContainer);


