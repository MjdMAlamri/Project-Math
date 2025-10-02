// app/educational.js
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
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking } from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  navy: "#0C2A5B",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#64748B",
  blue: "#2B6DE8",
  track: "#E9EDF6",
  ring: "#2FB7A1", // greenish endpoint dot color
  ring2: "#4F67DB", // blue segment color
};

const S = 8;
const G = 20;
const SIDEBAR_W = 220;

/* ----------------- PAGE ----------------- */
export default function Educational() {
  const router = useRouter(); // ✅ hook inside component

  return (
    <View style={styles.root}>
      <Sidebar />

      <View style={styles.main}>
        {/* ===== Top bar (greeting + search + actions) ===== */}
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
            <View style={[styles.bellWrap, { marginRight: S * 2 }]}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.navy} />
              <View style={styles.dot} />
            </View>

            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
                style={styles.avatar}
              />
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" style={{ marginLeft: 6 }} />
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== Learning Tracker card ===== */}
          <View style={[styles.card, shadow]}>
            <View style={[styles.cardRow, { alignItems: "center" }]}>
              <Text style={styles.trackerTitle}>Learning Tracker For this Semester</Text>

              <View style={styles.gaugesRow}>
                <MiniGauge label="Algebra" value={40} />
                <View style={{ width: G }} />
                <MiniGauge label="Geometry" value={70} />
                <View style={{ width: G }} />
                <MiniGauge label="Fractions" value={50} />
                <View style={{ width: G }} />
                <MiniGauge label="Statistics" value={40} />
              </View>
            </View>
          </View>

          {/* ===== Big CTA card (Check Your Work With AI) ===== */}
          <View style={[styles.callout, shadowLg]}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: G }}>
              <Text style={styles.calloutTitle}>Check Your Work With AI</Text>
              <Text style={styles.calloutSub}>
                Show your answer, the AI checks{"\n"}
                each step to show if it’s right or wrong
              </Text>

              {/* Use Pressable + router to avoid Link+asChild issues on web */}
              <Pressable
  style={styles.startBtn}
  onPress={() => Linking.openURL("https://edventure-educational-mode.netlify.app/")}
>
  <Text style={styles.startTxt}>Start</Text>
</Pressable>
            </View>

            <Image
              source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/YourWork" }}
              resizeMode="contain"
              style={styles.calloutArt}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ----------------- Sidebar (solid navy) ----------------- */
function Sidebar() {
  const router = useRouter(); // ✅ hook inside component

  return (
    <View style={styles.sidebarSolid}>
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
        <SidebarItem icon="grid-outline" label="Dashboard" onPress={() => router.push("/StudentD")} />
        <SidebarItem icon="school-outline" label={"Educational\nMode"} active onPress={() => router.push("/educational")} />
        <SidebarItem icon="game-controller-outline" label="Games Mode" onPress={() => router.push("/games-mode")} />
        <SidebarItem icon="trophy-outline" label="Leaderboard" onPress={() => router.push("/leaderboard")} />
        <SidebarItem icon="settings-outline" label="Settings" onPress={() => router.push("/StudentsSettings")} />
      </View>

      {/* Join Quiz button — keep same look, navigate safely */}
      <View style={styles.joinWrapSolid}>
        <Pressable
          style={[styles.joinCard, shadowWebSafe]}
          onPress={() => router.push("/Join-Quiz")}
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

function SidebarItem({ icon, label, active = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ paddingHorizontal: S * 2, paddingVertical: 2 }}>
      <View style={[styles.itemInner, active && styles.itemActive]}>
        <Ionicons
          name={icon}
          size={18}
          color={active ? COLORS.navy : "#E6ECFF"}
          style={{ marginRight: 12 }}
        />
        <Text style={[styles.itemText, active && styles.itemTextActive]} numberOfLines={2}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

/* ----------------- Small UI pieces ----------------- */
function MiniGauge({ value = 60, label = "Score" }) {
  const pct = Math.max(0, Math.min(100, value));

  const BOX = 120;
  const SIZE = 104;
  const BORDER = 10;

  // simple half-ring trick; we don’t actually need the dot here
  const rightRotate = Math.min(180, (pct / 100) * 360);
  const leftRotate = Math.max(0, (pct / 100) * 360 - 180);

  return (
    <View style={styles.gauge}>
      {/* Track ring */}
      <View style={styles.gaugeTrack} />

      {/* Progress segments */}
      <View style={[styles.gaugeHalf, styles.gaugeRight, { transform: [{ rotateZ: `${rightRotate}deg` }] }]} />
      <View style={[styles.gaugeHalf, styles.gaugeLeft,  { transform: [{ rotateZ: `${leftRotate}deg` }] }]} />

      {/* Center content */}
      <View style={styles.gaugeCenter}>
        <Text style={styles.gaugeValue}>{value}</Text>
        <Text style={styles.gaugeSmall}>Your Score</Text>
      </View>

      <Text style={styles.gaugeLabel}>{label}</Text>
    </View>
  );
}

/* ----------------- Shadows ----------------- */
const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },
  android: { elevation: 4 },
  web: {}, // ✅ no-op on web to avoid style merge issues
});
const shadowLg = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
  },
  android: { elevation: 7 },
  web: {}, // ✅ no-op on web
});
const shadowWebSafe = Platform.OS === "web" ? {} : shadow;

