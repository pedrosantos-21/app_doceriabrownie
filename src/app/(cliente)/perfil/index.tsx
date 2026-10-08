import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, colors, Header, Screen, styles as ui } from '../../../components/ui';
import { useProfile } from '../../../context/ProfileContext';

export default function ClientProfile() {
  const { avatarUri, clientProfile } = useProfile();

  return (
    <Screen>
      <Header title="Meu perfil" subtitle="Suas informações" />

      <View style={styles.profile}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>A</Text>
          )}
        </View>
        <Text style={styles.name}>{clientProfile.name}</Text>
        <Text style={styles.email}>{clientProfile.email}</Text>
      </View>

      <View style={ui.card}>
        <Text style={styles.section}>Dados pessoais</Text>
        <Text style={styles.info}>Nome completo{`\n`}{clientProfile.name}</Text>
        <Text style={styles.info}>Telefone{`\n`}{clientProfile.phone}</Text>
        <Text style={styles.info}>Endereço{`\n`}{clientProfile.address}</Text>
        <Button
          label="Editar dados"
          secondary
          onPress={() => router.push('/(cliente)/perfil/editar' as never)}
        />
      </View>

      <Pressable onPress={() => router.replace('/login')}>
        <Text style={styles.logout}>Sair da conta</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatar: {
    backgroundColor: colors.pale,
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: '900',
  },
  name: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: '800',
    marginTop: 12,
  },
  email: {
    color: colors.muted,
    marginTop: 4,
  },
  section: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 14,
  },
  info: {
    color: colors.muted,
    lineHeight: 21,
    marginBottom: 14,
  },
  logout: {
    color: colors.accent,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 18,
  },
});
