// app/dashboard.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";             // <- added
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
        <View style={{ flex: 1, paddingRight: 140 }}>
          <Text style={styles.bannerDate}>September 23, 2025</Text>
          <Text style={styles.bannerTitle}>Welcome back, Rakan!</Text>
          <Text style={styles.bannerSubtitle}>
            Always stay updated in your student portal
          </Text>
        </View>

        {/* Big person image, absolutely positioned, clipped by banner */}
        <Image
          source={{
            uri: "https://github.com/MjdMAlamri/Images/blob/main/ChatGPT%20Image%20Oct%204,%202025%20at%2012_38_30%20AM.png?raw=true",
          }}
          style={styles.bannerMascot}
        />
      </LinearGradient>

      {/* Top row: 3 stats + events */}
      <View style={styles.row}>
        <StatCard icon="calculator-outline" iconColor="#2563EB" value="534" label="Equations Solved" />
        <StatCard icon="checkmark-circle-outline" iconColor="#16a34a" value="500" label="Correct Solutions" />
        <StatCard icon="bar-chart-outline" iconColor="#f59e0b" value="3 min" label="Per Question" />
        <EventCard />
      </View>

      {/* Second row */}
      <View style={styles.row}>
        {/* Today’s Status (more breathable) */}
        <View style={[styles.card, styles.flex2, styles.spaciousCard]}>
          <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>Today's Status</Text>

          <View style={styles.miniRow}>
            <StatMini value="120" label="Equations Attempted" />
            <StatMini value="100" label="Correct Solutions" />
            <StatMini value="90" label="Time Practiced (min)" />
          </View>

          <View style={[styles.todaysStatusStrip, { marginTop: 10 }]}>
            <Text style={styles.todaysStatusText}>Today’s status:</Text>
            <Text style={styles.badgeSuccess}>Very good</Text>
          </View>
        </View>

        {/* Classes Performance (more breathable + taller chart) */}
        <View style={[styles.card, styles.flex1, styles.spaciousCard]}>
          <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>Classes Performance</Text>

          <View style={[styles.legendRow, { marginBottom: 14 }]}>
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

function StatCard({ value, label, icon = "analytics-outline", iconColor = COLORS.primary }) {
  return (
    <View style={[styles.card, styles.center]}>
      <View style={styles.iconTile}>
        <Ionicons name={icon} size={28} color={iconColor} />
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
    height: 128,
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
  bannerMascot: {
    position: "absolute",
    right: 80,
    bottom: -30,
    width: 240,
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

  /* Extra breathing room for specific sections */
  spaciousCard: {
    paddingVertical: 26,         // more inner space
    paddingHorizontal: 22,
    marginBottom: 6,             // slight extra spacing from next section
  },
  sectionTitleSpaced: {
    marginBottom: 12,            // space under title
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
  statValue: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  statLabel: {
    fontSize: 12,
    color: COLORS.sub,
    marginTop: 6,
    textAlign: "center",
  },

  /* Mini stats (Today’s Status) */
  miniRow: {
    flexDirection: "row",
    gap: 16,                    // more space between mini cards
    marginTop: 8,
    marginBottom: 18,           // more breathing room above the strip
    width: 750,
    height: 150,
  },
  statMini: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",    // center content vertically
  },
  statMiniValue: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  statMiniLabel: { fontSize: 11, color: COLORS.sub, textAlign: "center", marginTop: 4 },

  todaysStatusStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 16,        // taller strip
    paddingHorizontal: 16,
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
  chart: {
    width: "100%",
    height: 170,                // taller chart for breathing space
    resizeMode: "contain",
    marginTop: 2,
  },

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
