import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface PDVProps {
  onTotalChange: (value: number) => void;
}

const PDV = ({ onTotalChange }: PDVProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleAddItem = () => {
    if (name && price) {
      const newItem: Item = {
        id: Date.now(),
        name: name,
        price: parseFloat(price),
      };
      setItems([...items, newItem]);
      setName('');
      setPrice('');
      const total = items.reduce((acc, curr) => acc + curr.price, 0) + newItem.price;
      onTotalChange(total);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDV</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do item"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço do item"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Adicionar item</Text>
        </TouchableOpacity>
      </View>
      <List.Section title="Itens da venda">
        {items.map((item) => (
          <List.Item
            key={item.id}
            title={item.name}
            right={() => <Text>{`R$ ${item.price.toFixed(2)}`}</Text>}
          />
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PDV;