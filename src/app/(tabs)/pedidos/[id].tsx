import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { orders, money } from "../../../data/mock";
import {
  Button,
  colors,
  Header,
  Screen,
  styles as ui,
} from "../../../components/ui";

<<<<<<< Updated upstream
export default function OrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = orders.find((item) => item.id === id) || orders[0];
  return (
    <Screen>
      <Header title="Detalhe do pedido" subtitle={`Pedido #${order.id}`} back />
      <View style={styles.summary}>
        <View>
          <Text style={styles.customer}>{order.customer}</Text>
          <Text style={styles.time}>{order.time}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Itens do pedido</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>{order.item}</Text>
          <Text style={styles.total}>{money(order.total)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.muted}>Total</Text>
          <Text style={styles.total}>{money(order.total)}</Text>
        </View>
      </View>
      <View style={ui.card}>
        <Text style={styles.label}>Dados de entrega</Text>
        <Text style={styles.muted}>
          Rua das Flores, 120{`\n`}São Paulo - SP{`\n`}Pagamento via Pix
        </Text>
      </View>
      <Button label="Marcar como pronto" onPress={() => {}} />
      <Pressable>
        <Text style={styles.cancel}>Cancelar pedido</Text>
      </Pressable>
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
  cancel: {
    textAlign: "center",
    color: "#ae5145",
    fontWeight: "800",
    marginTop: 18,
  },
});
=======
export default function OrderDetail() { const { id } = useLocalSearchParams<{ id: string }>(); const order = orders.find((item) => item.id === id) || orders[0]; return <Screen><Header title="Detalhe do pedido" subtitle={`Pedido #${order.id}`} back /><View style={styles.summary}><View><Text style={styles.customer}>{order.customer}</Text><Text style={styles.time}>{order.time}</Text></View><Text style={styles.status}>{order.status}</Text></View><View style={ui.card}><Text style={styles.label}>Itens do pedido</Text><View style={styles.item}><Text style={styles.itemText}>{order.item}</Text><Text style={styles.total}>{money(order.total)}</Text></View><View style={styles.line}><Text style={styles.muted}>Total</Text><Text style={styles.total}>{money(order.total)}</Text></View></View><View style={ui.card}><Text style={styles.label}>Dados de entrega</Text><Text style={styles.muted}>Rua das Flores, 120{`\n`}São Paulo - SP{`\n`}Pagamento via Pix</Text></View><Button label="Marcar como pronto" onPress={() => {}} /><Pressable><Text style={styles.cancel}>Cancelar pedido</Text></Pressable></Screen>; }
const styles = StyleSheet.create({ summary: { backgroundColor: colors.pale, borderRadius: 18, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }, customer: { color: colors.ink, fontWeight: '800', fontSize: 18 }, time: { color: colors.muted, marginTop: 5, fontSize: 12 }, status: { color: colors.green, fontWeight: '800', fontSize: 12 }, label: { color: colors.ink, fontWeight: '800', fontSize: 16, marginBottom: 16 }, item: { flexDirection: 'row', justifyContent: 'space-between' }, itemText: { color: colors.muted, flex: 1 }, total: { color: colors.accent, fontWeight: '800' }, line: { borderTopWidth: 1, borderTopColor: colors.line, marginTop: 16, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between' }, muted: { color: colors.muted, lineHeight: 24 }, cancel: { textAlign: 'center', color: colors.accent, fontWeight: '800', marginTop: 18 } });
>>>>>>> Stashed changes
