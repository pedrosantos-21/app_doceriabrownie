import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fffaf5",
          borderTopColor: "#eadbd1",
          height: 72,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarActiveTintColor: "#c85d36",
        tabBarInactiveTintColor: "#8a685d",
      }}
    >
      <Tabs.Screen
        name="cardapio"
        options={{
          title: "Cardápio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-variant"
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
              name="clipboard-text-clock-outline"
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
              name="account-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
