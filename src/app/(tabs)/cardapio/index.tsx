import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import { money, type Product } from "../../../data/mock";
import { Button, colors } from "../../../components/ui";
import { useCatalog } from "../../../context/CatalogContext";

export default function CardapioTab() {
  const { products } = useCatalog();

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push(`/(tabs)/cardapio/novo?id=${item.id}` as never)
      }
      style={styles.card}
    >
      {item.photoUri ? (
        <Image source={{ uri: item.photoUri }} style={styles.productImage} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: item.color }]}>
          <Text style={styles.imageText}>DB</Text>
        </View>
      )}

      <View style={styles.cardContent}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.meta}>Tempo de preparo: {item.prepTime}</Text>

        <View style={styles.footer}>
          <Text style={styles.preco}>{money(item.price)}</Text>
          <Text style={styles.pill}>Disponível</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Cardápio</Text>
          <View style={styles.titleRow}>
            <Text style={styles.subtitle}>Seleção especial da semana</Text>
            <Button
              label="Novo item"
              icon="plus"
              onPress={() => router.push("/(tabs)/cardapio/novo" as never)}
            />
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 24,
    paddingTop: 52,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.ink,
  },
  subtitle: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  imagePlaceholder: {
    width: 100,
    height: 110,
    backgroundColor: colors.pale,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 100,
    height: 110,
  },
  imageText: {
    color: colors.accent,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.ink,
  },
  meta: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preco: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.accent,
  },
  pill: {
    backgroundColor: "#e6efe8",
    color: colors.green,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
