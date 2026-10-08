import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, colors, Field, Header, Screen } from '../../../components/ui';
import { useProfile } from '../../../context/ProfileContext';

export default function EditManagerProfile() {
  const {
    managerProfile,
    isManagerProfileLoaded,
    updateManagerProfile,
    managerAvatarUri,
    isManagerAvatarLoaded,
    updateManagerAvatar,
  } = useProfile();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(managerAvatarUri);
  const [name, setName] = useState(managerProfile.name);
  const [storeName, setStoreName] = useState(managerProfile.storeName);
  const [phone, setPhone] = useState(managerProfile.phone);
  const [address, setAddress] = useState(managerProfile.address);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isManagerProfileLoaded) {
      setName(managerProfile.name);
      setStoreName(managerProfile.storeName);
      setPhone(managerProfile.phone);
      setAddress(managerProfile.address);
    }
  }, [isManagerProfileLoaded, managerProfile]);

  useEffect(() => {
    if (isManagerAvatarLoaded) setSelectedPhoto(managerAvatarUri);
  }, [isManagerAvatarLoaded, managerAvatarUri]);

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
            : 'Permita o acesso às fotos para escolher uma imagem de perfil.',
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

      if (!result.canceled) setSelectedPhoto(result.assets[0].uri);
    } catch (error) {
      Alert.alert(
        'Não foi possível selecionar a foto',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    }
  };

  const saveProfile = async () => {
    if (!name.trim() || !storeName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Dados obrigatórios', 'Preencha todos os campos do perfil.');
      return;
    }

    setIsSaving(true);
    try {
      await updateManagerProfile({ name, storeName, phone, address });
      await updateManagerAvatar(selectedPhoto);
      Alert.alert('Perfil atualizado', 'Os dados e a foto do gestor foram salvos neste dispositivo.');
      router.back();
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar o perfil',
        error instanceof Error ? error.message : 'Tente novamente.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isManagerAvatarLoaded || !isManagerProfileLoaded) {
    return (
      <Screen>
        <Header title="Editar perfil" subtitle="Carregando seus dados" back />
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Editar perfil" subtitle="Dados da loja e do gestor" back />
      <View style={styles.photoSection}>
        <View style={styles.avatar}>
          {selectedPhoto ? (
            <Image source={{ uri: selectedPhoto }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>F</Text>
          )}
        </View>
        <Text style={styles.photoTitle}>Foto de perfil</Text>
        <Text style={styles.photoHint}>Tire uma foto ou escolha uma da galeria.</Text>
      </View>
      <Button label="Tirar foto" icon="camera" disabled={isSaving} onPress={() => choosePhoto('camera')} />
      <View style={styles.libraryButton}>
        <Button
          label="Escolher da galeria"
          icon="image-outline"
          secondary
          disabled={isSaving}
          onPress={() => choosePhoto('library')}
        />
      </View>
      {selectedPhoto ? (
        <Pressable onPress={() => setSelectedPhoto(null)} disabled={isSaving}>
          <Text style={styles.removePhoto}>Remover foto</Text>
        </Pressable>
      ) : null}
      <Field label="Nome do gestor" value={name} onChangeText={setName} />
      <Field label="Nome da loja" value={storeName} onChangeText={setStoreName} />
      <Field label="Telefone" value={phone} onChangeText={setPhone} />
      <Field label="Endereço" value={address} onChangeText={setAddress} />
      <Button
        label={isSaving ? 'Salvando...' : 'Salvar alterações'}
        disabled={isSaving}
        onPress={saveProfile}
      />
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
});
