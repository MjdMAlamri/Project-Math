import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, FlatList } from "react-native";
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  bg: "#F5F7FD",
  card: "#FFFFFF",
  text: "#0C2A5B",
  border: "#E6E8EF",
};

const G = 24;

export default function Announcements() {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Choose Classroom");
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];

  return (
    <DashboardBase contentContainerStyle={{ padding: G, backgroundColor: COLORS.bg }}>
      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerCenter}>
          <Text style={styles.bannerTitle}>Send Announcements to Your Students</Text>
        </View>
      </View>

      {/* Dropdown */}
      <Pressable style={styles.select} onPress={() => setOpen(!open)}>
        <Text style={styles.selectLabel}>{selectedClass}</Text>
        <View style={styles.chevron} />
      </Pressable>

      {open && (
        <View style={styles.dropdownMenu}>
          {classes.map((cls) => (
            <Pressable
              key={cls}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedClass(cls);
                setOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{cls}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Message box */}
      <Text style={styles.sectionTitle}>Write your message</Text>
      <View style={styles.editorCard}>
        <TextInput
          placeholder="Type your announcement here..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          style={styles.editorInput}
        />
      </View>
    </DashboardBase>
  );
}

const styles = StyleSheet.create({
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
  bannerCenter: { width: "100%", alignItems: "center" },
  bannerTitle: { color: COLORS.text, fontSize: 18, fontWeight: "800" },
  bannerMascot: {
    position: "absolute",
    right: 12,
    bottom: -6,
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

  /* Select */
  select: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: G / 2,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectLabel: { color: COLORS.text, fontSize: 16, fontWeight: "800" },
  chevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#CBD5E1",
    transform: [{ rotate: "45deg" }],
  },

  dropdownMenu: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: G,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownText: { color: COLORS.text, fontSize: 15, fontWeight: "600" },

  /* Section */
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "800", marginBottom: 12 },

  /* Editor */
  editorCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 320,
    marginBottom: G,
  },
  editorInput: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 14,
    color: COLORS.text,
    flexGrow: 1,
  },
});
