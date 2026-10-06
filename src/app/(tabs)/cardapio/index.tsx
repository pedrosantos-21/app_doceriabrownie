import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { products, money } from "../../../data/mock";
import { Button } from "../../../components/ui";

export default function CardapioTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cardápio</Text>
      <View style={styles.titleRow}>
        <Text style={styles.subtitle}>Seleção especial da semana</Text>
        <Button
          label="Novo item"
          icon="plus"
          onPress={() => router.push("/(tabs)/cardapio/novo" as never)}
        />
      </View>

      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() =>
            router.push(`/(tabs)/cardapio/novo?id=${item.id}` as never)
          }
          style={styles.card}
        >
          <View
            style={[styles.imagePlaceholder, { backgroundColor: item.color }]}
          >
            <Text style={styles.imageText}>DB</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.meta}>Tempo de preparo: {item.prepTime}</Text>
            <View style={styles.footer}>
              <Text style={styles.preco}>{money(item.price)}</Text>
              <Text style={styles.pill}>Disponível</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf6",
  },
  content: {
    padding: 24,
    paddingTop: 52,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2a1b1a",
  },
  subtitle: {
    marginTop: 8,
    color: "#785c53",
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
    backgroundColor: "#fff",
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
    backgroundColor: "#f6d7c2",
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: "#fff2e8",
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
    color: "#2a1b1a",
  },
  meta: {
    marginTop: 8,
    color: "#7d5c51",
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
    color: "#d96f3d",
  },
  pill: {
    backgroundColor: "#f3ebd6",
    color: "#7a6224",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
