// app/create-quiz.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView,Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DashboardBase from "../components/DashboardBase";

const COLORS = {
  page: "#F5F6FA",
  card: "#FFFFFF",
  ink:  "#0C2A5B",
  sub:  "#6B7280",
  border: "#E9EEF6",
  blue:  "#2B6DE8",
  blueDeep: "#1E3A8A",
  pill:  "#0F172A",
  danger:"#EF4444",
};

const S = 12;
const G = 20;

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      points: 1,
      type: "Multiple Choice",
      text: "What is the value of 7×(3+2)7×(3+2) ?",
      options: ["21", "14", "35", "45"],
      correctIndex: 2,
    },
  ]);

  const addQuestion = () => {
    const id = Math.max(...questions.map(q => q.id)) + 1 || 1;
    setQuestions(qs => [
      ...qs,
      {
        id,
        points: 10,
        type: "Multiple Choice",
        text: "",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctIndex: 0,
      },
    ]);
  };

  const updateQuestion = (id, patch) =>
    setQuestions(qs => qs.map(q => (q.id === id ? { ...q, ...patch } : q)));

  const removeQuestion = (id) =>
    setQuestions(qs => qs.filter(q => q.id !== id));

  return (
    <DashboardBase>
      <ScrollView
        contentContainerStyle={{ padding: G, gap: G, backgroundColor: COLORS.page }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header actions row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Create New Quiz</Text>
            <Text style={styles.pageSub}>Add questions, set answers and configure quiz settings</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable style={styles.btnPrimaryLight}>
              <Text style={styles.btnPrimaryLightTxt}>Save Draft</Text>
            </Pressable>
            <Pressable style={styles.btnGhost}>
              <Text style={styles.btnGhostTxt}>Preview</Text>
            </Pressable>
          </View>
        </View>

        {/* Body card */}
        <View style={[styles.card, styles.shadowSm]}>
          <Text style={styles.sectionTitle}>Quiz Questions</Text>
          <Text style={styles.sectionSub}>Create and manage your quiz questions</Text>

          {questions.map((q, idx) => (
            <View key={q.id} style={styles.qBlock}>
              {/* Row: Question N + points pill + type pill + trash */}
              <View style={styles.qHead}>
                <Text style={styles.qTitle}>Question {idx + 1}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  {/* points pill */}
                  <View style={styles.pillRow}>
                    <Text style={styles.pillLabel}>Points:</Text>
                    <View style={styles.pillDark}>
                      <Text style={styles.pillDarkTxt}>{q.points}</Text>
                    </View>
                  </View>

                  {/* type pill (static for now) */}
                  <View style={styles.typePill}>
                    <Text style={styles.typePillTxt}>{q.type}</Text>
                    <Ionicons name="chevron-down" size={14} color="#fff" />
                  </View>

                  {/* delete question */}
                  <Pressable onPress={() => removeQuestion(q.id)} style={styles.trashBtn}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                  </Pressable>
                </View>
              </View>

              {/* Question text */}
              <Text style={styles.fieldLabel}>Question Text</Text>
              <TextInput
                value={q.text}
                onChangeText={(t) => updateQuestion(q.id, { text: t })}
                placeholder="Write your question here…"
                placeholderTextColor={COLORS.sub}
                style={styles.input}
              />

              {/* Options */}
              <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Answer Options</Text>
              <View style={{ gap: 14 }}>
                {q.options.map((opt, i) => (
                  <Pressable
                    key={i}
                    onPress={() => updateQuestion(q.id, { correctIndex: i })}
                    style={styles.optionRow}
                  >
                    <View style={[styles.radio, q.correctIndex === i && styles.radioActive]}>
                      {q.correctIndex === i ? <View style={styles.radioDot} /> : null}
                    </View>

                    <TextInput
                      value={opt}
                      onChangeText={(t) => {
                        const clone = [...q.options];
                        clone[i] = t;
                        updateQuestion(q.id, { options: clone });
                      }}
                      style={styles.optionText}
                      placeholder={`Option ${i + 1}`}
                      placeholderTextColor={COLORS.sub}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          {/* Add Question */}
          <Pressable onPress={addQuestion} style={styles.addBtn}>
            <Ionicons name="add" size={16} color={COLORS.blue} />
            <Text style={styles.addBtnTxt}>Add Question</Text>
          </Pressable>
        </View>

        {/* bottom padding */}
        <View style={{ height: 12 }} />
      </ScrollView>
    </DashboardBase>
  );
}

/* ───────── Styles ───────── */

const styles = StyleSheet.create({
  shadowSm: {
    ...(Platform.OS === "web"
      ? { boxShadow: "0 10px 24px rgba(16,24,40,.08)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 16,
          elevation: 3,
        }),
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pageTitle: { fontSize: 20, fontWeight: "800", color: COLORS.ink },
  pageSub: { marginTop: 4, color: COLORS.sub, fontSize: 12 },

  btnPrimaryLight: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnPrimaryLightTxt: { color: "#fff", fontWeight: "800" },

  btnGhost: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  btnGhostTxt: { color: COLORS.ink, fontWeight: "700" },

  /* Main card */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: G,
  },
  sectionTitle: {
    fontWeight: "800",
    color: COLORS.ink,
    fontSize: 16,
  },
  sectionSub: { color: COLORS.sub, fontSize: 12, marginTop: 2 },

  /* Question block */
  qBlock: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
    gap: 10,
  },
  qHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qTitle: { color: COLORS.ink, fontWeight: "800" },

  pillRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  pillLabel: { color: COLORS.sub, fontSize: 12 },
  pillDark: {
    backgroundColor: COLORS.pill,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  pillDarkTxt: { color: "#fff", fontWeight: "800", fontSize: 12 },

  typePill: {
    backgroundColor: COLORS.pill,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typePillTxt: { color: "#fff", fontWeight: "800", fontSize: 12 },

  trashBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },

  fieldLabel: { color: COLORS.sub, fontSize: 12 },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    color: COLORS.ink,
  },

  optionRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.blueDeep,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: COLORS.blue },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.blue },

  optionText: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    color: COLORS.ink,
  },

  addBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flexDirection: "row",
    backgroundColor: "#FBFCFF",
  },
  addBtnTxt: { color: COLORS.blue, fontWeight: "800" },
});
