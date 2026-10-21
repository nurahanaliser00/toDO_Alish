

export type Word = {
  id: string;
  kazakh: string;
  translation: string; // орысша аудармасы
  example: string; // қазақша мысал сөйлем
  category: string;
};

export const words: Word[] = [
  { id: 'w1', kazakh: 'Сәлем', translation: 'Привет', example: 'Сәлем, қалың қалай?', category: 'Амандасу' },
  { id: 'w2', kazakh: 'Рақмет', translation: 'Спасибо', example: 'Көмегің үшін рақмет!', category: 'Амандасу' },
  { id: 'w3', kazakh: 'Кітап', translation: 'Книга', example: 'Мен жаңа кітап сатып алдым.', category: 'Заттар' },
  { id: 'w4', kazakh: 'Су', translation: 'Вода', example: 'Маған бір стакан су бер.', category: 'Заттар' },
  { id: 'w5', kazakh: 'Отбасы', translation: 'Семья', example: 'Менің отбасым үлкен.', category: 'Адамдар' },
  { id: 'w6', kazakh: 'Дос', translation: 'Друг', example: 'Ол менің ең жақын досым.', category: 'Адамдар' },
  { id: 'w7', kazakh: 'Мектеп', translation: 'Школа', example: 'Балалар мектепке барды.', category: 'Орындар' },
  { id: 'w8', kazakh: 'Үй', translation: 'Дом', example: 'Біздің үй қаланың орталығында.', category: 'Орындар' },
  { id: 'w9', kazakh: 'Таңертең', translation: 'Утро', example: 'Таңертең ерте тұрамын.', category: 'Уақыт' },
  { id: 'w10', kazakh: 'Кеш', translation: 'Вечер', example: 'Кеш болды, үйге қайтайық.', category: 'Уақыт' },
  { id: 'w11', kazakh: 'Жұмыс', translation: 'Работа', example: 'Менің жұмысым қызықты.', category: 'Іс-әрекет' },
  { id: 'w12', kazakh: 'Оқу', translation: 'Учёба/Читать', example: 'Мен кітап оқығанды жақсы көремін.', category: 'Іс-әрекет' },
];