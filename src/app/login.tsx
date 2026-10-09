import { Formik } from "formik";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import { colors } from "../components/ui";
import { useProfile } from "../context/ProfileContext";

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Informe seu e-mail.")
    .email("Digite um e-mail válido."),
  senha: Yup.string()
    .required("Informe sua senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [clientMode, setClientMode] = useState(false);
  const {
    authenticateClient,
    clientProfile,
    isClientAccountsLoaded,
    isClientProfileLoaded,
  } = useProfile();
  const isClientDataLoaded =
    isClientAccountsLoaded && isClientProfileLoaded;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>DOCERIA BROWNIE</Text>
        <Text style={styles.title}>
          {clientMode ? "Entrar para pedir" : "Entrar no painel"}
        </Text>

        <Formik
          initialValues={{ email: "admin@doceria.com", senha: "123456" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setFieldError, setSubmitting }) => {
            try {
              if (
                !clientMode &&
                values.email === "admin@doceria.com" &&
                values.senha === "123456"
              ) {
                router.replace("/(tabs)/home" as never);
                return;
              }
              if (clientMode && isClientDataLoaded) {
                const authenticated = await authenticateClient(
                  values.email,
                  values.senha,
                );
                if (authenticated) {
                  router.replace("/(cliente)/cardapio" as never);
                  return;
                }
              }
              setFieldError(
                "senha",
                clientMode && !isClientDataLoaded
                  ? "Aguarde o carregamento dos dados locais."
                  : "E-mail ou senha incorretos.",
              );
            } catch (error) {
              setFieldError(
                "senha",
                error instanceof Error
                  ? error.message
                  : "Não foi possível entrar.",
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldError,
          }) => (
            <>
              <View style={styles.modeRow}>
                <Pressable
                  onPress={() => {
                    setClientMode(false);
                    setFieldValue("email", "admin@doceria.com");
                    setFieldValue("senha", "123456");
                    setFieldError("senha", undefined);
                  }}
                  style={[styles.mode, !clientMode && styles.modeActive]}
                >
                  <Text
                    style={[
                      styles.modeText,
                      !clientMode && styles.modeTextActive,
                    ]}
                  >
                    Gestor
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setClientMode(true);
                    setFieldValue("email", clientProfile.email);
                    setFieldValue("senha", "");
                    setFieldError("senha", undefined);
                  }}
                  style={[styles.mode, clientMode && styles.modeActive]}
                >
                  <Text
                    style={[
                      styles.modeText,
                      clientMode && styles.modeTextActive,
                    ]}
                  >
                    Cliente
                  </Text>
                </Pressable>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="seu@email.com"
                    style={[
                      styles.input,
                      touched.email && errors.email ? styles.inputError : null,
                    ]}
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Senha</Text>
                  <View style={styles.passwordRow}>
                    <TextInput
                      value={values.senha}
                      onChangeText={handleChange("senha")}
                      onBlur={handleBlur("senha")}
                      secureTextEntry={!showPassword}
                      placeholder="Sua senha"
                      style={[
                        styles.input,
                        { flex: 1 },
                        touched.senha && errors.senha
                          ? styles.inputError
                          : null,
                      ]}
                    />
                    <Pressable
                      onPress={() => setShowPassword((previous) => !previous)}
                      style={styles.visibilityButton}
                    >
                      <Text style={styles.visibilityText}>
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </Text>
                    </Pressable>
                  </View>
                  {touched.senha && errors.senha ? (
                    <Text style={styles.errorText}>{errors.senha}</Text>
                  ) : null}
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { opacity: pressed || isSubmitting ? 0.85 : 1 },
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  <Text style={styles.primaryButtonText}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
                  </Text>
                </Pressable>

                {clientMode ? (
                  <>
                    <Pressable onPress={() => router.push("/cadastro" as never)}>
                      <Text style={styles.registerText}>
                        Ainda não tenho cadastro
                      </Text>
                    </Pressable>
                    <Text style={styles.helperText}>
                      Contas de demonstração ficam salvas apenas neste dispositivo.
                    </Text>
                  </>
                ) : (
                  <Text style={styles.helperText}>
                    Use admin@doceria.com / 123456 para testar.
                  </Text>
                )}
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  eyebrow: {
    color: colors.accent,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
  },
  title: { marginTop: 8, fontSize: 30, fontWeight: "800", color: colors.ink },
  form: { marginTop: 22 },
  modeRow: {
    flexDirection: "row",
    backgroundColor: colors.pale,
    borderRadius: 12,
    padding: 4,
    marginTop: 22,
  },
  mode: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 9 },
  modeActive: { backgroundColor: colors.white },
  modeText: { color: colors.muted, fontWeight: "700" },
  modeTextActive: { color: colors.accent },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: "600", color: colors.ink, marginBottom: 8 },
  input: {
    backgroundColor: colors.bg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  inputError: { borderColor: "#d65d4a" },
  errorText: { marginTop: 6, color: "#d65d4a", fontSize: 12 },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  visibilityButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.pale,
  },
  visibilityText: { color: colors.accent, fontWeight: "600" },
  primaryButton: {
    marginTop: 12,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: "700" },
  helperText: {
    marginTop: 16,
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
  },
  registerText: {
    marginTop: 16,
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
});
