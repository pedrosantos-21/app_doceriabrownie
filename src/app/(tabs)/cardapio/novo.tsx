import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button, colors, Field, Header, Screen } from "../../../components/ui";
import { useCatalog } from "../../../context/CatalogContext";

export default function ProductForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, isCatalogLoaded, saveProduct, deleteProduct } =
    useCatalog();
  const editing = Boolean(id);
  const currentProduct = products.find((item) => item.id === id);
  const categories = Array.from(
    new Set([
      "Brownies",
      "Cookies",
      "Doces",
      "Bolos",
      ...products.map((product) => product.category),
    ]),
  );

  const [productPhoto, setProductPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [prepTime, setPrepTime] = useState("15 min");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isCatalogLoaded || !currentProduct) return;
    setProductPhoto(currentProduct.photoUri ?? null);
    setName(currentProduct.name);
    setDescription(currentProduct.description);
    setPrice(String(currentProduct.price).replace(".", ","));
    setCategory(currentProduct.category);
    setPrepTime(currentProduct.prepTime);
  }, [currentProduct, isCatalogLoaded]);

  const chooseProductPhoto = async (source: "camera" | "library") => {
    try {
      const permission =
        source === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          source === "camera"
            ? "Permita o acesso à câmera para fotografar o produto."
            : "Permita o acesso às fotos para escolher uma imagem do produto.",
        );
        return;
      }

      const options = {
        mediaTypes: ["images"] as ImagePicker.MediaType[],
        allowsEditing: true,
        aspect: [1, 1] as [number, number],
        quality: 0.8,
      };
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync(options)
          : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled) setProductPhoto(result.assets[0].uri);
    } catch (error) {
      Alert.alert(
        "Não foi possível selecionar a foto",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    }
  };

  const saveProductForm = async () => {
    const parsedPrice = Number(price.trim().replace(",", "."));
    if (!name.trim() || !description.trim() || !category.trim()) {
      Alert.alert(
        "Preencha os dados do produto",
        "Nome, descrição e categoria são obrigatórios.",
      );
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Preço inválido", "Informe um preço maior que zero.");
      return;
    }
    if (!prepTime.trim()) {
      Alert.alert("Informe o tempo de preparo", "Ex.: 15 min.");
      return;
    }

    setIsSaving(true);
    try {
      await saveProduct({
        ...(editing && id ? { id } : {}),
        name,
        description,
        price: parsedPrice,
        category,
        prepTime,
        photoUri: productPhoto,
      });
      Alert.alert(
        editing ? "Item atualizado" : "Item cadastrado",
        "O item foi salvo neste dispositivo e já está disponível no cardápio.",
      );
      router.back();
    } catch (error) {
      Alert.alert(
        "Não foi possível salvar o item",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeleteProduct = () => {
    if (!id) return;
    Alert.alert(
      "Excluir item",
      "O item será removido do cardápio local deste dispositivo.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void deleteProduct(id)
              .then(() => router.back())
              .catch((error: unknown) => {
                Alert.alert(
                  "Não foi possível excluir o item",
                  error instanceof Error ? error.message : "Tente novamente.",
                );
              });
          },
        },
      ],
    );
  };

  if (!isCatalogLoaded) {
    return (
      <Screen>
        <Header title="Cardápio" subtitle="Carregando itens" back />
        <ActivityIndicator color={colors.accent} />
      </Screen>
    );
  }

  if (editing && !currentProduct) {
    return (
      <Screen>
        <Header title="Item não encontrado" back />
        <Text style={styles.errorText}>
          Este item não está mais cadastrado neste dispositivo.
        </Text>
        <Button label="Voltar ao cardápio" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title={editing ? "Editar item" : "Cadastrar item"}
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
          Tire uma foto ou escolha uma imagem para o cardápio.
        </Text>

        <View style={styles.photoButton}>
          <Button
            label={productPhoto ? "Tirar outra foto" : "Tirar foto"}
            icon="camera"
            disabled={isSaving}
            onPress={() => chooseProductPhoto("camera")}
          />
        </View>
        <View style={styles.photoButton}>
          <Button
            label="Escolher da galeria"
            icon="image-outline"
            secondary
            disabled={isSaving}
            onPress={() => chooseProductPhoto("library")}
          />
        </View>

        {productPhoto ? (
          <Pressable onPress={() => setProductPhoto(null)} disabled={isSaving}>
            <Text style={styles.removePhoto}>Remover foto</Text>
          </Pressable>
        ) : null}
      </View>

      <Field
        label="Nome do item"
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Brownie tradicional"
      />
      <Field
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva os ingredientes e sabores"
        multiline
      />
      <Field
        label="Preço"
        value={price}
        onChangeText={setPrice}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />
      <View style={styles.categoryField}>
        <Text style={styles.categoryLabel}>Categoria</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: isCategoryOpen }}
          disabled={isSaving}
          onPress={() => setIsCategoryOpen((open) => !open)}
          style={styles.categoryDropdown}
        >
          <Text
            style={[
              styles.categoryValue,
              !category && styles.categoryPlaceholder,
            ]}
          >
            {category || "Selecione uma categoria"}
          </Text>
          <MaterialCommunityIcons
            name={isCategoryOpen ? "chevron-up" : "chevron-down"}
            size={22}
            color={colors.muted}
          />
        </Pressable>
        {isCategoryOpen ? (
          <View style={styles.categoryOptions}>
            {categories.map((option) => {
              const selected = category === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    setCategory(option);
                    setIsCategoryOpen(false);
                  }}
                  style={[
                    styles.categoryOption,
                    selected && styles.categoryOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      selected && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {selected ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color={colors.accent}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
      <Field
        label="Tempo de preparo"
        value={prepTime}
        onChangeText={setPrepTime}
        placeholder="Ex.: 15 min"
      />

      <Button
        label={
          isSaving
            ? "Salvando..."
            : editing
              ? "Salvar alterações"
              : "Cadastrar item"
        }
        disabled={isSaving}
        onPress={saveProductForm}
      />

      {editing ? (
        <Pressable onPress={confirmDeleteProduct} disabled={isSaving}>
          <Text style={styles.delete}>Excluir item do cardápio</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    alignItems: "center",
    marginBottom: 26,
  },
  productPhoto: {
    width: "100%",
    height: 190,
    borderRadius: 18,
  },
  photoPlaceholder: {
    width: "100%",
    height: 190,
    borderRadius: 18,
    backgroundColor: colors.pale,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: "dashed",
  },
  placeholderText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  photoTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
  },
  photoHint: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },
  photoButton: {
    alignSelf: "stretch",
    marginTop: 12,
  },
  categoryField: {
    marginBottom: 16,
  },
  categoryLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  categoryDropdown: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  categoryValue: {
    color: colors.ink,
    fontSize: 15,
  },
  categoryPlaceholder: {
    color: "#aa9a91",
  },
  categoryOptions: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  categoryOption: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  categoryOptionSelected: {
    backgroundColor: colors.pale,
  },
  categoryOptionText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  categoryOptionTextSelected: {
    color: colors.accent,
  },
  removePhoto: {
    color: colors.accent,
    fontWeight: "800",
    marginTop: 14,
  },
  delete: {
    color: colors.accent,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: colors.muted,
    marginBottom: 20,
  },
});
