// app/settings.js
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import DashboardBase from "../components/DashboardBase";

export default function Settings() {
  return (
    <DashboardBase>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Settings Box */}
        <View style={styles.settingsBox}>
          <Text style={styles.title}>User Settings</Text>

          {/* User Details */}
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="First Name" value="Rakan" />
            <TextInput style={styles.input} placeholder="Last Name" value="Alharbi" />
          </View>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="Email" value="Rakan.Al@gmail.com" />
            <TextInput style={styles.input} placeholder="Phone Number" value="+966 50XXXXXXX" />
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save changes</Text>
          </TouchableOpacity>

        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>@User-Name</Text>
          <Text style={styles.email}>user@email.com</Text>

          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DashboardBase>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    padding: 20,
    gap: 20,
  },
  settingsBox: {
    flex: 3,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  profileCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "#0F172A" },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginVertical: 12, color: "#0F172A" },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E6E8EF",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },
  saveBtn: {
    backgroundColor: "#1E3A8A",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "600" },
  forgotText: { marginTop: 8, fontSize: 12, color: "#6B7280" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  username: { fontWeight: "bold", color: "#4F46E5", marginBottom: 4 },
  email: { color: "#6B7280", marginBottom: 16 },
  logoutBtn: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});