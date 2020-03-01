import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import Discover from '../components/Discover';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const DiscoverStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...DEFAULT_HEADER_OPTIONS,
        headerTitle: LOCAL_ROUTES.DISCOVER.title,
      }}
      name={LOCAL_ROUTES.DISCOVER.id}
      component={Discover}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.DISCOVER.id;

export default DiscoverStack;
