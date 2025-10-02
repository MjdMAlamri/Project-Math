// app/leaderboard.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

/* ---------- Theme / constants ---------- */
const { width } = Dimensions.get("window");
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

/* ---------- Data ---------- */
const STARTERS = [
  { name: "Salman", points: 760, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Maher", points: 690, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Mosab", points: 640, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Ali", points: 590, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Abdulrahman", points: 448, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Ahmed", points: 445, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Rakan", points: 443, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Faisal", points: 430, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Abdallah", points: 424, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
  { name: "Omar", points: 410, avatar: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" },
];

/* ================= Page ================= */
export default function LeaderboardScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => [...STARTERS].sort((a, b) => b.points - a.points), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((x) => x.name.toLowerCase().includes(q));
  }, [query, sorted]);

  const podium = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  const navigateFromSidebar = (route) => {
    if (!route) return;
    const map = {
      dashboard: "/StudentD",
      edu: "/educational",
      games: "/games-mode",
      leaderboard: "/leaderboard",
      settings: "/StudentsSettings",
      quiz: "/Join-Quiz",
    };
    if (map[route]) router.push(map[route]);
  };
  function SidebarItem({
    icon = "ellipse-outline",
    label = "",
    active = false,
    href,
    route,
    onNavigate,
    styles,
    colors = { navy: "#0C2A5B" },
    paddingH = 16,
    paddingV = 2,
    iconSize = 18,
    iconInactive = "#E6ECFF",
  }) {
    const router = useRouter();
  
    const handlePress = () => {
      if (typeof onNavigate === "function" && route) {
        onNavigate(route);
        return;
      }
      if (href) {
        router.push(href);
        return;
      }
      // No-op if nothing provided
      console.warn("SidebarItem pressed but neither href nor route+onNavigate were provided.");
    };
  
    return (
      <Pressable onPress={handlePress} style={{ paddingHorizontal: paddingH, paddingVertical: paddingV }}>
        <View style={[styles?.itemInner, active && styles?.itemActive]}>
          <Ionicons
            name={icon}
            size={iconSize}
            color={active ? colors.navy : iconInactive}
            style={{ marginRight: 12 }}
          />
          <Text style={[styles?.itemText, active && styles?.itemTextActive]} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.root}>
      <SidebarSolid current="leaderboard" onNavigate={navigateFromSidebar} />

      <View style={styles.main}>
        <TopBar greeting="Good morning, Salman" onSearch={setQuery} />

        <ScrollView contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}>
          {/* Header + podium */}
          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.headerTitle}>Leaderboard</Text>

            <View style={styles.podiumWrap}>
              {/* 2nd */}
              {podium[1] && (
                <View style={[styles.podiumCol, { marginTop: 30 }]}>
                  <View style={styles.podiumAvatar}>
                    <Image source={{ uri: podium[1].avatar }} style={styles.podiumImg} />
                  </View>
                  <Text style={styles.podiumName}>{podium[1].name}</Text>
                  <Text style={styles.podiumPts}>{podium[1].points} pts</Text>
                  <View style={[styles.podiumBlock, { height: 80 }]}>
                    <Text style={styles.podiumRank}>2</Text>
                  </View>
                </View>
              )}

              {/* 1st */}
              {podium[0] && (
                <View style={[styles.podiumCol, { marginTop: 0 }]}>
                  <View style={styles.crown}>
                    <Ionicons name="crown" size={14} color="#fff" />
                  </View>
                  <View style={[styles.podiumAvatar, { borderColor: "#1b2a7a" }]}>
                    <Image source={{ uri: podium[0].avatar }} style={styles.podiumImg} />
                  </View>
                  <Text style={styles.podiumName}>{podium[0].name}</Text>
                  <Text style={styles.podiumPts}>{podium[0].points} pts</Text>
                  <View style={[styles.podiumBlock, { height: 120, backgroundColor: "#1b2a7a" }]}>
                    <Text style={[styles.podiumRank, { color: "#fff" }]}>1</Text>
                  </View>
                </View>
              )}

              {/* 3rd */}
              {podium[2] && (
                <View style={[styles.podiumCol, { marginTop: 45 }]}>
                  <View style={styles.podiumAvatar}>
                    <Image source={{ uri: podium[2].avatar }} style={styles.podiumImg} />
                  </View>
                  <Text style={styles.podiumName}>{podium[2].name}</Text>
                  <Text style={styles.podiumPts}>{podium[2].points} pts</Text>
                  <View style={[styles.podiumBlock, { height: 68 }]}>
                    <Text style={styles.podiumRank}>3</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* List rows */}
          {rest.map((item, idx) => {
            const rank = idx + 4;
            return (
              <View key={`${item.name}-${idx}`} style={[styles.rowItem, styles.shadowSm]}>
                <View style={styles.rankBubble}>
                  <Text style={styles.rankText}>{rank}</Text>
                </View>
                <Image source={{ uri: item.avatar }} style={styles.rowAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <Text style={styles.rowPoints}>{item.points} points</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#b1b7c9" />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

/* ================= Sidebar (solid navy; quiz pinned inside) ================= */
function SidebarSolid({ current = "leaderboard", onNavigate }) {
  // Inline item so it's never "missing"
const Item = ({ icon, label, to, active }) => (
  <Pressable
    onPress={() => onNavigate?.(to)}
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
        numberOfLines={2}                // allow two lines
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
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo" }}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

      {/* Menu (local Item, no SidebarItem anywhere) */}
      {/* Menu (local Item) */}
<View style={styles.menuList}>
  <Item icon="grid-outline"            label="Dashboard"        to="dashboard"   active={current==="dashboard"} />
  <Item icon="school-outline"          label={"Educational\nMode"} to="edu"         active={current==="edu"} />
  <Item icon="game-controller-outline" label="Games Mode"       to="games"       active={current==="games"} />
  <Item icon="trophy-outline"          label="Leaderboard"      to="leaderboard" active={current==="leaderboard"} />
  <Item icon="settings-outline"        label="Settings"         to="settings"    active={current==="settings"} />
</View>


      {/* Join Quiz (pinned inside sidebar bottom) */}
      <View style={styles.joinWrapSolid}>
        <Pressable
          style={[styles.joinCard, styles.shadowLg]}
          onPress={() => onNavigate?.("quiz")}
        >
          <View style={styles.plusBox}>
            <Ionicons name="add" size={34} color={COLORS.navy} />
          </View>
          <Text style={styles.joinText}>Join Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ================= Top Bar (matches other pages) ================= */
function TopBar({ greeting = "Good morning, Salman", onSearch }) {
  const [q, setQ] = useState("");
  return (
    <View style={[styles.topRow, styles.shadow]}>
      <Text style={styles.greeting}>{greeting}</Text>

      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          value={q}
          onChangeText={(t) => {
            setQ(t);
            onSearch && onSearch(t);
          }}
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
          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
        </View>
      </View>
    </View>
  );
}

/* ================= Styles ================= */
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
  shadowSm: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10 },
    android: { elevation: 3 },
    default: { boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  }),

  /* Layout */
  root: { flex: 1, backgroundColor: COLORS.page, flexDirection: "row" },
  main: { flex: 1 },

  /* Sidebar (solid navy) */
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

  /* Join Quiz pinned inside sidebar */
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
    borderWidth: 1,
    borderColor: "#E6EAFF",
  },
  plusBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: COLORS.badge,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: S,
  },
  joinText: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },

  /* Top bar */
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
  greeting: { color: COLORS.navy, fontWeight: "800", marginRight: S * 4, marginLeft: S * 2},
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
  avatarWrap: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#F3F5FA", borderRadius: 999, paddingHorizontal: 8, height: 36 },
  avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#d7ddff" },

  /* Cards */
  card: {
    marginTop: G,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: G,
    borderWidth: 1,
    borderColor: "#E9EDFF",
  },
  headerTitle: { fontWeight: "900", color: "#1b2a7a", fontSize: 24, marginBottom: 8 },

  /* Podium */
  podiumWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 22,
    marginTop: 6,
    marginBottom: 6,
  },
  podiumCol: { alignItems: "center", justifyContent: "flex-end" },
  podiumAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#eef1ff",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#cfd6ff",
    marginBottom: 6,
  },
  podiumImg: { width: "100%", height: "100%" },
  podiumName: { fontSize: 12, color: "#334054", fontWeight: "700" },
  podiumPts: { fontSize: 12, color: COLORS.navy, fontWeight: "800", marginTop: 2, marginBottom: 8 },
  podiumBlock: {
    width: 64,
    backgroundColor: "#3f4c9d",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  podiumRank: { color: "#eef1ff", fontWeight: "900", fontSize: 22 },
  crown: { position: "absolute", top: -4, backgroundColor: "#f2b43c", borderRadius: 10, paddingHorizontal: 4, paddingVertical: 2 },

  /* Rows */
  rowItem: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF1FF",
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rankBubble: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#F1F4FF", alignItems: "center", justifyContent: "center" },
  rankText: { color: "#5B6B9B", fontWeight: "800" },
  rowAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#E9EDFF" },
  rowName: { color: COLORS.text, fontWeight: "900", marginBottom: 2 },
  rowPoints: { color: COLORS.subtext, fontSize: 12 },
});
