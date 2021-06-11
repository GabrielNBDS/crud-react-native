import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Books from './Pages/Books';
import CreateBooks from './Pages/CreateBooks';
import Details from './Pages/Details';
import Home from './Pages/Home';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <> 
      <Stack.Navigator  screenOptions={{ 
        headerShown: false,
        cardStyle:
          { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Books" component={Books} />
        <Stack.Screen name="Create" component={CreateBooks} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </>
  );
}
