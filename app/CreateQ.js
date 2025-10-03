// app/JoinQuiz.js
import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Platform } from "react-native";
import DashboardBase from "../components/DashboardBase";
import { Link } from "expo-router";


const COLORS = {
  bg: "#F5F7FD",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E6E8EF",
};

const G = 24;

// height of your top bar + top padding (adjust if needed)
const TOPBAR_AND_PADDING = 120; // pixels

export default function JoinQuiz() {
  return (
    <DashboardBase contentContainerStyle={{ padding: G, backgroundColor: COLORS.bg }}>
      <View style={styles.row}>
       {/* LEFT: centered create card */}
<View style={styles.leftArea}>
  <Link href="/CreateQuiz" asChild>
    <Pressable style={styles.createCard}>
      <Text style={styles.createTitle}>Create a new quiz</Text>
      <Image
        source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/TargetImg" }}
        style={styles.createImg}
      />
    </Pressable>
  </Link>
</View>


        {/* RIGHT: full-height history */}
        <View style={[styles.historyCard, styles.shadowSm]}>
          <Text style={styles.historyTitle}>History</Text>
          <View style={styles.historyDivider} />
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No quizzes yet</Text>
            <Text style={styles.emptySub}>Your created quizzes will appear here.</Text>
          </View>
        </View>
      </View>
    </DashboardBase>
  );
}

/* ---------------- Styles ---------------- */

const shadowCommon = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
};

const styles = StyleSheet.create({
  // main row that fills the viewport height (minus top bar)
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    // let it grow within DashboardBase's ScrollView
    flexGrow: 1,
    // full-page height on web so the right panel can match page height
    ...Platform.select({
      web: { minHeight: `calc(100vh - ${TOPBAR_AND_PADDING}px)` },
    }),
  },

  /* LEFT */
  leftArea: {
    flex: 1,
    marginRight: G,
    // center the card in the available left space
    justifyContent: "center",
    alignItems: "center",
  },
  createCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 350,
    minWidth: 400,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  createTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
  },
  createImg: { width: 140, height: 140, resizeMode: "contain" },

  /* RIGHT */
  historyCard: {
    width: 360, // fixed column like your mock
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,

    // make it match the row's height
    alignSelf: "stretch",
    ...Platform.select({
      web: { height: "100%" }, // pairs with row's minHeight
    }),
  },
  historyTitle: {
    textAlign: "center",
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },
  historyDivider: {
    height: 1,
    backgroundColor: "#C5D0EA",
    marginHorizontal: 6,
    marginBottom: 14,
  },

  /* Empty state */
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: COLORS.text, fontWeight: "800", marginBottom: 6 },
  emptySub: { color: COLORS.sub, fontSize: 12 },

  /* Shadows */
  shadowSm: Platform.select({ ios: shadowCommon, android: { elevation: 2 } }),
  shadowMd: Platform.select({
    ios: { ...shadowCommon, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 3 },
  }),
});
