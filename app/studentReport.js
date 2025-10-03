// app/studentReport.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  page: "#F5F6FA",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E9EEF6",
  blue: "#2B6DE8",
  blueDeep: "#1E3A8A",
  green: "#16A34A",
  pink: "#FCA5A5",
  navy: "#0F2F66",
};

const S = 12;
const G = 20;

export default function StudentReport() {
  return (
    <DashboardBase>
      <ScrollView
        contentContainerStyle={{ padding: G, gap: G, backgroundColor: COLORS.page }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─ Banner (centered title & Share) ─ */}
        <LinearGradient
          colors={["#0F2F66", "#1D3E8A", "#5063D6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.25 }}
          style={[styles.banner, styles.shadowLg]}
        >
          <Text style={styles.bannerTitle}>Student 1 Report</Text>

          <Pressable style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </Pressable>
        </LinearGradient>

        {/* ─ Top Stats (4) ─ */}
        <View style={styles.statsRow}>
          <StatCard icon="calculator-outline" number="60" label="Equations Solved" />
          <StatCard icon="checkmark-done-outline" number="55" label="Correct Solutions" />
          <StatCard icon="time-outline" number="1 min" label="Per question" />
          <StatCard icon="stats-chart-outline" number="96%" label="Effort Rate" />
        </View>

        {/* ─ Middle: Today’s Status || Class Performance ─ */}
        <View style={styles.midRow}>
          {/* Today’s Status */}
          <View style={[styles.card, styles.shadowSm, { flex: 1.05 }]}>
            <Text style={styles.sectionTitle}>Today’s Status</Text>

            <View style={styles.smallStatsRow}>
              <SmallStat number="15" label="Equations Attempted" />
              <SmallStat number="12" label="Correct Solutions" />
              <SmallStat number="25" label="Time Practiced (min)" />
            </View>

            <View style={styles.statusStrip}>
              <Text style={styles.statusLabel}>Today’s status:</Text>
              <Text style={styles.statusBadge}>Very good</Text>
            </View>
          </View>

          {/* Class Performance Breakdown */}
          <View style={[styles.card, styles.shadowSm, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>Class Performance Breakdown:</Text>

            <View style={styles.legendCol}>
              <LegendDot color="#EF4444" title="Algebra" value="60%" />
              <LegendDot color="#1D4ED8" title="Geometry" value="40%" />
              <LegendDot color="#F59E0B" title="Fractions" value="20%" />
            </View>

            {/* Donut placeholder (keep your own chart later) */}
            <View style={styles.donutWrap}>
              <View style={styles.donutOuter} />
              <View style={styles.donutHole} />
            </View>

            <Text style={styles.overallLine}>
              <Text style={{ fontWeight: "800", color: COLORS.text }}>Overall Status: </Text>
              <Text style={{ color: COLORS.text }}>Needs Improvement</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </DashboardBase>
  );
}

/* ─ Reusable ─ */
function StatCard({ icon, number, label }) {
  return (
    <View style={[styles.card, styles.statCard, styles.shadowSm]}>
      <View style={styles.iconTile}>
        <Ionicons name={icon} size={26} color={COLORS.blue} />
      </View>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SmallStat({ number, label }) {
  return (
    <View style={styles.smallStat}>
      <Text style={styles.smallNumber}>{number}</Text>
      <Text style={styles.smallLabel}>{label}</Text>
    </View>
  );
}

function LegendDot({ color, title, value }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendTitle}>{title}</Text>
      <Text style={styles.legendValue}>{value}</Text>
    </View>
  );
}

/* ─ Styles ─ */
const styles = StyleSheet.create({
  /* Banner */
  banner: {
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  shareBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#1F3A8A",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  shareBtnText: { color: "#fff", fontWeight: "800" },

  /* Layout rows */
  statsRow: { flexDirection: "row", gap: G, flexWrap: "wrap" },
  midRow: { flexDirection: "row", gap: G, flexWrap: "wrap" },

  /* Card base */
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: G,
  },

  /* Stat Card */
  statCard: { alignItems: "center", paddingVertical: 22 },
  iconTile: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statNumber: { fontSize: 18, fontWeight: "900", color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.sub, textAlign: "center", marginTop: 4 },

  /* Today’s Status mini stats */
  smallStatsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
    marginBottom: 14,
  },
  smallStat: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  smallNumber: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 4 },
  smallLabel: { fontSize: 11, color: COLORS.sub, textAlign: "center", lineHeight: 16 },

  statusStrip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  statusLabel: { color: COLORS.sub, fontSize: 12, marginRight: 8 },
  statusBadge: {
    backgroundColor: "#E9FBF3",
    color: COLORS.green,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontWeight: "800",
    fontSize: 12,
  },

  /* Legend + Donut */
  legendCol: { gap: 8, marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  dot: { width: 14, height: 14, borderRadius: 4 },
  legendTitle: { color: COLORS.text, fontWeight: "700" },
  legendValue: { color: COLORS.sub, fontSize: 12 },

  donutWrap: {
    alignSelf: "center",
    marginVertical: 6,
    width: 134,
    height: 134,
    alignItems: "center",
    justifyContent: "center",
  },
  donutOuter: {
    position: "absolute",
    width: 134,
    height: 134,
    borderRadius: 67,
    backgroundColor: "#FEE2E2",
    borderWidth: 16,
    borderTopColor: "#EF4444",
    borderRightColor: "#EF4444",
    borderBottomColor: "#FDE68A",
    borderLeftColor: "#60A5FA",
    transform: [{ rotate: "45deg" }],
  },
  donutHole: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.card,
  },

  overallLine: { marginTop: 8, color: COLORS.sub, fontSize: 12 },

  /* Shadows */
  shadowSm: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
    android: { elevation: 3 },
    default: { boxShadow: "0 6px 14px rgba(0,0,0,0.08)" },
  }),
  shadowLg: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.14, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
    android: { elevation: 6 },
    default: { boxShadow: "0 12px 24px rgba(0,0,0,0.12)" },
  }),
});
