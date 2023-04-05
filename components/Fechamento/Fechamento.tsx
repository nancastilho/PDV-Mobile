import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface PaymentType {
  id: number;
  name: string;
  icon: any;
  iconSize?: number;
}

interface FechamentoVendaProps {
  total: number;
  onFechamento: (formaPagamento: string) => void;
}

const formasPagamento: PaymentType[] = [
  { id: 1, name: "Dinheiro", icon: "money" },
  { id: 2, name: "Cartão de Crédito", icon: "credit-card" },
  { id: 3, name: "Cartão de Débito", icon: "credit-card-alt", iconSize: 22 },
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
        <FontAwesome
          name={item.icon}
          size={item.iconSize || 25}
          style={styles.currencyIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <View style={[styles.card, styles.shadowProps, styles.itemList]}></View>
        <View>
          <Text style={styles.title}>Forma de Pagamento</Text>
          <FlatList
            data={formasPagamento}
            renderItem={PaymentItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.formaPagamentoList}
          />
        </View>
      </View>
      <View style={styles.containerResult}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => onFechamento(formaPagamento?.name || "")}
          disabled={!formaPagamento}
        >
          <Text style={styles.buttonText}>Fechar Venda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const primary = "#4714D6"; //'#be3455'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: '#fff'
  },
  containerContent: {
    justifyContent: "center",
  },
  containerResult: {
    justifyContent: "center",
    marginBottom: 10
  },
  card: {
    width: "100%",
    backgroundColor: "#e5e1ea",
    borderRadius: 10,
    marginBottom: 30,
    padding: 20
  },
  itemList: {
    height: 180,
  },
  textEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  overviewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shadowProps: {
    shadowColor: "#211f21",
    elevation: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  total: {
    fontSize: 14,
    fontWeight: "600",
    width: "50%"
  },
  totalDiscount: {
    fontSize: 14,
    fontWeight: "400",
    color: "#3e3e3e"
  },
  formaPagamentoList: {
    marginBottom: 10,
  },
  formaPagamentoButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: primary,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  formaPagamentoButtonSelected: {
    backgroundColor: primary,
  },
  formaPagamentoButtonText: {
    color: primary,
    fontSize: 18,
  },
  button: {
    backgroundColor: primary,
    padding: 16,
    borderRadius: 8,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    color: "#EBEBEB",
    fontWeight: "bold",
    fontSize: 16,
  },
  currencyIcon: {
    color: primary,
  },
});

export default FechamentoVenda;
