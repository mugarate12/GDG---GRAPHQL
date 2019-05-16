import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

// minhas telas
// import Home from './index';
import Home from './containers/SigninOrSingup';
import B from './BottomNavigatior';

const AppNavigator = createStackNavigator({

  Home: {

    screen: Home

  },
  B: {

    screen: B

  },

}, {

  initialRouteName: "Home",
  headerMode: 'none'

});

export default createAppContainer(AppNavigator);