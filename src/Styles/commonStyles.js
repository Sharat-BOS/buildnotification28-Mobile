import { StyleSheet } from "react-native";
import Constants from '../Utilities/constants';
import Colors from '../Resources/colors';

const commonStyles = StyleSheet.create({

  // TextInput container style
  textInputContainer: {
    marginTop: 16,
    height: Constants.TEXT_INPUT_HEIGHT,
    borderRadius: Constants.CORNER_RADIUS,
  },
  // TextInput style
  textInputStyle: {
    paddingTop: 2,
    paddingBottom: 0,
    fontSize: Constants.FONT_SIZE_N,
    color: Colors.textInputColor,
    height: Constants.TEXT_INPUT_HEIGHT,
    borderRadius: Constants.CORNER_RADIUS,
    paddingLeft: Constants.TEXT_FIELD_PADDING,
    backgroundColor: Colors.textInputBgColor,
  },
  // TextInput border style
  inputBorder: {
    borderWidth: 1,
    marginTop: 15,
    borderColor: Colors.borderColor,
    borderRadius: Constants.CORNER_RADIUS,
  },
  // Error style
  error: {
    marginLeft: Constants.TEXT_FIELD_PADDING,
    fontSize: Constants.FONT_SIZE_S,
    marginTop: 5,
    color: "red",
  },
  // Button style 
  btnStyle: {
    borderRadius: 2,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.BUTTON_SIZE,
    color: Colors.buttonTextColor,
    backgroundColor: Colors.buttonColor,
  },
  socialMediaBtnStyle: {
    height: Constants.BUTTON_SIZE,
    marginTop: 15,
    flexDirection: "row",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#424142'
  },
  socialMediaImgStyle: { 
    height: 26, 
    width: 26 
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  menuBtn: {
    marginRight: 16,
    height: 44,
    width: 44,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default commonStyles;
