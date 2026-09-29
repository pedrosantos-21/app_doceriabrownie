import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, colors, Field, Screen } from '../components/ui';

export default function CadastroScreen() {
  return <Screen><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Voltar</Text></Pressable><Text style={styles.kicker}>NOVO CLIENTE</Text><Text style={styles.title}>Crie sua conta</Text><Text style={styles.subtitle}>Tenha seus pedidos e favoritos sempre por perto.</Text><View style={styles.form}><Field label="Nome completo" placeholder="Como podemos chamar você?" /><Field label="E-mail" placeholder="voce@email.com" /><Field label="Telefone" placeholder="(00) 00000-0000" /><Field label="Senha" placeholder="Mínimo de 6 caracteres" /><Button label="Criar conta" onPress={() => router.replace('/(cliente)/cardapio' as never)} /></View><Text style={styles.foot}>Ao continuar, você concorda com nossos termos de uso.</Text></Screen>;
}

const styles = StyleSheet.create({ back: { color: colors.accent, fontWeight: '800', marginBottom: 48, fontSize: 15 }, kicker: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 }, title: { color: colors.ink, fontSize: 34, fontWeight: '800', marginTop: 8 }, subtitle: { color: colors.muted, lineHeight: 21, marginTop: 8 }, form: { marginTop: 32 }, foot: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 18 } });
