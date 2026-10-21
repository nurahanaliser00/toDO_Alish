import React, { useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

// Таңдауға болатын қалалар тізімі
const cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда'];

export default function SelectCity({ onBack, onNext }: Props) {
  const [selectedCity, setSelectedCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleContinue = () => {
    console.log('Таңдалған қала', selectedCity);
    onNext();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Выберите город</Text>

        <Text style={styles.subtitle}>
          Заведения которые будут показываться вам, будут зависеть от вашего
          города.
        </Text>

        {/* Қала таңдау батырмасы (dropdown) */}
        <Pressable
          style={styles.selectBox}
          onPress={() => setIsOpen((prev) => !prev)}
        >
          <Text
            style={selectedCity ? styles.selectedText : styles.placeholderText}
          >
            {selectedCity || 'Выбрать город'}
          </Text>
          <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
        </Pressable>

        {/* Ашылғанда көрінетін қалалар тізімі */}
        {isOpen && (
          <View style={styles.dropdownList}>
            {cities.map((city) => (
              <Pressable
                key={city}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCity(city);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{city}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Продолжить</Text>
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
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 32,
    color: colors.text,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtitle,
    marginTop: 8,
    lineHeight: 22,
    marginBottom: 30,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    height: sizes.inputHeight,
    paddingHorizontal: 18,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.subtitle,
  },
  selectedText: {
    fontSize: 16,
    color: colors.text,
  },
  chevron: {
    fontSize: 14,
    color: colors.purple,
  },
  dropdownList: {
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    marginTop: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text,
  },
  continueButton: {
    backgroundColor: colors.purple,
    borderRadius: sizes.borderRadius,
    height: sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});