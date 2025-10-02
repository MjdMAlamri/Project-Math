// app/Join-Quiz.js
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  Pressable,          // ✅ IMPORT THIS
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useRouter } from "expo-router";  // ✅ useRouter for the sidebar too
import { Ionicons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

/* ---- Theme (matches your other screens) ---- */
const COLORS = {
  navy: "#0C2A5B",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#64748B",
  badge: "#EEF2FF",
};
const S = 8;
const G = 20;
const SIDEBAR_W = 220;

/* ---------- Page ---------- */
export default function QuizPage() {
  const { gameId = "" } = useLocalSearchParams();

  const players = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i + 1,
        img: `https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg`,
        bg: i % 3 === 0 ? "#2C2A5A" : i % 3 === 1 ? "#6B7280" : "#EAC9C3",
      })),
    []
  );

  return (
    <View style={styles.root}>
      <SidebarSolid current="quiz" />

      <View style={styles.main}>
        {/* Top bar (matches other pages) */}
        <View style={[styles.topRow, styles.shadow]}>
          <Text style={styles.greeting}>Good morning, Salman</Text>

          <View style={styles.searchWrap}>
            <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
            {/* kept as a simple text label like your snippet */}
            <Text style={styles.searchInput} accessibilityLabel="Search">Search</Text>
          </View>

          <View style={styles.actions}>
            <View style={styles.bellWrap}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.navy} />
              <View style={styles.dot} />
            </View>

            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Main content */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}>
          <View style={[styles.panel, styles.shadowLg]}>
            {/* Header row: ID pill + title */}
            <View style={styles.headerRow}>
              <View style={styles.idPill}>
                <Text style={styles.idText}>12345678</Text>
              </View>
              <Text style={styles.title}>Quiz</Text>
            </View>

            {/* Avatars grid */}
            <View style={styles.grid}>
              {players.map((p) => (
                <View key={p.id} style={[styles.avatarCircle, { backgroundColor: p.bg }]}>
                  <Image source={{ uri: p.img }} style={styles.pAvatar} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------- Sidebar (solid navy, no Join Quiz card) ---------- */
function SidebarSolid({ current = "quiz" }) {
  const router = useRouter();

  // Map route keys to actual paths
  const routeMap = {
    dashboard: "/StudentD",
    edu: "/educational",
    games: "/games-mode",
    leaderboard: "/leaderboard",
    settings: "/StudentsSettings",
    quiz: "/Join-Quiz",
  };

  // Unified navigator: accepts a full path or a key
  const navigate = (keyOrPath) => {
    if (!keyOrPath) return;
    if (typeof keyOrPath === "string" && keyOrPath.startsWith("/")) {
      router.push(keyOrPath);
      return;
    }
    const path = routeMap[keyOrPath];
    if (path) router.push(path);
  };

  // Local Item for the menu
  const Item = ({ icon, label, to, href, routeKey, active }) => (
    <Pressable
      onPress={() => navigate(href || to || routeKey)}   // ✅ supports href, to, or routeKey
      style={{ paddingHorizontal: S * 2, paddingVertical: 2 }}
    >
      <View style={[styles.itemInner, active && styles.itemActive]}>
        <Ionicons
          name={icon}
          size={18}
          color={active ? COLORS.navy : "#E6ECFF"}
          style={{ marginRight: 12 }}
        />
        <Text
          style={[styles.itemText, active && styles.itemTextActive]}
          numberOfLines={2}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.sidebarSolid}>
      {/* Brand */}
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Image
            source={{
              uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo",
            }}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

      {/* Menu */}
      <View style={styles.menuList}>
        <Item icon="grid-outline"            label="Dashboard"         routeKey="dashboard"   active={current==="dashboard"} />
        <Item icon="school-outline"          label={"Educational\nMode"} routeKey="edu"         active={current==="edu"} />
        <Item icon="game-controller-outline" label="Games Mode"        routeKey="games"       active={current==="games"} />
        <Item icon="trophy-outline"          label="Leaderboard"       routeKey="leaderboard" active={current==="leaderboard"} />
        <Item icon="settings-outline"        label="Settings"          routeKey="settings"    active={current==="settings"} />
      </View>
      {/* No Join Quiz button here, per your request */}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  // Shadows
  shadow: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 18 },
    android: { elevation: 6 },
    default: { boxShadow: "0 8px 18px rgba(0,0,0,0.08)" },
  }),
  shadowLg: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.12, shadowOffset: { width: 0, height: 12 }, shadowRadius: 22 },
    android: { elevation: 8 },
    default: { boxShadow: "0 12px 22px rgba(0,0,0,0.12)" },
  }),

  root: { flex: 1, flexDirection: "row", backgroundColor: COLORS.page },

  /* Sidebar (solid navy, shared style) */
  sidebarSolid: {
    width: SIDEBAR_W,
    backgroundColor: COLORS.navy,
    position: "relative",
    paddingTop: S * 3,
    paddingBottom: S * 3,
  },
  brand: { paddingHorizontal: S * 2, flexDirection: "row", alignItems: "center" },
  brandIcon: {
    width: 28, height: 28, borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
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

  /* Main & Top bar */
  main: { flex: 1 },
  topRow: {
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
  searchInput: { flex: 1, fontSize: 13, color: COLORS.subtext },
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
  avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#d7ddff" },

  /* Panel */
  panel: {
    marginTop: G,
    backgroundColor: "#0f2a6b",
    borderRadius: 22,
    padding: 22,
    minHeight: 520,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 18 },
  idPill: { backgroundColor: "#fff", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 18 },
  idText: { color: "#8aa0c6", fontSize: 18, fontWeight: "800", letterSpacing: 1 },
  title: { color: "#fff", fontWeight: "900", fontSize: 36, textAlign: "center" },

  /* Avatars grid */
  grid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    paddingLeft: 50,
  },
  avatarCircle: {
    width: width >= 1100 ? 120 : 96,
    height: width >= 1100 ? 120 : 96,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pAvatar: { width: "85%", height: "85%", borderRadius: 999 },
});
