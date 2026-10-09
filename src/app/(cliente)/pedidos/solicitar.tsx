import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, colors, Field, Header, Screen } from "../../../components/ui";
import { useCatalog } from "../../../context/CatalogContext";
import { useOrders } from "../../../context/OrdersContext";
import { useProfile } from "../../../context/ProfileContext";

export default function RequestItem() {
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const { products } = useCatalog();
  const product = products.find((item) => item.id === productId);
  const { createOrder, isOrdersLoaded } = useOrders();
  const { clientProfile, isClientProfileLoaded } = useProfile();
  const [item, setItem] = useState(product?.name ?? "");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRequest = async () => {
    const count = Number(quantity);
    const selectedProduct = products.find(
      (candidate) => candidate.name.trim().toLocaleLowerCase("pt-BR") === item.trim().toLocaleLowerCase("pt-BR"),
    );
    if (!selectedProduct) {
      Alert.alert(
        "Item sem preço cadastrado",
        "Para registrar um pedido local, escolha um produto do cardápio. Itens personalizados precisam de orçamento e não serão registrados com valor zero.",
      );
      return;
    }
    if (!Number.isInteger(count) || count < 1) {
      Alert.alert("Quantidade inválida", "Informe uma quantidade inteira maior que zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createOrder({
        customer: clientProfile.name,
        customerEmail: clientProfile.email,
        item: selectedProduct.name,
        quantity: count,
        total: selectedProduct.price * count,
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

  if (!isOrdersLoaded || !isClientProfileLoaded) {
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
        subtitle="Selecione um produto do cardápio"
        back
      />
      <Field
        label="Item desejado"
        value={item}
        onChangeText={setItem}
        placeholder="Produto cadastrado no cardápio"
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
        <Text style={styles.noteTitle}>Pedido local de demonstração</Text>
        <Text style={styles.noteText}>
          O preço e o produto são registrados neste dispositivo. Solicitações personalizadas dependem de orçamento e não são enviadas a um servidor.
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
