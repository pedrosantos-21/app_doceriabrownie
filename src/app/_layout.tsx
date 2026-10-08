import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProfileProvider } from "../context/ProfileContext";
import { OrdersProvider } from "../context/OrdersContext";
import { CatalogProvider } from "../context/CatalogContext";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <OrdersProvider>
        <CatalogProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(cliente)" options={{ headerShown: false }} />
          </Stack>
        </CatalogProvider>
      </OrdersProvider>
    </ProfileProvider>
  );
}
