// app/dashboard.js
import React, { useState } from "react";
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
  Linking as RNLinking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  navy: "#0C2A5B",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#64748B",
  blue: "#2B6DE8",
  badge: "#EEF2FF",
};

const S = 8;
const G = 20;
const SIDEBAR_W = 220;
const BANNER_MIN_HEIGHT = 160;

/** <<< EDIT ONLY THESE TO CHANGE WHERE "MORE" GOES >>> */
const MORE_LINKS = {
  games: "/games-mode",            // or "https://your-site/games"
  educational: "/educational",     // or "edu" to use sidebar keys
  leaderboard: "/leaderboard",
};

export default function Dashboard() {
  const router = useRouter();

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const [tasksCardH, setTasksCardH] = useState(0);
  const [leaderboardH, setLeaderboardH] = useState(0);

  /** Map sidebar keys to routes */
  const navigateFromSidebar = (keyOrPath) => {
    if (!keyOrPath) return;
    if (typeof keyOrPath === "string" && keyOrPath.startsWith("/")) {
      router.push(keyOrPath);
      return;
    }
    const map = {
      dashboard: "/StudentD",
      edu: "/educational",
      games: "/games-mode",
      leaderboard: "/leaderboard",
      settings: "/StudentsSettings",
      quiz: "/Join-Quiz",
    };
    router.push(map[keyOrPath] || "/");
  };

  /** Open helper for "More" buttons:
   * - http/https => external
   * - startsWith("/") => expo-router push
   * - otherwise => treat as sidebar key and use navigateFromSidebar
   */
  const open = (to) => {
    if (!to) return;
    if (typeof to === "string" && /^https?:\/\//i.test(to)) {
      RNLinking.openURL(to);
    } else if (typeof to === "string" && to.startsWith("/")) {
      router.push(to);
    } else {
      navigateFromSidebar(to);
    }
  };

  return (
    <View style={styles.root}>
      <Sidebar current="dashboard" onNavigate={navigateFromSidebar} />

      <View style={styles.main}>
        {/* Top row */}
        <View style={[styles.topRow, styles.shadow]}>
          <View style={styles.pillSmall}>
            <Text style={styles.pillSmallText}>Welcome to EdVenture</Text>
          </View>

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
              />
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: G, paddingBottom: G * 2 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Thin hero line */}
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1606761568499-6d2451b23c9a?q=80&w=1600&auto=format&fit=crop",
            }}
            resizeMode="cover"
            style={styles.topHero}
          />

          {/* Banner */}
          <LinearGradient
            colors={["#0F2F66", "#1D3E8A", "#5063D6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.3 }}
            style={[styles.banner, styles.shadowLg]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerDate}>{today}</Text>
              <Text style={styles.bannerTitle}>Welcome back, Salman!</Text>
              <Text style={styles.bannerSub}>Always stay updated in your student portal</Text>
            </View>

            <View style={styles.bannerArtWrap} pointerEvents="none">
              <Image
                source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TopBanner" }}
                resizeMode="contain"
                style={styles.bannerArt}
              />
            </View>
          </LinearGradient>

          {/* ===== ROW 1: [Games | Educational]  ||  [Leaderboard] ===== */}
          <View style={styles.gridRow}>
            {/* LEFT: Games + Educational */}
            <View style={styles.leftCol}>
              <View style={styles.leftSplitRow}>
                {/* Games */}
                <CardWithHeader
                  title="Games"
                  style={{ flex: 1 }}
                  minH={leaderboardH}
                  onMorePress={() => open(MORE_LINKS.games)}
                >
                  <View style={styles.tileRow}>
                    <Pressable
                      onPress={() => RNLinking.openURL("https://math-gesture-program.netlify.app/thumbs")}
                      style={styles.tileWrap}
                    >
                      <Image
                        source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TrueorFalse:MathEditionGame" }}
                        style={styles.tileImg}
                        resizeMode="cover"
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => RNLinking.openURL("https://math-gesture-program.netlify.app/numbers")}
                      style={styles.tileWrap}
                    >
                      <Image
                        source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/Count&RunGame" }}
                        style={styles.tileImg}
                        resizeMode="cover"
                      />
                    </Pressable>
                  </View>

                  <View style={styles.tileLabelsRow}>
                    <Text style={styles.tileLabel}>True or False</Text>
                    <Text style={styles.tileLabel}>Count & Run</Text>
                  </View>
                </CardWithHeader>

                {/* Educational */}
                <CardWithHeader
                  title="Educational"
                  style={{ flex: 1 }}
                  minH={leaderboardH}
                  onMorePress={() => open(MORE_LINKS.educational)}
                >
                  <View style={styles.tileRow}>
                    <Pressable
                      onPress={() => RNLinking.openURL("https://edventure-educational-mode.netlify.app/")}
                      style={styles.tileWrap}
                    >
                      <Image
                        source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/EdcMode" }}
                        style={styles.tileImg}
                        resizeMode="cover"
                      />
                    </Pressable>
                  </View>
                  <View style={styles.tileLabelsRow}>
                    <Text style={styles.tileLabel}>Educational</Text>
                  </View>
                </CardWithHeader>
              </View>
            </View>

            {/* RIGHT: Leaderboard */}
            <View style={styles.rightCol}>
              <View onLayout={(e) => setLeaderboardH(e.nativeEvent.layout.height)}>
                <CardWithHeader
                  title="Leaderboard"
                  compact
                  onMorePress={() => open(MORE_LINKS.leaderboard)}
                >
                  <View style={styles.leaderboard}>
                    <Podium place={2} name="Maher" points={640} />
                    <Podium place={1} name="Salman" points={660} big />
                    <Podium place={3} name="Mosab" points={600} />
                  </View>
                </CardWithHeader>
              </View>
            </View>
          </View>

          {/* ===== ROW 2: [Badges] || [Daily Tasks] ===== */}
          <View style={[styles.gridRow, { alignItems: "stretch" }]}>
            {/* LEFT: badges */}
            <View style={styles.leftCol}>
              <View style={styles.badgesRow}>
                <BadgeCard
                  img="https://github.com/MjdMAlamri/Images/raw/refs/heads/main/BadgesB"
                  title="Math Star"
                  desc={["For solving 100", "Equations correctly"].join("\n")}
                  minH={tasksCardH}
                />
                <BadgeCard
                  img="https://github.com/MjdMAlamri/Images/raw/refs/heads/main/trophyB"
                  title="Brain Power"
                  desc={["For completing", "one learning path"].join("\n")}
                  minH={tasksCardH}
                />
                <BadgeCard
                  img="https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TimeB"
                  title="Quick Thinker"
                  desc={["For solving problems", "within a short time"].join("\n")}
                  minH={tasksCardH}
                />
              </View>
            </View>

            {/* RIGHT: daily tasks */}
            <View style={styles.rightCol}>
              <View
                style={[styles.card, styles.shadow]}
                onLayout={(e) => setTasksCardH(e.nativeEvent.layout.height)}
              >
                <View style={[styles.cardBody, { paddingTop: S, paddingBottom: S }]}>
                  <Task title="One Learning Track" text="Algebra Assessment" />
                  <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: S * 1.25 }} />
                  <Task title="One Learning Track" text="Geometry Assessment" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------- SIDEBAR ---------- */
