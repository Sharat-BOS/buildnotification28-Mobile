/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import LogoImage from '../Common/logoImage';
import Input from '../Common/input';
import Button from '../Common/button';
import Helper from '../../Utilities/helper';
import Colors from '../../Resources/colors';

import Loader from "rn-progress-loader";

export default class Login extends Component {

  render() {
    const { 
      isLoading, 
      data, 
      onChangeTextHandler, 
      onSubmitBtnTapped } = this.props;
      
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
            <LogoImage imagePath = {require('../../Assets/Images/logo.png')}/>
          </View>
          
          {/* You can add and remove the from Inputfields */}

          <View style={styles.formContainer}>
            <Text style={{ fontSize: 14, textAlign: "left" }}>
            Enter the email address associated with your account, and we’ll email you a temporary password.
          </Text>
            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.emailError ?
                { borderColor: 'red' } :
                { borderColor: Colors.borderColor }]}
              secureTextEntry={false}
              capitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              returnKeyType="done"
              value={data.email}
              changeText={(value) => onChangeTextHandler("email", "emailError", "emailEmpty", value)} />
            {data.errors.emailEmpty ?
              Helper.errorMessage(data.errors.emailEmpty, "Email Id is required.") :
              Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

            <Button
              onPress={onSubmitBtnTapped}
              marginTop={25}
              buttonText="Submit" />
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
    marginTop: 15,
    maxWidth: 300,
    width: '100%',
  },
  forgotButton: {
    borderRadius: 2,
    height: 44,
    marginTop: 30,
    maxWidth: 300,
    width: '100%',
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
  }
});

