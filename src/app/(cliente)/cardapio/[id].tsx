import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { products, money } from "../../../data/mock";
import { Button, colors, Header, Screen } from "../../../components/ui";

<<<<<<< Updated upstream
export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id) || products[0];
  return (
    <Screen>
      <Header title="Detalhe do item" back />
      <View style={[styles.cover, { backgroundColor: product.color }]}>
        <Text style={styles.mark}>DOCERIA{`\n`}BROWNIE</Text>
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
        onPress={() => router.push("/(cliente)/pedidos/solicitar" as never)}
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
  mark: {
    color: "#fff5ed",
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
=======
export default function ProductDetail() { const { id } = useLocalSearchParams<{ id: string }>(); const product = products.find((item) => item.id === id) || products[0]; return <Screen><Header title="Detalhe do item" back /><View style={[styles.cover, { backgroundColor: product.color }]}><Text style={styles.mark}>DOCERIA{`\n`}BROWNIE</Text></View><Text style={styles.category}>{product.category} · {product.prepTime}</Text><Text style={styles.title}>{product.name}</Text><Text style={styles.description}>{product.description}</Text><View style={styles.row}><Text style={styles.price}>{money(product.price)}</Text><Text style={styles.available}>Disponível hoje</Text></View><Button label="Solicitar este item" onPress={() => router.push('/(cliente)/pedidos/solicitar' as never)} /></Screen>; }
const styles = StyleSheet.create({ cover: { height: 220, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 22 }, mark: { color: colors.white, textAlign: 'center', fontSize: 24, fontWeight: '900', letterSpacing: 2 }, category: { color: colors.accent, fontWeight: '800', fontSize: 12 }, title: { color: colors.ink, fontSize: 30, fontWeight: '800', marginTop: 8 }, description: { color: colors.muted, fontSize: 15, lineHeight: 23, marginTop: 12 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 26 }, price: { color: colors.accent, fontSize: 24, fontWeight: '900' }, available: { color: colors.green, fontWeight: '700' } });
>>>>>>> Stashed changes
