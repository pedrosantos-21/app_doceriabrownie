import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Button, colors, Field, Header, Screen } from "../../../components/ui";

<<<<<<< Updated upstream
export default function ProductForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editing = Boolean(id);
  return (
    <Screen>
      <Header
        title={editing ? "Editar item" : "Cadastrar item"}
        subtitle="Deixe seu cardápio sempre atualizado"
        back
      />
      <Field
        label="Nome do item"
        value={editing ? "Brownie de Nutella" : undefined}
        placeholder="Ex.: Brownie tradicional"
      />
      <Field
        label="Descrição"
        value={editing ? "Massa cremosa e chocolate belga." : undefined}
        placeholder="Descreva os ingredientes e sabores"
        multiline
      />
      <Field
        label="Preço"
        value={editing ? "22,00" : undefined}
        placeholder="0,00"
      />
      <Field
        label="Categoria"
        value={editing ? "Brownies" : undefined}
        placeholder="Brownies, bolos, cookies..."
      />
      <Button
        label={editing ? "Salvar alterações" : "Cadastrar item"}
        onPress={() => router.back()}
      />
      {editing ? (
        <Pressable onPress={() => router.back()}>
          <Text style={styles.delete}>Excluir item do cardápio</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}
const styles = StyleSheet.create({
  delete: {
    color: "#ae5145",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },
});
=======
export default function ProductForm() { const { id } = useLocalSearchParams<{ id?: string }>(); const editing = Boolean(id); return <Screen><Header title={editing ? 'Editar item' : 'Cadastrar item'} subtitle="Deixe seu cardápio sempre atualizado" back /><Field label="Nome do item" value={editing ? 'Brownie de Nutella' : undefined} placeholder="Ex.: Brownie tradicional" /><Field label="Descrição" value={editing ? 'Massa cremosa e chocolate belga.' : undefined} placeholder="Descreva os ingredientes e sabores" multiline /><Field label="Preço" value={editing ? '22,00' : undefined} placeholder="0,00" /><Field label="Categoria" value={editing ? 'Brownies' : undefined} placeholder="Brownies, bolos, cookies..." /><Button label={editing ? 'Salvar alterações' : 'Cadastrar item'} onPress={() => router.back()} />{editing ? <Pressable onPress={() => router.back()}><Text style={styles.delete}>Excluir item do cardápio</Text></Pressable> : null}</Screen>; }
const styles = StyleSheet.create({ delete: { color: colors.accent, fontWeight: '800', textAlign: 'center', marginTop: 20 } });
>>>>>>> Stashed changes
