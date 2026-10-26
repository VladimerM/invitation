// Весь текст и все фотографии приглашения — редактируйте этот файл.
// Файлы (фото, музыку) кладите в папку /public и указывайте путь без «/» в начале.

export const config = {
  groom: 'Sevak',
  bride: 'Diana',
  monogram: 'S·D',

  // Дата и время торжества (для обратного отсчёта и файла календаря)
  date: '2027-06-19T17:00:00',
  dateLabel: '19 июня 2027',
  timeLabel: '17:00',
  // Продолжительность события в календаре, в часах
  durationHours: 6,

  // Цвета темы (как в оригинале)
  theme: {
    bg: '#faf8f3',
    ink: '#3d3830',
    accent: '#b08d57',
    soft: '#efe8dc',
    petal: '#e9cfc5',
  },

  // Фото на первом экране. Если файла нет — будет нежный фон без фото.
  heroImage: 'photos/hero.jpg',

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

  photos: ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg'],

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
    { time: '15:30', title: 'Выезд в банкетный зал', text: 'Отправляемся в ресторан', icon: 'car', map: 'https://yandex.ru/maps/?text=Симфония+Холл' },
    { time: '17:00', title: 'Сбор гостей', text: 'Встречаем гостей в ресторане', icon: 'glasses' },
  ],

  locations: [
    {
      time: '17:00',
      title: 'Церемония и банкет',
      address: 'Симфония Холл',
      image: 'photos/venue.jpg',
      map: 'https://yandex.ru/maps/?text=Симфония+Холл',
    },
  ],

  // Анкета гостя. Ответы сохраняются в Google Таблицу —
  // инструкция по настройке в файле google-apps-script/Code.gs
  rsvp: {
    enabled: true,
    deadline: 'Пожалуйста, дайте ответ до 15 июня 2027',
    // Ссылка веб-приложения Apps Script (https://script.google.com/macros/s/.../exec)
    endpoint: 'https://script.google.com/macros/s/AKfycbxQxiEe3UwoEyKNEgOH_GZy8Rs-RmSJOSBce75QiSvtbvYbVnFmosV6LCd_8BRTi_Gj/exec',
    maxGuests: 10,
  },

  contact: {
    text: 'По всем вопросам можно обращаться к организатору свадьбы',
    name: 'Тамара',
    phone: '+7 (900) 000-00-00',
  },
}
