import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { money } from "../../../data/mock";
import { colors, Header, Screen, styles as ui } from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";

export default function ClientOrders() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", "Em andamento", "Concluídos"];
  const visibleOrders = orders.filter((order) => {
    if (filter === "Em andamento") return order.status === "Em preparo";
    if (filter === "Concluídos") {
      return ["Pronto", "A caminho", "Entregue"].includes(order.status);
    }
    return true;
  });

  return (
    <Screen>
      <Header title="Meus pedidos" subtitle="Acompanhe tudo que já pediu" />
      <View style={styles.filter}>
        {filters.map((label) => (
          <Pressable key={label} onPress={() => setFilter(label)}>
            <Text style={filter === label ? styles.filterActive : styles.filterText}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
      {visibleOrders.map((order) => (
        <Pressable
          key={order.id}
          onPress={() => router.push(`/(cliente)/pedidos/${order.id}` as never)}
          style={ui.card}
        >
          <View style={styles.top}>
            <Text style={styles.number}>Pedido #{order.id}</Text>
            <Text style={styles.status}>{order.status}</Text>
          </View>
          <Text style={styles.item}>{order.item}</Text>
          {order.notes ? <Text style={styles.notes}>Obs.: {order.notes}</Text> : null}
          <View style={styles.bottom}>
            <Text style={styles.time}>{order.time}</Text>
            <Text style={styles.total}>{money(order.total)}</Text>
          </View>
        </Pressable>
      ))}
      {visibleOrders.length === 0 ? (
        <Text style={styles.empty}>Nenhum pedido nesta categoria.</Text>
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  filter: { flexDirection: "row", gap: 18, marginBottom: 20 },
  filterActive: { color: colors.accent, fontWeight: "800" },
  filterText: { color: colors.muted },
  top: { flexDirection: "row", justifyContent: "space-between" },
  number: { color: colors.ink, fontWeight: "800" },
  status: { color: colors.green, fontSize: 12, fontWeight: "800" },
  item: { color: colors.muted, marginTop: 12 },
  notes: { color: colors.muted, fontSize: 12, marginTop: 6 },
  empty: { color: colors.muted, textAlign: "center", marginTop: 20 },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 14,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: { color: colors.muted, fontSize: 12 },
  total: { color: colors.accent, fontWeight: "800" },
});
