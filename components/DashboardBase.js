// components/DashboardBase.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { Link, usePathname } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  navy: "#0C2A5B",
  navyDeep: "#0A1E42",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#6B7280",
  blue: "#2B6DE8",
  shadow: "rgba(15, 23, 42, 0.08)",
};

const S = 8;
const SIDEBAR_W = 220;

/* ---------------- Main Shell ---------------- */
export default function DashboardBase({ children, contentContainerStyle }) {
  const pathname = usePathname() || "/";

  const ITEMS = [
    { href: "/TeacherD",        icon: "speedometer-outline",  label: "Dashboard" },
    { href: "/ClassesMain",     icon: "people-outline",       label: "Classes" },
    { href: "/Announcements",   icon: "notifications-outline",label: "Announcements" },
    { href: "/leaderboardForT", icon: "podium-outline",       label: "Leaderboard" },
    { href: "/Teachersettings", icon: "cog-outline",          label: "Settings" },
  ];

  const isActive = (href) =>
    pathname === href ||
    pathname === href + "/" ||
    pathname.startsWith(href + "/"); // covers nested pages like /ClassesMain/123

  return (
    <View style={styles.root}>
      {/* ===== Left: Sidebar ===== */}
      <View style={styles.sidebar}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <Image
              source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo" }}
              style={styles.brandIconImg}
            />
          </View>
          <Text style={styles.brandText}>EdVenture</Text>
        </View>

        {/* Menu */}
        <View style={{ marginTop: S * 2, gap: S }}>
          {ITEMS.map((it) => (
            <SidebarItem
              key={it.href}
              icon={it.icon}
              label={it.label}
              href={it.href}
              active={isActive(it.href)}
            />
          ))}
        </View>

        {/* Join Quiz card */}
<View style={styles.joinWrap}>
  <Link href="/CreateQ" asChild>
    <Pressable style={styles.joinCard}>
      <View style={styles.plusBox}>
        <Ionicons name="add" size={28} color={COLORS.navy} />
      </View>
      <Text style={styles.joinText}>Create Quiz</Text>
    </Pressable>
  </Link>
</View>

      </View>

      {/* ===== Right: Main area ===== */}
      <View style={styles.main}>
        {/* Top bar */}
        <View style={[styles.topBar, shadow]}>
          <Text style={styles.greeting}>Good morning, Rakan</Text>

          <View style={styles.searchWrap}>
            <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.rightIcons}>
            <View style={styles.bellWrap}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.navy} />
              <View style={styles.dot} />
            </View>

            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
                style={styles.avatar}
              />
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Content area */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: S * 3, flexGrow: 1, ...(contentContainerStyle || {}) }}
          showsVerticalScrollIndicator={false}
        >
          {children ?? null}
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------------- Sidebar Item ---------------- */
function SidebarItem({ icon, label, href = "/", active = false }) {
  const inner = (
    <View style={[styles.itemInner, active && styles.itemActive]}>
      <Ionicons
        name={icon}
        size={16}
        color={active ? COLORS.navy : "#E6ECFF"}
        style={{ marginRight: 10 }}
      />
      <Text
        style={[styles.itemText, active && styles.itemTextActive]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );

  return (
    <Link href={href} asChild>
      <Pressable style={{ paddingHorizontal: S * 2 }}>
        {inner}
      </Pressable>
    </Link>
  );
}

/* ---------------- Styles ---------------- */
const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
  },
  android: { elevation: 6 },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.page,
    flexDirection: "row",
  },

  /* Sidebar */
  sidebar: {
    width: SIDEBAR_W,
    backgroundColor: COLORS.navy,
    paddingTop: S * 3,
    justifyContent: "flex-start",
    position: "relative",
  },
  brand: {
    paddingHorizontal: S * 2,
    flexDirection: "row",
    alignItems: "center",
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandIconImg: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  brandText: { color: "#E6EEFF", fontWeight: "800", fontSize: 16 },

  itemInner: {
    minHeight: 44,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  itemActive: { backgroundColor: COLORS.white },
  itemText: {
    color: "#E6ECFF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    flexShrink: 1,
  },
  itemTextActive: { color: COLORS.navy },

  joinWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: S * 3,
    alignItems: "center",
  },
  joinCard: {
    width: 132,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: S * 2,
    alignItems: "center",
  },
  plusBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: S,
  },
  joinText: { color: COLORS.navy, fontWeight: "800" },

  /* Main area */
  main: { flex: 1 },

  topBar: {
    marginTop: S * 2,
    marginHorizontal: S * 3,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: S * 2,
  },
  greeting: {
    color: COLORS.navy,
    fontWeight: "800",
    marginRight: S * 2,
  },
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
  rightIcons: { flexDirection: "row", alignItems: "center", marginLeft: S * 2, gap: S * 2 },

  bellWrap: { position: "relative", padding: 6 },
  dot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },

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
});