/* ----------------- Styles ----------------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.page,
    flexDirection: "row",
  },

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

  joinWrapSolid: {
    position: "absolute",
    left: 0, right: 0, bottom: S * 3,
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
    width: 72, height: 72, borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center", justifyContent: "center",
    marginBottom: S,
  },
  joinText: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },

  /* Main panel */
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
  greeting: { color: COLORS.navy, fontWeight: "800", marginRight: S * 4, marginLeft: S * 2 },
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

  // Avoid 'gap' on web (older RNW); emulate with margins
  actions: { flexDirection: "row", alignItems: "center" },
  bellWrap: { position: "relative", padding: 6 },
  dot: {
    position: "absolute",
    top: 6, right: 6,
    width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6",
  },
  avatarWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#F3F5FA", borderRadius: 999, paddingHorizontal: 8, height: 36,
  },
  avatar: { width: 24, height: 24, borderRadius: 12 },

  /* Tracker card */
  card: {
    marginTop: G,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: G,
  },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  trackerTitle: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },
  gaugesRow: { flexDirection: "row", alignItems: "center" },

  /* Gauge visuals */
  gauge: {
    width: 120, height: 120, alignItems: "center", justifyContent: "center",
  },
  gaugeTrack: {
    position: "absolute",
    width: 104, height: 104, borderRadius: 52,
    borderWidth: 10, borderColor: COLORS.track,
  },
  gaugeHalf: {
    position: "absolute",
    width: 104, height: 104, borderRadius: 52,
    borderWidth: 10,
    borderColor: "transparent",
  },
  // Right half draws the first 0..180deg using top+left borders
  gaugeRight: {
    borderTopColor: COLORS.ring2,
    borderLeftColor: COLORS.ring2,
  },
  // Left half draws the remaining 180..360deg using bottom+right borders
  gaugeLeft: {
    borderBottomColor: COLORS.ring2,
    borderRightColor: COLORS.ring2,
  },
  gaugeCenter: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: COLORS.white,
    alignItems: "center", justifyContent: "center",
  },
  gaugeValue: { fontWeight: "900", color: COLORS.navy, fontSize: 18 },
  gaugeSmall: { color: COLORS.subtext, fontSize: 10, marginTop: 2 },
  gaugeLabel: { position: "absolute", top: -6, fontSize: 11, color: COLORS.subtext },

  /* Big CTA card */
  callout: {
    marginTop: G,
    backgroundColor: COLORS.white,
    borderRadius: 36,
    paddingVertical: G * 2,
    paddingLeft: G * 2,
    flexDirection: "row",
    alignItems: "center",
  },
  calloutTitle: { color: COLORS.text, fontSize: 26, fontWeight: "900", textAlign: "center" },
  calloutSub: {
    color: COLORS.subtext, textAlign: "center",
    marginTop: S, lineHeight: 22, fontSize: 15,
  },
  startBtn: {
    marginTop: G,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
  },
  startTxt: { color: COLORS.white, fontWeight: "800" },
  calloutArt: { width: 400, height: 290, marginRight: 150 },
});
