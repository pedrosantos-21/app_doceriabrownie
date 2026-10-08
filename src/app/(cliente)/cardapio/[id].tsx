import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { money } from "../../../data/mock";
import { Button, colors, Header, Screen } from "../../../components/ui";
import { useCatalog } from "../../../context/CatalogContext";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, isCatalogLoaded } = useCatalog();
  const product = products.find((item) => item.id === id);

  if (!isCatalogLoaded) {
    return (
      <Screen>
        <Header title="Cardápio" subtitle="Carregando item" back />
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  if (!product) {
    return (
      <Screen>
        <Header title="Item não encontrado" back />
        <Text style={styles.description}>
          Este produto não está mais disponível no cardápio.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Detalhe do item" back />
      <View style={[styles.cover, { backgroundColor: product.color }]}>
        {product.photoUri ? (
          <Image source={{ uri: product.photoUri }} style={styles.coverImage} />
        ) : (
          <Text style={styles.mark}>DOCERIA{`\n`}BROWNIE</Text>
        )}
      </View>
      <Text style={styles.category}>
        {product.category} · {product.prepTime}
      </Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{money(product.price)}</Text>
        <Text style={styles.available}>Disponível hoje</Text>
      </View>
      <Button
        label="Solicitar este item"
        onPress={() =>
          router.push(
            `/(cliente)/pedidos/solicitar?productId=${product.id}` as never,
          )
        }
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  cover: {
    height: 220,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  mark: {
    color: colors.white,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
  },
  category: { color: colors.accent, fontWeight: "800", fontSize: 12 },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800", marginTop: 8 },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 26,
  },
  price: { color: colors.accent, fontSize: 24, fontWeight: "900" },
  available: { color: colors.green, fontWeight: "700" },
});
