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
  onLogin: () => void;
  onNext: () => void;
};

export default function Register({ onBack, onLogin, onNext }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    console.log('Тіркелу батырмасы басылды', { name, phone, password, agreed });
    onNext();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Регистрация</Text>

        <Text style={styles.subtitle}>
          Создайте учетную запись,{'\n'}чтобы продолжить!
        </Text>

        {/* Аты-жөнін енгізу өрісі */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ваше имя"
            placeholderTextColor={colors.subtitle}
          />
        </View>

        {/* Телефон нөмірін енгізу өрісі */}
        <View style={[styles.inputContainer, { marginTop: 14 }]}>
          <Text style={styles.inputIcon}>📞</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Номер телефона"
            placeholderTextColor={colors.subtitle}
            keyboardType="phone-pad"
          />
        </View>

        {/* Құпия сөзді енгізу өрісі */}
        <View style={[styles.inputContainer, { marginTop: 14 }]}>
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

        {/* Келісім чекбоксы */}
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setAgreed((prev) => !prev)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Создавая учетную запись, вы соглашаетесь с нашими{' '}
            <Text style={styles.linkText}>Условиями</Text> использования.
          </Text>
        </Pressable>

        {/* Тіркелу батырмасы */}
        <Pressable style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </Pressable>

        {/* Кіру сілтемесі */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <Pressable onPress={onLogin}>
            <Text style={styles.loginLink}>Войти</Text>
          </Pressable>
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
    marginTop: 5,
    marginBottom: 24,
    lineHeight: 22,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.subtitle,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  checkmark: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: colors.subtitle,
    lineHeight: 19,
  },
  linkText: {
    color: colors.purple,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: colors.purple,
    borderRadius: sizes.borderRadius,
    height: sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: colors.subtitle,
    fontSize: 15,
  },
  loginLink: {
    color: colors.purple,
    fontSize: 15,
    fontWeight: '700',
  },
});