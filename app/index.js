// HomeScreen.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Dimensions,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HeroImg from "../assets/images/Homepageimg.png"; // import instead of require (more reliable on web)

const { width } = Dimensions.get("window");
const MAX_W = 1200;
const AUTH_BTN_W = 140;
const AUTH_BTN_H = 44;

const COLORS = {
  navy: "#0C2A5B",
  navyDark: "#0A1E42",
  white: "#FFFFFF",
  offWhite: "#F6F7FB",
  text: "#0F172A",
  subtext: "#475569",
  primary: "#2563EB",
  primaryLight: "#E6EEFF",
  badge: "#FFE56A",
  chip: "#E7F0FF",
  border: "#E5E7EB",
  linkBlue: "#2B6DE8",
};

const S = 8;
const G = S * 3; // unified page gutter
const HERO_SHIFT = 60;

export default function HomeScreen() {
  const scrollRef = useRef(null);
  const aboutRef = useRef(null);
  const [aboutY, setAboutY] = useState(0);

  const scrollToAbout = () => {
    if (!scrollRef.current || !aboutRef.current) return;
    const scrollNode =
      typeof scrollRef.current.getScrollableNode === "function"
        ? scrollRef.current.getScrollableNode()
        : scrollRef.current;

    aboutRef.current.measureLayout(
      scrollNode,
      (x, y) => {
        scrollRef.current.scrollTo({ y: Math.max(y - 12, 0), animated: true });
      },
      () => {}
    );
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: G }}
    >
      {/* ===== HERO ===== */}
      <View style={styles.heroWrap}>
        <View style={[styles.navPill, shadow]}>
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Image
                source={{
                  uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo",
                }}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            </View>
            <Text style={styles.brandName}>EdVenture</Text>
          </View>

          <View style={styles.navCenter}>
            <Pressable
              style={styles.navItem}
              onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
            >
              <Text style={styles.navTextActive}>Home</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={scrollToAbout}>
              <Text style={styles.navText}>About</Text>
            </Pressable>
            <Pressable
              style={styles.navItem}
              onPress={() => Linking.openURL("https://math-gesture-program.netlify.app")}
            >
              <Text style={styles.navText}>Contact us</Text>
            </Pressable>
          </View>

          <View style={styles.authRow}>
            <Link href="/Login" asChild>
              <Pressable style={styles.loginBtn}>
                <Text style={styles.loginTxt}>Login</Text>
              </Pressable>
            </Link>

            <Link href="/Login" asChild>
              <Pressable style={styles.signupBtn}>
                <Text style={styles.signupTxt}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Hero content */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>
              Math Made Simple, Fun {"\n"}& Interactive
            </Text>
            <Text style={styles.heroSubtitle}>
              Solve problems with gestures, play games, and climb the leaderboard
            </Text>

            <View style={{ flexDirection: "row", gap: S }}>
              <Link href="/Login" asChild>
                <Pressable style={styles.cta}>
                  <Text style={styles.ctaPrimaryText}>Get Started</Text>
                </Pressable>
              </Link>
            </View>
          </View>

          <View style={styles.heroRight}>
            <View style={styles.illoCard}>
              <Image source={HeroImg} style={styles.illoImg} resizeMode="contain" />
              <View style={[styles.star, { top: -10, right: -10 }]} />
              <View style={[styles.star, { bottom: -10, left: -10 }]} />
            </View>
          </View>
        </View>
      </View>

      {/* ===== TRUST BAR ===== */}
      <View style={[styles.trustCard, shadow]}>
        <View style={styles.trustTextWrap}>
          <Text style={styles.trustTitle}>
            Trusted by over 50+{"\n"}educational institution
          </Text>
        </View>
        <View style={styles.trustLogosWrap}>
          {[
            "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SchoolLogo1",
            "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SchoolLogo2",
            "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SchoolLogo3",
            "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SchoolLogo4",
            "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SchoolLogo5",
          ].map((logo, i) => (
            <Image
              key={i}
              source={{ uri: logo }}
              style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                resizeMode: "contain",
              }}
            />
          ))}
        </View>
      </View>

      {/* ===== ABOUT + VIDEO (single grey band with margins) ===== */}
      <View style={styles.aboutWrap}>
        <View style={styles.contentMax}>
          <View ref={aboutRef} collapsable={false} />

          <View style={styles.aboutSection}>
            <Text style={styles.sectionKickerBlue}>ABOUT EdVenture</Text>

            <Text style={styles.aboutTitle}>
              Empowering Young Minds through{"\n"}AI Powered Learning
            </Text>

            <View style={styles.hr} />

            <View style={styles.featuresInline}>
              <FeatureInline
                iconBg="#5B86E5"
                icon={<Ionicons name="school" size={20} color="#fff" />}
                title="Interactive Learning"
                desc="Gesture-based recognition makes math engaging by allowing students to solve problems naturally with handwriting and hand movements"
              />
              <FeatureInline
                iconBg="#5B86E5"
                icon={<Ionicons name="chatbubble-ellipses" size={20} color="#fff" />}
                title="Instant Feedback"
                desc="AI engine provides real-time solutions, step-by-step guidance, and accuracy checks to boost learning outcomes"
              />
              <FeatureInline
                iconBg="#5B86E5"
                icon={<Ionicons name="trending-up" size={20} color="#fff" />}
                title="Progress Tracking"
                desc="Built-in dashboards track student performance, generate leaderboards, and share reports with teachers and parents"
              />
            </View>

            <View style={[styles.hr, { marginTop: S * 2 }]} />

            <View style={styles.statsInline}>
              <StatInline value="100+" label="Success Stories" />
              <View style={styles.vr} />
              <StatInline value="50+" label="Educational institution" />
              <View style={styles.vr} />
              <StatInline value="54K+" label="Solved Equation" />
              <View style={styles.vr} />
              <StatInline value="35K+" label="Hours Used" />
            </View>

            <View style={styles.aboutCtas}>
              <Pressable
                style={styles.btnPrimaryFill}
                onPress={() => Linking.openURL("https://math-gesture-program.netlify.app")}
              >
                <Text style={styles.btnPrimaryFillTxt}>More About Us</Text>
              </Pressable>
              <Pressable
                style={styles.btnOutline}
                onPress={() => Linking.openURL("https://math-gesture-program.netlify.app")}
              >
                <Text style={styles.btnOutlineTxt}>Contact Us</Text>
              </Pressable>
            </View>
          </View>

          {/* Video (inside same grey band, shares margins) */}
