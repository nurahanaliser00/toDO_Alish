import React, { useRef, useState } from 'react';

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
  phone: string;
};

export default function VerifyCode({ onBack, onNext, phone }: Props) {
  // Код 4 санынан тұрады, сондықтан 4 бөлек өріс қолданамыз
  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');

  // Сан енгізілгенде автоматты түрде келесі өріске өту үшін
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  const handleContinue = () => {
    const code = digit1 + digit2 + digit3 + digit4;
    console.log('Код енгізілді', code);
    onNext();
  };

  const handleResend = () => {
    console.log('Кодты қайта жіберу сұралды');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.title}>Подтвердить номер</Text>

        <Text style={styles.subtitle}>
          Мы только что отправили код на{'\n'}
          <Text style={styles.phoneText}>{phone}</Text>
        </Text>

        {/* 4 санды енгізу өрістері */}
        <View style={styles.codeRow}>
          <TextInput
            style={styles.codeInput}
            value={digit1}
            onChangeText={(text) => {
              setDigit1(text);
              if (text.length === 1) input2.current?.focus();
            }}
            maxLength={1}
            keyboardType="number-pad"
          />
          <TextInput
            ref={input2}
            style={styles.codeInput}
            value={digit2}
            onChangeText={(text) => {
              setDigit2(text);
              if (text.length === 1) input3.current?.focus();
            }}
            maxLength={1}
            keyboardType="number-pad"
          />
          <TextInput
            ref={input3}
            style={styles.codeInput}
            value={digit3}
            onChangeText={(text) => {
              setDigit3(text);
              if (text.length === 1) input4.current?.focus();
            }}
            maxLength={1}
            keyboardType="number-pad"
          />
          <TextInput
            ref={input4}
            style={styles.codeInput}
            value={digit4}
            onChangeText={setDigit4}
            maxLength={1}
            keyboardType="number-pad"
          />
        </View>

        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Продолжить</Text>
        </Pressable>

        <Pressable style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Отправить код еще раз</Text>
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
  },
  phoneText: {
    color: colors.text,
    fontWeight: '700',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  codeInput: {
    width: 64,
    height: 64,
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
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
  resendButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: colors.subtitle,
    fontSize: 15,
  },
});