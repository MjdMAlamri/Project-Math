// app/work-check.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  Platform,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const COLORS = {
  navy: "#0C2A5B",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#64748B",
};

const S = 8;
const G = 20;
const SIDEBAR_W = 220;

export default function WorkCheck() {
  const [preview, setPreview] = useState(null); // JS (no TS generics)

  const startCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera permission needed", "Enable camera to take a photo.");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!res.canceled) setPreview(res.assets[0].uri);
  };

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Library permission needed", "Allow access to choose a photo.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!res.canceled) setPreview(res.assets[0].uri);
  };

  return (
    <View style={styles.root}>
      <Sidebar />

      <View style={styles.main}>
        {/* Top bar (same as other pages) */}
        <View style={[styles.topBar, shadow]}>
          <Text style={styles.greeting}>Good morning, Salman</Text>

          <View style={styles.searchWrap}>
            <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.actions}>
            <View style={styles.bellWrap}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.navy} />
              <View style={styles.dot} />
            </View>

            <View style={styles.avatarWrap}>
              <Image source={{ uri: "https://i.pravatar.cc/64?img=19" }} style={styles.avatar} />
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner (white card with title + 3D character) */}
          <View style={[styles.banner, shadow]}>
            <Text style={styles.bannerText}>Educational Mode – Check Your Work Mode</Text>
            <Image
              source={{ uri: "https://raw.githubusercontent.com/midudev/icons/main/3d/graduate.png" }}
              resizeMode="contain"
              style={{ width: 110, height: 70 }}
            />
          </View>

          {/* Two action cards */}
          <View style={styles.actionsRow}>
            <ActionCard
              icon={<Ionicons name="camera-outline" size={84} color={COLORS.navy} />}
              title="Start Camera"
              onPress={startCamera}
            />
            <ActionCard
              icon={<Ionicons name="cloud-upload-outline" size={84} color={COLORS.navy} />}
              title="Upload Image"
              onPress={uploadImage}
            />
          </View>

          {/* Preview */}
          {preview && (
            <View style={[styles.previewCard, shadow]}>
              <Text style={styles.previewTitle}>Preview</Text>
              <Image source={{ uri: preview }} style={styles.previewImg} resizeMode="contain" />
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.primaryTxt}>Analyze</Text>
              </Pressable>
            </View>
          )}

          {/* Back link */}
          <View style={{ alignItems: "center", marginTop: G }}>
            <Link href="/educational">
              <Text style={{ color: COLORS.navy, fontWeight: "800" }}>← Back to Educational</Text>
            </Link>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------- Sidebar (solid navy, same look) ---------- */
function Sidebar() {
  return (
    <View style={styles.sidebarSolid}>
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Ionicons name="sparkles" size={16} color="#fff" />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

       {/* Menu */}
       <View style={styles.menuList}>
        <SidebarItem icon="grid-outline" label="Dashboard" href="/StudentD" />
        <SidebarItem active icon="school-outline" label="Educational Mode" href="/educational" />
        <SidebarItem icon="game-controller-outline" label="Games Mode" href="/games-mode" />
        <SidebarItem icon="trophy-outline" label="Leaderboard" href="/leaderboard" />
        <SidebarItem icon="settings-outline" label="Settings" href="/StudentsSettings" />
      </View>

      <View style={styles.joinWrapSolid}>
        <Pressable style={[styles.joinCard, shadowLg]}>
          <View style={styles.plusBox}>
            <Ionicons name="add" size={34} color={COLORS.navy} />
          </View>
          <Text style={styles.joinText}>Join Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SidebarItem({ icon, label, href = "/", active = false }) {
  const inner = (
    <View style={[styles.itemInner, active && styles.itemActive]}>
      <Ionicons
        name={icon}
        size={18}
        color={active ? COLORS.navy : "#E6ECFF"}
        style={{ marginRight: 12 }}
      />
      <Text style={[styles.itemText, active && styles.itemTextActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );

  return (
    <Link href={href} asChild>
      <Pressable style={{ paddingHorizontal: S * 2, paddingVertical: 2 }}>
        {inner}
      </Pressable>
    </Link>
  );
}

/* ---------- Action Card ---------- */
function ActionCard({ icon, title, onPress }) {
  return (
    <View style={[styles.card, shadow]}>
      <View style={styles.cardIcon}>{icon}</View>
      <Pressable style={styles.cardBtn} onPress={onPress}>
        <Text style={styles.cardBtnTxt}>{title}</Text>
      </Pressable>
    </View>
  );
}

/* ---------- Styles ---------- */
const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },
  android: { elevation: 4 },
});
const shadowLg = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
  },
  android: { elevation: 7 },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.page,
    flexDirection: "row",
  },

  /* Sidebar */
  sidebarSolid: {
    width: SIDEBAR_W,
    backgroundColor: COLORS.navy,
    position: "relative",
    paddingTop: S * 3,
    paddingBottom: S * 3,
  },
  brand: { paddingHorizontal: S * 2, flexDirection: "row", alignItems: "center" },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandText: { color: "#E6EEFF", fontWeight: "900", fontSize: 18 },

  menuList: { marginTop: S * 2, paddingVertical: S * 1.5 },
  itemInner: {
    height: 50,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  itemActive: { backgroundColor: COLORS.white },
  itemText: { color: "#E6ECFF", fontSize: 16, fontWeight: "800" },
  itemTextActive: { color: COLORS.navy },

  joinWrapSolid: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: S * 3,
    alignItems: "center",
  },
  joinCard: {
    width: 190,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    paddingVertical: S * 2.5,
    alignItems: "center",
  },
  plusBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: S,
  },
  joinText: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },

  /* Main content */
  main: { flex: 1 },

  topBar: {
    marginTop: S * 2,
    marginHorizontal: G,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: S * 2,
  },
  greeting: { color: COLORS.navy, fontWeight: "800", marginRight: S * 2 },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F5FA",
    borderRadius: 10,
    paddingHorizontal: S * 1.5,
    height: 36,
  },
  searchInput: { flex: 1, fontSize: 13, color: COLORS.text },
  actions: { flexDirection: "row", alignItems: "center", gap: S * 2, marginLeft: S * 2 },
  bellWrap: { position: "relative", padding: 6 },
  dot: { position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },
  avatarWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F3F5FA",
    borderRadius: 999,
    paddingHorizontal: 8,
    height: 36,
  },
  avatar: { width: 24, height: 24, borderRadius: 12 },

  banner: {
    marginTop: G,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    paddingHorizontal: G,
    paddingVertical: S * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: { color: COLORS.navy, fontWeight: "900", fontSize: 16 },

  actionsRow: {
    marginTop: G,
    flexDirection: "row",
    gap: G,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flexBasis: width > 1100 ? "48%" : "100%",
    backgroundColor: COLORS.white,
    borderRadius: 22,
    paddingVertical: G * 2,
    alignItems: "center",
    marginBottom: G,
  },
  cardIcon: {
    width: 160,
    height: 110,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: G,
  },
  cardBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cardBtnTxt: { color: COLORS.white, fontWeight: "800", fontSize: 16 },

  previewCard: {
    marginTop: G,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: G,
    alignItems: "center",
  },
  previewTitle: { color: COLORS.text, fontWeight: "900", marginBottom: S },
  previewImg: { width: "100%", height: 340, borderRadius: 12, backgroundColor: "#F3F5FA" },

  primaryBtn: {
    marginTop: G,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 999,
  },
  primaryTxt: { color: COLORS.white, fontWeight: "800" },
});
