import React, { Component } from 'react';
import { Image } from 'react-native';

const LogoImage = ({ imagePath }) => {
    return <Image
        styles={{ width: 160, height: 160 }}
        resizeMode= 'center'
        source={imagePath}
    />
}
export default LogoImage;
