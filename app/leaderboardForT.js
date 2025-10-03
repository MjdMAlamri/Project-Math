// app/leaderboardForT.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  bg: "#F5F7FD",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E6E8EF",
  navy: "#0C2A5B",
  blue: "#2B6DE8",
};

const G = 24;

export default function LeaderboardForT() {
  const classes = [
    { title: "Class 1", ranks: { first: "Salman", second: "Maher", third: "Mosab" } },
    { title: "Class 2", ranks: { first: "Salman", second: "Maher", third: "Mosab" } },
    { title: "Class 3", ranks: { first: "Salman", second: "Maher", third: "Mosab" } },
    { title: "Class 4", ranks: { first: "Salman", second: "Maher", third: "Mosab" } },
  ];

  return (
    <DashboardBase contentContainerStyle={{ padding: G, backgroundColor: COLORS.bg }}>
      {/* Banner */}
      <View style={[styles.banner, styles.shadowMd]}>
        <Text style={styles.bannerTitle}>Leaderboard</Text>
      </View>

      {/* Grid of class cards */}
      <View style={styles.grid}>
        {classes.map((c) => (
          <View key={c.title} style={[styles.card, styles.shadowSm]}>
            <Text style={styles.classTitle}>{c.title}</Text>
            <Podium ranks={c.ranks} />
          </View>
        ))}
      </View>
    </DashboardBase>
  );
}

/* ---------------- Podium ---------------- */
function Podium({ ranks: { first, second, third } }) {
  return (
    <View style={styles.podiumWrap}>
      {/* Second place (left) */}
      <View style={styles.column}>
        <Avatar label="M" tint="#F59E0B" />
        <Text style={styles.name}>Maher</Text>
        <LinearGradient
          colors={["#314477", "#4A5CA0"]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={[styles.block, { height: 68 }]}
        >
          <Text style={styles.rankNum}>2</Text>
        </LinearGradient>
      </View>

      {/* First place (center, tallest) */}
      <View style={[styles.column, { marginHorizontal: 22 }]}>
        <Avatar label="S" crown tint="#2563EB" />
        <Text style={styles.name}>Salman</Text>
        <LinearGradient
          colors={["#324A86", "#5565B0"]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={[styles.block, { height: 88 }]}
        >
          <Text style={styles.rankNum}>1</Text>
        </LinearGradient>
      </View>

      {/* Third place (right) */}
      <View style={styles.column}>
        <Avatar label="Mo" tint="#A855F7" />
        <Text style={styles.name}>Mosab</Text>
        <LinearGradient
          colors={["#314477", "#4A5CA0"]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.7, y: 1 }}
          style={[styles.block, { height: 60 }]}
        >
          <Text style={styles.rankNum}>3</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

function Avatar({ label, crown = false, tint = "#64748B" }) {
  return (
    <View style={{ alignItems: "center" }}>
      {crown ? (
        <Text style={styles.crown}>👑</Text>
      ) : (
        <View style={{ height: 18 }} />
      )}
      <View style={[styles.avatar, { backgroundColor: tint }]} />
      <Text style={styles.avatarLabel}>{label}</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  /* Banner */
  banner: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    height: 126,
    paddingHorizontal: 24,
    marginBottom: G,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  bannerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    marginLeft: 6,
    textAlign: "center",
  },
  bannerDeco: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 140,
    height: 90,
    resizeMode: "contain",
    opacity: 0.9,
  },

  /* Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: G,
    columnGap: G,
  },

  /* Card */
  card: {
    width: "48%",
    minHeight: 180,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  classTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  /* Podium */
  podiumWrap: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-end",
    marginTop: 4,
  },
  column: {
    alignItems: "center",
  },
  name: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 6,
  },
  block: {
    width: 64,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  rankNum: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 28,
    lineHeight: 28,
  },

  /* Avatar */
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarLabel: {
    color: "#1F2937",
    fontSize: 10,
    marginTop: 4,
  },
  crown: {
    fontSize: 18,
    marginBottom: -6,
  },

  /* Shadows */
  shadowSm: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  shadowMd: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
});
