
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import LogoImage from '../Common/logoImage';
import Input from '../Common/input';
import Button from '../Common/button';
import Helper from '../../Utilities/helper';
import Loader from "rn-progress-loader";
import Colors from '../../Resources/colors';

export default class Login extends Component {

  render() {

    const { 
      isLoading, 
      data, 
      onPressLogin, 
      onPressForgotpassword, 
      onPressRegister, 
      onChangeTextHandler } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.appThemeColor }}>

        <View style={styles.container}>
          <Loader
            visible={isLoading}
            isModal={true}
            isHUD={true}
            hudColor={"#000"}
            color={"#fff"}
          />

          {/* You can replace your logo and resize your logo container */}

          <View style={styles.logoContainer}>
            <LogoImage imagePath={require('../../Assets/Images/logo.png')} />
          </View>

          {/* Form input fields */}

          <View style={styles.formContainer}>
            <Input
              containerStyle={[CommonStyles.inputBorder, 
                data.errors.emailError ? 
                { borderColor: 'red' } : 
                { borderColor: Colors.borderColor }]}
              secureTextEntry={false}
              capitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              returnKeyType="next"
              value={data.email}
              changeText={(value) => onChangeTextHandler("email", "emailError", "emailEmpty", value)} />

            {data.errors.emailEmpty ?
              Helper.errorMessage(data.errors.emailEmpty, "Email Id is required.") :
              Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.passwordEmpty
                ? { borderColor: 'red' }
                : { borderColor: Colors.borderColor }]}
              secureTextEntry={true}
              capitalize="none"
              keyboardType="default"
              placeholder="Password"
              returnKeyType="done"
              value={data.password}
              changeText={(value) => onChangeTextHandler("password", "passwordEmpty", null,  value)} />

            {Helper.errorMessage(data.errors.passwordEmpty, "Password is required.")}

            {/* Login buttton */}

            <Button
              onPress={onPressLogin}
              marginTop={25}
              buttonText="Login" />


            {/*Forgot Password underline button */}

            <TouchableOpacity
              onPress={onPressForgotpassword}
              style={styles.forgotPassword}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Forgot password?</Text>
            </TouchableOpacity>

            {/*Register underline button */}

            <TouchableOpacity
              onPress={onPressRegister}
              style={styles.registerBtnStyle}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  logoContainer: {
    flex: 0.2,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 0.8,
    maxWidth: 300,
    width: '100%',
  },
  socialLoginContainer: {
    marginTop: 35
  },
  buttonText: {
    color: '#545454',
    fontSize: 17
  },
  forgotPassword: {
    marginTop: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnStyle: {
    marginTop: 10,
    height: 44,
    alignItems: 'center',
    color: Colors.textColor,
    justifyContent: 'flex-start',
  }
});
