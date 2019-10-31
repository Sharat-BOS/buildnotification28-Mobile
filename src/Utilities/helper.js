import React from 'react';
import { Text } from 'react-native';
import CommonStyles from '../Styles/commonStyles';

class Helper {

    // Helper function to validate fields.
    validateForm = (errors) => {
        let isValid = Object.values(errors).includes(true);
        return !isValid;
    }

    // Helper function to render with error message below the Inputfield.
    errorMessage(errorField, message) {
        return errorField ? (
            <Text style={CommonStyles.error}>
                {message}
            </Text>
        ) : null
    }

    // isEmpty is a function to check the string is empty, null and undefined.
    isEmpty(value) {
        return value === null || value === "" || typeof value === "undefined" ? true : false;
    }

    // Email validation regular exp..
    isEmailValid(email) {
        let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return email.length > 0 && emailRegex.test(email.toLowerCase()) ? false : true;
    }

    isPasswordValid(password) {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
        return password.length > 0 && passwordRegex.test(password.trim()) ? false : true;
    }

    // Function to generate random password. 
    generatePassword = () => {
        var length = 8,
            charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };

    // Compose Email. 
    emailComposeMessage(userDetails, password) {

        var msg = '<!DOCTYPE html><html><head><title></title><meta charset="utf-8" /><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></head>' +
            "<body style=\"font-family: 'lato', 'helvetica neue', sans-serif; font-size:14px;\">" +
            '<div style="width:550px; max-width:94%; margin:20px auto; height:auto;">' +
            '<div style="width:100%; float:left; height:40px; color:#fff; background:#252527; font-size:14px; font-weight:400">' +
            '<a href="#" target="_blank"><img src="http://newlaunchpad.bosframework.com/images/logo_full_white.png" style="height:25px; width:auto; margin:7px 0 5px 7px;"></a>' +
            "</div>" +
            '<div style="float:left; width:100%; height:auto; padding:10px;">' +
            '<h4>Hi <span style="color:#252527">' +
            userDetails.firstname +
            "</span></h4>" +
            "<p>Here is your new password: <strong>" +
            password +
            "</strong></p>" +
            "<p>Please be sure to change your password once you have logged in.</p>" +
            '<p style="margin-bottom:20px;">If you did not request a password reset, please contact us at <a style="color:#252527; text-decoration:underline" href="maito:pinztech@gmail.com">dev@bosframework.com</a></p>' +
            "<h4>Thanks</h4>" +
            "<h4>BOS Team</h4>" +
            "</div>" +
            '<div style="background: #ebebeb; z-index: 9999; width: 100%; text-align: right; padding-right: 10px; height:30px; float:left">' +
            '<a href="https://www.bosframework.com" target="_blank"><img src="http://demoapi.fullserv.bosframework.com/wwwroot/images/BOS.png" style="height: 20px; vertical-align: middle; margin-top: 6px; float:right" /></a>' +
            "</div>" +
            "</div>" +
            "</body></html>"

        return msg;
    }
}

export default new Helper();
