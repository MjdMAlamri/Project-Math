// app/class1-students.js
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Pressable } from "react-native";
import DashboardBase from "../components/DashboardBase";
import { Link } from "expo-router";


const { width } = Dimensions.get("window");

export default function Class1Students() {
  return (
    <DashboardBase title="Class 1 Students">
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Link
            key={i}
            href={{ pathname: "/studentReport", params: { id: i + 1 } }} 
            asChild
          >
            <Pressable style={styles.studentCard}>
            <Image source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }} style={styles.avatar} />
              <Text style={styles.studentName}>Student {i + 1}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  </DashboardBase>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  studentCard: {
    width: (width - 300) / 5, // responsive width, 5 per row
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 999,
    backgroundColor: "#F5F7FD",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  avatar: {
    width: "80%",
    height: "80%",
    borderRadius: 999,
  },
});