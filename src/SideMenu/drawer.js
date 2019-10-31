
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Alert,
    Image,
    AsyncStorage,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";

import { connect } from 'react-redux';
import { logoutUser } from '.././actions';

class Drawer extends Component {

    constructor(props) {
        super(props);
    }

    /*
    Navigation to a screen from selected option in Drawer screen.
    */
    navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigate);
    }

    /* 
    Logout Action 
    */
    onLogoutPressed() {

        Alert.alert(
            'Confirm',
            'Are you sure you want to Logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.navigateToAuth() },
            ],
            { cancelable: false },
        );
    }

    /* 
    Remove user from local storage and Application state to log user out. And navigate to login screen.
    */
    navigateToAuth() {
        this.clear();
        this.props.logoutUser();
        this.props.navigation.navigate("Auth");
    }
    /* 
     Clear local storage from the App 
    */
    async clear() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            alert('Something went wrong. Please try again!');
        }
    }

    /* 
      Render  
    */

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 40, flex: 1 }}>
                    <ScrollView >
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={this.navigateToScreen("Profile")} >
                            <Image source={require("../Assets/Images/user.png")} style={{
                                height: 22,
                                width: 22
                            }} />
                            <Text style={styles.name}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={this.navigateToScreen("ChangePassword")} >
                            <Image source={require("../Assets/Images/key.png")} style={{
                                height: 20,
                                width: 20
                            }} />
                            <Text style={styles.name}>Change password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => this.onLogoutPressed()} >
                                <Image source={require("../Assets/Images/logout.png")} style={{
                                height: 20,
                                width: 20
                            }} />
                            <Text style={styles.name}>Logout</Text>
                        </TouchableOpacity>

                    </ScrollView>
                    <Text style={styles.builtOnBos}>Built on BOS</Text>
                </View>
            </SafeAreaView>
        );
    }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#424142",
    },
    menuItem: {
        flex: 1,
        height: 40,
        margin: 10,
        marginLeft: 8,
        marginRight: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        flex: 0.8,
        height: 25,
        lineHeight: 25,
        fontSize: 17,
        marginLeft: 12,
        color: "#fff",
        justifyContent: "center",
    },
    builtOnBos: {
        color: "#fff",
        fontSize: 17,
        marginBottom: 20,
        marginLeft: 30
    }
});

export default connect(null, { logoutUser })(Drawer);
