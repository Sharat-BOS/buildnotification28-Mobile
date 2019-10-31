/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
} from 'react-native';
import Input from '../Common/input';
import Helper from '../../Utilities/helper';
import Button from '../../Components/Common/button';
import CommonStyles from '../../Styles/commonStyles';

export default class ChangePassword extends Component {

    render() {

        const { 
            data, 
            onChangeTextHandler, 
            onSaveBtnTapped } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            capitalize="none"
                            placeholder="Current password"
                            returnKeyType="next"
                            value={data.currentPassword}
                            changeText={(value) => onChangeTextHandler("currentPassword", "currentPasswordEmpty", null, value)} />
                        {Helper.errorMessage(data.errors.currentPasswordEmpty, "Current password cannot be empty.")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            capitalize="none"
                            placeholder="New password"
                            returnKeyType="next"
                            value={data.newPassword}
                            changeText={(value) => onChangeTextHandler("newPassword", "newPasswordError", null, value)} />
                        {Helper.errorMessage(data.errors.newPasswordError, "The Password must contain atleast one upper case, one lower case, one numeric and one special character(!@.,#$%^&*).")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            capitalize="none"
                            placeholder="Confirm new password"
                            returnKeyType="done"
                            value={data.confirmNewPasword}
                            changeText={(value) => onChangeTextHandler("confirmNewPasword", "confirmNewPaswordError", "passwordNotMatches", value)} />
                        {Helper.errorMessage(data.errors.passwordNotMatches, "Passwords do not match.")}


                        <Button
                            onPress={onSaveBtnTapped}
                            marginTop={25}
                            buttonText="Save" />
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    formContainer: {
        flex: 1,
        marginTop: 50,
        maxWidth: 300,
        width: '100%'
    }
});


