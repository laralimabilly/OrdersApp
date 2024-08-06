import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3b438e',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#3b438e',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

export default RadioButton;