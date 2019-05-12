import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

// minhas telas
// import Home from './index';
import Home from './containers/SigninOrSingup';
// import B from './app';
// import B from './containers/Feed';
import B from './containers/SearchUser';

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