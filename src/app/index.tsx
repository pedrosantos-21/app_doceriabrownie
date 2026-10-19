import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palette = {
  wine: "#64172f",
  wineDark: "#4e1025",
  pink: "#f8dfe5",
  blush: "#f3cbd5",
  cream: "#fff6f2",
  ink: "#421923",
  muted: "#805c64",
  white: "#fffdfc",
};

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navigation}>
          <Image
            source={require("../../assets/brand-logo.jpg")}
            style={styles.brandLogo}
            resizeMode="cover"
            accessibilityLabel="Com amor, Brownie"
          />
          <View style={styles.navigationLabel}>
            <MaterialCommunityIcons
              name="heart"
              size={14}
              color={palette.wine}
            />
            <Text style={styles.navigationLabelText}>Feito com carinho</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <MaterialCommunityIcons
            name="heart"
            size={20}
            color={palette.blush}
            style={styles.heartLeft}
          />
          <MaterialCommunityIcons
            name="creation"
            size={23}
            color={palette.wine}
            style={styles.sparkleRight}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>UM DOCE MOMENTO COMEÇA AQUI</Text>
            <Text style={styles.title}>
              Seu brownie favorito,{"\n"}
              <Text style={styles.titleAccent}>a um toque de você.</Text>
            </Text>
            <Text style={styles.subtitle}>
              Escolha seu caminho e aproveite o sabor de um doce feito com
              carinho.
            </Text>
          </View>

          <View style={styles.treatIllustration}>
            <View style={styles.treatHalo} />
            <MaterialCommunityIcons
              name="food-variant"
              size={76}
              color={palette.wine}
            />
            <View style={styles.illustrationHeart}>
              <MaterialCommunityIcons
                name="heart"
                size={18}
                color={palette.wine}
              />
            </View>
            <Text style={styles.illustrationCaption}>feito para adoçar seu dia</Text>
          </View>
        </View>

        <View style={styles.choiceSection}>
          <Text style={styles.choiceEyebrow}>BEM-VINDO(A) À DOCERIA</Text>
          <Text style={styles.choiceTitle}>Como você quer continuar?</Text>
          <Text style={styles.choiceSubtitle}>
            Acesse a área que combina com você.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/login?mode=cliente" as never)}
            style={({ pressed }) => [
              styles.choiceCard,
              styles.customerCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.choiceIcon}>
              <MaterialCommunityIcons
                name="account-heart-outline"
                size={25}
                color={palette.wine}
              />
            </View>
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceLabel}>ÁREA DO CLIENTE</Text>
              <Text style={styles.choiceDescription}>
                Explore o cardápio e faça seu pedido.
              </Text>
            </View>
            <MaterialCommunityIcons
              name="arrow-right"
              size={22}
              color={palette.wine}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/login?mode=gestor" as never)}
            style={({ pressed }) => [
              styles.choiceCard,
              styles.managerCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.choiceIcon, styles.managerIcon]}>
              <MaterialCommunityIcons
                name="storefront-outline"
                size={25}
                color={palette.cream}
              />
            </View>
            <View style={styles.choiceCopy}>
              <Text style={[styles.choiceLabel, styles.managerLabel]}>
                ÁREA DO GESTOR
              </Text>
              <Text style={[styles.choiceDescription, styles.managerDescription]}>
                Gerencie pedidos e seu catálogo.
              </Text>
            </View>
            <MaterialCommunityIcons
              name="arrow-right"
              size={22}
              color={palette.cream}
            />
          </Pressable>
        </View>

        <View style={styles.categories}>
          <View style={styles.category}>
            <View style={[styles.categoryIcon, styles.categoryBrownie]}>
              <MaterialCommunityIcons
                name="cookie"
                size={25}
                color={palette.wine}
              />
            </View>
            <Text style={styles.categoryName}>Brownies</Text>
          </View>
          <View style={styles.category}>
            <View style={[styles.categoryIcon, styles.categorySweet]}>
              <MaterialCommunityIcons
                name="candy"
                size={25}
                color={palette.wine}
              />
            </View>
            <Text style={styles.categoryName}>Doces</Text>
          </View>
          <View style={styles.category}>
            <View style={[styles.categoryIcon, styles.categoryCake]}>
              <MaterialCommunityIcons
                name="cake-variant"
                size={25}
                color={palette.wine}
              />
            </View>
            <Text style={styles.categoryName}>Bolos</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="heart"
            size={13}
            color={palette.cream}
          />
          <Text style={styles.footerText}>Um carinho em forma de doce</Text>
          <MaterialCommunityIcons
            name="heart"
            size={13}
            color={palette.cream}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.wine },
  scrollContent: { flexGrow: 1, backgroundColor: palette.cream },
  navigation: {
    minHeight: 76,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: palette.wine,
  },
  brandLogo: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  navigationLabel: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: palette.pink,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  navigationLabelText: {
    color: palette.wine,
    fontSize: 11,
    fontWeight: "700",
  },
  hero: {
    minHeight: 330,
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 28,
    backgroundColor: palette.pink,
    overflow: "hidden",
  },
  heroCopy: { maxWidth: 500, zIndex: 1 },
  eyebrow: {
    color: palette.wine,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
  },
  title: {
    marginTop: 12,
    color: palette.ink,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "800",
  },
  titleAccent: {
    color: palette.wine,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "700",
  },
  subtitle: {
    maxWidth: 330,
    marginTop: 10,
    color: palette.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  treatIllustration: {
    alignSelf: "flex-end",
    width: 148,
    height: 116,
    marginTop: -12,
    marginRight: 14,
    borderRadius: 26,
    backgroundColor: "#f1cbd5",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-4deg" }],
  },
  treatHalo: {
    position: "absolute",
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#f9e8eb",
  },
  illustrationHeart: {
    position: "absolute",
    top: 14,
    right: 17,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationCaption: {
    position: "absolute",
    bottom: 9,
    color: palette.wine,
    fontSize: 10,
    fontFamily: "serif",
    fontStyle: "italic",
  },
  heartLeft: { position: "absolute", top: 22, right: 32 },
  sparkleRight: { position: "absolute", right: 14, bottom: 78 },
  choiceSection: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 24,
    backgroundColor: palette.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginTop: -16,
  },
  choiceEyebrow: {
    color: palette.wine,
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: "800",
    textAlign: "center",
  },
  choiceTitle: {
    marginTop: 7,
    color: palette.ink,
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
  },
  choiceSubtitle: {
    marginTop: 5,
    marginBottom: 16,
    color: palette.muted,
    fontSize: 13,
    textAlign: "center",
  },
  choiceCard: {
    minHeight: 82,
    padding: 13,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  customerCard: {
    backgroundColor: "#f9e8ec",
    borderWidth: 1,
    borderColor: "#f0d2da",
  },
  managerCard: { backgroundColor: palette.wine },
  choiceIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  managerIcon: { backgroundColor: "#82364e" },
  choiceCopy: { flex: 1 },
  choiceLabel: {
    color: palette.wine,
    fontSize: 11,
    letterSpacing: 0.7,
    fontWeight: "800",
  },
  managerLabel: { color: palette.cream },
  choiceDescription: {
    marginTop: 4,
    color: palette.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  managerDescription: { color: "#f0dce2" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  categories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 22,
    backgroundColor: palette.white,
  },
  category: { alignItems: "center", gap: 7 },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBrownie: { backgroundColor: "#f1d9ce" },
  categorySweet: { backgroundColor: "#f5dce3" },
  categoryCake: { backgroundColor: "#f6e8c9" },
  categoryName: {
    color: palette.ink,
    fontSize: 12,
    fontFamily: "serif",
    fontStyle: "italic",
  },
  footer: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: palette.wine,
  },
  footerText: { color: palette.cream, fontSize: 12, fontWeight: "600" },
});
