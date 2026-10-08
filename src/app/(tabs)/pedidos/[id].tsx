import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { money, type OrderStatus } from "../../../data/mock";
import {
  Button,
  colors,
  Header,
  Screen,
  styles as ui,
} from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";

export default function OrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders, updateOrderStatus } = useOrders();
  const [isUpdating, setIsUpdating] = useState(false);
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <Screen>
        <Header title="Pedido não encontrado" back />
        <Text style={styles.muted}>Este pedido não está mais disponível.</Text>
      </Screen>
    );
  }

  const setStatus = async (status: OrderStatus) => {
    setIsUpdating(true);
    try {
      await updateOrderStatus(order.id, status);
    } catch (error) {
      Alert.alert(
        "Não foi possível atualizar o pedido",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Screen>
      <Header title="Detalhe do pedido" subtitle={`Pedido #${order.id}`} back />
      <View style={styles.summary}>
        <View>
          <Text style={styles.customer}>{order.customer}</Text>
          <Text style={styles.time}>{order.time}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Itens do pedido</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>{order.item}</Text>
          <Text style={styles.total}>{money(order.total)}</Text>
        </View>
        {order.notes ? (
          <Text style={styles.muted}>Observações: {order.notes}</Text>
        ) : null}
        <View style={styles.line}>
          <Text style={styles.muted}>Total</Text>
          <Text style={styles.total}>{money(order.total)}</Text>
        </View>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Dados de entrega</Text>
        <Text style={styles.muted}>
          Rua das Flores, 120{`\n`}São Paulo - SP{`\n`}Pagamento via Pix
        </Text>
      </View>
      <Text style={styles.statusHeading}>Atualizar status do pedido</Text>
      <Button
        label={isUpdating ? "Salvando..." : "Em preparo"}
        secondary={order.status !== "Em preparo"}
        disabled={isUpdating || order.status === "Em preparo"}
        onPress={() => setStatus("Em preparo")}
      />
      <View style={styles.statusButton}>
        <Button
          label={isUpdating ? "Salvando..." : "Marcar como pronto"}
          secondary={order.status !== "Pronto"}
          disabled={isUpdating || order.status === "Pronto"}
          onPress={() => setStatus("Pronto")}
        />
      </View>
      <View style={styles.statusButton}>
        <Button
          label={isUpdating ? "Salvando..." : "Enviar para entrega"}
          secondary={order.status !== "Enviado para entrega"}
          disabled={isUpdating || order.status === "Enviado para entrega"}
          onPress={() => setStatus("Enviado para entrega")}
        />
      </View>
      <Pressable>
        <Text style={styles.cancel}>Cancelar pedido</Text>
      </Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({
  summary: {
    backgroundColor: colors.pale,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  customer: { color: colors.ink, fontWeight: "800", fontSize: 18 },
  time: { color: colors.muted, marginTop: 5, fontSize: 12 },
  status: { color: colors.green, fontWeight: "800", fontSize: 12 },
  label: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 16,
  },
  item: { flexDirection: "row", justifyContent: "space-between" },
  itemText: { color: colors.muted, flex: 1 },
  total: { color: colors.accent, fontWeight: "800" },
  line: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 16,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  muted: { color: colors.muted, lineHeight: 24 },
  statusHeading: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  statusButton: { marginTop: 10 },
  cancel: {
    textAlign: "center",
    color: colors.accent,
    fontWeight: "800",
    marginTop: 18,
  },
});
