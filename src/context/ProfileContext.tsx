import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import * as Crypto from "expo-crypto";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ProfileContextValue = {
  clientProfile: ClientProfile;
  isClientProfileLoaded: boolean;
  updateClientProfile: (profile: ClientProfile) => Promise<void>;
  isClientAccountsLoaded: boolean;
  registerClient: (profile: ClientProfile, password: string) => Promise<void>;
  authenticateClient: (email: string, password: string) => Promise<boolean>;
  managerProfile: ManagerProfile;
  isManagerProfileLoaded: boolean;
  updateManagerProfile: (profile: ManagerProfile) => Promise<void>;
  avatarUri: string | null;
  isAvatarLoaded: boolean;
  updateAvatar: (uri: string | null) => Promise<void>;
  managerAvatarUri: string | null;
  isManagerAvatarLoaded: boolean;
  updateManagerAvatar: (uri: string | null) => Promise<void>;
};

export type ClientProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type ManagerProfile = {
  name: string;
  storeName: string;
  phone: string;
  address: string;
};

const CLIENT_AVATAR_STORAGE_KEY = "@doceriabrownie/client-avatar";
const MANAGER_AVATAR_STORAGE_KEY = "@doceriabrownie/manager-avatar";
const CLIENT_PROFILE_STORAGE_KEY = "@doceriabrownie/client-profile";
const CLIENT_ACCOUNTS_STORAGE_KEY = "@doceriabrownie/client-accounts";
const MANAGER_PROFILE_STORAGE_KEY = "@doceriabrownie/manager-profile";

type ClientAccount = {
  profile: ClientProfile;
  salt: string;
  passwordHash: string;
};

const defaultClientProfile: ClientProfile = {
  name: "Ana Carolina",
  email: "ana@email.com",
  phone: "(11) 99999-0000",
  address: "Rua das Flores, 120",
};

const defaultManagerProfile: ManagerProfile = {
  name: "Fernanda Souza",
  storeName: "Doceria Brownie",
  phone: "(11) 99888-7777",
  address: "Rua do Chocolate, 45",
};

function isClientProfile(value: unknown): value is ClientProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as Record<string, unknown>;
  return (
    typeof profile.name === "string" &&
    typeof profile.email === "string" &&
    typeof profile.phone === "string" &&
    typeof profile.address === "string"
  );
}

function isManagerProfile(value: unknown): value is ManagerProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as Record<string, unknown>;
  return (
    typeof profile.name === "string" &&
    typeof profile.storeName === "string" &&
    typeof profile.phone === "string" &&
    typeof profile.address === "string"
  );
}

