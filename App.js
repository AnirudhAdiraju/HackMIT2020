import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import info from './components/info';
import list from './components/list';
import map from './components/map';
import add from './components/add';
import * as Font from 'expo-font';

export default class AppContainer extends React.Component {
  
  async componentDidMount() {
    await Font.loadAsync({
      'play': require('./assets/fonts/PlayfairDisplay-Regular.otf'),
      'playB': require('./assets/fonts/PlayfairDisplay-Bold.otf'),
      //'SourceL': require('./assets/fonts/SourceSansPro-Light.otf'),
    });
  }

render() {
      console.disableYellowBox = true; 
      const AppNavigator = createStackNavigator({
        Info: {
          screen: info
        },
        List: {
          screen: list
        },
        Map: {
          screen: map
        },
        Add: {
          screen: add
        }

      },
    
        {
          initialRouteName: 'Info',
          headerMode: 'none'
        });

      const AppContainer = createAppContainer(AppNavigator);
      return(
      <AppContainer/>
      );
  }


}