const Sidebar = ({ current = "dashboard", onNavigate }) => {
  const Item = ({ icon, label, to, active }) => (
    <Pressable onPress={() => onNavigate?.(to)} style={{ paddingHorizontal: S * 2, paddingVertical: 2 }}>
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

  return (
    <View style={styles.sidebar}>
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo" }}
            style={styles.brandIconImg}
          />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

      <View style={styles.menuList}>
        <Item icon="grid-outline" label="Dashboard" to="dashboard" active={current === "dashboard"} />
        <Item icon="school-outline" label={"Educational \nMode"} to="edu" active={current === "edu"} />
        <Item icon="game-controller-outline" label="Games Mode" to="games" active={current === "games"} />
        <Item icon="trophy-outline" label="Leaderboard" to="leaderboard" active={current === "leaderboard"} />
        <Item icon="settings-outline" label="Settings" to="settings" active={current === "settings"} />
      </View>

      <View style={styles.joinWrap}>
        <Pressable style={[styles.joinCard, styles.shadow]} onPress={() => onNavigate?.("quiz")}>
          <View style={styles.plusBox}>
            <Ionicons name="add" size={28} color={COLORS.navy} />
          </View>
          <Text style={styles.joinText}>Join Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* ---------- REUSABLE UI ---------- */
function CardWithHeader({ title, children, ctaText = "More", compact = false, style, minH, onMorePress }) {
  return (
    <View style={[styles.card, styles.shadow, style, minH ? { minHeight: minH } : null]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {ctaText ? (
          <Pressable style={styles.moreBtn} onPress={onMorePress}>
            <Text style={styles.moreText}>{ctaText}</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={[styles.cardBody, compact && { paddingTop: S, paddingBottom: S }]}>{children}</View>
    </View>
  );
}

function Podium({ place, name, big, points }) {
  const h = big ? 120 : place === 2 ? 98 : 86;
  return (
    <View style={styles.podiumCol}>
      <Image
        source={{ uri: `https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg` }}
        style={[styles.podiumAvatar, big && { width: 46, height: 46 }]}
      />
      <Text style={styles.podiumName}>{name}</Text>
      <Text style={styles.podiumPoints}>{points} pts</Text>

      <View style={[styles.podiumBar, { height: h, backgroundColor: big ? "#99A7FF" : "#C7D2FE" }]}>
        <Text style={styles.podiumNum}>{place}</Text>
      </View>
    </View>
  );
}

function Task({ title, text }) {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskDot} />
      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskText}>{text}</Text>
        <Pressable>
          <Text style={styles.taskLink}>See more</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BadgeCard({ img, title, desc, minH }) {
  return (
    <View style={[styles.badgeCard, styles.shadow, minH ? { minHeight: minH } : null]}>
      <View style={styles.badgeInner}>
        <Image source={{ uri: img }} resizeMode="contain" style={{ width: "60%", height: 110 }} />
        <View style={{ marginTop: 8, alignItems: "center" }}>
          <Text style={styles.badgeTitle}>{title}</Text>
          <Text style={styles.badgeDesc}>{desc}</Text>
        </View>
      </View>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  bannerUnified: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    padding: G,
    minHeight: BANNER_MIN_HEIGHT,
  },

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

  root: { flex: 1, backgroundColor: COLORS.page, flexDirection: "row" },

  /* Sidebar */
  sidebar: {
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
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  brandIconImg: { width: 24, height: 24, resizeMode: "contain" },
  brandText: { color: "#E6EEFF", fontWeight: "900", fontSize: 18 },
  menuList: { marginTop: S * 2, paddingVertical: S * 1.5 },

  joinWrap: { position: "absolute", left: 0, right: 0, bottom: S * 3, alignItems: "center" },
  joinCard: { width: 190, backgroundColor: COLORS.white, borderRadius: 22, paddingVertical: S * 2.5, alignItems: "center" },
  plusBox: { width: 72, height: 72, borderRadius: 16, backgroundColor: COLORS.badge, alignItems: "center", justifyContent: "center", marginBottom: S },
  joinText: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },

  itemInner: { minHeight: 50, borderRadius: 18, flexDirection: "row", alignItems: "center", paddingHorizontal: 14 },
  itemActive: { backgroundColor: COLORS.white },
  itemText: { color: "#E6ECFF", fontSize: 16, fontWeight: "800" },
  itemTextActive: { color: COLORS.navy },

  /* Main */
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
  pillSmall: { backgroundColor: COLORS.white, paddingHorizontal: S * 2, paddingVertical: S, borderRadius: 12, marginRight: S * 2 },
  pillSmallText: { color: COLORS.navy, fontWeight: "800" },

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
  avatar: { width: 24, height: 24, borderRadius: 12 },

  topHero: { width: "100%", height: 20, borderRadius: 16 },

  banner: {
    borderRadius: 18,
    padding: G,
    paddingRight: 220,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  bannerArtWrap: { position: "absolute", right: 12, width: 240, height: 180 },
  bannerDate: { color: "#C7D2FE", fontSize: 11, marginBottom: 6 },
  bannerTitle: { color: COLORS.white, fontSize: 28, fontWeight: "900" },
  bannerSub: { color: "#E5EAFD", marginTop: 6 },
  bannerArt: { width: "100%", height: "100%" },

  gridRow: { flexDirection: "row", marginTop: G, gap: G, flexWrap: "wrap" },
  leftCol: { flexBasis: width > 1100 ? "66%" : "100%", flexGrow: 1, gap: G },
  rightCol: { flexBasis: width > 1100 ? "32%" : "100%", gap: G },
  leftSplitRow: { flexDirection: "row", gap: G, alignItems: "stretch" },

  card: { backgroundColor: COLORS.white, borderRadius: 16, overflow: "hidden" },
  cardHeader: {
    paddingHorizontal: G,
    paddingTop: G * 0.8,
    paddingBottom: S,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { color: COLORS.navy, fontWeight: "900", fontSize: 16 },
  moreBtn: { backgroundColor: COLORS.navy, paddingHorizontal: S * 2, paddingVertical: S * 0.8, borderRadius: 999 },
  moreText: { color: COLORS.white, fontWeight: "800", fontSize: 12 },
  cardBody: { padding: G, flexGrow: 1 },

  /* >>> ROOMIER TILE GRID <<< */
  tileRow: {
    flexDirection: "row",
    gap: G,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: S * 2,
    paddingHorizontal: S,
  },
  tileWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFF",
    borderWidth: 1,
    borderColor: "#E6ECFF",
    borderRadius: 16,
    minWidth: 140,
    minHeight: 130,
  },
  tileImg: {
    width: 200,
    height: 110,
    borderRadius: 12,
    resizeMode: "cover",
  },
  tileLabelsRow: { marginTop: S * 1.5, flexDirection: "row", gap: G },
  tileLabel: { flex: 1, textAlign: "center", color: COLORS.subtext, fontWeight: "700", fontSize: 11 },

  /* Leaderboard */
  leaderboard: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 12, paddingTop: S },
  podiumCol: { flex: 1, alignItems: "center" },
  podiumAvatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 6, borderWidth: 2, borderColor: COLORS.white },
  podiumName: { fontSize: 12, color: COLORS.subtext, marginBottom: 2 },
  podiumPoints: { fontSize: 12, fontWeight: "700", color: COLORS.navy, marginBottom: 8 },
  podiumBar: { width: "85%", borderTopLeftRadius: 12, borderTopRightRadius: 12, alignItems: "center", justifyContent: "flex-end", paddingBottom: 10 },
  podiumNum: { color: COLORS.white, fontSize: 20, fontWeight: "900" },

  /* Row 2 */
  badgesRow: { flexDirection: "row", gap: G },
  badgeCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 18, padding: G },
  badgeInner: { flex: 1, justifyContent: "space-between", alignItems: "center" },
  badgeTitle: { color: COLORS.text, fontWeight: "900", marginTop: 6 },
  badgeDesc: { color: COLORS.subtext, fontSize: 12, textAlign: "center", marginTop: 4, lineHeight: 18 },

  /* Tasks */
  taskItem: { flexDirection: "row", gap: S, paddingVertical: S * 1.25 },
  taskDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#7ED2B5", marginTop: 8 },
  taskTitle: { fontWeight: "900", color: COLORS.navy, marginBottom: 4 },
  taskText: { color: COLORS.subtext, fontSize: 12, lineHeight: 16 },
  taskLink: { color: COLORS.blue, fontWeight: "800", marginTop: 6 },
});
