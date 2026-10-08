import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ProfileContextValue = {
  avatarUri: string | null;
  isAvatarLoaded: boolean;
  updateAvatar: (uri: string | null) => Promise<void>;
};

const AVATAR_STORAGE_KEY = "@doceriabrownie/client-avatar";

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAvatar = async () => {
      try {
        const storedUri = await AsyncStorage.getItem(AVATAR_STORAGE_KEY);

        if (
          storedUri &&
          FileSystem.documentDirectory &&
          storedUri.startsWith(FileSystem.documentDirectory)
        ) {
          const file = await FileSystem.getInfoAsync(storedUri);
          if (!file.exists) {
            await AsyncStorage.removeItem(AVATAR_STORAGE_KEY);
            if (isMounted) setAvatarUri(null);
            return;
          }
        }

        if (isMounted) setAvatarUri(storedUri);
      } catch (error) {
        console.error("Não foi possível carregar a foto de perfil:", error);
      } finally {
        if (isMounted) setIsAvatarLoaded(true);
      }
    };

    void loadAvatar();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateAvatar = async (uri: string | null) => {
    let savedUri = uri;

    if (uri && FileSystem.documentDirectory && uri.startsWith("file://")) {
      savedUri = `${FileSystem.documentDirectory}profile-avatar-${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: savedUri });
    }

    try {
      if (savedUri) {
        await AsyncStorage.setItem(AVATAR_STORAGE_KEY, savedUri);
      } else {
        await AsyncStorage.removeItem(AVATAR_STORAGE_KEY);
      }
    } catch (error) {
      if (savedUri && savedUri !== uri) {
        await FileSystem.deleteAsync(savedUri, { idempotent: true });
      }
      throw error;
    }

    const previousUri = avatarUri;
    setAvatarUri(savedUri);

    if (
      previousUri &&
      previousUri !== savedUri &&
      FileSystem.documentDirectory &&
      previousUri.startsWith(FileSystem.documentDirectory)
    ) {
      try {
        await FileSystem.deleteAsync(previousUri, { idempotent: true });
      } catch (error) {
        console.warn("Não foi possível remover a foto de perfil anterior:", error);
      }
    }
  };

  return (
    <ProfileContext.Provider value={{ avatarUri, isAvatarLoaded, updateAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile deve ser usado dentro de ProfileProvider.");
  }

  return context;
}
