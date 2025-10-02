// app/login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const COLORS = {
  navy: "#0C2A5B",
  white: "#FFFFFF",
  off: "#F6F7FB",
  text: "#0F172A",
  subtext: "#475569",
  blue: "#2B6DE8",
  border: "#E5E7EB",
  danger: "#EF4444",
};

const S = 8;
const G = 28; // page gutter

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("Mjd.Al@gmail.com");
  const [password, setPassword] = useState("•••••••••••");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [leftHeight, setLeftHeight] = useState(0); // measured once to match image height

  const isWide = width >= 980;

  const onLeftLayout = (e) => {
    if (leftHeight === 0) setLeftHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* 1) Back/Home arrow on the left side */}
      <Link href="/" asChild>
        <Pressable style={styles.backBtn} hitSlop={10}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </Pressable>
      </Link>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={{ flex: 1 }}
          // Keep content full-height and centered, without a fixed minHeight that can “float”
          contentContainerStyle={{ padding: G, flexGrow: 1, justifyContent: "center" }}
          // Stop overscroll/bounce so the block doesn’t “move”
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          // Disable scrolling on wide screens (desktop/tablet layout)
          scrollEnabled={!isWide}
        >
          <View
            style={[
              styles.grid,
              { flexDirection: isWide ? "row" : "column", gap: G },
            ]}
          >
            {/* ===== Left: form ===== */}
            <View
              style={[styles.left, { flex: 1 }]}
              onLayout={onLeftLayout}
            >
              <Text style={styles.h1}>Login</Text>
              <Text style={styles.h2}>Login to access your account</Text>

              {/* Email */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              {/* Password */}
              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!show}
                    placeholder="Enter your password"
                    style={[styles.input, { paddingRight: 44 }]}
                  />
                  <Pressable
                    onPress={() => setShow((v) => !v)}
                    style={styles.eyeBtn}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={show ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={COLORS.subtext}
                    />
                  </Pressable>
                </View>
              </View>

              {/* Remember + Forgot */}
              <View style={styles.rowBetween}>
                <Pressable
                  onPress={() => setRemember((v) => !v)}
                  style={styles.remember}
                >
                  <View
                    style={[
                      styles.checkbox,
                      remember && {
                        backgroundColor: COLORS.blue,
                        borderColor: COLORS.blue,
                      },
                    ]}
                  >
                    {remember && (
                      <Ionicons name="checkmark" size={14} color={COLORS.white} />
                    )}
                  </View>
                  <Text style={styles.small}>Remember me</Text>
                </Pressable>

                <Pressable onPress={() => { /* TODO: route to forgot-password */ }}>
                  <Text style={[styles.small, { color: COLORS.danger }]}>
                    Forgot Password
                  </Text>
                </Pressable>
              </View>

              {/* 3) Single "Log in" button + role text shortcuts under it */}
              <Pressable
                style={[styles.primaryBtn, { marginTop: S }]}
                onPress={() => {
                  // TODO: your auth handler
                  // router.push('/somewhere');
                }}
              >
                <Text style={styles.primaryTxt}>Log in</Text>
              </Pressable>

              <View style={styles.roleRow}>
                <Link href="/StudentD">
                  <Text style={styles.roleLink}>Student</Text>
                </Link>
                <Text style={styles.roleDivider}>•</Text>
                <Link href="/TeacherD">
                  <Text style={styles.roleLink}>Teacher</Text>
                </Link>
              </View>

              {/* Signup link */}
              <View style={[styles.centerRow, { marginTop: S * 2 }]}>
                <Text style={styles.small}>Don’t have an account? </Text>
                <Link href="/signup">
                  <Text
                    style={[
                      styles.small,
                      { color: COLORS.danger, fontWeight: "700" },
                    ]}
                  >
                    Sign up
                  </Text>
                </Link>
              </View>

              {/* or login with */}
              <View style={[styles.centerRow, { marginVertical: S * 3 }]}>
                <View style={styles.rule} />
                <Text
                  style={[
                    styles.small,
                    { color: COLORS.subtext, marginHorizontal: S * 1.5 },
                  ]}
                >
                  Or login with
                </Text>
                <View style={styles.rule} />
              </View>

              {/* Social buttons */}
              <View style={[styles.centerRow, { gap: S * 2 }]}>
                <Pressable style={styles.socialBtn}>
                  <FontAwesome name="facebook" size={22} color="#1877F2" />
                </Pressable>
                <Pressable style={styles.socialBtn}>
                  <AntDesign name="google" size={22} color="#EA4335" />
                </Pressable>
                <Pressable style={styles.socialBtn}>
                  <AntDesign name="apple1" size={22} color="#111" />
                </Pressable>
              </View>
            </View>

            {/* ===== Right: image ONLY, height matches left ===== */}
            <View style={[styles.right, { flex: 1 }]}>
              <Image
                source={{
                  uri:
                    "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/Tablet%20login-pana.svg",
                }}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: leftHeight || 520, // match left section height (stable after first layout)
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
  },
  android: { elevation: 6 },
});

const styles = StyleSheet.create({
  grid: { alignItems: "stretch" },

  /* Back/Home arrow */
  backBtn: {
    position: "absolute",
    left: G,
    top: G,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.04)",
  },

  /* Left */
  left: { padding: S, justifyContent: "center" },
  h1: { fontSize: 34, fontWeight: "900", color: COLORS.text, marginBottom: S },
  h2: { fontSize: 16, color: COLORS.subtext, marginBottom: S * 2 },

  field: { marginBottom: S * 1.5 },
  label: { fontSize: 12, color: COLORS.subtext, marginBottom: S / 2 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: S * 1.25,
    fontSize: 14,
  },
  inputWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  rowBetween: {
    marginTop: S,
    marginBottom: S * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remember: { flexDirection: "row", alignItems: "center", gap: S },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  small: { fontSize: 12.5, color: COLORS.text },

  primaryBtn: {
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTxt: { color: COLORS.white, fontWeight: "700" },

  roleRow: {
    marginTop: S * 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: S * 2,
  },
  roleLink: {
    fontSize: 13,
    color: COLORS.blue,
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  roleDivider: { color: COLORS.subtext, opacity: 0.6 },

  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rule: { height: 1, backgroundColor: COLORS.border, flex: 1 },

  socialBtn: {
    width: 130,
    height: 56,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  /* Right */
  right: { padding: S, alignItems: "stretch", justifyContent: "center" },
});