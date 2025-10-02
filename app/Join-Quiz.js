// app/Join-Quiz.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Image,
  Platform,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

/* ---------- Sidebar (Educational style, active highlight) ---------- */
const Sidebar = ({ current = "quiz" }) => {
  const Item = ({ icon, label, href, routeKey }) => {
    const active = current === routeKey;
    const Inner = (
      <View style={[styles.sideItem, active && styles.sideItemActive]}>
        <Ionicons
          name={icon}
          size={18}
          color={active ? "#0C2A5B" : "#E6ECFF"}
          style={{ marginRight: 12 }}
        />
        <Text style={[styles.sideItemText, active && styles.sideItemTextActive]}>
          {label}
        </Text>
      </View>
    );

    if (!href) {
      return <View style={{ paddingHorizontal: 16, paddingVertical: 2 }}>{Inner}</View>;
    }
    return (
      <Link href={href} style={{ textDecorationLine: "none" }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 2 }}>{Inner}</View>
      </Link>
    );
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <Image
            source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo" }}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        </View>
        <Text style={styles.brandText}>EdVenture</Text>
      </View>

      <View style={styles.menuList}>
        <Item icon="grid-outline"            label="Dashboard"        href="/StudentD"         routeKey="dashboard"   />
        <Item icon="school-outline"          label="Educational Mode" href="/educational"      routeKey="edu"         />
        <Item icon="game-controller-outline" label="Games Mode"       href="/games-mode"       routeKey="games"       />
        <Item icon="trophy-outline"          label="Leaderboard"      href="/leaderboard"      routeKey="leaderboard" />
        <Item icon="settings-outline"        label="Settings"         href="/StudentsSettings" routeKey="settings"    />
        {/* This page (Join Quiz) is in main content, so we don't add an active row here */}
      </View>
    </View>
  );
};

