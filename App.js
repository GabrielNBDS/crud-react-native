import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { BooksProvider } from './src/hooks/books';
import Routes from './src/Routes';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <BooksProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </BooksProvider>
    </>
  );
}
