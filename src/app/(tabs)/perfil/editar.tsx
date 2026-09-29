import { router } from 'expo-router';
import { Button, Field, Header, Screen } from '../../../components/ui';

export default function EditManagerProfile() { return <Screen><Header title="Editar perfil" subtitle="Dados da loja e do gestor" back /><Field label="Nome do gestor" value="Fernanda Souza" /><Field label="Nome da loja" value="Doceria Brownie" /><Field label="Telefone" value="(11) 99888-7777" /><Field label="Endereço" value="Rua do Chocolate, 45" /><Button label="Salvar alterações" onPress={() => router.back()} /></Screen>; }
