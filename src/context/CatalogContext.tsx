import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products as initialProducts, type Product } from "../data/mock";

const CATALOG_STORAGE_KEY = "@doceriabrownie/catalog";

type ProductInput = Omit<Product, "id" | "color" | "photoUri"> & {
  id?: string;
  photoUri: string | null;
};

type CatalogContextValue = {
  products: Product[];
  isCatalogLoaded: boolean;
  saveProduct: (product: ProductInput) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | undefined>(
  undefined,
);

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Record<string, unknown>;
  return (
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    typeof product.category === "string" &&
    typeof product.prepTime === "string" &&
    typeof product.color === "string" &&
    (product.photoUri === undefined || typeof product.photoUri === "string")
  );
}

function createProductId() {
  return `produto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCatalog = async () => {
      try {
        const storedCatalog = await AsyncStorage.getItem(CATALOG_STORAGE_KEY);
        if (storedCatalog) {
          const parsedCatalog: unknown = JSON.parse(storedCatalog);
          if (
            !Array.isArray(parsedCatalog) ||
            !parsedCatalog.every(isProduct)
          ) {
            throw new Error("O cardápio salvo está em um formato inválido.");
          }
          if (isMounted) setProducts(parsedCatalog);
        }
      } catch (error) {
        console.error("Não foi possível carregar o cardápio local:", error);
      } finally {
        if (isMounted) setIsCatalogLoaded(true);
      }
    };

    void loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveProduct = async (input: ProductInput) => {
    if (!isCatalogLoaded) {
      throw new Error("O cardápio ainda está carregando. Tente novamente.");
    }

    const current = input.id
      ? products.find((product) => product.id === input.id)
      : undefined;
    if (input.id && !current) {
      throw new Error("O item que você tentou editar não foi encontrado.");
    }

    const id = current?.id ?? createProductId();
    let photoUri = input.photoUri;
    let copiedPhotoUri: string | null = null;

    if (
      photoUri &&
      FileSystem.documentDirectory &&
      photoUri.startsWith("file://") &&
      photoUri !== current?.photoUri
    ) {
      copiedPhotoUri = `${FileSystem.documentDirectory}product-${id}-${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: photoUri, to: copiedPhotoUri });
      photoUri = copiedPhotoUri;
    }

    const product: Product = {
      id,
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      category: input.category.trim(),
      prepTime: input.prepTime.trim(),
      color: current?.color ?? "#7f263f",
      ...(photoUri ? { photoUri } : {}),
    };
    const updatedProducts = current
      ? products.map((item) => (item.id === id ? product : item))
      : [product, ...products];

    try {
      await AsyncStorage.setItem(
        CATALOG_STORAGE_KEY,
        JSON.stringify(updatedProducts),
      );
    } catch (error) {
      if (copiedPhotoUri) {
        await FileSystem.deleteAsync(copiedPhotoUri, { idempotent: true });
      }
      throw error;
    }

    setProducts(updatedProducts);

    const previousPhoto = current?.photoUri;
    if (
      previousPhoto &&
      previousPhoto !== photoUri &&
      FileSystem.documentDirectory &&
      previousPhoto.startsWith(FileSystem.documentDirectory)
    ) {
      try {
        await FileSystem.deleteAsync(previousPhoto, { idempotent: true });
      } catch (error) {
        console.warn(
          "Não foi possível remover a foto anterior do produto:",
          error,
        );
      }
    }

    return product;
  };

  const deleteProduct = async (id: string) => {
    if (!isCatalogLoaded) {
      throw new Error("O cardápio ainda está carregando. Tente novamente.");
    }

    const product = products.find((item) => item.id === id);
    if (!product)
      throw new Error("O item que você tentou excluir não foi encontrado.");

    const updatedProducts = products.filter((item) => item.id !== id);
    await AsyncStorage.setItem(
      CATALOG_STORAGE_KEY,
      JSON.stringify(updatedProducts),
    );
    setProducts(updatedProducts);

    if (
      product.photoUri &&
      FileSystem.documentDirectory &&
      product.photoUri.startsWith(FileSystem.documentDirectory)
    ) {
      try {
        await FileSystem.deleteAsync(product.photoUri, { idempotent: true });
      } catch (error) {
        console.warn(
          "Não foi possível remover a foto do produto excluído:",
          error,
        );
      }
    }
  };

  return (
    <CatalogContext.Provider
      value={{ products, isCatalogLoaded, saveProduct, deleteProduct }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog deve ser usado dentro de CatalogProvider.");
  }
  return context;
}
