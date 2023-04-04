import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

interface FormaPagamento {
  id: number;
  name: string;
}

interface FechamentoVendaProps {
  total: number;
  onFechamento: (formaPagamento: string) => void;
}

const formasPagamento: FormaPagamento[] = [
  { id: 1, name: 'Dinheiro' },
  { id: 2, name: 'Cartão de Crédito' },
  { id: 3, name: 'Cartão de Débito' },
];

const FechamentoVenda = ({ total, onFechamento }: FechamentoVendaProps) => {
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento | null>(null);

  const handleFormaPagamentoSelect = (formaPagamento: FormaPagamento) => {
    setFormaPagamento(formaPagamento);
  };

  const renderItem = ({ item }: { item: FormaPagamento }) => {
    return (
      <TouchableOpacity
        style={[styles.formaPagamentoButton, formaPagamento?.id === item.id && styles.formaPagamentoButtonSelected]}
        onPress={() => handleFormaPagamentoSelect(item)}
      >
        <Text style={styles.formaPagamentoButtonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total da Venda:</Text>
      <Text style={styles.total}>{`R$ ${total.toFixed(2)}`}</Text>
      <FlatList
        data={formasPagamento}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.formaPagamentoList}
      />
      <TouchableOpacity style={styles.button} onPress={() => onFechamento(formaPagamento?.name || '')} disabled={!formaPagamento}>
        <Text style={styles.buttonText}>Fechar Venda</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  formaPagamentoButtonSelected: {
    backgroundColor: '#2196F3',
  },
  formaPagamentoButtonText: {
    color: '#2196F3',
  },

  button: {
  backgroundColor: '#2196F3',
  padding: 16,
  borderRadius: 8,
  alignSelf: 'stretch',
  alignItems: 'center',
  },
  buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
  },
  });
  
  export default FechamentoVenda;
    
    
    
    
    
    
