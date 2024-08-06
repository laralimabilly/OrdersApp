import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PaymentMethodProps {
  selectedMethod: string | null;
  onSelect: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodProps> = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: 'Credit', label: 'Crédito', icon: 'credit-card' },
    { id: 'Debit', label: 'Débito', icon: 'credit-card' },
    { id: 'Pix', label: 'Pix', icon: 'qr-code' }
  ];

  return (
    <View style={styles.container}>
      {methods.map(method => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.button,
            selectedMethod === method.id && styles.selectedButton
          ]}
          onPress={() => onSelect(method.id)}
        >
          <Icon name={method.icon} size={24} color="#fff" style={styles.icon} />
          <Text style={styles.label}>{method.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 5,
    width: 120,
    justifyContent: 'center'
  },
  selectedButton: {
    backgroundColor: '#e01c23',
  },
  icon: {
    marginRight: 8
  },
  label: {
    color: '#fff',
    fontSize: 16
  }
});

export default PaymentMethodSelector;
