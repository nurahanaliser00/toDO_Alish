import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';
import { Word } from './Vocabdata';

type Props = {
  words: Word[];
  learnedWordIds: string[];
  onBack: () => void;
};

export default function VocabularyList({ words, learnedWordIds, onBack }: Props) {
  const [search, setSearch] = useState('');

  // Қазақша немесе орысша атауы бойынша іздейміз
  const filteredWords = words.filter(
    (w) =>
      w.kazakh.toLowerCase().includes(search.toLowerCase()) ||
      w.translation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Сөздік</Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Сөзді іздеу..."
            placeholderTextColor={colors.subtitle}
          />
        </View>

        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isLearned = learnedWordIds.includes(item.id);
            return (
              <View style={styles.wordCard}>
                <View style={styles.wordTextBlock}>
                  <Text style={styles.wordKazakh}>{item.kazakh}</Text>
                  <Text style={styles.wordTranslation}>{item.translation}</Text>
                  <Text style={styles.wordExample}>{item.example}</Text>
                </View>
                {isLearned && <Text style={styles.learnedBadge}>✓</Text>}
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Ештеңе табылмады</Text>
          }
        />
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
    marginBottom: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  wordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    padding: 14,
    marginBottom: 12,
  },
  wordTextBlock: {
    flex: 1,
  },
  wordKazakh: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  wordTranslation: {
    fontSize: 14,
    color: colors.purple,
    fontWeight: '600',
    marginTop: 2,
  },
  wordExample: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 4,
  },
  learnedBadge: {
    fontSize: 18,
    color: '#3DBE6C',
    fontWeight: '700',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.subtitle,
    marginTop: 30,
    fontSize: 15,
  },
});