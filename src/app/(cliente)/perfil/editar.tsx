import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, colors, Field, Header, Screen } from '../../../components/ui';
import { useProfile } from '../../../context/ProfileContext';

export default function EditClientProfile() {
  const { avatarUri, isAvatarLoaded, updateAvatar } = useProfile();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(avatarUri);

  const choosePhoto = async (source: 'camera' | 'library') => {
    try {
      const permission = source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          source === 'camera'
            ? 'Permita o acesso à câmera para tirar uma foto de perfil.'
            : 'Permita o acesso às fotos para escolher uma imagem de perfil.'
        );
        return;
      }

      const options = {
        mediaTypes: ['images'] as ImagePicker.MediaType[],
        allowsEditing: true,
        aspect: [1, 1] as [number, number],
        quality: 0.8,
      };

      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            ...options,
            cameraType: ImagePicker.CameraType.front,
          })
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled) {
        setSelectedPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Não foi possível selecionar a foto',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    }
  };

  useEffect(() => {
    if (isAvatarLoaded) setSelectedPhoto(avatarUri);
  }, [avatarUri, isAvatarLoaded]);

  const saveProfile = async () => {
    try {
      await updateAvatar(selectedPhoto);
      Alert.alert('Perfil atualizado', 'Sua foto de perfil foi atualizada.');
      router.back();
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar a foto',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    }
  };

  if (!isAvatarLoaded) {
    return (
      <Screen>
        <Header title="Editar perfil" subtitle="Carregando seus dados" back />
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Editar perfil"
        subtitle="Mantenha seus dados atualizados"
        back
      />

      <View style={styles.photoSection}>
        <View style={styles.avatar}>
          {selectedPhoto ? (
            <Image source={{ uri: selectedPhoto }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>A</Text>
          )}
        </View>
        <Text style={styles.photoTitle}>Foto de perfil</Text>
        <Text style={styles.photoHint}>Tire uma foto ou escolha uma da galeria.</Text>
      </View>

      <Button label="Tirar foto" icon="camera" onPress={() => choosePhoto('camera')} />
      <View style={styles.libraryButton}>
        <Button label="Escolher da galeria" icon="image-outline" secondary onPress={() => choosePhoto('library')} />
      </View>

      {selectedPhoto ? (
        <Pressable onPress={() => setSelectedPhoto(null)}>
          <Text style={styles.removePhoto}>Remover foto</Text>
        </Pressable>
      ) : null}

      <View style={styles.fields}>
      <Field label="Nome completo" value="Ana Carolina" />
      <Field label="E-mail" value="ana@email.com" />
      <Field label="Telefone" value="(11) 99999-0000" />
      <Field label="Endereço" value="Rua das Flores, 120" />
      </View>

      <Button label="Salvar alterações" onPress={saveProfile} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pale,
    borderWidth: 2,
    borderColor: colors.line,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: colors.accent,
    fontSize: 36,
    fontWeight: '900',
  },
  photoTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  photoHint: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  libraryButton: {
    marginTop: 10,
  },
  removePhoto: {
    color: colors.accent,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 14,
  },
  fields: {
    marginTop: 24,
  },
});
