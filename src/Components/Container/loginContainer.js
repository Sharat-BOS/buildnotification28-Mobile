/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import Constants from '../../Utilities/constants';
import Strings from '../../Resources/strings';
import Helper from '../../Utilities/helper';
import Login from '../Presentational/login';
import { connect } from "react-redux";
import { saveUserId } from "../../actions";
import NetworkService from '../../Network/NetworkService';


class LoginContainer extends Component {

  // Initial state
  state = {
    email: '',
    password: '',
    errors: {
      emailEmpty: false,
      emailError: false,
      passwordEmpty: false,
      passwordError: false,
    },
    isLoading: false,
  };

  constructor(props) {

    super(props);

    // Binding all the button and input fields 
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressForgotpassword = this.onPressForgotpassword.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  // Login api call 
  onPressLogin = () => {

    // stop here if form is invalid
    if (!this.validateFields()) {
      return;
    }

    let params = {
      username: this.state.email.trim(),
      password: this.state.password,
    };

    // Start loader/spinner before API call
    this.setState({ isLoading: true });

    NetworkService.login(params).then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        response.json().then((responsejson) => {
          this.storeData(responsejson.userId)
        })
      } else if (response.status === 400 || response.status === 404) {
        this.alertMessage(Strings.success.invalidCredientials);
      } else {
        this.alertMessage(Strings.error.errorMessage);
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage);
    })

  };

  // Forgot password button action
  onPressForgotpassword = () => {
    this.resetValues();
    this.props.navigation.navigate('ForgotPassword');
  };

  // Create Account button action
  onPressRegister = () => {
    this.resetValues();
    this.props.navigation.navigate('SignUp');
  };

  resetValues() {

    let errors = this.state.errors;

    Object.keys(errors).map(key => {
      errors[key] = false;
    });

    this.setState({ email: '', password: '', errors });
  }

  // Store user info into App local storage
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

  // Input fields validations 
  validateFields() {

    const { email, password, errors } = this.state;

    errors.emailEmpty = email.length === 0 ? true : false;
    errors.emailError = Helper.isEmailValid(email);
    errors.passwordEmpty = password.trim().length > 0 ? false : true;

    this.setState({ errors })

    return Helper.validateForm(errors);
  }

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


  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false })
        }
      }
    ]);
  }

  render() {
    return (
        <Login
          data={this.state}
          inputs={this.inputs}
          isLoading={this.state.isLoading}
          onPressLogin={this.onPressLogin}
          onPressForgotpassword={this.onPressForgotpassword}
          onPressRegister={this.onPressRegister}
          onChangeTextHandler={this.onChangeTextHandler}
        />
    );
  }
}

export default connect(null, { saveUserId })(LoginContainer);

