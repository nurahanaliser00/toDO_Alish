import React, { useState } from 'react';

import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { colors, sizes } from './theme';
import { Word } from './Vocabdata';

type Props = {
  words: Word[];
  onBack: () => void;
  onFinish: (score: number, total: number) => void;
};

type Question = {
  word: Word;
  options: string[]; // 4 аударма нұсқасы (біреуі дұрыс)
};

// Массивтің ретін араластыратын қарапайым функция
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// Әр сөз үшін 1 дұрыс + 3 қате аударма нұсқасынан тұратын сұрақ жасаймыз
function buildQuestions(words: Word[]): Question[] {
  return shuffle(words).map((word) => {
    const wrongOptions = shuffle(
      words.filter((w) => w.id !== word.id)
    )
      .slice(0, 3)
      .map((w) => w.translation);

    const options = shuffle([word.translation, ...wrongOptions]);
    return { word, options };
  });
}

export default function Quiz({ words, onBack, onFinish }: Props) {
  const [questions] = useState<Question[]>(() => buildQuestions(words));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (selected) return; // қайта таңдауға болмайды
    setSelected(option);

    const isCorrect = option === currentQuestion.word.translation;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  // Викторина аяқталған соң нәтиже экраны
  if (finished) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>🏆</Text>
          <Text style={styles.resultTitle}>Викторина аяқталды!</Text>
          <Text style={styles.resultScore}>
            {score} / {questions.length} дұрыс жауап
          </Text>
          <Pressable
            style={styles.resultButton}
            onPress={() => onFinish(score, questions.length)}
          >
            <Text style={styles.resultButtonText}>Дайын</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>

        <Text style={styles.counter}>
          Сұрақ {currentIndex + 1} / {questions.length}
        </Text>

        <Text style={styles.question}>
          «{currentQuestion.word.kazakh}» сөзінің аудармасы қандай?
        </Text>

        {currentQuestion.options.map((option) => {
          const isCorrectOption = option === currentQuestion.word.translation;
          const isSelectedOption = option === selected;

          const isHighlighted =
            selected && (isCorrectOption || isSelectedOption);

          return (
            <Pressable
              key={option}
              style={[
                styles.optionButton,
                selected && isCorrectOption && styles.optionCorrect,
                selected && !isCorrectOption && isSelectedOption && styles.optionWrong,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  isHighlighted && styles.optionTextHighlighted,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}

        {selected && (
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < questions.length ? 'Келесі сұрақ' : 'Нәтижені көру'}
            </Text>
          </Pressable>
        )}
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
  counter: {
    fontSize: 14,
    color: colors.subtitle,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    padding: 16,
    marginBottom: 12,
  },
  optionCorrect: {
    backgroundColor: '#3DBE6C',
  },
  optionWrong: {
    backgroundColor: '#E05C5C',
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  optionTextHighlighted: {
    color: colors.white,
  },
  nextButton: {
    backgroundColor: colors.purple,
    borderRadius: sizes.borderRadius,
    height: sizes.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 18,
    color: colors.subtitle,
    marginBottom: 30,
  },
  resultButton: {
    backgroundColor: colors.purple,
    borderRadius: sizes.borderRadius,
    height: sizes.buttonHeight,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});