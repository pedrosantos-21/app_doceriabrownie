<<<<<<< Updated upstream
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
=======
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../components/ui';
>>>>>>> Stashed changes

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>Doceria Brownie</Text>
        <Text style={styles.title}>
          Adoce seu dia com pedidos mais rápidos e bonitos.
        </Text>
        <Text style={styles.subtitle}>
          Controle estoque, acompanhe vendas e receba pedidos com uma
          experiência premium.
        </Text>

        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Pedido do dia</Text>
          <Text style={styles.previewValue}>12 brownies gourmet</Text>
          <Text style={styles.previewMeta}>R$ 348,00 • Entrega em 45 min</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.primaryButtonText}>Entrar no painel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    backgroundColor: "#fffaf4",
    justifyContent: "center",
    alignItems: "center",
=======
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> Stashed changes
    padding: 24,
  },
  heroCard: {
    width: "100%",
    maxWidth: 420,
<<<<<<< Updated upstream
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    shadowColor: "#b6784d",
=======
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 28,
    shadowColor: colors.accent,
>>>>>>> Stashed changes
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  badge: {
<<<<<<< Updated upstream
    alignSelf: "flex-start",
    backgroundColor: "#f9e7d8",
    color: "#8e4f29",
=======
    alignSelf: 'flex-start',
    backgroundColor: colors.pale,
    color: colors.accent,
>>>>>>> Stashed changes
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 32,
<<<<<<< Updated upstream
    fontWeight: "800",
    color: "#2b1b17",
=======
    fontWeight: '800',
    color: colors.ink,
>>>>>>> Stashed changes
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
<<<<<<< Updated upstream
    color: "#6d5149",
  },
  previewBox: {
    marginTop: 26,
    backgroundColor: "#fff1e8",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f4d5bc",
  },
  previewLabel: {
    color: "#8a5639",
=======
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
>>>>>>> Stashed changes
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  previewValue: {
    marginTop: 8,
    fontSize: 22,
<<<<<<< Updated upstream
    fontWeight: "700",
    color: "#2b1b17",
  },
  previewMeta: {
    marginTop: 6,
    color: "#7d5a4d",
=======
    fontWeight: '700',
    color: colors.ink,
  },
  previewMeta: {
    marginTop: 6,
    color: colors.muted,
>>>>>>> Stashed changes
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 28,
<<<<<<< Updated upstream
    backgroundColor: "#d96f3d",
=======
    backgroundColor: colors.accent,
>>>>>>> Stashed changes
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
<<<<<<< Updated upstream
    color: "#fff",
=======
    color: colors.white,
>>>>>>> Stashed changes
    fontSize: 16,
    fontWeight: "700",
  },
});
