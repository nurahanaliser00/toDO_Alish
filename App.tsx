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
import { Ionicons } from '@expo/vector-icons';

// Басқа беттерді сыртқы файлдардан импорттаймыз
import ForgetPassword from './src/components/ForgetPassword';
import VerifyCode from './src/components/VerifyCode';
import ResetPassword from './src/components/ResetPassword';
import Register from './src/components/Register';
import SelectCity from './src/components/SelectCity';

// Тіл үйрену бөлімінің беттері
import LanguageHome from './src/components/Languagehome';
import VocabularyList from './src/components/Vocabluarylist';
import Flashcards from './src/components/Fleshcards';
import Quiz from './src/components/Quiz';
import Progress from './src/components/Progress';
import { words } from './src/components/Vocabdata';

const PURPLE = '#A90FD6';
const GRAY_TEXT = '#A3A2AB';
const INPUT_BG = '#F8F8F8';
const DARK = '#1B1923';


type Page =
  | 'login'
  | 'forget'
  | 'verify'
  | 'reset'
  | 'register'
  | 'city'
  | 'done'
  | 'languageHome'
  | 'vocabulary'
  | 'flashcards'
  | 'quiz'
  | 'progress';

export default function App() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  
  const [page, setPage] = useState<Page>('login');
  
  const [learnedWordIds, setLearnedWordIds] = useState<string[]>([]);
  const [quizzesTaken, setQuizzesTaken] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [lastScoreTotal, setLastScoreTotal] = useState(0);

  const handleLogin = () => {
    console.log('Войти басылды', { phone, password });
    setPage('languageHome'); // сәтті кіргеннен кейін тіл үйрену бетіне өтеді
  };

  // Сөзді "білемін" деп белгілеу (Flashcards бетінен шақырылады)
  const handleMarkLearned = (wordId: string) => {
    setLearnedWordIds((prev) =>
      prev.includes(wordId) ? prev : [...prev, wordId]
    );
  };

  // Викторина аяқталғанда нәтижені сақтау
  const handleFinishQuiz = (score: number, total: number) => {
    setQuizzesTaken((prev) => prev + 1);
    setLastScore(score);
    setLastScoreTotal(total);
    setPage('languageHome');
  };

  // Switch арқылы қай экранды көрсету керектігін таңдаймыз
  switch (page) {
    case 'forget':
      return (
        <ForgetPassword
          onBack={() => setPage('login')}
          onNext={(p) => {
            setPhone(p);
            setPage('verify');
          }}
        />
      );

    case 'verify':
      return (
        <VerifyCode
          phone={phone}
          onBack={() => setPage('forget')}
          onNext={() => setPage('reset')}
        />
      );

    case 'reset':
      return (
        <ResetPassword
          onBack={() => setPage('verify')}
          onNext={() => setPage('login')} // жаңа құпия сөз қойылған соң Login-ге қайтады
        />
      );

    case 'register':
      return (
        <Register
          onBack={() => setPage('login')}
          onLogin={() => setPage('login')}
          onNext={() => setPage('city')}
        />
      );

    case 'city':
      return (
        <SelectCity
          onBack={() => setPage('register')}
          onNext={() => setPage('done')}
        />
      );

    case 'done':
      return (
        <SafeAreaView style={styles.doneScreen}>
          <StatusBar style="dark" />
          <Text style={styles.doneText}>Тіркелу сәтті аяқталды! 🎉</Text>
          <Pressable
            style={styles.doneButton}
            onPress={() => setPage('languageHome')}
          >
            <Text style={styles.doneButtonText}>Тіл үйренуге өту</Text>
          </Pressable>
        </SafeAreaView>
      );

    // Тіл үйрену бөлімі: мәзір -> сөздік / карточкалар / викторина / прогресс
    case 'languageHome':
      return (
        <LanguageHome
          learnedCount={learnedWordIds.length}
          totalCount={words.length}
          onBack={() => setPage('login')}
          onSelectVocabulary={() => setPage('vocabulary')}
          onSelectFlashcards={() => setPage('flashcards')}
          onSelectQuiz={() => setPage('quiz')}
          onSelectProgress={() => setPage('progress')}
        />
      );

    case 'vocabulary':
      return (
        <VocabularyList
          words={words}
          learnedWordIds={learnedWordIds}
          onBack={() => setPage('languageHome')}
        />
      );

    case 'flashcards':
      return (
        <Flashcards
          words={words}
          learnedWordIds={learnedWordIds}
          onMarkLearned={handleMarkLearned}
          onBack={() => setPage('languageHome')}
        />
      );

    case 'quiz':
      return (
        <Quiz
          words={words}
          onBack={() => setPage('languageHome')}
          onFinish={handleFinishQuiz}
        />
      );

    case 'progress':
      return (
        <Progress
          learnedCount={learnedWordIds.length}
          totalWords={words.length}
          quizzesTaken={quizzesTaken}
          bestScore={lastScore}
          bestScoreTotal={lastScoreTotal}
          onBack={() => setPage('languageHome')}
        />
      );

    // Әдепкі жағдайда (page === 'login') Login экраны шығады
    default:
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />

          <View style={styles.container}>
            {/* Назад */}
            <Pressable style={styles.backButton} onPress={() => console.log('Артқа')}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </Pressable>

            <Text style={styles.title}>Привет, с возвращением!</Text>
            <Text style={styles.subtitle}>Войдите в свой аккаунт.</Text>

            {/* Телефон */}
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={22} color="#8E8D96" />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Номер телефона"
                placeholderTextColor={GRAY_TEXT}
                keyboardType="phone-pad"
              />
            </View>

            {/* Пароль */}
            <View style={[styles.inputContainer, styles.passwordContainer]}>
              <Ionicons name="lock-closed" size={22} color="#8E8D96" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
                placeholderTextColor={GRAY_TEXT}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color={PURPLE}
                />
              </Pressable>
            </View>

            {/* Забыл пароль */}
            <Pressable
              style={styles.forgotPasswordButton}
              onPress={() => setPage('forget')} // ForgetPassword бетіне ауысады
            >
              <Text style={styles.forgotPasswordText}>Забыл пароль?</Text>
            </Pressable>

            {/* Войти */}
            <Pressable style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Войти</Text>
            </Pressable>

            {/* Регистрация */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>У вас нет аккаунта?</Text>
              <Pressable onPress={() => setPage('register')}>
                <Text style={styles.registerLink}>Зарегистрироваться</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  title: {
    color: DARK,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    color: GRAY_TEXT,
    fontSize: 16,
    marginTop: 6,
    marginBottom: 28,
  },
  inputContainer: {
    width: '100%',
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    marginTop: 18,
  },
  input: {
    flex: 1,
    height: '100%',
    color: DARK,
    fontSize: 16,
    marginLeft: 14,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 18,
  },
  forgotPasswordText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    height: 58,
    backgroundColor: PURPLE,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  registerText: {
    color: GRAY_TEXT,
    fontSize: 16,
  },
  registerLink: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 6,
  },
  doneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
  },
  doneButton: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    height: 58,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});