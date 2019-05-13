import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

// minhas telas
// import Home from './index';
import Home from './containers/SigninOrSingup';
// import B from './app';
import Feed from './containers/Feed';
// import B from './containers/SearchUser';
import UserProfile from './containers/UserProfile';
import B from './containers/Post';

const AppNavigator = createStackNavigator({

  Home: {

    screen: Home

  },
  B: {

    screen: B

  },
  Feed: {

    screen: Feed

  },
  UserProfile: {

    screen: UserProfile

  }

}, {

  initialRouteName: "Home",
  headerMode: 'none'

});

export default createAppContainer(AppNavigator);