function isClientAccount(value: unknown): value is ClientAccount {
  if (!value || typeof value !== "object") return false;
  const account = value as Record<string, unknown>;
  return (
    isClientProfile(account.profile) &&
    typeof account.salt === "string" &&
    typeof account.passwordHash === "string"
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLocaleLowerCase("pt-BR");
}

async function hashPassword(password: string, salt: string) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`,
  );
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [clientProfile, setClientProfile] =
    useState<ClientProfile>(defaultClientProfile);
  const [isClientProfileLoaded, setIsClientProfileLoaded] = useState(false);
  const [clientAccounts, setClientAccounts] = useState<ClientAccount[]>([]);
  const [isClientAccountsLoaded, setIsClientAccountsLoaded] = useState(false);
  const [managerProfile, setManagerProfile] = useState<ManagerProfile>(
    defaultManagerProfile,
  );
  const [isManagerProfileLoaded, setIsManagerProfileLoaded] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [managerAvatarUri, setManagerAvatarUri] = useState<string | null>(null);
  const [isManagerAvatarLoaded, setIsManagerAvatarLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAvatar = async () => {
      try {
        const storedUri = await AsyncStorage.getItem(CLIENT_AVATAR_STORAGE_KEY);

        if (
          storedUri &&
          FileSystem.documentDirectory &&
          storedUri.startsWith(FileSystem.documentDirectory)
        ) {
          const file = await FileSystem.getInfoAsync(storedUri);
          if (!file.exists) {
            await AsyncStorage.removeItem(CLIENT_AVATAR_STORAGE_KEY);
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

    const loadManagerAvatar = async () => {
      try {
        const storedUri = await AsyncStorage.getItem(
          MANAGER_AVATAR_STORAGE_KEY,
        );

        if (
          storedUri &&
          FileSystem.documentDirectory &&
          storedUri.startsWith(FileSystem.documentDirectory)
        ) {
          const file = await FileSystem.getInfoAsync(storedUri);
          if (!file.exists) {
            await AsyncStorage.removeItem(MANAGER_AVATAR_STORAGE_KEY);
            if (isMounted) setManagerAvatarUri(null);
            return;
          }
        }

        if (isMounted) setManagerAvatarUri(storedUri);
      } catch (error) {
        console.error("Não foi possível carregar a foto do gestor:", error);
      } finally {
        if (isMounted) setIsManagerAvatarLoaded(true);
      }
    };

    const loadClientProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem(
          CLIENT_PROFILE_STORAGE_KEY,
        );
        if (storedProfile) {
          const profile: unknown = JSON.parse(storedProfile);
          if (!isClientProfile(profile)) {
            throw new Error(
              "Os dados salvos do cliente estão em formato inválido.",
            );
          }
          if (isMounted) setClientProfile(profile);
        }
      } catch (error) {
        console.error("Não foi possível carregar os dados do cliente:", error);
      } finally {
        if (isMounted) setIsClientProfileLoaded(true);
      }
    };

    const loadManagerProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem(
          MANAGER_PROFILE_STORAGE_KEY,
        );
        if (storedProfile) {
          const profile: unknown = JSON.parse(storedProfile);
          if (!isManagerProfile(profile)) {
            throw new Error(
              "Os dados salvos do gestor estão em formato inválido.",
            );
          }
          if (isMounted) setManagerProfile(profile);
        }
      } catch (error) {
        console.error("Não foi possível carregar os dados do gestor:", error);
      } finally {
        if (isMounted) setIsManagerProfileLoaded(true);
      }
    };

    const loadClientAccounts = async () => {
      try {
        const storedAccounts = await AsyncStorage.getItem(
          CLIENT_ACCOUNTS_STORAGE_KEY,
        );
        if (storedAccounts) {
          const accounts: unknown = JSON.parse(storedAccounts);
          if (!Array.isArray(accounts) || !accounts.every(isClientAccount)) {
            throw new Error("As contas salvas estão em um formato inválido.");
          }
          if (isMounted) setClientAccounts(accounts);
        }
      } catch (error) {
        console.error("Não foi possível carregar as contas locais:", error);
      } finally {
        if (isMounted) setIsClientAccountsLoaded(true);
      }
    };

    void loadAvatar();
    void loadManagerAvatar();
    void loadClientProfile();
    void loadManagerProfile();
    void loadClientAccounts();
    return () => {
      isMounted = false;
    };
  }, []);

  const persistAvatar = async (
    storageKey: string,
    previousUri: string | null,
    uri: string | null,
    setUri: (uri: string | null) => void,
  ) => {
    let savedUri = uri;

    if (uri && FileSystem.documentDirectory && uri.startsWith("file://")) {
      const profileType =
        storageKey === MANAGER_AVATAR_STORAGE_KEY ? "manager" : "client";
      savedUri = `${FileSystem.documentDirectory}profile-avatar-${profileType}-${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: savedUri });
    }

    try {
      if (savedUri) {
        await AsyncStorage.setItem(storageKey, savedUri);
      } else {
        await AsyncStorage.removeItem(storageKey);
      }
    } catch (error) {
      if (savedUri && savedUri !== uri) {
        await FileSystem.deleteAsync(savedUri, { idempotent: true });
      }
      throw error;
    }

    setUri(savedUri);

    if (
      previousUri &&
      previousUri !== savedUri &&
      FileSystem.documentDirectory &&
      previousUri.startsWith(FileSystem.documentDirectory)
    ) {
      try {
        await FileSystem.deleteAsync(previousUri, { idempotent: true });
      } catch (error) {
        console.warn(
          "Não foi possível remover a foto de perfil anterior:",
          error,
        );
      }
    }
  };

  const updateAvatar = (uri: string | null) =>
    persistAvatar(CLIENT_AVATAR_STORAGE_KEY, avatarUri, uri, setAvatarUri);
  const updateManagerAvatar = (uri: string | null) =>
    persistAvatar(
      MANAGER_AVATAR_STORAGE_KEY,
      managerAvatarUri,
      uri,
      setManagerAvatarUri,
    );
  const updateClientProfile = async (profile: ClientProfile) => {
    const normalizedProfile = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
    };
    const normalizedEmail = normalizeEmail(clientProfile.email);
    const accountIndex = clientAccounts.findIndex(
      (account) => normalizeEmail(account.profile.email) === normalizedEmail,
    );
    const updatedAccounts =
      accountIndex < 0
        ? clientAccounts
        : clientAccounts.map((account, index) =>
            index === accountIndex
              ? { ...account, profile: normalizedProfile }
              : account,
          );
    const storageUpdates: [string, string][] = [
      [CLIENT_PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile)],
    ];
    if (accountIndex >= 0) {
      storageUpdates.push([
        CLIENT_ACCOUNTS_STORAGE_KEY,
        JSON.stringify(updatedAccounts),
      ]);
    }
    await AsyncStorage.multiSet(storageUpdates);
    setClientProfile(normalizedProfile);
    if (accountIndex >= 0) setClientAccounts(updatedAccounts);
  };
  const registerClient = async (profile: ClientProfile, password: string) => {
    if (!isClientAccountsLoaded || !isClientProfileLoaded) {
      throw new Error(
        "Os dados locais ainda estão carregando. Tente novamente.",
      );
    }
    const normalizedProfile = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
    };
    if (
      clientAccounts.some(
        (account) =>
          normalizeEmail(account.profile.email) ===
          normalizeEmail(normalizedProfile.email),
      )
    ) {
      throw new Error("Já existe uma conta cadastrada com este e-mail.");
    }

    const salt = Crypto.randomUUID();
    const account: ClientAccount = {
      profile: normalizedProfile,
      salt,
      passwordHash: await hashPassword(password, salt),
    };
    const updatedAccounts = [...clientAccounts, account];
    await AsyncStorage.multiSet([
      [CLIENT_ACCOUNTS_STORAGE_KEY, JSON.stringify(updatedAccounts)],
      [CLIENT_PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile)],
    ]);
    setClientAccounts(updatedAccounts);
    setClientProfile(normalizedProfile);
  };
  const authenticateClient = async (email: string, password: string) => {
    if (!isClientAccountsLoaded || !isClientProfileLoaded) {
      throw new Error(
        "Os dados locais ainda estão carregando. Tente novamente.",
      );
    }
    const account = clientAccounts.find(
      (candidate) =>
        normalizeEmail(candidate.profile.email) === normalizeEmail(email),
    );
    if (
      !account ||
      (await hashPassword(password, account.salt)) !== account.passwordHash
    ) {
      return false;
    }
    await AsyncStorage.setItem(
      CLIENT_PROFILE_STORAGE_KEY,
      JSON.stringify(account.profile),
    );
    setClientProfile(account.profile);
    return true;
  };
  const updateManagerProfile = async (profile: ManagerProfile) => {
    const normalizedProfile = {
      name: profile.name.trim(),
      storeName: profile.storeName.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
    };
    await AsyncStorage.setItem(
      MANAGER_PROFILE_STORAGE_KEY,
      JSON.stringify(normalizedProfile),
    );
    setManagerProfile(normalizedProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        clientProfile,
        isClientProfileLoaded,
        updateClientProfile,
        isClientAccountsLoaded,
        registerClient,
        authenticateClient,
        managerProfile,
        isManagerProfileLoaded,
        updateManagerProfile,
        avatarUri,
        isAvatarLoaded,
        updateAvatar,
        managerAvatarUri,
        isManagerAvatarLoaded,
        updateManagerAvatar,
      }}
    >
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
