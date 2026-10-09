import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";
import { money } from "../../../data/mock";

export default function PedidosTab() {
  const { orders, isOrdersLoaded } = useOrders();
  const activeOrders = orders.filter((order) => order.status !== "Entregue");
  const deliveredCount = orders.filter(
    (order) => order.status === "Entregue",
  ).length;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={isOrdersLoaded ? activeOrders : []}
      keyExtractor={(order) => order.id}
      ListHeaderComponent={
        <View>
          <View style={styles.heading}>
            <View style={styles.headingText}>
              <Text style={styles.title}>Pedidos</Text>
              <Text style={styles.subtitle}>
                Acompanhe os pedidos em andamento
              </Text>
            </View>
            <Pressable
              onPress={() =>
                router.push("/(tabs)/pedidos/historico" as never)
              }
              style={styles.historyButton}
            >
              <Text style={styles.historyButtonText}>
                Histórico{deliveredCount ? ` (${deliveredCount})` : ""}
              </Text>
            </Pressable>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {isOrdersLoaded
            ? "Nenhum pedido em andamento."
            : "Carregando pedidos..."}
        </Text>
      }
      renderItem={({ item: order }) => (
        <Pressable
          onPress={() => router.push(`/(tabs)/pedidos/${order.id}` as never)}
          style={styles.card}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.cliente}>{order.customer}</Text>
            <Text style={styles.item}>{order.item}</Text>
            {order.notes ? <Text style={styles.notes}>Obs.: {order.notes}</Text> : null}
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.valor}>{money(order.total)}</Text>
            <Text
              style={[
                styles.status,
                order.status === "Cancelado" && styles.cancelled,
              ]}
            >
              {order.status}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingTop: 52, paddingBottom: 34, flexGrow: 1 },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headingText: { flex: 1 },
  title: { fontSize: 28, fontWeight: "800", color: colors.ink },
  subtitle: { marginTop: 8, color: colors.muted, fontSize: 14, marginBottom: 18 },
  historyButton: {
    backgroundColor: colors.pale,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
  },
  historyButtonText: { color: colors.accent, fontWeight: "800", fontSize: 12 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  orderInfo: { flex: 1, paddingRight: 12 },
  cliente: { fontSize: 16, fontWeight: "700", color: colors.ink },
  item: { marginTop: 6, fontSize: 13, color: colors.muted },
  notes: { marginTop: 4, fontSize: 12, color: colors.muted },
  rightSide: { alignItems: "flex-end" },
  valor: { fontSize: 16, fontWeight: "800", color: colors.accent },
  status: { marginTop: 4, fontSize: 12, fontWeight: "700", color: colors.green },
  cancelled: { color: colors.accent },
  empty: { color: colors.muted, textAlign: "center", marginTop: 24 },
});
