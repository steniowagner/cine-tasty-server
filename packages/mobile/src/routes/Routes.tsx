import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DiscoverStack, {
  TabID as DiscoverTabID,
} from '../components/screens/discover/routes/stack-routes';

import PeopleStack, {
  TabID as PeopleTabID,
} from '../components/screens/people/routes/stack-routes';

import QuizStack, {
  TabID as QuizTabID,
} from '../components/screens/quiz/routes/stack-routes';

import NewsStack, {
  TabID as NewsTabID,
} from '../components/screens/news/routes/stack-routes';

import SettingsStack, {
  TabID as SettingsTabID,
} from '../components/screens/settings/routes/stack-routes';

const Tab = createBottomTabNavigator();

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name={DiscoverTabID}
        component={DiscoverStack}
      />
      <Tab.Screen
        name={PeopleTabID}
        component={PeopleStack}
      />
      <Tab.Screen
        name={QuizTabID}
        component={QuizStack}
      />
      <Tab.Screen
        name={NewsTabID}
        component={NewsStack}
      />
      <Tab.Screen
        name={SettingsTabID}
        component={SettingsStack}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
