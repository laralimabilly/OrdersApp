import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button, Dialog, DialogActions, DialogContent, DialogHeader } from '@react-native-material/core';
import { MaskedTextInput } from "react-native-mask-text";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNagivator';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import axiosInstance from '../../axiosConfig';
import GlobalStyles from '../constants/GlobalStyles';

type PaymentScreenProps = StackScreenProps<RootStackParamList, 'Pagamento'>;

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
    const { orderData } = route.params;

    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState('');
    const [validThru, setValidThru] = useState('');
    const [cvv, setCvv] = useState('');
    const [pixKey, setPixKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    const handlePayment = async () => {
      setLoading(true);

      const body = {
        faturas: [orderData],
        valorTotal: orderData.valorFatura,
        resultadoTransacao: {
          idTransacao: '12345',
          nsu: '67890',
          codAut: '54321',
          codControle: '09876',
          dRetorno: new Date().toISOString(),
          numCartao: cardNumber,
          bandeira: 'Visa',
          rede: 'Rede',
          adquirente: 'Adquirente',
          valorPagamento: orderData.valorFatura,
          tipoPagamento: paymentMethod === 'Credit' ? 3 : paymentMethod === 'Debit' ? 4 : 5,
          qtdeParcelas: 1,
          dTransacao: new Date().toISOString(),
          status: 0,
          msgRetorno: 'Payment successful',
          arqRetorno: 'File path',
        }
      };

      try {
        const response = await axiosInstance.post('financeiro/retorno', body);
        console.log(response.data);
        navigation.navigate('Pedidos');
        setError('');
        setDialogVisible(false);
      } catch (error) {
        setError('Não foi possível efetuar o pagamento. Tente novamente.');
        setDialogVisible(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b438e" />
          <Text style={styles.loadingText}>Processando pagamento...</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.totalSum}>Valor total: R${orderData.valorFatura}</Text>
          <Text>{`Fatura Número: ${orderData.numeroFatura}`}</Text>
          <Text>{`Histórico: ${orderData.historico}`}</Text>
          <Text>{`Nome: ${orderData.pessoa.nome}`}</Text>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.section}>
          <Text variant="h5">Método de Pagamento</Text>
          <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
        </View>

        {/* Payment Method Info */}
        {paymentMethod === 'Credit' || paymentMethod === 'Debit' ? (
          <View style={styles.section}>
            <Text variant="h5">Informações do Cartão</Text>
            <MaskedTextInput
              mask="9999.9999.9999.9999"
              placeholder="Número do Cartão"
              value={cardNumber}
              onChangeText={setCardNumber}
              style={styles.input}
            />
            <MaskedTextInput
              mask="99/99"
              placeholder="Validade (MM/AA)"
              value={validThru}
              onChangeText={setValidThru}
              style={styles.input}
            />
            <MaskedTextInput
              mask="999"
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              style={styles.input}
            />
          </View>
        ) : paymentMethod === 'Pix' ? (
          <View style={styles.section}>
            <Text variant="h5">Chave Pix</Text>
            <TextInput
              placeholder="Chave Pix"
              value={pixKey}
              onChangeText={setPixKey}
              style={styles.input}
            />
          </View>
        ) : null}
        <Button style={GlobalStyles.button} title="Pagar" onPress={handlePayment} />
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
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  section: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
  },
  totalSum: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default PaymentScreen;