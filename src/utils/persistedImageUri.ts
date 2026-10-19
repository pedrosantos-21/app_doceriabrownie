import type { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

export function persistedImageUri(asset: ImagePickerAsset) {
  if (Platform.OS !== "web") return asset.uri;
  if (!asset.base64) {
    throw new Error(
      "Não foi possível preparar a foto para salvamento no navegador.",
    );
  }
  return `data:${asset.mimeType ?? "image/jpeg"};base64,${asset.base64}`;
}
