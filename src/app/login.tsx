import { Formik } from 'formik';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string().required('Informe seu e-mail.').email('Digite um e-mail válido.'),
  senha: Yup.string().required('Informe sua senha.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Acesso do gestor</Text>
        <Text style={styles.title}>Entrar na Doceria</Text>

        <Formik
          initialValues={{ email: 'admin@doceria.com', senha: '123456' }}
          validationSchema={loginSchema}
          onSubmit={(values, { setFieldError, setSubmitting }) => {
            if (values.email === 'admin@doceria.com' && values.senha === '123456') {
              router.replace('/(tabs)/home');
            } else {
              setFieldError('senha', 'E-mail ou senha incorretos.');
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="seu@email.com"
                  style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                />
                {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    value={values.senha}
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    secureTextEntry={!showPassword}
                    placeholder="Sua senha"
                    style={[styles.input, { flex: 1 }, touched.senha && errors.senha ? styles.inputError : null]}
                  />
                  <Pressable onPress={() => setShowPassword((prev) => !prev)} style={styles.visibilityButton}>
                    <Text style={styles.visibilityText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
                  </Pressable>
                </View>
                {touched.senha && errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  { opacity: pressed || isSubmitting ? 0.85 : 1 },
                ]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                <Text style={styles.primaryButtonText}>{isSubmitting ? 'Entrando...' : 'Entrar'}</Text>
              </Pressable>

              <Text style={styles.helperText}>Dica: use admin@doceria.com / 123456 para testar.</Text>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5ef',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  eyebrow: {
    color: '#d96f3d',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
    color: '#2c1c1a',
  },
  form: {
    marginTop: 28,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a312d',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f3f1',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ead8d0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d1d1b',
  },
  inputError: {
    borderColor: '#d65d4a',
  },
  errorText: {
    marginTop: 6,
    color: '#d65d4a',
    fontSize: 12,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f4e4dc',
  },
  visibilityText: {
    color: '#8d5139',
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#d96f3d',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    marginTop: 16,
    color: '#7d5e57',
    fontSize: 12,
    textAlign: 'center',
  },
});