<View style={[styles.bottomVideo, { paddingHorizontal: 0 }]}>
  {Platform.OS === "web" ? (
    <View style={styles.videoResponsive}>
      <iframe
        src="https://www.youtube.com/embed/FWhTFumayI4?rel=0&modestbranding=1"
        style={styles.videoIframe}
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="EdVenture demo video"
      />
    </View>
  ) : (
    <View style={styles.videoBox}>
      <View style={styles.playBtn}>
        <Text style={{ color: COLORS.white, fontWeight: "700" }}>▶</Text>
      </View>
    </View>
  )}
</View>
</View></View>

      {/* ===== FOOTER ===== */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: S }}>
            <View style={styles.logoBox}>
              <Image
                source={{
                  uri: "https://github.com/MjdMAlamri/Images/raw/refs/heads/main/SmallLogo",
                }}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            </View>
            <Text style={[styles.brandName, { color: COLORS.white }]}>EdVenture</Text>
          </View>

          <View style={styles.footerLinks}>
            <View style={styles.footerCol}>
              <Text style={styles.footerLinkText}>About Us</Text>
              <Text style={styles.footerLinkText}>Our Team</Text>
            </View>

            <View style={styles.footerCol}>
              <Text style={styles.footerLinkText}>FAQ</Text>
              <Text style={styles.footerLinkText}>Careers</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyText}>© 2025 EdVenture. All rights reserved.</Text>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialIcon}>
              <Ionicons name="logo-youtube" size={16} color="#fff" />
            </Pressable>
            <Pressable style={styles.socialIcon}>
              <Ionicons name="logo-instagram" size={16} color="#fff" />
            </Pressable>
            <Pressable style={styles.socialIcon}>
              <Ionicons name="logo-linkedin" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/* ===== Inline feature item ===== */
function FeatureInline({ iconBg, icon, title, desc }) {
  return (
    <View style={styles.featureInlineItem}>
      <View style={[styles.inlineIconCircle, { backgroundColor: iconBg }]}>
        <Text style={{ fontSize: 18, color: "#FFF" }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.inlineTitle}>{title}</Text>
        <Text style={styles.inlineDesc}>{desc}</Text>
      </View>
    </View>
  );
}

