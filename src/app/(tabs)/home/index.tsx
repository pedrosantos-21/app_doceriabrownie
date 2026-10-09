import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";
import { useProfile } from "../../../context/ProfileContext";
import { money } from "../../../data/mock";

export default function HomeTab() {
  const { orders, isOrdersLoaded } = useOrders();
  const { managerProfile } = useProfile();
  const activeOrders = orders.filter(
    (order) => order.status !== "Cancelado" && order.status !== "Entregue",
  );
  const completedSales = orders
    .filter((order) => order.status === "Entregue")
    .reduce((total, order) => total + order.total, 0);
  const customerCount = new Set(
    orders
      .filter((order) => order.status !== "Cancelado")
      .map(
        (order) =>
          order.customerEmail?.trim().toLocaleLowerCase("pt-BR") ||
          order.customer.trim().toLocaleLowerCase("pt-BR"),
      ),
  ).size;

  const itemCounts = orders
    .filter((order) => order.status !== "Cancelado")
    .reduce<Map<string, { title: string; count: number }>>((counts, order) => {
      const title = order.item.trim().replace(/^\d+\s+/, "");
      const key = title.toLocaleLowerCase("pt-BR");
      const current = counts.get(key);
      counts.set(key, {
        title: current?.title ?? title,
        count: (current?.count ?? 0) + 1,
      });
      return counts;
    }, new Map());
  const highlights = Array.from(itemCounts.values())
    .sort((first, second) => second.count - first.count)
    .slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>
        Olá, {managerProfile.name.trim().split(/\s+/)[0] || "gestor"}
      </Text>
      <Text style={styles.title}>Seu painel da doceria</Text>

      <View style={styles.rowCards}>
        <View style={[styles.statCard, { backgroundColor: "#f2d9e0" }]}>
          <Text style={styles.statLabel}>Vendas entregues</Text>
          <Text style={styles.statValue}>
            {isOrdersLoaded ? money(completedSales) : "..."}
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#f5e3e8" }]}>
          <Text style={styles.statLabel}>Pedidos ativos</Text>
          <Text style={styles.statValue}>
            {isOrdersLoaded ? activeOrders.length : "..."}
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#f8edf0" }]}>
          <Text style={styles.statLabel}>Clientes</Text>
          <Text style={styles.statValue}>
            {isOrdersLoaded ? customerCount : "..."}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mais pedidos</Text>
        <Pressable onPress={() => router.push("/(tabs)/pedidos" as never)}>
          <Text style={styles.sectionLink}>Ver tudo</Text>
        </Pressable>
      </View>

      <View style={styles.listCard}>
        {!isOrdersLoaded ? (
          <Text style={styles.empty}>Carregando pedidos...</Text>
        ) : highlights.length ? (
          highlights.map((item) => (
            <View key={item.title} style={styles.productItem}>
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productSubtitle}>Mais solicitado</Text>
              </View>
              <Text style={styles.productBadge}>
                {item.count} {item.count === 1 ? "pedido" : "pedidos"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>
            Os itens mais pedidos aparecerão aqui.
          </Text>
        )}
      </View>
      <Text style={styles.disclaimer}>
        Métricas calculadas com os pedidos armazenados neste dispositivo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingTop: 56, paddingBottom: 34 },
  greeting: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: { marginTop: 8, fontSize: 30, fontWeight: "800", color: colors.ink },
  rowCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 10,
  },
  statCard: { flex: 1, borderRadius: 18, padding: 12, minHeight: 88 },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "800",
    color: colors.ink,
  },
  sectionHeader: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: colors.ink },
  sectionLink: { color: colors.accent, fontWeight: "700" },
  listCard: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: "700", color: colors.ink },
  productSubtitle: { marginTop: 4, color: colors.muted, fontSize: 12 },
  productBadge: {
    backgroundColor: colors.pale,
    color: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 12,
  },
  empty: { textAlign: "center", paddingVertical: 20, color: colors.muted },
  disclaimer: {
    marginTop: 12,
    textAlign: "center",
    color: colors.muted,
    fontSize: 11,
  },
});
