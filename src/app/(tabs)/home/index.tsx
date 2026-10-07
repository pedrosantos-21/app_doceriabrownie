import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors } from '../../../components/ui';

const stats = [
  { label: 'Vendas', value: 'R$ 4.280', color: '#f2d9e0' },
  { label: 'Pedidos', value: '128', color: '#f5e3e8' },
  { label: 'Clientes', value: '96', color: '#f8edf0' },
];

const highlights = [
  { title: 'Brownie de Nutella', subtitle: 'Mais vendido', badge: '18 un.' },
  { title: 'Cupcake de morango', subtitle: 'Em alta', badge: '12 un.' },
  { title: 'Cookie de chocolate', subtitle: 'Pedido do dia', badge: '9 un.' },
];

export default function HomeTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Bom dia, Fernanda</Text>
      <Text style={styles.title}>Seu painel da doceria</Text>

      <View style={styles.rowCards}>
        {stats.map((item) => (
          <View key={item.label} style={[styles.statCard, { backgroundColor: item.color }]}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mais pedidos</Text>
        <Pressable>
          <Text style={styles.sectionLink}>Ver tudo</Text>
        </Pressable>
      </View>

      <View style={styles.listCard}>
        {highlights.map((item) => (
          <View key={item.title} style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.productBadge}>{item.badge}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 24,
    paddingTop: 56,
  },
  greeting: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
    color: colors.ink,
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
  },
  statValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
    color: colors.ink,
  },
  sectionHeader: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
  },
  sectionLink: {
    color: colors.accent,
    fontWeight: '700',
  },
  listCard: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  productSubtitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
  },
  productBadge: {
    backgroundColor: colors.pale,
    color: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '700',
    fontSize: 12,
  },
});
