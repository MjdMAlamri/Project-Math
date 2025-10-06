// app/games-mode/index.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Linking } from "react-native";


/* -------------------- Design Tokens -------------------- */
const S = 8;
const SIDEBAR_W = 220;
const W = Dimensions.get("window").width;

const COLORS = {
  navy: "#0C2A5B",
  navyDeep: "#0A1E42",
  page: "#F5F7FD",
  white: "#FFFFFF",
  border: "#E6E8EF",
  text: "#0F172A",
  subtext: "#6B7280",
  blue: "#2B6DE8",
};

const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
  },
  android: { elevation: 6 },
});

/* -------------------- Helpers -------------------- */
const formatPct = (x) => `${Math.round(x * 100)}%`;

const buildMonthMatrix = (year, monthIndex) => {
  const first = new Date(year, monthIndex, 1);
  const startOffset = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array(startOffset)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  const rows = [];
  for (let i = 0; i < Math.ceil(cells.length / 7); i++) {
    rows.push(cells.slice(i * 7, i * 7 + 7));
  }
  const last = rows[rows.length - 1];
  if (last && last.length < 7) while (last.length < 7) last.push(null);
  return rows;
};

const demoActivity = (year, monthIndex) => {
  const streakStart = 12;
  const fire = Array.from({ length: 6 }, (_, k) => `${year}-${monthIndex + 1}-${streakStart + k}`);
  const dots = [2, 5, 9, 23, 28].map((d) => `${year}-${monthIndex + 1}-${d}`);
  return { fire, dots };
};

/* -------------------- Sidebar -------------------- */
const SidebarItem = ({ icon, label, to, active, onNavigate }) => (
  <Pressable onPress={() => onNavigate?.(to)} style={{ paddingHorizontal: S * 2, paddingVertical: 2 }}>
    <View style={[styles.itemInner, active && styles.itemActive]}>
      <Ionicons name={icon} size={18} color={active ? COLORS.navy : "#E6ECFF"} style={{ marginRight: 12 }} />
      <Text style={[styles.itemText, active && styles.itemTextActive]} numberOfLines={2}>
        {label}
      </Text>
    </View>
  </Pressable>
);

