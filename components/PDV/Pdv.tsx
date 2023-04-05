import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, List } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface PDVProps {
  onTotalChange: (value: number) => void;
}

const mock: Item[] = [
  {
    id: 1,
    name: "Pão",
    price: 485,
  },
  {
    id: 2,
    name: "Leite",
    price: 34,
  },
  {
    id: 3,
    name: "Queijo",
    price: 456,
  },
  {
    id: 4,
    name: "Feijao",
    price: 456,
  },
];

const PDV = ({ onTotalChange }: PDVProps) => {
  const [items, setItems] = useState<Item[]>(mock);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const handleAddItem = () => {
    if (name && price) {
      const newItem: Item = {
        id: Date.now(),
        name: name,
        price: parseFloat(price),
      };
      setItems([...items, newItem]);
      setName("");
      setPrice("");
      const total =
        items.reduce((acc, curr) => acc + curr.price, 0) + newItem.price;
      onTotalChange(total);
      setTotal(total);
    }
  };

  const handleItemRemove = (id: number) => {
    const itemRemovido = items.filter((item) => item.id === id);
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
      setTotal(total - itemRemovido[0].price);
    } else {
      setItems(items.filter((item) => item.id !== id));
      setTotal(0);
    }
  };

  useEffect(() => {
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    onTotalChange(total);
    setTotal(total);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
        <List.Section style={styles.containerItems} title="Itens da venda">
          {items.map((item) => (
            <View>
              <View style={styles.Items} key={item.id}>
                <List.Item
                  title={`${item.name} -`}
                  right={() => <Text>{` R$ ${item.price.toFixed(2)}`}</Text>}
                />
                <FontAwesome
                  name="close"
                  onPress={() => handleItemRemove(item.id)}
                />
              </View>
              <Divider />
            </View>
          ))}
          <LinearGradient
            style={styles.gradient}
            colors={["transparent", "rgba(0,0,0, 0.70)", "rgba(0,0,0, 0.95)"]}
          />
        </List.Section>
      </View>
      <View style={styles.containerFoot}>
        <Text style={styles.title}>Preço Total:</Text>
        <View style={styles.prices}>
          <Text style={styles.title2}>R$: {total.toFixed(2)}</Text>
          <Text style={styles.title3}>Desconto: R$: 20,00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  gradient: {
    position: "absolute",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title2: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title3: {
    fontSize: 18,
    marginBottom: 16,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    height: 50,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  containerFoot: {
    alignContent: "flex-end",
    borderRadius: 8,
  },
  prices: {
    display: "flex",
    backgroundColor: "#9fb9c2",
    padding: 10,
    borderRadius: 8,
  },

  containerItems: {
    alignItems: "center",
  },

  Items: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PDV;
