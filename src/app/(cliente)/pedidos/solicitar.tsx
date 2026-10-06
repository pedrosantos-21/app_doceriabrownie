import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button, colors, Field, Header, Screen } from "../../../components/ui";

export default function RequestItem() {
  return (
    <Screen>
      <Header
        title="Solicitar item"
        subtitle="Conte o que você gostaria"
        back
      />
      <Field label="Item desejado" placeholder="Ex.: Brownie sem açúcar" />
      <Field label="Quantidade" placeholder="1 unidade" />
      <Field
        label="Observações"
        placeholder="Alguma preferência ou restrição?"
        multiline
      />
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Vamos analisar seu pedido</Text>
        <Text style={styles.noteText}>
          A equipe responde pelo WhatsApp assim que receber sua solicitação.
        </Text>
      </View>
      <Button label="Enviar solicitação" onPress={() => router.back()} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  note: {
    backgroundColor: colors.pale,
    borderRadius: 14,
    padding: 15,
    marginBottom: 22,
  },
  noteTitle: { color: colors.ink, fontWeight: "800" },
  noteText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
});
