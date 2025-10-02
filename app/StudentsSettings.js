// app/StudentsSettings.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

/* ---------- Theme / constants ---------- */
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

/* ================= Page ================= */
export default function SettingsScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    firstName: "Salman",
    lastName: "Alharbi",
    email: "Salman.Al@gmail.com",
    phoneCode: "+966",
    phone: "50XXXXXXX",
    username: "User-Name",
    useremail: "user@email.com",
  });

  const [pwd, setPwd] = useState({
    current: "",
    currentConfirm: "",
    next: "",
    nextConfirm: "",
  });

  const onSaveDetails = () => {
    if (!profile.firstName || !profile.lastName || !profile.email) {
      Alert.alert("Missing info", "Please fill name and email.");
      return;
    }
    Alert.alert("Saved", "Your details were updated.");
  };

  const onSavePassword = () => {
    if (pwd.current !== pwd.currentConfirm) {
      Alert.alert("Mismatch", "Current password confirmation doesn’t match.");
      return;
    }
    if (!pwd.next || pwd.next.length < 6) {
      Alert.alert("Weak password", "New password must be at least 6 characters.");
      return;
    }
    if (pwd.next !== pwd.nextConfirm) {
      Alert.alert("Mismatch", "New password confirmation doesn’t match.");
      return;
    }
    Alert.alert("Password changed", "Your password was updated.");
    setPwd({ current: "", currentConfirm: "", next: "", nextConfirm: "" });
  };

  const navigateFromSidebar = (route) => {
    if (route === "settings") return;
    const map = {
      dashboard: "/StudentD",
      edu: "/educational",
      games: "/games-mode",
      leaderboard: "/leaderboard",
      settings: "/StudentsSettings",
      quiz: "/Join-Quiz",
    };
    router.push(map[route] || "/");
  };

  return (
    <View style={styles.root}>
      <SidebarSolid current="settings" onNavigate={navigateFromSidebar} />

      <View style={styles.main}>
        <TopBar />

        <ScrollView contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}>
          <View style={styles.wrapper}>
            {/* Left: Forms */}
            <View style={[styles.left, styles.shadow]}>
              <Text style={styles.sectionTitle}>User Settings</Text>

              <Text style={styles.blockTitle}>Details</Text>
              <View style={styles.row2}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    value={profile.firstName}
                    onChangeText={(t) => setProfile((p) => ({ ...p, firstName: t }))}
                    placeholder="First name"
                    style={styles.input}
                  />
                </View>
                <View style={{ width: 16 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    value={profile.lastName}
                    onChangeText={(t) => setProfile((p) => ({ ...p, lastName: t }))}
                    placeholder="Last name"
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.row2}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    value={profile.email}
                    onChangeText={(t) => setProfile((p) => ({ ...p, email: t }))}
                    placeholder="email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
                <View style={{ width: 16 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Phone Number:</Text>
                  <View style={styles.phoneRow}>
                    <TextInput
                      value={profile.phoneCode}
                      onChangeText={(t) => setProfile((p) => ({ ...p, phoneCode: t }))}
                      style={[styles.input, styles.code]}
                    />
                    <TextInput
                      value={profile.phone}
                      onChangeText={(t) => setProfile((p) => ({ ...p, phone: t }))}
                      placeholder="5XXXXXXXX"
                      keyboardType="phone-pad"
                      style={[styles.input, { flex: 1 }]}
                    />
                  </View>
                </View>
              </View>
              <Pressable style={styles.btnPrimary} onPress={onSaveDetails}>
                <Text style={styles.btnPrimaryText}>Save changes</Text>
              </Pressable>
            </View>

            {/* Right: Profile card */}
            <View style={styles.right}>
              <View style={[styles.profileCard, styles.shadow]}>
                <Image
                  source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
                  style={styles.profileAvatar}
                />
                <Text style={styles.username}>@{profile.username}</Text>
                <Text style={styles.useremail}>{profile.useremail}</Text>
              </View>
              <Pressable
                style={[styles.btnPrimary, { alignSelf: "center", width: 140, marginTop: 16 }]}
                onPress={() => Alert.alert("Logged out", "Session ended.")}
              >
                <Text style={styles.btnPrimaryText}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ================= Sidebar (solid navy; Join Quiz pinned) ================= */
/* ================= Sidebar (solid navy; Join Quiz pinned) ================= */
function SidebarSolid({ current = "settings", onNavigate }) {
  // Accept both `route` and `to` so old calls keep working
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

      {/* Menu (your existing `to="..."` props now work) */}
      <View style={styles.menuList}>
        <Item icon="grid-outline"            label="Dashboard"        to="dashboard"   />
        <Item icon="school-outline"          label="Educational Mode" to="edu"         />
        <Item icon="game-controller-outline" label="Games Mode"       to="games"       />
        <Item icon="trophy-outline"          label="Leaderboard"      to="leaderboard" />
        <Item  active icon="settings-outline"        label="Settings"         to="settings"    />
      </View>

      {/* Join Quiz pinned at bottom */}
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


/* ================= Top Bar (matching other pages) ================= */
function TopBar({ greeting = "Good morning, Salman" }) {
  return (
    <View style={[styles.topRow, styles.shadow]}>
      <Text style={styles.greeting}>{greeting}</Text>

      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" style={styles.searchInput} />
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

  /* Layout */
  root: { flex: 1, backgroundColor: COLORS.page, flexDirection: "row" },
  main: { flex: 1 },

  /* Sidebar: solid navy */
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

  /* Join Quiz inside sidebar */
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

  /* Content wrapper */
  wrapper: { marginTop: G, flexDirection: "row", gap: G },

  /* Left column (forms) */
  left: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9EDFF",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginBottom: 10 },
  blockTitle: { fontSize: 14, fontWeight: "800", color: COLORS.text, marginTop: 4, marginBottom: 8 },

  row2: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 },

  label: { color: COLORS.subtext, fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: "#F6F8FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6EAFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
  },
  phoneRow: { flexDirection: "row", alignItems: "center" },
  code: { width: 70, marginRight: 8, textAlign: "center" },

  btnPrimary: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  btnPrimaryText: { color: COLORS.white, fontWeight: "800", textAlign: "center" },
  link: { color: "#5663b5", textDecorationLine: "underline", fontWeight: "700" },

  /* Right column (profile) */
  right: { width: 300, alignSelf: "flex-start" },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9EDFF",
    alignItems: "center",
  },
  profileAvatar: { width: 140, height: 140, borderRadius: 70, backgroundColor: "#E9EDFF", marginBottom: 10 },
  username: { color: "#6b3ef2", fontWeight: "800", marginBottom: 4 },
  useremail: { color: COLORS.subtext },
});
