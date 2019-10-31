import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import CommonStyles from '../../Styles/commonStyles';

/* 
Custom button.
*/
const Button = props => {
    return <TouchableOpacity
        onPress={props.onPress}
        style={[CommonStyles.btnStyle, { marginTop: props.marginTop > 0 ? props.marginTop : 15 }]}>
        <Text style={CommonStyles.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
}
export default Button;

