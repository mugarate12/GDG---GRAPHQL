import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

// minhas telas
import Home from './index';
import B from './app';

const AppNavigator = createStackNavigator({

  Home: {

    screen: Home

  },
  B: {

    screen: B

  }

}, {

  initialRouteName: "Home",
  headerMode: 'none'

});

export default createAppContainer(AppNavigator);