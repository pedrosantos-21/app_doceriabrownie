import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export const colors = { bg: '#fbf7f2', ink: '#2c211e', muted: '#806e66', accent: '#c85d36', pale: '#f5e6da', line: '#eadbd1', green: '#4c8a67', white: '#fff' };

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const content = <View style={styles.content}>{children}</View>;
  return scroll ? <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>{content}</ScrollView> : <View style={styles.screen}>{content}</View>;
}

export function Header({ title, subtitle, back = false, action }: { title: string; subtitle?: string; back?: boolean; action?: ReactNode }) {
  return <View style={styles.header}>{back ? <Pressable onPress={() => router.back()} style={styles.iconButton}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.ink} /></Pressable> : <View />}<View style={styles.headerText}><Text style={styles.kicker}>DOCERIA BROWNIE</Text><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{action || <View style={styles.headerSpacer} />}</View>;
}

export function Button({ label, onPress, secondary = false, icon }: { label: string; onPress: () => void; secondary?: boolean; icon?: keyof typeof MaterialCommunityIcons.glyphMap }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, pressed && styles.pressed]}>{icon ? <MaterialCommunityIcons name={icon} size={18} color={secondary ? colors.accent : colors.white} /> : null}<Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text></Pressable>;
}

export function Field({ label, value, placeholder, multiline = false }: { label: string; value?: string; placeholder?: string; multiline?: boolean }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput defaultValue={value} placeholder={placeholder} placeholderTextColor="#aa9a91" multiline={multiline} style={[styles.input, multiline && styles.multiline]} /></View>;
}

export function EmptyAction({ icon, title, text, action }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; title: string; text: string; action?: ReactNode }) {
  return <View style={styles.empty}><MaterialCommunityIcons name={icon} size={34} color={colors.accent} /><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyText}>{text}</Text>{action}</View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg }, scroll: { paddingBottom: 34 }, content: { padding: 22, paddingTop: 54 }, header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }, headerText: { flex: 1 }, headerSpacer: { width: 40 }, iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line }, kicker: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, color: colors.accent }, title: { marginTop: 5, color: colors.ink, fontSize: 28, fontWeight: '800' }, subtitle: { marginTop: 5, color: colors.muted, fontSize: 14 }, sectionTitle: { color: colors.ink, fontSize: 19, fontWeight: '800' }, card: { backgroundColor: colors.white, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: '#f0e5de', marginBottom: 12 }, button: { flexDirection: 'row', gap: 8, backgroundColor: colors.accent, borderRadius: 13, paddingVertical: 14, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' }, buttonSecondary: { backgroundColor: colors.pale }, buttonText: { color: colors.white, fontWeight: '800', fontSize: 15 }, buttonTextSecondary: { color: colors.accent }, pressed: { opacity: 0.75 }, field: { marginBottom: 16 }, label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 8 }, input: { borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: colors.white, padding: 14, fontSize: 15, color: colors.ink }, multiline: { minHeight: 90, textAlignVertical: 'top' }, empty: { alignItems: 'center', padding: 30 }, emptyTitle: { marginTop: 10, color: colors.ink, fontWeight: '800', fontSize: 18 }, emptyText: { textAlign: 'center', color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 }, });