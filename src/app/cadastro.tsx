import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, colors, Field, Screen } from "../components/ui";
import { useProfile, type ClientProfile } from "../context/ProfileContext";

export default function CadastroScreen() {
  const {
    isClientAccountsLoaded,
    isClientProfileLoaded,
    registerClient,
  } = useProfile();
  const [profile, setProfile] = useState<ClientProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProfile = (key: keyof ClientProfile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const submit = async () => {
    if (!profile.name.trim() || !profile.email.trim() || !profile.phone.trim()) {
      Alert.alert("Campos obrigatórios", "Informe nome, e-mail e telefone.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      Alert.alert("E-mail inválido", "Confira o endereço informado.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Senha inválida", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerClient(profile, password);
      router.replace("/(cliente)/cardapio" as never);
    } catch (error) {
      Alert.alert(
        "Não foi possível criar a conta",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>‹ Voltar</Text>
      </Pressable>
      <Text style={styles.kicker}>NOVO CLIENTE</Text>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>
        Tenha seus pedidos e favoritos sempre por perto.
      </Text>
      <View style={styles.form}>
        <Field
          label="Nome completo"
          value={profile.name}
          onChangeText={(value) => updateProfile("name", value)}
          placeholder="Como podemos chamar você?"
          autoCapitalize="words"
        />
        <Field
          label="E-mail"
          value={profile.email}
          onChangeText={(value) => updateProfile("email", value)}
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Field
          label="Telefone"
          value={profile.phone}
          onChangeText={(value) => updateProfile("phone", value)}
          placeholder="(00) 00000-0000"
          keyboardType="phone-pad"
        />
        <Field
          label="Endereço (opcional)"
          value={profile.address}
          onChangeText={(value) => updateProfile("address", value)}
          placeholder="Rua, número e bairro"
        />
        <Field
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo de 6 caracteres"
          secureTextEntry
        />
        <Button
          label={isSubmitting ? "Criando conta..." : "Criar conta"}
          onPress={submit}
          disabled={
            isSubmitting || !isClientAccountsLoaded || !isClientProfileLoaded
          }
        />
      </View>
      <Text style={styles.foot}>
        Cadastro local de demonstração. Seus dados ficam apenas neste dispositivo; não há autenticação de servidor.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    color: colors.accent,
    fontWeight: "800",
    marginBottom: 48,
    fontSize: 15,
  },
  kicker: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: { color: colors.ink, fontSize: 34, fontWeight: "800", marginTop: 8 },
  subtitle: { color: colors.muted, lineHeight: 21, marginTop: 8 },
  form: { marginTop: 32 },
  foot: {
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 18,
  },
});
