import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeView from '~/pages/HomeView'
import UpdateHeroView from '~/pages/UpdateHeroView'

const StackNavigator = createStackNavigator({
  Home: { screen: HomeView },
  UpdateHero: { screen: UpdateHeroView }
})

const Routes = createAppContainer(StackNavigator);

export default Routes;
