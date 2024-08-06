import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, DialogActions, DialogContent, DialogHeader, Text, TextInput } from '@react-native-material/core';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNagivator'; 
import config from '../config';
import axiosInstance from '../../axiosConfig';
import GlobalStyles from '../constants/GlobalStyles';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('auth', {
        "usuario": user,
        "senha": password,
        "aplicacaoId": `${config.appId}`
      });

      if(response){
        const credData = response.data?.credenciais[0];

        axiosInstance.defaults.headers.common['aplicacaoid'] = credData.aplicacaoid;
        axiosInstance.defaults.headers.common['username'] = credData.username;

        setError('');
        setDialogVisible(false);

        navigation.navigate('Pedidos');
      }
      
    } catch (error) {
      setError('Usuário e senha inválidos. Tente novamente');
      setDialogVisible(true);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Usuário"
        value={user}
        onChangeText={setUser}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button style={GlobalStyles.button} title="Acessar" onPress={handleLogin} />
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <DialogHeader title="Ops!" />
        <DialogContent>
          <Text>{error}</Text>
        </DialogContent>
        <DialogActions>
          <Button
            title="OK"
            onPress={() => setDialogVisible(false)}
            compact
            variant="text"
          />
        </DialogActions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});

export default LoginScreen;
