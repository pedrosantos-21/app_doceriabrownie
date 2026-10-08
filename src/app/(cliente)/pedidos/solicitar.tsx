import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, colors, Field, Header, Screen } from "../../../components/ui";
import { products } from "../../../data/mock";
import { useOrders } from "../../../context/OrdersContext";

export default function RequestItem() {
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const product = products.find((item) => item.id === productId);
  const { createOrder, isOrdersLoaded } = useOrders();
  const [item, setItem] = useState(product?.name ?? "");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRequest = async () => {
    const count = Number(quantity);
    if (!item.trim()) {
      Alert.alert("Informe o item", "Digite o nome do doce que deseja solicitar.");
      return;
    }
    if (!Number.isInteger(count) || count < 1) {
      Alert.alert("Quantidade inválida", "Informe uma quantidade inteira maior que zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createOrder({
        item: item.trim(),
        quantity: count,
        total: (product?.price ?? 0) * count,
        notes,
      });
      router.replace("/(cliente)/pedidos" as never);
    } catch (error) {
      Alert.alert(
        "Não foi possível enviar o pedido",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOrdersLoaded) {
    return (
      <Screen>
        <Header title="Solicitar item" subtitle="Carregando pedidos" back />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Solicitar item"
        subtitle="Conte o que você gostaria"
        back
      />
      <Field
        label="Item desejado"
        value={item}
        onChangeText={setItem}
        placeholder="Ex.: Brownie sem açúcar"
      />
      <Field
        label="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="number-pad"
      />
      <Field
        label="Observações"
        value={notes}
        onChangeText={setNotes}
        placeholder="Alguma preferência ou restrição?"
        multiline
      />
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Vamos analisar seu pedido</Text>
        <Text style={styles.noteText}>
          A equipe responde pelo WhatsApp assim que receber sua solicitação.
        </Text>
      </View>
      <Button
        label={isSubmitting ? "Enviando..." : "Enviar solicitação"}
        onPress={submitRequest}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  note: {
    backgroundColor: colors.pale,
    borderRadius: 14,
    padding: 15,
    marginBottom: 22,
  },
  noteTitle: { color: colors.ink, fontWeight: "800" },
  noteText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
});
