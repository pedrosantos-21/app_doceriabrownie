<<<<<<< Updated upstream
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
=======
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../components/ui';
>>>>>>> Stashed changes

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
<<<<<<< Updated upstream
          backgroundColor: "#fffaf5",
          borderTopColor: "#f3dfd3",
=======
          backgroundColor: colors.white,
          borderTopColor: colors.line,
>>>>>>> Stashed changes
          height: 72,
          paddingBottom: 12,
          paddingTop: 12,
        },
<<<<<<< Updated upstream
        tabBarActiveTintColor: "#d96f3d",
        tabBarInactiveTintColor: "#8a685d",
=======
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
>>>>>>> Stashed changes
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cardapio"
        options={{
          title: "Cardápio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cake-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
