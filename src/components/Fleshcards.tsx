import React, { useState } from 'react';

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { colors, sizes } from './theme';
import { Word } from './Vocabdata';

type Props = {
  words: Word[];
  learnedWordIds: string[];
  onMarkLearned: (id: string) => void;
  onBack: () => void;
};

export default function Flashcards({
  words,
  learnedWordIds,
  onMarkLearned,
  onBack,
}: Props) {
  // Қазір қай сөз көрсетіліп тұрғанын білдіретін индекс
  const [index, setIndex] = useState(0);
  // Карточка аударылған ба (аудармасы көрініп тұр ма)
  const [flipped, setFlipped] = useState(false);

  const currentWord = words[index];

  const goNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % words.length);
  };

  const goPrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  // Сөзді дауыстап айту (expo-speech арқылы)
  const handleSpeak = () => {
    Speech.speak(currentWord.kazakh, { language: 'kk-KZ' });
  };

  const isLearned = learnedWordIds.includes(currentWord.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Карточкалар</Text>
        <Text style={styles.counter}>
          {index + 1} / {words.length}
        </Text>

        {/* Басқанда аударма көрінеді/жасырылады */}
        <Pressable style={styles.card} onPress={() => setFlipped((prev) => !prev)}>
          {!flipped ? (
            <Text style={styles.cardWord}>{currentWord.kazakh}</Text>
          ) : (
            <>
              <Text style={styles.cardTranslation}>{currentWord.translation}</Text>
              <Text style={styles.cardExample}>{currentWord.example}</Text>
            </>
          )}
          <Text style={styles.tapHint}>
            {flipped ? 'Жасыру үшін басыңыз' : 'Аударманы көру үшін басыңыз'}
          </Text>
        </Pressable>

        {/* Дыбыстап айту батырмасы */}
        <Pressable style={styles.speakButton} onPress={handleSpeak}>
          <Text style={styles.speakButtonText}>🔊 Дыбыстау</Text>
        </Pressable>

        {/* Алдыңғы / Келесі батырмалары */}
        <View style={styles.navRow}>
          <Pressable style={styles.navButton} onPress={goPrev}>
            <Text style={styles.navButtonText}>← Алдыңғы</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={goNext}>
            <Text style={styles.navButtonText}>Келесі →</Text>
          </Pressable>
        </View>

        {/* Білемін батырмасы */}
        <Pressable
          style={[styles.learnButton, isLearned && styles.learnButtonDone]}
          onPress={() => onMarkLearned(currentWord.id)}
        >
          <Text style={styles.learnButtonText}>
            {isLearned ? '✓ Үйренілді' : 'Білемін деп белгілеу'}
          </Text>
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
  counter: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  cardWord: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  cardTranslation: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.purple,
    textAlign: 'center',
  },
  cardExample: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 12,
    textAlign: 'center',
  },
  tapHint: {
    position: 'absolute',
    bottom: 14,
    fontSize: 12,
    color: colors.subtitle,
  },
  speakButton: {
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
  },
  speakButtonText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navButton: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  navButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  learnButton: {
    backgroundColor: colors.purple,
    borderRadius: sizes.borderRadius,
    height: sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  learnButtonDone: {
    backgroundColor: '#3DBE6C',
  },
  learnButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});