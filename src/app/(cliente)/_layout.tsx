import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../components/ui';

export default function ClientLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.line, height: 72, paddingBottom: 12, paddingTop: 12 }, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted }}><Tabs.Screen name="cardapio" options={{ title: 'Cardápio', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="food-variant" color={color} size={size} /> }} /><Tabs.Screen name="pedidos" options={{ title: 'Pedidos', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard-text-clock-outline" color={color} size={size} /> }} /><Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} /> }} /></Tabs>;
}
