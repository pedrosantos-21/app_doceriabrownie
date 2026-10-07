import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../components/ui';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>Doceria Brownie</Text>
        <Text style={styles.title}>Adoce seu dia com pedidos mais rápidos e bonitos.</Text>
        <Text style={styles.subtitle}>
          Controle estoque, acompanhe vendas e receba pedidos com uma experiência premium.
        </Text>

        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Pedido do dia</Text>
          <Text style={styles.previewValue}>12 brownies gourmet</Text>
          <Text style={styles.previewMeta}>R$ 348,00 • Entrega em 45 min</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login')}>
          <Text style={styles.primaryButtonText}>Entrar no painel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heroCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 28,
    shadowColor: colors.accent,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.pale,
    color: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: '800',
    color: colors.ink,
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  previewBox: {
    marginTop: 26,
    backgroundColor: colors.pale,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line,
  },
  previewLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  previewValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '700',
    color: colors.ink,
  },
  previewMeta: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 28,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
