
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CommonStyles from '../../Styles/commonStyles';

const Input = (props) => {

  if (props.inputType === "UNDER_LINE") {

    return <View style={[props.containerStyle, {borderWidth: 0, borderBottomWidth: 1,
      marginTop: 10}]}>
      {
        props.labelName != null ? <Text>{props.labelName}</Text> : null
      }
      <TextInput
        autoCapitalize={props.capitalize}
        autoCorrect={false}
        maxLength={props.isPhoneNumberField ? 10: 50}
        editable={props.editable}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor= "#919090"
        returnKeyType={props.returnKeyType}
        style={[CommonStyles.textInputStyle, { backgroundColor: "transparent", paddingLeft: 0 }]}
        value={props.value}
        onChangeText={props.changeText}
        secureTextEntry={props.secureTextEntry}
        
      />
    </View>

  } else if (props.inputType = "BOX") {

    return <View style={props.containerStyle}>
      <TextInput
        autoCapitalize={props.capitalize}
        autoCorrect={false}
        editable={props.editable}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor= "#919090"
        returnKeyType={props.returnKeyType}
        style={CommonStyles.textInputStyle}
        value={props.value}
        onChangeText={props.changeText}
        secureTextEntry={props.secureTextEntry}
      />
    </View>

  }

}
export default Input;