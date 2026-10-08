import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, colors, Field, Header, Screen } from '../../../components/ui';

export default function ProductForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editing = Boolean(id);
  const [productPhoto, setProductPhoto] = useState<string | null>(null);

  const takeProductPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à câmera para fotografar o produto do cardápio.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'] as ImagePicker.MediaType[],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProductPhoto(result.assets[0].uri);
    }
  };

  const saveProduct = () => {
    Alert.alert(
      editing ? 'Alterações salvas' : 'Item cadastrado',
      productPhoto
        ? 'A foto do produto foi adicionada durante este cadastro.'
        : 'O item foi salvo sem uma foto.'
    );
    router.back();
  };

  return (
    <Screen>
      <Header
        title={editing ? 'Editar item' : 'Cadastrar item'}
        subtitle="Deixe seu cardápio sempre atualizado"
        back
      />

      <View style={styles.photoSection}>
        {productPhoto ? (
          <Image source={{ uri: productPhoto }} style={styles.productPhoto} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.placeholderText}>FOTO DO PRODUTO</Text>
          </View>
        )}

        <Text style={styles.photoTitle}>Foto do produto</Text>
        <Text style={styles.photoHint}>
          Fotografe o brownie para destacá-lo no cardápio.
        </Text>

        <View style={styles.cameraButton}>
          <Button
            label={productPhoto ? 'Tirar outra foto' : 'Tirar foto do produto'}
            icon="camera"
            onPress={takeProductPhoto}
          />
        </View>

        {productPhoto ? (
          <Pressable onPress={() => setProductPhoto(null)}>
            <Text style={styles.removePhoto}>Remover foto</Text>
          </Pressable>
        ) : null}
      </View>

      <Field
        label="Nome do item"
        value={editing ? 'Brownie de Nutella' : undefined}
        placeholder="Ex.: Brownie tradicional"
      />
      <Field
        label="Descrição"
        value={editing ? 'Massa cremosa e chocolate belga.' : undefined}
        placeholder="Descreva os ingredientes e sabores"
        multiline
      />
      <Field label="Preço" value={editing ? '22,00' : undefined} placeholder="0,00" />
      <Field
        label="Categoria"
        value={editing ? 'Brownies' : undefined}
        placeholder="Brownies, bolos, cookies..."
      />

      <Button label={editing ? 'Salvar alterações' : 'Cadastrar item'} onPress={saveProduct} />

      {editing ? (
        <Pressable onPress={() => router.back()}>
          <Text style={styles.delete}>Excluir item do cardápio</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    alignItems: 'center',
    marginBottom: 26,
  },
  productPhoto: {
    width: '100%',
    height: 190,
    borderRadius: 18,
  },
  photoPlaceholder: {
    width: '100%',
    height: 190,
    borderRadius: 18,
    backgroundColor: colors.pale,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  photoTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 14,
  },
  photoHint: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },
  cameraButton: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
  removePhoto: {
    color: colors.accent,
    fontWeight: '800',
    marginTop: 14,
  },
  delete: {
    color: colors.accent,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
  },
});
