// app/dashboard.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // or react-native-linear-gradient
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  navy: "#0F2F66",
  primary: "#2B6DE8",
  bg: "#F5F6FA",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E9EEF6",
  green: "#1DBF73",
};

export default function Dashboard() {
  return (
    <DashboardBase contentContainerStyle={{ padding: 20, backgroundColor: COLORS.bg }}>
      {/* ── Gradient Banner with bigger person ── */}
      <LinearGradient
        colors={["#0F2F66", "#1D3E8A", "#5063D6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.3 }}
        style={[styles.banner, styles.shadowLg]}
      >
        {/* Text block leaves room for the large person */}
        <View style={{ flex: 1, paddingRight: 140 }}>
          <Text style={styles.bannerDate}>September 23, 2025</Text>
          <Text style={styles.bannerTitle}>Welcome back, Rakan!</Text>
          <Text style={styles.bannerSubtitle}>
            Always stay updated in your student portal
          </Text>
        </View>

        {/* Big person image, absolutely positioned, clipped by banner */}
        <Image
          source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/T-img2" }}
          style={styles.bannerMascot}
        />
      </LinearGradient>

      {/* Top row: 3 stats + events */}
      <View style={styles.row}>
        <StatCard value="534" label="Equations Solved" />
        <StatCard value="500" label="Correct Solutions" />
        <StatCard value="3 min" label="Per question" />
        <EventCard />
      </View>

      {/* Second row */}
      <View style={styles.row}>
        {/* Today’s Status */}
        <View style={[styles.card, styles.flex2]}>
          <Text style={styles.sectionTitle}>Today's Status</Text>

          <View style={styles.miniRow}>
            <StatMini value="120" label="Equations Attempted" />
            <StatMini value="100" label="Correct Solutions" />
            <StatMini value="90" label="Time Practiced (min)" />
          </View>

          <View style={styles.todaysStatusStrip}>
            <Text style={styles.todaysStatusText}>Today’s status:</Text>
            <Text style={styles.badgeSuccess}>Very good</Text>
          </View>
        </View>

        {/* Classes Performance */}
        <View style={[styles.card, styles.flex1]}>
          <Text style={styles.sectionTitle}>Classes Performance</Text>

          <View style={styles.legendRow}>
            <LegendDot color="#EB5757" />
            <Text style={styles.legendText}>Class 1</Text>
            <LegendDot color="#2B6DE8" />
            <Text style={styles.legendText}>Class 2</Text>
            <LegendDot color="#F2994A" />
            <Text style={styles.legendText}>Class 3</Text>
          </View>

          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/Charting" }}
            style={styles.chart}
          />
        </View>

        {/* Daily Tasks */}
        <View style={[styles.flex1]}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Daily Tasks</Text>
            <Text style={styles.link}>See all</Text>
          </View>

          <TaskCard
            title="MathX"
            text="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <TaskCard
            title="MathX"
            text="Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </View>
      </View>
    </DashboardBase>
  );
}

/* ───── Components ───── */

function StatCard({ value, label }) {
  return (
    <View style={[styles.card, styles.center]}>
      <View style={styles.iconTile}>
        <View style={styles.iconTileInner} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StatMini({ value, label }) {
  return (
    <View style={styles.statMini}>
      <Text style={styles.statMiniValue}>{value}</Text>
      <Text style={styles.statMiniLabel}>{label}</Text>
    </View>
  );
}

function EventCard() {
  return (
    <View style={[styles.card]}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>

      <View style={styles.eventItem}>
        <View style={styles.eventIndicator} />
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>Algebra Quiz</Text>
          <Text style={styles.eventSub}>By 25th of Sep</Text>
        </View>
      </View>
    </View>
  );
}

function TaskCard({ title, text }) {
  return (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.taskText}>{text}</Text>
      <Text style={styles.link}>See more</Text>
    </View>
  );
}

function LegendDot({ color }) {
  return <View style={[styles.legendDot, { backgroundColor: color }]} />;
}

/* ───── Styles ───── */

const styles = StyleSheet.create({
  /* Layout helpers */
  row: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  center: { alignItems: "center" },
  flex1: { flex: 1 },
  flex2: { flex: 2 },

  /* Banner */
  banner: {
    height: 128,              // fixed height (won’t grow)
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 28,
    position: "relative",
    overflow: "hidden",       // clips the large mascot inside the banner
  },
  // Bigger person without changing banner size
  bannerMascot: {
    position: "absolute",
    right: 80,
    bottom: -20,               // tuck slightly below to feel larger
    width: 240,               // increase size here
    height: 190,
    resizeMode: "contain",
    pointerEvents: "none",
  },
  shadowLg: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  bannerDate: { color: "#E5E7EB", fontSize: 13, marginBottom: 6 },
  bannerTitle: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 6 },
  bannerSubtitle: { color: "#D1D5DB", fontSize: 14 },

  /* Cards */
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  /* Stat cards */
  iconTile: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconTileInner: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  statValue: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  statLabel: {
    fontSize: 12,
    color: COLORS.sub,
    marginTop: 6,
    textAlign: "center",
  },

  /* Mini stats (Today’s Status) */
  miniRow: { flexDirection: "row", gap: 14, marginTop: 6, marginBottom: 16 },
  statMini: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  statMiniValue: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  statMiniLabel: { fontSize: 11, color: COLORS.sub, textAlign: "center", marginTop: 4 },

  todaysStatusStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  todaysStatusText: { color: COLORS.sub, fontSize: 12, marginRight: 10 },
  badgeSuccess: {
    backgroundColor: "#E9FBF3",
    color: COLORS.green,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontWeight: "700",
    fontSize: 12,
  },

  /* Classes performance */
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: COLORS.sub, marginRight: 10 },
  chart: { width: "100%", height: 140, resizeMode: "contain" },

  /* Events */
  eventItem: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FBFCFE",
  },
  eventIndicator: {
    width: 4,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  eventTitle: { color: COLORS.text, fontWeight: "700", fontSize: 14 },
  eventSub: { color: COLORS.sub, fontSize: 11, marginTop: 2 },

  /* Sections & tasks */
  sectionTitle: { fontWeight: "800", fontSize: 14, color: COLORS.text },
  link: { color: COLORS.primary, fontSize: 12, fontWeight: "600" },

  taskCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  taskTitle: { fontWeight: "800", fontSize: 13, color: COLORS.text, marginBottom: 6 },
  taskText: { fontSize: 12, color: COLORS.sub, marginBottom: 6 },
});