/* ---------- Top bar (matches your screenshot) ---------- */
const TopBar = ({ greeting = "Good morning, Salman" }) => (
  <View style={[styles.topRow, styles.shadow]}>
    <Text style={styles.greeting}>{greeting}</Text>

    <View style={styles.searchWrap}>
      <Feather name="search" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
        accessibilityLabel="Search"
      />
    </View>

    <View style={styles.actions}>
      <View style={styles.bellWrap}>
        <Ionicons name="notifications-outline" size={20} color="#0C2A5B" />
        <View style={styles.dot} />
      </View>

      <View style={styles.avatarWrap}>
        <Image
          source={{ uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/avatarimg" }}
          style={styles.avatar}
        />
        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
      </View>
    </View>
  </View>
);

export default function JoinQuizScreen() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  // QR scanner (lazy import)
  const [scannerOpen, setScannerOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const join = () => {
    const id = gameId.trim();
    if (!id) {
      Alert.alert("Enter Game ID", "Please type a Game ID or scan it.");
      return;
    }
    router.push(`/quiz-page/${encodeURIComponent(id)}`);
  };

  const openScanner = async () => {
    try {
      const { BarCodeScanner } = await import("expo-barcode-scanner");
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScannerOpen(true);
    } catch {
      Alert.alert(
        "Scanner not available",
        "Install expo-barcode-scanner to use the camera scanner:\n\nexpo install expo-barcode-scanner"
      );
    }
  };

  // Scanner overlay
  const ScannerOverlay = () => {
    const [ready, setReady] = useState(false);
    const [ScannerComp, setScannerComp] = useState(null);

    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const { BarCodeScanner } = await import("expo-barcode-scanner");
          if (mounted) {
            setScannerComp(() => BarCodeScanner);
            setReady(true);
          }
        } catch {}
      })();
      return () => {
        mounted = false;
      };
    }, []);

    if (!scannerOpen) return null;

    if (hasPermission === false) {
      return (
        <View style={styles.overlayBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Camera permission denied</Text>
            <Text style={styles.modalDesc}>
              Enable camera access in settings to scan a Game ID, or type it manually.
            </Text>
            <Pressable style={[styles.joinBtn, { marginTop: 12 }]} onPress={() => setScannerOpen(false)}>
              <Text style={styles.joinText}>OK</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    if (!ready || !ScannerComp) {
      return (
        <View style={styles.overlayBackdrop}>
          <View style={styles.modalCameraCard}>
            <View style={styles.scannerBox}>
              <Text style={{ color: "#fff" }}>Loading camera…</Text>
            </View>
            <Pressable style={styles.scanClose} onPress={() => setScannerOpen(false)}>
              <Ionicons name="close" size={22} color="#0f1a4a" />
            </Pressable>
          </View>
        </View>
      );
    }

    const onScan = ({ data }) => {
      setScannerOpen(false);
      if (data) setGameId(String(data));
      setTimeout(join, 100);
    };

    const Comp = ScannerComp;
    return (
      <View style={styles.overlayBackdrop}>
        <View style={styles.modalCameraCard}>
          <Comp onBarCodeScanned={onScan} style={StyleSheet.absoluteFillObject} />
          <View style={styles.scanOverlay}>
            <Text style={styles.scanHint}>Align the code inside the frame</Text>
            <Pressable style={styles.scanClose} onPress={() => setScannerOpen(false)}>
              <Ionicons name="close" size={22} color="#0f1a4a" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Sidebar current="quiz" />
      <View style={styles.content}>
        <TopBar />
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Join Quiz</Text>

          <View style={styles.inputRow}>
            <TextInput
              value={gameId}
              onChangeText={setGameId}
              placeholder="Enter Game ID"
              placeholderTextColor="#8aa0c6"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={join}
            />
            <Pressable style={styles.cameraBtn} onPress={openScanner}>
              <Feather name="camera" size={20} color="#dfe8ff" />
            </Pressable>
          </View>

          <Link href="/quiz-page" style={{ textDecorationLine: "none" }}>
            <Pressable style={styles.joinBtn}>
              <Text style={styles.joinText}>Join</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <ScannerOverlay />
    </View>
  );
}

/* ---------- Styles ---------- */
const S = 8;
const SIDEBAR_W = 220;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F5F7FD", flexDirection: "row" },

  /* Sidebar (Educational style) */
  sidebar: {
    width: SIDEBAR_W,
    backgroundColor: "#0C2A5B",
    position: "relative",
    paddingTop: S * 3,
    paddingBottom: S * 3,
  },
  brandRow: { paddingHorizontal: S * 2, flexDirection: "row", alignItems: "center" },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  brandText: { color: "#E6EEFF", fontWeight: "900", fontSize: 18 },
  menuList: { marginTop: S * 2, paddingVertical: S * 1.5 },

  sideItem: {
    height: 50,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  sideItemActive: { backgroundColor: "#FFFFFF" },
  sideItemText: { color: "#E6ECFF", fontSize: 16, fontWeight: "800" },
  sideItemTextActive: { color: "#0C2A5B" },

  /* Top bar container = screenshot look */
  content: { flex: 1 },
  topRow: {
    marginTop: S * 2,
    marginHorizontal: S * 3,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 14,
    },
    android: { elevation: 4 },
    default: { boxShadow: "0 6px 16px rgba(15, 28, 70, 0.06)" },
  }),
  greeting: { color: "#0C2A5B", fontWeight: "900", marginRight: S * 2 },

  /* Big pill search */
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F4FB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 38,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#0F172A" },

  actions: { flexDirection: "row", alignItems: "center", marginLeft: S * 2, gap: S * 2 },
  bellWrap: { position: "relative", padding: 6 },
  dot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  avatarWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F1F4FB",
    borderRadius: 999,
    paddingHorizontal: 8,
    height: 36,
  },
  avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#d7ddff" },

  /* Join panel */
  panel: {
    margin: 18,
    backgroundColor: "#0f2a6b",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: 520,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  panelTitle: { color: "#fff", fontWeight: "900", fontSize: 32, marginBottom: 80 },

  inputRow: { flexDirection: "row", alignItems: "center" },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 380,
    fontWeight: "700",
    color: "#0f2a6b",
  },
  cameraBtn: {
    marginLeft: 12,
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfe8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  joinBtn: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  joinText: { color: "#0f2a6b", fontWeight: "900" },

  /* Scanner overlay */
  overlayBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: { fontWeight: "900", color: "#1b2a7a", marginBottom: 6 },
  modalDesc: { color: "#56627a", textAlign: "center" },

  modalCameraCard: {
    width: 320,
    height: 420,
    backgroundColor: "#000",
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  scannerBox: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  scanOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  scanHint: { color: "#fff", fontWeight: "700", marginBottom: 8 },
  scanClose: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginBottom: 6,
  },

  // (kept for completeness if you use the join card somewhere)
  joinLink: { marginTop: 28, textDecorationLine: "none" },
  joinCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
