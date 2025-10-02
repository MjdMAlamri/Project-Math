// app/classes.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  bg: "#F5F6FA",
  card: "#FFFFFF",
  text: "#0C2A5B",
  sub: "#6B7280",
  border: "#E9EEF6",
  iconBlue: "#1E3A8A",
  iconBlueLight: "#214EA1",
};

const G = 24; // global gap for airy spacing

export default function Classes() {
  return (
    <DashboardBase contentContainerStyle={{ padding: G, backgroundColor: COLORS.bg }}>
      {/* Banner */}
      <View style={[styles.banner, styles.shadowMd]}>
        {/* Centered title */}
        <View style={styles.bannerCenter}>
          <Text style={styles.bannerTitle}>Manage Your Classes</Text>
        </View>
      </View>

      {/* Classes Grid */}
      <View style={styles.grid}>
        {["Class 1", "Class 2", "Class 3", "Class 4"].map((cls, i) => (
          <TouchableOpacity key={i} style={[styles.classCard, styles.shadowSm]}>
            <View style={styles.iconTile}>
              <View style={styles.iconInner} />
            </View>
            <Text style={styles.className}>{cls}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DashboardBase>
  );
}

/* --- Styles --- */
const styles = StyleSheet.create({
  /* Banner */
  banner: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    height: 126,               // fixed height like the mock
    paddingHorizontal: 24,
    marginBottom: G,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
  },
  bannerCenter: {
    width: "100%",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },
  bannerMascot: {
    position: "absolute",
    right: 12,
    bottom: -6,
    width: 150,                // bigger person without changing banner height
    height: 150,
    resizeMode: "contain",
  },

  /* Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: G,                 // RN Web supports rowGap; fallbacks handled by marginBottom on cards
    columnGap: G,
  },

  /* Class card */
  classCard: {
    width: "30%",
    minHeight: 200,            // roomy boxes like screenshot
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 24,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: G,           // fallback spacing for native
  },
  iconTile: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  iconInner: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.iconBlueLight,
  },
  className: {
    fontWeight: "800",
    color: COLORS.text,
    fontSize: 18,
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
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
});
