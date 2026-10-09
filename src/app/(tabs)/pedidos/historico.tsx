import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, Header } from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";
import { money } from "../../../data/mock";

export default function OrderHistory() {
  const { orders, isOrdersLoaded } = useOrders();
  const deliveredOrders = orders.filter(
    (order) => order.status === "Entregue",
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={isOrdersLoaded ? deliveredOrders : []}
      keyExtractor={(order) => order.id}
      ListHeaderComponent={
        <Header
          title="Histórico de pedidos"
          subtitle="Pedidos entregues ficam guardados aqui"
          back
        />
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {isOrdersLoaded
            ? "Ainda não há pedidos entregues no histórico."
            : "Carregando histórico..."}
        </Text>
      }
      renderItem={({ item: order }) => (
        <Pressable
          onPress={() =>
            router.push(`/(tabs)/pedidos/${order.id}` as never)
          }
          style={styles.card}
        >
          <View style={styles.top}>
            <Text style={styles.customer}>{order.customer}</Text>
            <Text style={styles.status}>Entregue</Text>
          </View>
          <Text style={styles.item}>{order.item}</Text>
          {order.notes ? (
            <Text style={styles.notes}>Obs.: {order.notes}</Text>
          ) : null}
          <View style={styles.bottom}>
            <Text style={styles.time}>Pedido #{order.id} · {order.time}</Text>
            <Text style={styles.total}>{money(order.total)}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingTop: 52, paddingBottom: 34, flexGrow: 1 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  top: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  customer: { flex: 1, color: colors.ink, fontSize: 16, fontWeight: "800" },
  status: { color: colors.green, fontSize: 12, fontWeight: "800" },
  item: { color: colors.muted, marginTop: 10 },
  notes: { color: colors.muted, fontSize: 12, marginTop: 6 },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 14,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  time: { flex: 1, color: colors.muted, fontSize: 12 },
  total: { color: colors.accent, fontWeight: "800" },
  empty: { color: colors.muted, textAlign: "center", marginTop: 20 },
});
