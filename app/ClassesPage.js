// app/class-report.js
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DashboardBase from "../components/DashboardBase";
import { Link } from "expo-router";

const COLORS = {
  navy: "#0F2F66",
  blue: "#2B6DE8",
  page: "#F5F6FA",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E9EEF6",
  green: "#16a34a",
  red: "#EF4444",
  amber: "#F59E0B",
};

const G = 20;

export default function ClassReport() {
  return (
    <DashboardBase contentContainerStyle={{ padding: G, backgroundColor: COLORS.page }}>
      {/* Banner */}
      <LinearGradient
        colors={["#fff", "#fff", "#fff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.3 }}
        style={[styles.banner, styles.shadowLg]}
      >
        <View style={{ flex: 1, paddingRight: 220 }}>
          <Text style={styles.bannerTitle}>Class 1 Report</Text>
        </View>

      </LinearGradient>

      {/* Row: 4 stat cards */}
      <View style={styles.row}>
        <StatCard icon="calculator-outline" value="100" label="Equations Solved" />
        <StatCard icon="checkmark-circle-outline" value="90" label="Correct Solutions" />
        <StatCard icon="time-outline" value="1.5 min" label="Per question" />
        <Link href="/class1-students" asChild>
  <Pressable>
    <StatCard 
      icon="people-outline" 
      value="Class 1" 
      label="Students" 
      stacked 
    />
  </Pressable>
</Link>
      </View>

      {/* Row: Today's Status + Class Performance Breakdown */}
      <View style={styles.row}>
        {/* Today's Status */}
        <View style={[styles.card, styles.flex1, styles.shadowSm]}>
          <Text style={styles.sectionTitle}>Today’s Status</Text>

          <View style={styles.miniRow}>
            <MiniStat value="50" label={"Equations\nAttempted"} />
            <MiniStat value="45" label={"Correct\nSolutions"} />
            <MiniStat value="30" label={"Time Practiced\n(min)"} />
          </View>

          <View style={styles.statusStrip}>
            <Text style={styles.statusLabel}>Today’s status:</Text>
            <Text style={styles.statusBadge}>Very good</Text>
          </View>
        </View>

        {/* Class Performance Breakdown */}
        <View style={[styles.card, styles.flex1, styles.shadowSm]}>
          <Text style={styles.sectionTitle}>Class Performance Breakdown:</Text>

          <LegendRow color="#EF4444" title="Active Students Today" value="25 / 30" />
          <LegendRow color="#1D4ED8" title="Avg Time Practiced per Student" value="25 / 30" />
          <LegendRow color="#FCA5A5" title="Engagement Status" value="High" />

          <Text style={styles.overallLine}>
            <Text style={{ fontWeight: "800", color: COLORS.text }}>Overall Class Status: </Text>
            <Text style={{ color: COLORS.text }}>Needs Improvement</Text>
          </Text>
        </View>
      </View>
    </DashboardBase>
  );
}

/* ---------- Small components ---------- */

function StatCard({ icon, value, label, stacked = false }) {
  return (
    <View style={[styles.card, styles.statCard, styles.shadowSm]}>
      <View style={styles.iconTile}>
        <Ionicons name={icon} size={26} color={COLORS.blue} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MiniStat({ value, label }) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

function LegendRow({ color, title, value }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.legendTitle}>{title}</Text>
        <Text style={styles.legendValue}>{value}</Text>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: G, marginTop: G },

  banner: {
    borderRadius: 22,
    paddingVertical: 40,
    minHeight: 110,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  
  bannerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",   // ensures centering inside container
  },
  
  bannerArtWrap: { position: "absolute", right: 12, bottom: 0, width: 260, height: 160 },
  bannerArt: { width: "100%", height: "100%"},

  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: G,
  },
  flex1: { flex: 1 },

  /* Stat cards */
  statCard: { alignItems: "center", paddingVertical: 22 },
  iconTile: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: { fontSize: 22, fontWeight: "900", color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.sub, marginTop: 4, textAlign: "center" },

  /* Today's status */
  sectionTitle: { fontWeight: "800", color: COLORS.text, marginBottom: 12 },
  miniRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  miniCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  miniValue: { color: COLORS.text, fontWeight: "900", fontSize: 16, marginBottom: 4 },
  miniLabel: { color: COLORS.sub, fontSize: 11, textAlign: "center", lineHeight: 16 },

  statusStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  statusLabel: { color: COLORS.sub, fontSize: 12, marginRight: 10 },
  statusBadge: {
    backgroundColor: "#E9FBF3",
    color: COLORS.green,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontWeight: "800",
    fontSize: 12,
  },

  /* Class Performance Breakdown */
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  legendDot: { width: 14, height: 14, borderRadius: 4 },
  legendTitle: { color: COLORS.text, fontWeight: "700" },
  legendValue: { color: COLORS.sub, fontSize: 12 },
  overallLine: { marginTop: 10, color: COLORS.sub, fontSize: 12 },

  /* Shadows */
  shadowSm: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  shadowLg: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
});
