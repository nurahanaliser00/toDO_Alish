import React from 'react';

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';

type Props = {
  onSelectProjects: () => void;
  onSelectLanguage: () => void;
};

export default function MainMenu({ onSelectProjects, onSelectLanguage }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Text style={styles.title}>Қош келдіңіз!</Text>
        <Text style={styles.subtitle}>Қай бөлімге өтесіз?</Text>

        <Pressable style={styles.card} onPress={onSelectProjects}>
          <Text style={styles.cardEmoji}>📋</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Жобаларым</Text>
            <Text style={styles.cardSubtitle}>Тапсырмаларды басқару</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={onSelectLanguage}>
          <Text style={styles.cardEmoji}>🇰🇿</Text>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>Қазақ тілін үйрену</Text>
            <Text style={styles.cardSubtitle}>Сөздік, карточкалар, викторина</Text>
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
    paddingHorizontal: 28,
    paddingTop: 60,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: colors.subtitle,
    marginTop: 5,
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    padding: 18,
    marginBottom: 16,
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  cardTextBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 20,
    color: colors.purple,
  },
});