import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import Routes from './src/routes/index';

// import { Container } from './styles';

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default App;