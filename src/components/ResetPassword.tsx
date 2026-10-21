import React, { useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function ResetPassword({ onBack, onNext }: Props) {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleContinue = () => {
    console.log('Жаңа құпия сөз орнатылды', { password, repeatPassword });
    onNext();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Сбросить пароль</Text>

        <Text style={styles.subtitle}>
          Не менее 8 символов, с прописными и строчными буквами
        </Text>

        {/* Жаңа құпия сөз өрісі */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            placeholderTextColor={colors.subtitle}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </Pressable>
        </View>

        {/* Құпия сөзді қайталау өрісі */}
        <View style={[styles.inputContainer, { marginTop: 14 }]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            placeholder="Повторить пароль"
            placeholderTextColor={colors.subtitle}
            secureTextEntry={!showRepeatPassword}
          />
          <Pressable onPress={() => setShowRepeatPassword((prev) => !prev)}>
            <Text style={styles.eyeIcon}>
              {showRepeatPassword ? '🙈' : '👁️'}
            </Text>
          </Pressable>
        </View>

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
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    height: sizes.inputHeight,
    paddingHorizontal: 18,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
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
});  // reset