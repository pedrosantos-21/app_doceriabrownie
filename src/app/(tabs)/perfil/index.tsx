<<<<<<< Updated upstream
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
=======
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../../components/ui';
>>>>>>> Stashed changes

export default function PerfilTab() {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>F</Text>
        </View>
        <Text style={styles.name}>Fernanda Souza</Text>
        <Text style={styles.role}>Gerente da Doceria</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Dados da loja</Text>
        <Text style={styles.infoText}>Loja: Doceria Brownie</Text>
        <Text style={styles.infoText}>Telefone: (11) 99888-7777</Text>
        <Text style={styles.infoText}>Endereço: Rua do Chocolate, 45</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/perfil/editar" as never)}
      >
        <Text style={styles.buttonText}>Editar dados</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.logoutButton]}
        onPress={() => router.replace("/login")}
      >
        <Text style={[styles.buttonText, styles.logoutText]}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    backgroundColor: "#fffaf6",
=======
    backgroundColor: colors.bg,
>>>>>>> Stashed changes
    padding: 24,
    justifyContent: "center",
  },
  profileCard: {
<<<<<<< Updated upstream
    backgroundColor: "#fff",
=======
    backgroundColor: colors.white,
>>>>>>> Stashed changes
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
<<<<<<< Updated upstream
    backgroundColor: "#f5d5bb",
    justifyContent: "center",
    alignItems: "center",
=======
    backgroundColor: colors.pale,
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> Stashed changes
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
<<<<<<< Updated upstream
    fontWeight: "800",
    color: "#8e4d29",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2a1b1a",
  },
  role: {
    marginTop: 6,
    color: "#7a5c53",
=======
    fontWeight: '800',
    color: colors.accent,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
  },
  role: {
    marginTop: 6,
    color: colors.muted,
>>>>>>> Stashed changes
    fontSize: 14,
  },
  infoCard: {
    marginTop: 24,
<<<<<<< Updated upstream
    backgroundColor: "#fff",
=======
    backgroundColor: colors.white,
>>>>>>> Stashed changes
    borderRadius: 22,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
<<<<<<< Updated upstream
    fontWeight: "800",
    color: "#2a1b1a",
    marginBottom: 12,
  },
  infoText: {
    color: "#5e4139",
=======
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 12,
  },
  infoText: {
    color: colors.muted,
>>>>>>> Stashed changes
    fontSize: 15,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
<<<<<<< Updated upstream
    backgroundColor: "#d96f3d",
=======
    backgroundColor: colors.accent,
>>>>>>> Stashed changes
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 10,
<<<<<<< Updated upstream
    backgroundColor: "#f1ddd7",
  },
  logoutText: {
    color: "#ae5145",
  },
  buttonText: {
    color: "#fff",
=======
    backgroundColor: colors.pale,
  },
  logoutText: {
    color: colors.accent,
  },
  buttonText: {
    color: colors.white,
>>>>>>> Stashed changes
    fontSize: 16,
    fontWeight: "700",
  },
});
