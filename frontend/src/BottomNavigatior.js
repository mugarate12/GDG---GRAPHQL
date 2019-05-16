import {
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

//  meus imports 
import Feed from './containers/Feed';
import Post from './containers/Post';
import SearchUser from './containers/SearchUser';
import UserProfile from './containers/UserProfile';

AppBottomNavigation = createBottomTabNavigator({

  Feed: {

    screen: Feed

  },
  Post: {

    screen: Post

  },
  SearchUser: {

    screen: SearchUser

  },
  UserProfile: {

    screen: UserProfile

  }

}, {

    initialRouteName: 'Feed',
    tabBarOptions: {

      activeBackgroundColor: '#3D4039',
      inactiveBackgroundColor: '#4C5749',

    }

  });

export default createAppContainer(AppBottomNavigation);