import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../../components/ui';

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

      <Pressable style={styles.button} onPress={() => router.push('/(tabs)/perfil/editar' as never)}>
        <Text style={styles.buttonText}>Editar dados</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.logoutButton]} onPress={() => router.replace('/login')}>
        <Text style={[styles.buttonText, styles.logoutText]}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 24,
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.pale,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
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
    fontSize: 14,
  },
  infoCard: {
    marginTop: 24,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 12,
  },
  infoText: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: colors.pale,
  },
  logoutText: {
    color: colors.accent,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
