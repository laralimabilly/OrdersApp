import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OrdersScreen from '../screens/OrdersScreen';
import PaymentScreen from '../screens/PaymentScreen';

export type RootStackParamList = {
  Login: undefined;
  Pedidos: undefined;
  Pagamento: {orderData: any};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#e01c23', // Customize header background color
            },
            headerTintColor: '#fff', // Customize header text color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          initialRouteName="Login"
        >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pedidos" component={OrdersScreen} />
        <Stack.Screen name="Pagamento" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
