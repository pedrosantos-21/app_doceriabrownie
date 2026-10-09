import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { money } from "../../../data/mock";
import { colors, Header, styles as ui } from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";
import { useProfile } from "../../../context/ProfileContext";

const filters = ["Todos", "Em andamento", "Concluídos", "Cancelados"];

export default function ClientOrders() {
  const { orders, isOrdersLoaded } = useOrders();
  const { clientProfile, isClientProfileLoaded } = useProfile();
  const [filter, setFilter] = useState("Todos");
  const clientOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.customerEmail?.trim().toLocaleLowerCase("pt-BR") ===
            clientProfile.email.trim().toLocaleLowerCase("pt-BR") ||
          order.customer.trim().toLocaleLowerCase("pt-BR") ===
            clientProfile.name.trim().toLocaleLowerCase("pt-BR"),
      ),
    [orders, clientProfile.email],
  );
  const visibleOrders = clientOrders.filter((order) => {
    if (filter === "Em andamento") {
      return ["Em preparo", "Pronto", "Enviado para entrega"].includes(order.status);
    }
    if (filter === "Concluídos") return order.status === "Entregue";
    if (filter === "Cancelados") return order.status === "Cancelado";
    return true;
  });

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={isOrdersLoaded && isClientProfileLoaded ? visibleOrders : []}
      keyExtractor={(order) => order.id}
      ListHeaderComponent={
        <View>
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
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {!isOrdersLoaded || !isClientProfileLoaded
            ? "Carregando pedidos..."
            : filter === "Todos"
              ? "Você ainda não fez nenhum pedido."
              : "Nenhum pedido nesta categoria."}
        </Text>
      }
      renderItem={({ item: order }) => (
        <Pressable
          onPress={() => router.push(`/(cliente)/pedidos/${order.id}` as never)}
          style={ui.card}
        >
          <View style={styles.top}>
            <Text style={styles.number}>Pedido #{order.id}</Text>
            <Text style={[styles.status, order.status === "Cancelado" && styles.cancelled]}>
              {order.status}
            </Text>
          </View>
          <Text style={styles.item}>{order.item}</Text>
          {order.notes ? <Text style={styles.notes}>Obs.: {order.notes}</Text> : null}
          <View style={styles.bottom}>
            <Text style={styles.time}>{order.time}</Text>
            <Text style={styles.total}>{money(order.total)}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 22, paddingTop: 54, paddingBottom: 34, flexGrow: 1 },
  filter: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginBottom: 20 },
  filterActive: { color: colors.accent, fontWeight: "800" },
  filterText: { color: colors.muted },
  top: { flexDirection: "row", justifyContent: "space-between" },
  number: { color: colors.ink, fontWeight: "800" },
  status: { color: colors.green, fontSize: 12, fontWeight: "800" },
  cancelled: { color: colors.accent },
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
