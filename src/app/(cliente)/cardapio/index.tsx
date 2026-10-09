import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMemo, useState } from "react";
import { money, type Product } from "../../../data/mock";
import { colors, Header, styles as ui } from "../../../components/ui";
import { useCatalog } from "../../../context/CatalogContext";

export default function ClientMenu() {
  const { products } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const categories = [
    "Todos",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  const visibleProducts = useMemo(
    () =>
      selectedCategory === "Todos"
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => router.push(`/(cliente)/cardapio/${item.id}` as never)}
      style={ui.card}
    >
      {item.photoUri ? (
        <Image source={{ uri: item.photoUri }} style={styles.productImage} />
      ) : (
        <View style={[styles.productImage, { backgroundColor: item.color }]}>
          <Text style={styles.productMark}>DB</Text>
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.price}>{money(item.price)}</Text>
      </View>

      <Text style={styles.plus}>+</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={visibleProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 22, paddingTop: 54, paddingBottom: 34 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Header
            title="Olá, Ana"
            subtitle="Escolha um doce para hoje"
            action={
              <Pressable style={styles.bag}>
                <Text>0</Text>
              </Pressable>
            }
          />

          <View style={styles.hero}>
            <Text style={styles.heroKicker}>FEITO COM CARINHO</Text>
            <Text style={styles.heroTitle}>Seu momento doce começa aqui.</Text>
            <Text style={styles.heroText}>
              Brownies, cookies e sabores que abraçam.
            </Text>
          </View>

          <Text style={ui.sectionTitle}>
            {selectedCategory === "Todos" ? "Mais pedidos" : selectedCategory}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => {
              const selected = selectedCategory === category;
              return (
                <Pressable
                  key={category}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    selected && styles.categoryButtonActive,
                  ]}
                >
                  <Text
                    style={[styles.category, selected && styles.categoryActive]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          Nenhum produto nesta categoria no momento.
        </Text>
      }
    />
  );
}
const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#7f263f",
    borderRadius: 20,
    padding: 20,
    marginBottom: 26,
  },
  heroKicker: {
    color: "#f4dce3",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  heroTitle: {
    color: "#fff8f6",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 10,
    maxWidth: 240,
  },
  heroText: { color: "#edcbd5", marginTop: 7 },
  categories: { gap: 10, paddingRight: 8, marginVertical: 16 },
  categoryButton: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.white,
  },
  categoryButtonActive: { backgroundColor: colors.pale },
  categoryActive: { color: colors.accent, fontWeight: "800" },
  category: { color: colors.muted },
  productImage: {
    width: 78,
    height: 78,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  productMark: { color: "#fff8f6", fontWeight: "900", letterSpacing: 1 },
  productInfo: { flex: 1, paddingLeft: 14 },
  productName: { color: colors.ink, fontWeight: "800", fontSize: 16 },
  productDescription: { color: colors.muted, fontSize: 12, marginTop: 5 },
  price: { color: colors.accent, fontWeight: "800", marginTop: 8 },
  plus: {
    backgroundColor: colors.pale,
    color: colors.accent,
    fontSize: 22,
    fontWeight: "700",
    width: 30,
    height: 30,
    textAlign: "center",
    borderRadius: 15,
  },
  bag: {
    backgroundColor: colors.pale,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: { color: colors.muted, textAlign: "center", marginTop: 20 },
});
