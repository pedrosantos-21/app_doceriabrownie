import { router } from "expo-router";
import { Button, Field, Header, Screen } from "../../../components/ui";

export default function EditClientProfile() {
  return (
    <Screen>
      <Header
        title="Editar perfil"
        subtitle="Mantenha seus dados atualizados"
        back
      />
      <Field label="Nome completo" value="Ana Carolina" />
      <Field label="E-mail" value="ana@email.com" />
      <Field label="Telefone" value="(11) 99999-0000" />
      <Field label="Endereço" value="Rua das Flores, 120" />
      <Button label="Salvar alterações" onPress={() => router.back()} />
    </Screen>
  );
}