const Sidebar = ({ current = "edu", onNavigate }) => {
  const router = useRouter();
  return (
    <View style={styles.sidebar}>
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo" }}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

      <View style={styles.menuList}>
        <SidebarItem icon="grid-outline" label="Dashboard" to="dashboard" active={current === "dashboard"} onNavigate={onNavigate} />
        <SidebarItem icon="school-outline" label="Educational Mode" to="edu" active={current === "edu"} onNavigate={onNavigate} />
        <SidebarItem icon="game-controller-outline" label="Games Mode" to="games" active={current === "games"} onNavigate={onNavigate} />
        <SidebarItem icon="trophy-outline" label="Leaderboard" to="leaderboard" active={current === "leaderboard"} onNavigate={onNavigate} />
        <SidebarItem icon="settings-outline" label="Settings" to="settings" active={current === "settings"} onNavigate={onNavigate} />
      </View>

      {/* Join Quiz */}
      <View style={styles.joinWrap}>
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push("/Join-Quiz")}
          style={({ pressed }) => [styles.joinCard, shadow, pressed && { opacity: 0.9 }]}
        >
          <View style={styles.plusBox}>
            <Ionicons name="add" size={34} color={COLORS.navy} />
          </View>
          <Text style={styles.joinText}>Join Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* -------------------- Top Bar -------------------- */
const TopBar = ({ greeting = "Good morning, Salman" }) => {
  return (
    <View style={[styles.topBar, shadow]}>
      <Text style={styles.greeting}>{greeting}</Text>

      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" style={styles.searchInput} />
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
  );
};

/* -------------------- Page -------------------- */
export default function GamesModeScreen() {
  const router = useRouter();

  // Badge modal state
  const [badgeModal, setBadgeModal] = useState({ open: false, badge: null });

  // Level / points
  const [points] = useState(5200);
  const nextLevelAt = 6000;
  const level = 2;
  const toNext = Math.max(0, nextLevelAt - points);
  const levelPct = Math.min(1, points / nextLevelAt);

  // Games (also link-based below)
  const playGame = (id) => router.push(`/games-mode/game-${id}`);

  // Challenges
  const [challenges, setChallenges] = useState([
    { id: "c1", title: "Solve 15 algebra equations", desc: "Finish under 5 minutes", due: "By 25th of Sep", progress: 0.33, target: 15 },
    { id: "c2", title: "Get 10 correct answers in a row", desc: "No mistakes allowed", due: "By 25th of Sep", progress: 0.6, target: 10 },
    { id: "c3", title: "Play 2 different games", desc: "In one day", due: "By 25th of Sep", progress: 0.5, target: 3 },
  ]);
  const bumpChallenge = (id) =>
    setChallenges((prev) => prev.map((ch) => (ch.id !== id ? ch : { ...ch, progress: Math.min(1, ch.progress + 0.2) })));

  // Calendar
  const [activeYM, setActiveYM] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const matrix = useMemo(() => buildMonthMatrix(activeYM.y, activeYM.m), [activeYM]);
  const activity = useMemo(() => demoActivity(activeYM.y, activeYM.m), [activeYM]);
  const markTypeForDay = (day) => {
    if (!day) return "none";
    const key = `${activeYM.y}-${activeYM.m + 1}-${day}`;
    if (activity.fire.includes(key)) return "fire";
    if (activity.dots.includes(key)) return "dot";
    return "none";
  };
  const monthLabel = useMemo(() => {
    const d = new Date(activeYM.y, activeYM.m, 1);
    return d.toLocaleString("en", { month: "short", year: "numeric" });
  }, [activeYM]);
  const shiftMonth = (delta) => {
    const d = new Date(activeYM.y, activeYM.m + delta, 1);
    setActiveYM({ y: d.getFullYear(), m: d.getMonth() });
  };

  // Badges
  const [badges] = useState([
    { id: "b1", title: "Quick Thinker", tier: "bronze", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TimeB" },
    { id: "b2", title: "Streak Star", tier: "silver", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/FireB" },
    { id: "b3", title: "Algebra Ace", tier: "gold", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/BadgesB" },
    { id: "b4", title: "Geometry Guru", tier: "bronze", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/LambB" },
    { id: "b5", title: "Precision Pro", tier: "silver", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/trophyB" },
    { id: "b6", title: "Speed Runner", tier: "gold", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/trophyB" },
    { id: "b7", title: "Mastermind", tier: "platinum", imageUri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/StarB" },
  ]);
  const openBadge = (b) => setBadgeModal({ open: true, badge: b });

  // Sidebar navigation mapping
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
      quiz: "/quiz",
    };
    router.push(map[keyOrPath] || "/");
  };

  return (
    <View style={styles.root}>
      <Sidebar current="games" onNavigate={navigateFromSidebar} />

      <View style={styles.main}>
        <TopBar />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: S * 3, paddingBottom: S * 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Level Card */}
          <View style={styles.levelCard}>
            <Text style={styles.levelTitle}>Level {level}</Text>
            <Text style={styles.levelSub}>
              {toNext === 0 ? "Level up ready!" : `${toNext} points to next level`}
            </Text>

            <View style={styles.progressWrap}>
              <View style={styles.bubbleLeft}>
                <Text style={styles.levelBubbleText}>{level}</Text>
              </View>
              <View style={styles.bubbleRight}>
                <Text style={styles.levelRightBubbleText}>{level + 1}</Text>
              </View>

              <View style={styles.progressBG}>
                <View style={[styles.progressFill, { width: `${levelPct * 100}%` }]} />
                <View style={styles.progressMeta}>
                  <Ionicons name="star" size={14} color="#c18b00" />
                  <Text style={styles.progressText}>
                    {points}/{nextLevelAt}
                  </Text>
                </View>
              </View>
            </View>
          </View>

         {/* Row: THREE Games + Calendar (4 aligned) */}
<View style={styles.row}>
  {/* Game 1 */}
  <View style={[styles.cardWide, { marginRight: 18 }]}>
    <Text style={styles.cardTitle}>True or False</Text>
    <Image
      source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TrueorFalse:MathEditionGame" }}
      style={styles.gameImg}
      resizeMode="cover"
    />
    <View style={styles.gameBtns}>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => Linking.openURL("https://math-gesture-program.netlify.app/thumbs")}
      >
        <Text style={styles.btnPrimaryText}>Play</Text>
      </Pressable>
    </View>
  </View>

  {/* Game 2 */}
  <View style={[styles.cardWide, { marginRight: 18 }]}>
    <Text style={styles.cardTitle}>Count & Run</Text>
    <Image
      source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/Count&RunGame" }}
      style={styles.gameImg}
      resizeMode="cover"
    />
    <View style={styles.gameBtns}>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => Linking.openURL("https://math-gesture-program.netlify.app/numbers")}
      >
        <Text style={styles.btnPrimaryText}>Play</Text>
      </Pressable>
    </View>
  </View>

  {/* Game 3 */}
  <View style={[styles.cardWide, { marginRight: 18 }]}>
    <Text style={styles.cardTitle}>Math Draw</Text>
    <Image
      source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/MathDrawGame" }}
      style={styles.gameImg}
      resizeMode="cover"
    />
    <View style={styles.gameBtns}>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => Linking.openURL("https://precious-jelly-8b70ea.netlify.app/")}
      >
        <Text style={styles.btnPrimaryText}>Play</Text>
      </Pressable>
    </View>
  </View>


            {/* Calendar */}
            <View style={styles.cardCal}>
              <View style={styles.calHeader}>
                <Pressable onPress={() => shiftMonth(-1)}>
                  <Feather name="chevron-left" size={18} color={COLORS.navyDeep} />
                </Pressable>
                <Text style={styles.calMonth}>{monthLabel}</Text>
                <Pressable onPress={() => shiftMonth(1)}>
                  <Feather name="chevron-right" size={18} color={COLORS.navyDeep} />
                </Pressable>
              </View>

              <View style={styles.calWeekRow}>
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, idx) => (
                  <Text key={d} style={[styles.calWeekText, idx !== 6 && { marginRight: 4 }]}>
                    {d}
                  </Text>
                ))}
              </View>

              {matrix.map((r, i) => (
                <View key={i} style={styles.calRow}>
                  {r.map((d, j) => {
                    const mark = markTypeForDay(d);
                    return (
                      <View key={j} style={[styles.calCell, j !== 6 && { marginRight: 4 }]}>
                        {d ? <Text style={styles.calDay}>{d}</Text> : <Text style={styles.calDay} />}
                        {mark === "fire" && <Text style={styles.calFire}>🔥</Text>}
                        {mark === "dot" && <View style={styles.calDot} />}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          {/* Row: Challenges + Challenge Classmate + Badges */}
          <View style={styles.row}>
            <View style={[styles.cardTall, { marginRight: 18 }]}>
              <Text style={styles.cardTitle}>Challenges for this week</Text>
              {challenges.map((ch) => (
                <Pressable key={ch.id} style={styles.challengeItem} onPress={() => bumpChallenge(ch.id)}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.challengeTitle}>{ch.title}</Text>
                    {ch.desc ? <Text style={styles.challengeDesc}>{ch.desc}</Text> : null}
                    {ch.due ? <Text style={styles.challengeDue}>{ch.due}</Text> : null}
                  </View>
                  <View style={[styles.challengeProgWrap, { marginLeft: 12 }]}>
                    <View style={styles.challengeProgBG}>
                      <View style={[styles.challengeProgFill, { width: `${ch.progress * 100}%` }]} />
                    </View>
                    <Text style={styles.challengePct}>{formatPct(ch.progress)}</Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <View style={[styles.cardTarget, { marginRight: 18 }]}>
              <Text style={styles.cardTitleCenter}>Challenge a Classmate</Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TargetImg" }}
                  style={{ width: 140, height: 140, opacity: 0.9 }}
                />
                <Pressable
                  style={[styles.btnPrimary, { marginTop: 16 }]}
                  onPress={() => router.push("/games-mode/challenge")}
                >
                  <Text style={styles.btnPrimaryText}>Start Challenge</Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.cardBadges, { minHeight: 260 }]}>
              <Text style={[styles.cardTitle, { textAlign: "center" }]}>Badges</Text>

              <View style={styles.badgeGridWrap}>
                <View style={styles.badgeGrid}>
                  {badges.slice(0, 6).map((b) => (
                    <TouchableOpacity key={b.id} style={[styles.badge, { margin: 6 }]} onPress={() => openBadge(b)}>
                      <View style={[styles.badgeIcon, tierColor(b.tier)]}>
                        {b.imageUri ? (
                          <Image source={{ uri: b.imageUri }} style={styles.badgeImg} resizeMode="contain" />
                        ) : (
                          <Ionicons name={iconForBadge(b)} size={22} color={COLORS.navyDeep} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Pressable onPress={() => setBadgeModal({ open: true, badge: null })} style={styles.seeMore}>
                <Text style={styles.seeMoreText}>See More</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Badge Modal */}
      <Modal
        visible={!!badgeModal.open}
        transparent
        animationType="fade"
        onRequestClose={() => setBadgeModal((p) => ({ ...p, open: false }))}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Feather name="award" size={18} color={COLORS.navyDeep} />
              <Text style={[styles.cardTitle, { marginLeft: 8 }]}>Your Badges</Text>
            </View>

            <FlatList
              data={badges}
              keyExtractor={(b) => b.id}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              renderItem={({ item }) => (
                <View style={styles.modalBadgeRow}>
                  <View
                    style={[
                      styles.badgeIcon,
                      tierColor(item.tier),
                      { marginRight: 12, alignItems: "center", justifyContent: "center" },
                    ]}
                  >
                    {item.imageUri ? (
                      <Image source={{ uri: item.imageUri }} style={styles.badgeImg} resizeMode="contain" />
                    ) : (
                      <Ionicons name={iconForBadge(item)} size={20} color={COLORS.navyDeep} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalBadgeTitle}>{item.title}</Text>
                    <Text style={styles.modalBadgeTier}>{item.tier.toUpperCase()}</Text>
                  </View>
                </View>
              )}
              style={{ maxHeight: 280 }}
            />

            <Pressable
              style={[styles.btnPrimary, { marginTop: 12 }]}
              onPress={() => setBadgeModal((p) => ({ ...p, open: false }))}
            >
              <Text style={styles.btnPrimaryText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* -------------------- Icon mapping for badges -------------------- */
const iconForBadge = (b) => {
  const t = (b?.title || "").toLowerCase();
  if (t.includes("quick")) return "flash-outline";
  if (t.includes("streak")) return "flame-outline";
  if (t.includes("algebra")) return "calculator-outline";
  if (t.includes("geometry")) return "shapes-outline";
  if (t.includes("precision") || t.includes("pro")) return "locate-outline";
  if (t.includes("speed")) return "speedometer-outline";
  if (t.includes("master")) return "medal-outline";
  switch (b?.tier) {
    case "gold":
      return "trophy-outline";
    case "silver":
      return "ribbon-outline";
    case "bronze":
      return "ribbon-outline";
    case "platinum":
      return "medal-outline";
    default:
      return "star-outline";
  }
};

/* -------------------- StyleSheet -------------------- */
const tierColor = (tier) => {
  switch (tier) {
    case "bronze":
      return { backgroundColor: "#D29B6E" };
    case "silver":
      return { backgroundColor: "#C0C0C0" };
    case "gold":
      return { backgroundColor: "#F2C14E" };
    case "platinum":
      return { backgroundColor: "#C8E3F7" };
    default:
      return { backgroundColor: "#eee" };
  }
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.page, flexDirection: "row" },

  /* Sidebar */
  sidebar: { width: SIDEBAR_W, backgroundColor: COLORS.navy, position: "relative", paddingTop: S * 3, paddingBottom: S * 3 },
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
  itemInner: { height: 50, borderRadius: 18, flexDirection: "row", alignItems: "center", paddingHorizontal: 14 },
  itemActive: { backgroundColor: COLORS.white },
  itemText: { color: "#E6ECFF", fontSize: 16, fontWeight: "800" },
  itemTextActive: { color: COLORS.navy },

  joinWrap: { position: "absolute", left: 0, right: 0, bottom: S * 3, alignItems: "center" },
  joinCard: { width: 190, backgroundColor: COLORS.white, borderRadius: 22, paddingVertical: S * 2.5, alignItems: "center" },
  plusBox: { width: 72, height: 72, borderRadius: 16, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center", marginBottom: S },
  joinText: { color: COLORS.navy, fontWeight: "900", fontSize: 18 },

  /* Main area */
  main: { flex: 1 },
  gameImg: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E9FF",
    marginBottom: 12,
    width: "100%",     // full width of card
  },
  
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
  rightIcons: { flexDirection: "row", alignItems: "center", marginLeft: S * 2 },
  bellWrap: { position: "relative", padding: 6 },
  dot: { position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B82F6" },

  avatarWrap: { flexDirection: "row", alignItems: "center", backgroundColor: "#F3F5FA", borderRadius: 999, paddingHorizontal: 8, height: 36 },
  avatar: { width: 24, height: 24, borderRadius: 12 },

  /* Content sections */
  levelCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#E6E8EF", marginBottom: 18 },
  levelTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  levelSub: { color: COLORS.subtext, fontSize: 12, marginTop: 2, marginBottom: 10 },

  progressWrap: { width: "100%", position: "relative", marginTop: 10 },
  progressBG: { height: 18, borderRadius: 20, backgroundColor: "#FFE8A9", overflow: "hidden", position: "relative" },
  progressFill: { height: "100%", borderRadius: 20, backgroundColor: "#F2B43C" },
  progressMeta: { position: "absolute", right: 50, top: 0, bottom: 0, flexDirection: "row", alignItems: "center" },
  progressText: { color: "#7a6a24", fontWeight: "700", marginLeft: 6 },

  bubbleLeft: {
    position: "absolute",
    top: -10,
    left: 0,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: COLORS.navyDeep,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  bubbleRight: {
    position: "absolute",
    top: -10,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFEBB8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  levelBubbleText: { color: "#fff", fontWeight: "700" },
  levelRightBubbleText: { color: "#a87400", fontWeight: "700" },

  row: { flexDirection: "row", marginBottom: 18, alignItems: "stretch", flexWrap: "nowrap" },

  cardWide: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EF",
  },

  cardTall: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EF",
    minHeight: 260,
  },

  cardCal: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EF",
  },

  cardBadges: {
    width: 300,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EF",
  },

  cardTarget: {
    width: 300,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EF",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cardTitle: { fontWeight: "800", color: COLORS.text, marginBottom: 10 },
  cardTitleCenter: { fontWeight: "800", color: COLORS.text, marginBottom: 10, textAlign: "center", marginTop: 2 },

  gamePlaceholder: { height: 160, borderRadius: 12, backgroundColor: "#EFF2FF", borderWidth: 1, borderColor: "#E4E9FF", marginBottom: 12 },
  gameBtns: { flexDirection: "row" },
  btnPrimary: { backgroundColor: COLORS.navy, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, marginRight: 18 },
  btnPrimaryText: { color: "#fff", fontWeight: "800" },

  // Calendar
  calHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  calMonth: { fontWeight: "800", color: COLORS.text },
  calWeekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  calWeekText: { width: 34, textAlign: "center", color: COLORS.subtext, fontSize: 10 },
  calRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 4 },
  calCell: { width: 34, height: 40, alignItems: "center" },
  calDay: { color: COLORS.text },
  calDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: "#F2B43C", marginTop: 4 },
  calFire: { marginTop: 2, fontSize: 12 },

  // Challenges
  challengeItem: {
    backgroundColor: "#F6F8FF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E6EAFF",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  challengeTitle: { fontWeight: "800", color: COLORS.text },
  challengeDesc: { color: "#687089", fontSize: 12, marginTop: 2 },
  challengeDue: { color: "#9aa3b2", fontSize: 11, marginTop: 2 },
  challengeProgWrap: { width: 120, alignItems: "flex-end" },
  challengeProgBG: { width: "100%", height: 10, backgroundColor: "#EAEFFF", borderRadius: 20 },
  challengeProgFill: { height: 10, backgroundColor: "#6B8AFD", borderRadius: 20 },
  challengePct: { color: COLORS.text, fontSize: 12, fontWeight: "800" },

  // Badges
  badgeGridWrap: { flexGrow: 1, minHeight: 170, alignItems: "center", justifyContent: "center", width: "100%" },
  badgeGrid: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#F6F8FF",
    borderWidth: 1,
    borderColor: "#E6E8EF",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeIcon: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  badgeImg: { width: "100%", height: "100%" },

  seeMore: {
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  seeMoreText: { color: COLORS.navy, fontWeight: "800", fontSize: 12 },

  // Modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", alignItems: "center", justifyContent: "center" },
  modalCard: { width: Math.min(W - 40, 420), backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#E6E8EF" },
  modalBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F9FF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E6E8EF",
  },
  modalBadgeTitle: { fontWeight: "800", color: COLORS.text },
  modalBadgeTier: { fontSize: 12, color: "#6A728A" },
});
