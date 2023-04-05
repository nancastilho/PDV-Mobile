import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface PaymentType {
  id: number;
  name: string;
  icon: any;
}

interface FechamentoVendaProps {
  total: number;
  onFechamento: (formaPagamento: string) => void;
}

const formasPagamento: PaymentType[] = [
  { id: 1, name: 'Dinheiro', icon: 'money' },
  { id: 2, name: 'Cartão de Crédito', icon: 'credit-card' },
  { id: 3, name: 'Cartão de Débito', icon: 'credit-card-alt' },
];

const FechamentoVenda = ({ total, onFechamento }: FechamentoVendaProps) => {
  const [formaPagamento, setFormaPagamento] = useState<PaymentType | null>(
    null
  );

  const handleFormaPagamentoSelect = (paymentType: PaymentType) => {
    setFormaPagamento(paymentType);
  };

  const PaymentItem = ({ item }: { item: PaymentType }) => {
    return (
      <TouchableOpacity
        style={[
          styles.formaPagamentoButton,
          formaPagamento?.id === item.id && styles.formaPagamentoButtonSelected,
        ]}
        onPress={() => handleFormaPagamentoSelect(item)}
      >
        <Text style={styles.formaPagamentoButtonText}>{item.name}</Text>
        <FontAwesome name='credit-card-alt' style={styles.currencyIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total da Venda:</Text>
      <Text style={styles.total}>{`R$ ${total.toFixed(2)}`}</Text>
      <FlatList
        data={formasPagamento}
        renderItem={PaymentItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.formaPagamentoList}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onFechamento(formaPagamento?.name || '')}
        disabled={!formaPagamento}
      >
        <Text style={styles.buttonText}>Fechar Venda</Text>
      </TouchableOpacity>
    </View>
  );
};

const primary = '#4714D6' //'#be3455'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  total: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  formaPagamentoList: {
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  formaPagamentoButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: primary,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  formaPagamentoButtonSelected: {
    backgroundColor: primary,
  },
  formaPagamentoButtonText: {
    color: primary,
    fontSize: 18
  },

  button: {
    backgroundColor: primary,
    padding: 16,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EBEBEB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  currencyIcon: {
    fontSize: 25,
    color: primary
  }
});

export default FechamentoVenda;
