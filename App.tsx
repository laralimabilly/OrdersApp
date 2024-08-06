import React, { StrictMode } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNagivator';
import { Provider } from '@react-native-material/core';

const App: React.FC = () => {

  return (
    <StrictMode>
      <Provider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" animated={true} backgroundColor="#e01c23" />
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    </StrictMode>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e01c23',
    color: '#fff'
  },
});

export default App;
