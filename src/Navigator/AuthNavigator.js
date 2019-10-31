import { createStackNavigator } from 'react-navigation';
import Login from '../Components/Container/loginContainer';
import Signup from '../Components/Container/signUpContainer';
import ForgotPassword from '../Components/Container/forgotPasswordContainer';

const AuthNavigator = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: () => ({
      title: 'Login',
    }),
  },
  SignUp: {
    screen: Signup,
    navigationOptions: () => ({
      title: 'Register',
    }),
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: () => ({
      title: 'Forgot Password',
    }),
  }
},{
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    },
  }
});

export default AuthNavigator;
