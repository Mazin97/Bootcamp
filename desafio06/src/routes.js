import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import RepositoryScreen from './pages/Repository';
import MainScreen from './pages/Main';
import UserScreen from './pages/User';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#7159c1' },
          headerTintColor: '#fff',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        }}
        headerMode="float"
        initialRouteName="Main"
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={({ route: { params } }) => ({
            title: params.user.name,
          })}
        />
        <Stack.Screen
          name="Repository"
          component={RepositoryScreen}
          options={({ route: { params } }) => ({
            title: params.name,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
