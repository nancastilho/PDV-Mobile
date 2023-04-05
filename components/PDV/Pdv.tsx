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
        <List.Section style={styles.containerItemsDaVenda} >
        <Text style={styles.title}>Itens da venda:</Text>
          {items.map((item) => (
            <View style={styles.testeItems}>
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
      <View style={[styles.card, styles.shadowProps]}>
          <Text style={styles.title}>Resumo da Venda:</Text>
          <View style={styles.overviewLine}>

          <Text style={styles.total}>Subtotal</Text>
          <Text style={[styles.total, styles.textEnd]}>{`R$ ${total.toFixed(2)}`}</Text>
          </View>
          <View style={styles.overviewLine}>

          <Text style={[styles.total, styles.totalDiscount]}>Desconto</Text>
          <Text style={[styles.total, styles.totalDiscount, styles.textEnd]}><FontAwesome name='tag' style={{marginTop: 4, marginRight: 5}} size={12} />{`R$ ${total.toFixed(2)}`}</Text>
          </View>
          <View style={styles.overviewLine}>
            
          <Text style={styles.total}>Total</Text>
          <Text style={[styles.total, styles.textEnd]}>{`R$ ${total.toFixed(2)}`}</Text>
          </View>
        </View>
    </View>
  );
};

const primary = "#4714D6"; //'#be3455'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },

  total: {
    fontSize: 14,
    fontWeight: "600",
    width: "50%"
  },

  textEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  totalDiscount: {
    fontSize: 14,
    fontWeight: "400",
    color: "#3e3e3e"
  },

  overviewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    paddingBottom: 16,
  },
  gradient: {
    position: "absolute",
  },
  title: {
    fontSize: 20,
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
    borderColor: primary,
    textDecoration: primary,
  },
  button: {
    backgroundColor: primary,
    borderRadius: 8,
    textAlign:"center",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  buttonText: {
    color: "#EBEBEB",
    width: "100%",
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    backgroundColor: "#e5e1ea",
    borderRadius: 10,
    marginBottom: 30,
    padding: 20
  },
  shadowProps: {
    shadowColor: "#211f21",
    elevation: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  prices: {
    display: "flex",
    bbackgroundColor: "#e5e1ea",
    padding: 10,
    borderRadius: 8,
  },

  containerItemsDaVenda: {
    
    width: "100%",
    fontWeight: "bold",
  },

  testeItems:{
    width:"100%"
  },

  Items: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default PDV;
