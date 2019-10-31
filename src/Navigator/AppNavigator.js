import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
}
  from 'react-navigation';
import DrawerScreen from "../SideMenu/drawer";
import AuthStackNavigator from "./AuthNavigator";
import Home from '../Components/Container/homeContainer';
import Profile from '../Components/Container/profileContainer';
import ChangePassword from '../Components/Container/changePasswordContainer';

/*
  Create AppNavigator stack.
*/
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      title: 'Profile',
    }),
  },
  ChangePassword : {
    screen: ChangePassword,
    navigationOptions: () => ({
      title: 'Change Password',
    }),
  },
}, {
  /*
   Setting default properties to top navigation 
  */
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#424142',
    },
  }
});

/*
  Create drawer navigation with configuration properties
*/
const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppNavigator
  }
},
  {
    drawerWidth: 230,
    drawerType: "slide",
    overlayColor: "0%",
    initialRouteName: "Home",
    drawerPosition: "right",
    drawerLockMode: "locked-closed",
    contentComponent: DrawerScreen
  }
);

/* 
Switch App navigation based ont the LoggedIn 
*/
export const getRootNavigator = LoggedIn =>

  createSwitchNavigator({
    Auth: AuthStackNavigator,
    App: DrawerNavigator
  },
    {
      initialRouteName: LoggedIn ? "App" : "Auth"
    }
  );

export default AppNavigator;
