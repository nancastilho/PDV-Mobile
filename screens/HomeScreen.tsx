// // HomeScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import PDV from '../components/PDV/Pdv';
// import Fechamento from '../components/Fechamento/Fechamento';
// import { Provider, Portal, Dialog } from 'react-native-paper';

// interface Item {
//   id: number;
//   name: string;
//   price: number;
// }

// const Tab = createMaterialTopTabNavigator();

// function HomeScreen() {
//   const [total, setTotal] = useState<number>(0);
//   const [items, setItems] = useState<Item[]>([]);

//   const handleFechamentoVenda = () => {
//     setTotal(0);
//     setItems([]);
//   };

//   const handleTotalChange = (value: number) => {
//     setTotal(value);
//   };

//   return (
//     <View style={styles.container}>
//       <Tab.Navigator>
//         <Tab.Screen name="PDV">
//           {() => <PDV onTotalChange={handleTotalChange} />}
//         </Tab.Screen>
//         <Tab.Screen name="Fechamento">
//           {() => <FechamentoVenda total={total} onFechamento={handleFechamentoVenda} />}
//         </Tab.Screen>
//       </Tab.Navigator>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default HomeScreen
  