/* ===== Inline stat ===== */
function StatInline({ value, label }) {
  return (
    <View style={styles.statInlineItem}>
      <Text style={styles.statBig}>{value}</Text>
      <Text style={styles.statSmall}>{label}</Text>
    </View>
  );
}

/* (kept for other places) */
function FeatureCard({ title, desc, icon }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}
function StatBlock({ value, label }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  container: { flex: 1, backgroundColor: COLORS.white },

  footerLinks: {
    flexDirection: "row",
    gap: 40,
  },
  footerCol: { flexDirection: "column", gap: 6 },
  footerLinkText: { color: "#C7D2FE", fontSize: 12 },

  /* ===== HERO ===== */
  heroWrap: {
    backgroundColor: COLORS.navy,
    paddingTop: G / 2,
    paddingBottom: G,
    paddingHorizontal: G,
    ...Platform.select({
      web: { minHeight: 560 }, // avoid % height on web
      default: {},
    }),
  },
  navPill: {
    position: "relative",
    backgroundColor: COLORS.white,
    height: 56,
    borderRadius: 999,
    paddingHorizontal: S * 2,
    marginHorizontal: G,
    marginBottom: G,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: S },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoMark: { color: COLORS.white, fontSize: 16 },
  brandName: { fontSize: 18, fontWeight: "700", color: COLORS.linkBlue },
  navCenter: {
    position: "absolute",
    left: "25%",
    right: "25%",
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: S * 3,
  },
  navItem: { paddingHorizontal: S, paddingVertical: S / 2, borderRadius: 8 },
  navText: { color: COLORS.navy, fontSize: 14, opacity: 0.9 },
  navTextActive: { color: COLORS.navy, fontWeight: "700", fontSize: 14 },
  authRow: { flexDirection: "row", alignItems: "center", gap: S },

  loginTxt: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
  signupTxt: { color: COLORS.linkBlue, fontWeight: "700", fontSize: 14 },

  loginBtn: {
    backgroundColor: "#5B86E5",
    width: AUTH_BTN_W,
    height: AUTH_BTN_H,
    borderRadius: AUTH_BTN_H / 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  signupBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: "#5B86E5",
    width: AUTH_BTN_W,
    height: AUTH_BTN_H,
    borderRadius: AUTH_BTN_H / 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: S * 4,
    ...Platform.select({
      web: { marginTop: HERO_SHIFT, marginLeft: HERO_SHIFT }, // replace big transform on web
      default: { transform: [{ translateX: HERO_SHIFT }, { translateY: HERO_SHIFT }] },
    }),
    overflow: "visible",
  },
  heroLeft: {
    flex: 1,
    gap: S * 2,
    justifyContent: "center",
    marginRight: S,
  },
  heroTitle: { color: COLORS.white, fontSize: 42, fontWeight: "900", lineHeight: 50 },
  heroSubtitle: { color: "#C7D2FE", fontSize: 18, lineHeight: 26 },
  cta: {
    paddingHorizontal: S * 25,
    paddingVertical: S * 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
  },
  ctaPrimaryText: { color: COLORS.navy, fontWeight: "900", fontSize: 28, lineHeight: 34 },
  chip: {
    backgroundColor: COLORS.chip,
    paddingHorizontal: S * 1.25,
    paddingVertical: S / 2,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  chipText: { color: COLORS.navy, fontWeight: "700", fontSize: 12 },
  heroRight: { flex: 1.15, alignItems: "center", justifyContent: "center" },
  illoCard: {
    width: Math.min(width - G * 2 - S * 3, 740),
    ...Platform.select({
      web: { aspectRatio: 16 / 9 }, // stable art box on web
      default: { height: Math.min(width * 0.55, 540) },
    }),
    borderRadius: 18,
    marginLeft: S + 25,
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
  },
  illoImg: { width: "100%", height: "100%" },
  star: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
  },
  videoResponsive: {
    width: Math.min(width - G * 2, 960),
    aspectRatio: 16 / 9,        // RNW supports this on <View/>
    borderRadius: 14,
    overflow: "hidden",
  },
  videoIframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  
  /* ===== TRUST BAR ===== */
  trustCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginHorizontal: G,
    marginTop: G,
    paddingHorizontal: S * 2,
    paddingVertical: S * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 90,
  },
  trustTitle: { color: COLORS.text, fontSize: 18, lineHeight: 20, fontWeight: "700" },
  trustLogosWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  trustTextWrap: { paddingRight: S * 2 },

  partnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  partnerLogo: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "contain",
    marginHorizontal: 10,
  },

  /* ===== ABOUT + VIDEO WRAP ===== */
  aboutWrap: {
    backgroundColor: COLORS.offWhite,
    paddingTop: G,
    paddingBottom: G * 1.25,
  },
  contentMax: {
    width: "100%",
    maxWidth: MAX_W,
    alignSelf: "center",
    paddingHorizontal: G,
  },
  aboutSection: {
    paddingTop: G,
    paddingBottom: G * 1.25,
  },
  sectionKickerBlue: {
    color: COLORS.linkBlue,
    fontWeight: "800",
    fontSize: 20,
    marginBottom: S * 1.5,
  },
  aboutTitle: {
    color: COLORS.navy,
    fontSize: 55,
    lineHeight: 72,
    fontWeight: "900",
    marginBottom: S * 2,
  },
  hr: { height: 1, backgroundColor: COLORS.border, opacity: 0.9, marginVertical: S * 2 },
  featuresInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: S * 2,
    justifyContent: "space-between",
  },
  featureInlineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: S * 1.5,
    flexBasis: "31%",
    minWidth: 250,
  },
  inlineIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
  },
  inlineTitle: { color: "#334155", fontSize: 16, fontWeight: "800", marginBottom: S / 2 },
  inlineDesc: { color: COLORS.subtext, fontSize: 13, lineHeight: 18 },

  statsInline: {
    marginTop: S * 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statInlineItem: { flex: 1, alignItems: "center", paddingHorizontal: S },
  statBig: { color: COLORS.navy, fontSize: 34, fontWeight: "900", marginBottom: S },
  statSmall: { color: COLORS.subtext, fontSize: 12, textAlign: "center" },
  vr: { width: 1, height: 56, backgroundColor: "#0C2A5B", opacity: 0.9 },

  aboutCtas: {
    marginTop: G,
    flexDirection: "row",
    justifyContent: "center",
    gap: S * 2,
    paddingTop: 30,
  },
  btnPrimaryFill: {
    backgroundColor: COLORS.linkBlue,
    paddingHorizontal: S * 3,
    paddingVertical: S * 1.25,
    borderRadius: 999,
  },
  btnPrimaryFillTxt: { color: COLORS.white, fontWeight: "800" },
  btnOutline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    paddingHorizontal: S * 3,
    paddingVertical: S * 1.25,
    borderRadius: 999,
  },
  btnOutlineTxt: { color: COLORS.navy, fontWeight: "800" },

  /* ===== Bottom Video ===== */
  bottomVideo: { paddingTop: G, paddingBottom: G, alignItems: "center" },
  videoBox: {
    width: Math.min(width - G * 2, 640),
    height: 220, // native placeholder
    backgroundColor: "#2E3342",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  videoFrame: {
    width: Math.min(width - G * 2, 640),
    aspectRatio: 16 / 9, // keeps ratio on web
    border: "none",
    borderRadius: 14,
    overflow: "hidden",
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===== FOOTER ===== */
  footer: { backgroundColor: COLORS.navy, paddingHorizontal: G, paddingVertical: G, marginTop: S },
  footerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: S * 2,
  },
  footerLinkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    paddingTop: S * 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copyText: { color: "#C7D2FE", fontSize: 12 },
  socialRow: { flexDirection: "row", gap: 10 },
  socialIcon: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#5B86E5",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Reusable */
  section: { paddingHorizontal: G, paddingVertical: G, backgroundColor: COLORS.white },
  sectionKicker: { color: COLORS.navy, fontWeight: "800", fontSize: 12, marginBottom: S },
  sectionTitle: { color: COLORS.text, fontSize: 24, fontWeight: "800", lineHeight: 30, marginBottom: S * 2 },
  featureRow: { flexDirection: "column", gap: S * 1.25 },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: S * 1.5,
    ...shadow,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: S,
  },
  featureTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text, marginBottom: S / 2 },
  featureDesc: { color: COLORS.subtext, fontSize: 13, lineHeight: 18 },
  statsRow: {
    marginTop: S * 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: S * 2,
  },
  statBlock: { alignItems: "center", flexBasis: "47%", paddingVertical: S * 1.5, backgroundColor: COLORS.offWhite, borderRadius: 12 },
  statValue: { fontSize: 22, fontWeight: "900", color: COLORS.navy },
  statLabel: { color: COLORS.subtext, marginTop: S / 2, textAlign: "center" },
});
