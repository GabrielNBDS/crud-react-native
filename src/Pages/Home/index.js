import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Logo from '../../assets/logo.png';

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: '#2188DD' }}>BookTracker</Text>
      <Image style={{ width: 300, height: 300 }} source={Logo} />

      <View style={{ display: 'flex', width: '90%'}}>
        <Button
          onPress={() => navigate('Books')}
          title="Começar"
        />
      </View>
    </View>
  );
}

export default Home;