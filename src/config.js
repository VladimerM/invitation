// Весь текст и все фотографии приглашения — редактируйте этот файл.
// Файлы (фото, музыку) кладите в папку /public и указывайте путь без «/» в начале.

export const config = {
  groom: 'Севак',
  bride: 'Диана',
  monogram: 'S·D',

  // Дата и время торжества (для обратного отсчёта и файла календаря)
  date: '2026-12-22T17:00:00',
  dateLabel: '22 декабря 2026',
  timeLabel: '17:00',
  // Продолжительность события в календаре, в часах
  durationHours: 6,

  // Какие разделы показывать: true — показать, false — скрыть
  sections: {
    intro: true,       // видео-конверт с печатью при открытии сайта
    hero: true,        // первый экран с видео-рамкой и именами
    invitation: true,  // «Дорогие родные и близкие!»
    countdown: true,   // обратный отсчёт + «Добавить в календарь»
    gallery: true,     // фотографии
    timeline: true,    // план дня
    locations: true,   // как добраться
    rsvp: true,        // анкета гостя
    contact: true,     // контакты организатора
    footer: true,      // «С любовью, …» внизу
    petals: false,     // падающие лепестки (в видео уже есть бабочки)
  },

  // Цвета темы: слоновая кость, шалфей и состаренное золото — в тон видео.
  // bg совпадает с бумагой в видео, чтобы края видео не были заметны.
  theme: {
    bg: '#efeee6',
    ink: '#45463c',
    accent: '#a68f62',
    sage: '#7f8a6c',
    soft: '#e6e2d6',
    petal: '#e8dfca',
  },

  // Видео-конверт: стоит на первом кадре, пока гость не нажмёт на печать
  introVideo: 'video/opening.mp4',
  introPoster: 'video/opening.jpg',
  introHint: 'Нажмите на печать',

  // Фон первого экрана: рамка из роз и лебеди
  heroVideo: 'video/hero.mp4',
  heroPoster: 'video/hero.jpg',
  heroKicker: 'Мы женимся',

  // Фоновая музыка (включается при открытии конверта). '' — без музыки.
  music: 'music.mp3',

  invitation: {
    kicker: 'С любовью',
    title: 'Дорогие родные и близкие!',
    text: [
      'Приглашаем вас разделить с нами радость самого важного дня — дня нашей свадьбы.',
      'Ваше присутствие сделает его по-настоящему незабываемым.',
    ],
  },

 photos: ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg','photos/8.jpg'],

  // icon: camera | home | heart | car | church | glasses
  schedule: [
    { time: '08:30', title: 'Сбор гостей', text: 'Операторы у жениха', icon: 'camera' },
    { time: '09:00', title: 'Сбор гостей', text: 'Операторы у невесты', icon: 'camera' },
    { time: '09:30', title: 'Приезд стороны невесты', text: 'Встреча родных и близких невесты', icon: 'home' },
    { time: '10:00', title: 'Приезд крёстного', text: 'Приезд крёстного жениха', icon: 'heart' },
    { time: '10:30', title: 'Банкет', text: 'Выезд жениха за невестой', icon: 'car' },
    { time: '11:30', title: 'У невесты', text: 'Жених и гости прибывают к невесте', icon: 'home' },
    { time: '12:30', title: 'Выезд от невесты', text: 'Отправляемся на церемонию', icon: 'car' },
    { time: '13:30', title: 'Фотосессия в церкви', text: 'Фотосессия молодожёнов и гостей', icon: 'camera' },
    { time: '15:00', title: 'Венчание', text: 'Церемония венчания', icon: 'church' },
    { time: '15:30', title: 'Выезд в банкетный зал', text: 'Отправляемся в ресторан', icon: 'car', map: 'https://share.google/yDzfpSD9ZAqNNyweb' },
    { time: '17:00', title: 'Сбор гостей', text: 'Встречаем гостей в ресторане', icon: 'glasses' },
  ],

  locations: [
    {
      time: '17:00',
      title: 'Церемония и банкет',
      address: 'Royal Events ',
      image: 'photos/venue.jpg',
      map: 'https://share.google/yDzfpSD9ZAqNNyweb',
    },
  ],

  // Анкета гостя. Ответы сохраняются в Google Таблицу —
  // инструкция по настройке в файле google-apps-script/Code.gs
  rsvp: {
    enabled: true,
    deadline: 'Пожалуйста, дайте ответ до 5 декабря 2026',
    // Ссылка веб-приложения Apps Script (https://script.google.com/macros/s/.../exec)
    endpoint: 'https://script.google.com/macros/s/AKfycbxQxiEe3UwoEyKNEgOH_GZy8Rs-RmSJOSBce75QiSvtbvYbVnFmosV6LCd_8BRTi_Gj/exec',
    maxGuests: 10,
  },

  contact: {
    text: 'По всем вопросам обращайтесь к нам.',
    name: 'Sevak и Diana',
    phone: '+995 577 757 090',
  },

}
