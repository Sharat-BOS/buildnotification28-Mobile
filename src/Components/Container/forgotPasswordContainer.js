
import React, { Component } from 'react';
import { Alert } from 'react-native';
import Helper from '../../Utilities/helper';
import ForgotPassword from '../Presentational/forgotPassword';
import NetworkService from '../../Network/NetworkService';
import Strings from '../../Resources/strings';

export default class ForgotPasswordContainer extends Component {

  constructor(props) {
    super(props);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
  }

  /* 
    Initial state 
  */
  state = {
    email: '',
    errors: {
      emailEmpty: false,
      emailError: false
    },
    isLoading: false,

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

  onSubmitBtn = () => {

    // stop here if form is invalid
    if (!this.validateFields()) {
      return;
    }
    this.getUserDetails(this.state.email);
  };

  /* 
  Get usedetails and assign to state property 
  */
  getUserDetails = (email) => {

    this.setState({ isLoading: true });

    NetworkService.getUserDetails(email).then(response => {
      if (response.ok || response.status === 200) {
        response.json().then((responsejson) => {
          responsejson.value.length > 0 ?
            this.forgotPassword(responsejson.value[0]) :
            this.alertMessage(Strings.error.noRecordsFound);
        })
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    })
  }


  forgotPassword = (userDetails) => {

    // Generating new random password
    let newpassword = Helper.generatePassword();

    // Creating details object with new password to pass to remote API
    let details = { newPassword: newpassword }

    // API call to set the new password in database
    NetworkService.forgotPassword(userDetails.id, details).then(response => {
      if (response.ok || response.status === 200) {
        // On success send email to the input email id
        this.sendEmail(userDetails, details.newPassword)
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    })

  };

  // Send email. 
  sendEmail = (userDetails, password) => {

    message = {
      subject: Strings.email.mailSubject,
      html: Helper.emailComposeMessage(userDetails, password),
      to: [{ "email": userDetails.email }]
    }

    NetworkService.sendEmail(message).then(response => {
      if (response.ok) {
        this.alertMessage(Strings.success.passwordReset);
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(error => {
      this.alertMessage(Strings.error.errorMessage)
    })

  }

  /*
  Validate user entered Email in input field.  
  */
  validateFields() {
    const { email, errors } = this.state;

    errors.emailEmpty = email.length === 0 ? true : false;
    errors.emailError = Helper.isEmailValid(email)

    this.setState({ errors })
    return Helper.validateForm(errors);
  }

  /*
  Display user with valid message in Alert popup.
  */
  alertMessage(message) {
    Alert.alert("", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false });
          this.props.navigation.goBack();
        }
      }
    ]);
  }

  render() {
    return (
      <ForgotPassword
        data={this.state}
        onChangeTextHandler={this.onChangeTextHandler}
        onSubmitBtnTapped={this.onSubmitBtn}
        isLoading={this.state.isLoading}
      />
    );
  }
}

