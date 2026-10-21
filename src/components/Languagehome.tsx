import React from 'react';

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';

type Props = {
  learnedCount: number;
  totalCount: number;
  onBack: () => void;
  onSelectVocabulary: () => void;
  onSelectFlashcards: () => void;
  onSelectQuiz: () => void;
  onSelectProgress: () => void;
};

export default function LanguageHome({
  learnedCount,
  totalCount,
  onBack,
  onSelectVocabulary,
  onSelectFlashcards,
  onSelectQuiz,
  onSelectProgress,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Қазақ тілін үйрену</Text>
        <Text style={styles.subtitle}>
          Үйренген сөздер: {learnedCount}/{totalCount}
        </Text>

        <Pressable style={styles.card} onPress={onSelectVocabulary}>
          <Text style={styles.cardEmoji}>📖</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Сөздік</Text>
            <Text style={styles.cardSubtitle}>Барлық сөздер мен аудармалар</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={onSelectFlashcards}>
          <Text style={styles.cardEmoji}>🃏</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Карточкалар</Text>
            <Text style={styles.cardSubtitle}>Сөздерді жаттау, дыбыстап айту</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={onSelectQuiz}>
          <Text style={styles.cardEmoji}>🧠</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Викторина</Text>
            <Text style={styles.cardSubtitle}>Білімді тексеру</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={onSelectProgress}>
          <Text style={styles.cardEmoji}>📊</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Прогресс</Text>
            <Text style={styles.cardSubtitle}>Жетістіктеріңізді көріңіз</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  backButtonText: {
    fontSize: 30,
    color: colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 4,
    marginBottom: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    padding: 16,
    marginBottom: 14,
  },
  cardEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 18,
    color: colors.purple,
  },
});