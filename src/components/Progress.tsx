import React from 'react';

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';

type Props = {
  learnedCount: number;
  totalWords: number;
  quizzesTaken: number;
  bestScore: number | null;
  bestScoreTotal: number;
  onBack: () => void;
};

export default function Progress({
  learnedCount,
  totalWords,
  quizzesTaken,
  bestScore,
  bestScoreTotal,
  onBack,
}: Props) {
  const percent =
    totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Прогресс</Text>
        <Text style={styles.subtitle}>Сіздің жетістіктеріңіз</Text>

        {/* Сөздерді үйрену прогресі */}
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Үйренген сөздер</Text>
          <Text style={styles.statValue}>
            {learnedCount} / {totalWords}
          </Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percent}%` }]}
            />
          </View>
          <Text style={styles.percentText}>{percent}%</Text>
        </View>

        {/* Викторина статистикасы */}
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Тапсырылған викториналар</Text>
          <Text style={styles.statValue}>{quizzesTaken}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Соңғы нәтиже</Text>
          <Text style={styles.statValue}>
            {bestScore !== null ? `${bestScore} / ${bestScoreTotal}` : 'Әлі жоқ'}
          </Text>
        </View>
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
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    padding: 18,
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    color: colors.subtitle,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E7EC',
    borderRadius: 4,
    marginTop: 12,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: colors.purple,
    borderRadius: 4,
  },
  percentText: {
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 6,
    textAlign: 'right',
  },
});