import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
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
  const { orders, isOrdersLoaded, updateOrderStatus, cancelOrder } = useOrders();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCancellationVisible, setIsCancellationVisible] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
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
    setActionError(null);
    try {
      await updateOrderStatus(order.id, status);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o pedido. Tente novamente.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmCancellation = async () => {
    setIsUpdating(true);
    setActionError(null);
    try {
      await cancelOrder(order.id);
      setIsCancellationVisible(false);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Não foi possível cancelar o pedido. Tente novamente.",
      );
    } finally {
      setIsUpdating(false);
    }
  };
  const isFinal = order.status === "Entregue" || order.status === "Cancelado";

  return (
    <Screen>
      <Header title="Detalhe do pedido" subtitle={`Pedido #${order.id}`} back />
      <View style={styles.summary}>
        <View>
          <Text style={styles.customer}>{order.customer}</Text>
          <Text style={styles.time}>{order.time}</Text>
        </View>
        <Text style={[styles.status, order.status === "Cancelado" && styles.cancelled]}>
          {order.status}
        </Text>
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
          {order.customerEmail
            ? `Contato do cliente: ${order.customerEmail}\n`
            : ""}
          Combine endereço e pagamento diretamente com o cliente.
        </Text>
      </View>
      {actionError ? <Text style={styles.actionError}>{actionError}</Text> : null}
      {!isFinal ? (
        <>
          <Text style={styles.statusHeading}>Atualizar status do pedido</Text>
          <Button
            label={
              !isOrdersLoaded
                ? "Carregando..."
                : isUpdating
                  ? "Salvando..."
                  : "Em preparo"
            }
            secondary={order.status !== "Em preparo"}
            disabled={
              !isOrdersLoaded || isUpdating || order.status === "Em preparo"
            }
            onPress={() => setStatus("Em preparo")}
          />
          <View style={styles.statusButton}>
            <Button
              label={
                !isOrdersLoaded
                  ? "Carregando..."
                  : isUpdating
                    ? "Salvando..."
                    : "Marcar como pronto"
              }
              secondary={order.status !== "Pronto"}
              disabled={!isOrdersLoaded || isUpdating || order.status === "Pronto"}
              onPress={() => setStatus("Pronto")}
            />
          </View>
          <View style={styles.statusButton}>
            <Button
              label={
                !isOrdersLoaded
                  ? "Carregando..."
                  : isUpdating
                    ? "Salvando..."
                    : "Enviar para entrega"
              }
              secondary={order.status !== "Enviado para entrega"}
              disabled={
                !isOrdersLoaded ||
                isUpdating ||
                order.status === "Enviado para entrega"
              }
              onPress={() => setStatus("Enviado para entrega")}
            />
          </View>
          {order.status === "Enviado para entrega" ? (
            <View style={styles.statusButton}>
              <Button
                label={
                  !isOrdersLoaded
                    ? "Carregando..."
                    : isUpdating
                      ? "Salvando..."
                      : "Marcar como entregue"
                }
                onPress={() => setStatus("Entregue")}
                disabled={!isOrdersLoaded || isUpdating}
              />
            </View>
          ) : null}
          <Pressable
            disabled={!isOrdersLoaded || isUpdating}
            onPress={() => setIsCancellationVisible(true)}
          >
            <Text style={styles.cancel}>Cancelar pedido</Text>
          </Pressable>
        </>
      ) : null}
      <Modal
        visible={isCancellationVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCancellationVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmation}>
            <Text style={styles.confirmationTitle}>Cancelar pedido?</Text>
            <Text style={styles.confirmationMessage}>
              O cliente verá que este pedido foi cancelado.
            </Text>
            {actionError ? (
              <Text style={styles.confirmationError}>{actionError}</Text>
            ) : null}
            <View style={styles.confirmationActions}>
              <Pressable
                accessibilityRole="button"
                disabled={isUpdating}
                onPress={() => setIsCancellationVisible(false)}
                style={[styles.confirmationButton, styles.keepButton]}
              >
                <Text style={styles.keepButtonText}>Manter pedido</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={isUpdating}
                onPress={() => void confirmCancellation()}
                style={[styles.confirmationButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>
                  {isUpdating ? "Cancelando..." : "Cancelar pedido"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  cancelled: { color: colors.accent },
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
  actionError: {
    color: "#b42318",
    backgroundColor: "#fff0ee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 12, 18, 0.55)",
    padding: 24,
  },
  confirmation: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 22,
  },
  confirmationTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
  },
  confirmationMessage: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 8,
  },
  confirmationError: {
    color: "#b42318",
    marginTop: 12,
    lineHeight: 20,
  },
  confirmationActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22,
  },
  confirmationButton: {
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  keepButton: { backgroundColor: colors.pale },
  keepButtonText: { color: colors.accent, fontWeight: "800" },
  cancelButton: { backgroundColor: colors.accent },
  cancelButtonText: { color: colors.white, fontWeight: "800" },
});
