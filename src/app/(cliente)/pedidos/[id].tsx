import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { money } from "../../../data/mock";
import {
  Button,
  colors,
  Header,
  Screen,
  styles as ui,
} from "../../../components/ui";
import { useOrders } from "../../../context/OrdersContext";
import { useProfile } from "../../../context/ProfileContext";

export default function ClientOrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useOrders();
  const { clientProfile } = useProfile();
  const order = orders.find(
    (item) =>
      item.id === id &&
      (item.customerEmail?.trim().toLocaleLowerCase("pt-BR") ===
        clientProfile.email.trim().toLocaleLowerCase("pt-BR") ||
        item.customer.trim().toLocaleLowerCase("pt-BR") ===
          clientProfile.name.trim().toLocaleLowerCase("pt-BR")),
  );

  if (!order) {
    return (
      <Screen>
        <Header title="Pedido não encontrado" back />
        <Text style={styles.message}>
          Este pedido não está mais disponível.
        </Text>
        <Button label="Voltar aos pedidos" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Acompanhar pedido" back />
      <View style={styles.statusCard}>
        <Text style={styles.kicker}>PEDIDO #{order.id}</Text>
        <Text style={styles.status}>{order.status}</Text>
        <Text style={styles.message}>
          {order.status === "Cancelado"
            ? "Este pedido foi cancelado."
            : order.status === "Em preparo"
            ? "Seu pedido está sendo preparado com carinho."
            : order.status === "Pronto"
              ? "Seu pedido está pronto e aguardando envio."
              : order.status === "Enviado para entrega"
                ? "Seu pedido saiu para entrega."
                : "Seu pedido foi entregue. Aproveite!"}
        </Text>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Resumo do pedido</Text>
        <Text style={styles.item}>{order.item}</Text>
        {order.notes ? (
          <Text style={styles.address}>Observações: {order.notes}</Text>
        ) : null}
        <View style={styles.line}>
          <Text>Total</Text>
          <Text style={styles.total}>{money(order.total)}</Text>
        </View>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Entrega</Text>
        <Text style={styles.address}>
          {clientProfile.address || "Endereço não informado no perfil."}
        </Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: "#eaf4ec",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },
  kicker: {
    color: colors.green,
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },
  status: { color: colors.ink, fontSize: 24, fontWeight: "800", marginTop: 7 },
  message: { color: colors.muted, marginTop: 6 },
  label: { color: colors.ink, fontWeight: "800", fontSize: 16 },
  item: { color: colors.muted, marginTop: 14 },
  line: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 17,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: { color: colors.accent, fontWeight: "800" },
  address: { color: colors.muted, lineHeight: 23, marginTop: 12 },
});
