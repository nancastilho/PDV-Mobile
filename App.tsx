import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PDV from "./components/PDV/Pdv";
import FechamentoVenda from "./components/Fechamento/Fechamento";
import { NavigationContainer } from "@react-navigation/native";

interface Item {
  id: number;
  name: string;
  price: number;
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);

  const handleFechamentoVenda = () => {
    setTotal(0);
    setItems([]);
  };

  const handleTotalChange = (value: number) => {
    setTotal(value);
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="PDV">
            {() => <PDV onTotalChange={handleTotalChange} />}
          </Tab.Screen>
          <Tab.Screen name="Fechamento">
            {() => (
              <FechamentoVenda
                total={total}
                onFechamento={handleFechamentoVenda}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
