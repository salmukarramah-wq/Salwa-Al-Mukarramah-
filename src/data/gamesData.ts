import { ImageGuessItem, MatchingItem, TimelineEvent, StewardshipScenario } from '../types/game';

// GAME 1: TEBAK GAMBAR SEJARAH
export const GUESS_GAME_ITEMS: ImageGuessItem[] = [
  {
    id: 'guess_1',
    imageSrc: '/src/assets/images/benteng_rotterdam_1794477636498.jpg',
    fallbackIcon: 'Castle',
    titlePrompt: 'Perhatikan gambar benteng batu di tepi pantai Kota Makassar ini. Apakah nama peninggalan sejarah ini?',
    options: [
      'Benteng Somba Opu',
      'Benteng Rotterdam',
      'Benteng Fort de Kock',
      'Benteng Marlborough',
    ],
    correctIndex: 1,
    explanation: 'Hebat! Ini adalah Benteng Rotterdam (dahulu bernama Benteng Ujung Pandang), peninggalan Kerajaan Gowa yang bentuknya menyerupai seekor penyu.',
  },
  {
    id: 'guess_2',
    imageSrc: '/src/assets/images/kapal_pinisi_1794477636294.jpg',
    fallbackIcon: 'Ship',
    titlePrompt: 'Perahu layar kayu tradisional legendaris asal Bulukumba dengan dua tiang dan tujuh helai layar ini bernama...',
    options: [
      'Perahu Sandeq',
      'Kapal Jung Jawa',
      'Kapal Layar Pinisi',
      'Perahu Cadik Maluku',
    ],
    correctIndex: 2,
    explanation: 'Tepat sekali! Kapal Pinisi adalah karya agung para Panrita Lopi di Bulukumba, Sulawesi Selatan, yang telah diakui UNESCO sebagai warisan dunia.',
  },
  {
    id: 'guess_3',
    imageSrc: '/src/assets/images/tongkonan_toraja_1794477636925.jpg',
    fallbackIcon: 'Home',
    titlePrompt: 'Rumah adat suku Toraja yang memiliki atap melengkung menjulang mirip tanduk kerbau atau perahu leluhur ini disebut...',
    options: [
      'Rumah Gadang',
      'Rumah Tongkonan',
      'Rumah Sasadu',
      'Rumah Honai',
    ],
    correctIndex: 1,
    explanation: 'Benar sekali! Rumah Tongkonan adalah rumah adat masyarakat Toraja yang dihiasi ukiran Pa\'ssura penuh makna gotong royong dan keselarasan alam.',
  },
  {
    id: 'guess_4',
    imageSrc: '/src/assets/images/sultan_hasanuddin_1794477637170.jpg',
    fallbackIcon: 'User',
    titlePrompt: 'Siapakah pahlawan nasional dari Kerajaan Gowa pada gambar yang dijuluki "Ayam Jantan dari Timur"?',
    options: [
      'Arung Palakka',
      'Tuanku Imam Bonjol',
      'Pangeran Diponegoro',
      'Sultan Hasanuddin',
    ],
    correctIndex: 3,
    explanation: 'Luar biasa! Beliau adalah Sultan Hasanuddin, Raja Gowa ke-16 yang sangat gigih dan pantang menyerah melawan monopoli perdagangan VOC Belanda.',
  },
  {
    id: 'guess_5',
    imageSrc: '/src/assets/images/hero_sulsel_adventure_1794477634828.jpg',
    fallbackIcon: 'Sparkles',
    titlePrompt: 'Pakaian adat tertua perempuan Bugis-Makassar yang longgar berbentuk segi empat dari kain tenun sutra berwarna cerah disebut...',
    options: [
      'Kebaya Kartini',
      'Baju Bodo',
      'Baju Kurung',
      'Ulos Batak',
    ],
    correctIndex: 1,
    explanation: 'Jawabanmu tepat! Baju Bodo merupakan pakaian adat tradisional wanita suku Bugis dan Makassar yang memiliki keindahan warna cerah menawan.',
  },
];

// GAME 2: PASANGKAN WARISAN BUDAYA
export const MATCHING_PAIRS: MatchingItem[] = [
  {
    id: 'm1',
    leftText: 'Benteng Rotterdam',
    leftSub: 'Peninggalan Arsitektur Sejarah',
    rightText: 'Kota Makassar',
    rightSub: 'Daerah Asal',
    category: 'Lokasi Sejarah',
  },
  {
    id: 'm2',
    leftText: 'Sultan Hasanuddin',
    leftSub: 'Raja Gowa ke-16',
    rightText: 'Ayam Jantan dari Timur',
    rightSub: 'Julukan Keberanian',
    category: 'Tokoh & Julukan',
  },
  {
    id: 'm3',
    leftText: 'Kapal Pinisi',
    leftSub: 'Mahakarya Layar Kayu',
    rightText: 'Bulukumba (Tanah Beru)',
    rightSub: 'Pusat Pembuatan',
    category: 'Asal Daerah',
  },
  {
    id: 'm4',
    leftText: 'Rumah Tongkonan',
    leftSub: 'Atap Melengkung Tanduk Kerbau',
    rightText: 'Tana Toraja',
    rightSub: 'Masyarakat Adat',
    category: 'Arsitektur Suku',
  },
  {
    id: 'm5',
    leftText: 'Tari Pakarena',
    leftSub: 'Tarian Kipas Gemulai Lembut',
    rightText: 'Kerajaan Gowa',
    rightSub: 'Asal Kesenian Tradisional',
    category: 'Kesenian Tradisional',
  },
  {
    id: 'm6',
    leftText: 'Kain Tenun Sutra',
    leftSub: 'Kerajinan Tenun Tradisional',
    rightText: 'Sengkang, Wajo',
    rightSub: 'Sentra Sutra Alam',
    category: 'Kekayaan Kriya',
  },
];

// GAME 3: PETUALANGAN LINI MASA (TIMELINE CHRONOLOGY)
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    yearOrEra: 'Tahun 1545',
    title: 'Pembangunan Awal Benteng Ujung Pandang',
    description: 'Raja Gowa ke-9 (I Manriwagau Daeng Bonto Karaeng Lakiung) mendirikan benteng tanah liat pertama yang kelak menjadi Benteng Rotterdam.',
    correctOrder: 1,
  },
  {
    id: 't2',
    yearOrEra: 'Tahun 1605',
    title: 'Kerajaan Gowa-Tallo Memeluk Agama Islam',
    description: 'Raja Gowa Sultan Alauddin dan Perdana Menteri Karaeng Matoaya resmi memeluk Islam, menjadikan Gowa pusat penyebaran Islam di Indonesia Timur.',
    correctOrder: 2,
  },
  {
    id: 't3',
    yearOrEra: 'Tahun 1667',
    title: 'Perjuangan Sultan Hasanuddin & Perjanjian Bungaya',
    description: 'Sultan Hasanuddin memimpin perang gigih melawan armada Cornelis Speelman dan VOC demi mempertahankan kedaulatan laut Makassar.',
    correctOrder: 3,
  },
  {
    id: 't4',
    yearOrEra: 'Tahun 2017',
    title: 'Kapal Pinisi Diakui Dunia oleh UNESCO',
    description: 'Seni pembuatan perahu Pinisi asal Bulukumba resmi ditetapkan sebagai Warisan Budaya Takbenda Dunia oleh UNESCO.',
    correctOrder: 4,
  },
  {
    id: 't5',
    yearOrEra: 'Masa Kini (Generasi Kita)',
    title: 'Siswa Kelas V Menjaga Warisan Budaya Nusantara',
    description: 'Kita sebagai generasi penerus bangsa aktif belajar sejarah, merawat situs cagar budaya, dan bangga melestarikan kearifan lokal.',
    correctOrder: 5,
  },
];

// GAME 4: MISI PENJAGA BUDAYA (CASE SCENARIOS)
export const STEWARDSHIP_SCENARIOS: StewardshipScenario[] = [
  {
    id: 's1',
    situation:
      'Saat karyawisata ke Benteng Rotterdam, Doni melihat seorang teman mencoret dinding batu benteng menggunakan spidol untuk menuliskan namanya. Tindakan apakah yang sebaiknya Doni lakukan?',
    options: [
      {
        text: 'Membiarkannya karena tidak ingin bertengkar dengan teman.',
        isCorrect: false,
        feedback: 'Kurang tepat. Membiarkan aksi coret-coret akan membuat situs bersejarah rusak dan kotor.',
      },
      {
        text: 'Menegur dengan sopan dan mengingatkan bahwa mencoret cagar budaya adalah tindakan merusak peninggalan sejarah.',
        isCorrect: true,
        feedback: 'Sangat bijak! Cagar budaya adalah peninggalan berharga yang harus kita rawat bersama agar generasi mendatang tetap bisa melihatnya.',
      },
      {
        text: 'Ikut menulis namanya di sebelah tulisan temannya agar terlihat kompak.',
        isCorrect: false,
        feedback: 'Salah! Ikut mencoret berarti kamu ikut melakukan vandalisme yang merusak keaslian benteng.',
      },
      {
        text: 'Memfoto tulisan tersebut lalu menertawakannya bersama teman lain.',
        isCorrect: false,
        feedback: 'Kurang tepat. Tindakan merusak bukan bahan lelucon, harus segera dicegah.',
      },
    ],
    educationalMoral:
      'Situs bersejarah seperti benteng dan museum adalah warisan bangsa yang tak ternilai. Menjaga kebersihan dan tidak melakukan vandalisme adalah tanggung jawab setiap penjelajah cilik.',
  },
  {
    id: 's2',
    situation:
      'Di sekolah, ada seorang teman baru dari Tana Toraja yang menceritakan tentang rumah adat Tongkonan. Teman lain ada yang menertawakan bentuk atapnya yang aneh. Bagaimana sikapmu?',
    options: [
      {
        text: 'Menghargai penjelasan teman Toraja dan mengajak yang lain mendengarkan keunikan maknanya dengan rasa kagum.',
        isCorrect: true,
        feedback: 'Luar biasa! Setiap rumah adat memiliki nilai filosofis dan keindahan tersendiri yang wajib kita hargai dengan bangga.',
      },
      {
        text: 'Ikut tertawa bersama teman-teman agar tidak dimusuhi geng kelas.',
        isCorrect: false,
        feedback: 'Salah. Mengejek tradisi suku lain bertentangan dengan semboyan Bhinneka Tunggal Ika.',
      },
      {
        text: 'Menyuruh teman Toraja berhenti bicara agar kelas tidak ribut.',
        isCorrect: false,
        feedback: 'Kurang tepat. Teman kita berhak bangga menceritakan kebudayaan asalnya.',
      },
      {
        text: 'Mengabaikan saja karena itu bukan urusan kita.',
        isCorrect: false,
        feedback: 'Kurang tepat. Sikap acuh tak acuh membuat persahabatan antar-budaya menjadi renggang.',
      },
    ],
    educationalMoral:
      'Keberagaman rumah adat dan adat istiadat di Indonesia adalah kekayaan bangsa yang patut dibanggakan, bukan untuk diejek atau diperdebatkan.',
  },
  {
    id: 's3',
    situation:
      'Sekolahmu mengadakan Hari Peringatan Pahlawan Nasional. Guru meminta siswa menampilkan seni daerah. Apa yang sebaiknya kelasmu lakukan?',
    options: [
      {
        text: 'Menolak tampil dan meminta guru membatalkan acara karena malas berlatih.',
        isCorrect: false,
        feedback: 'Keliru. Peringatan hari pahlawan adalah momen tepat mengekspresikan cinta tanah air.',
      },
      {
        text: 'Antusias berlatih membawakan tarian daerah seperti Tari Pakarena atau menyanyikan lagu Anging Mammiri dengan bangga.',
        isCorrect: true,
        feedback: 'Pilihan jempolan! Mempelajari seni tari dan lagu daerah secara aktif adalah bukti nyata aksi melestarikan budaya bangsa.',
      },
      {
        text: 'Menampilkan budaya luar negeri yang sedang tren di media sosial saja.',
        isCorrect: false,
        feedback: 'Kurang tepat untuk tema pahlawan lokal. Kita harus mengutamakan kekayaan seni nusantara.',
      },
      {
        text: 'Hanya menonton saja dan tidak mau terlibat dalam persiapan kelas.',
        isCorrect: false,
        feedback: 'Kurang tepat. Semangat gotong royong dan kerja sama sangat penting dalam melestarikan budaya.',
      },
    ],
    educationalMoral:
      'Generasi muda yang hebat adalah generasi yang bangga menampilkan seni tradisional di panggung sekolah maupun kehidupan sehari-hari.',
  },
  {
    id: 's4',
    situation:
      'Kamu membaca berita di internet bahwa kapal layar Pinisi dibuat tanpa paku besi dan tanpa cetak biru modern, hanya menggunakan pasak kayu ulin. Apa tanggapanmu?',
    options: [
      {
        text: 'Tidak percaya dan menganggap kapal modern dari besi jauh lebih unggul dalam segala hal.',
        isCorrect: false,
        feedback: 'Kurang tepat. Nenek moyang kita memiliki keahlian maritim luar biasa yang diakui dunia internasional.',
      },
      {
        text: 'Merasa bangga atas kecerdasan para Panrita Lopi Bugis-Makassar dan bersemangat menceritakannya kepada teman dan keluarga.',
        isCorrect: true,
        feedback: 'Hebat! Pengakuan UNESCO membuktikan bahwa kearifan lokal bangsa Indonesia bernilai sangat tinggi di mata dunia.',
      },
      {
        text: 'Biasa saja karena kapal layar sudah kuno dan tidak perlu dipelajari lagi.',
        isCorrect: false,
        feedback: 'Salah. Memahami sejarah maritim menumbuhkan semangat kebaharian kita sebagai negara kepulauan.',
      },
      {
        text: 'Menyimpan rasa kagum sendiri tanpa mau membagikan ilmu tersebut kepada orang lain.',
        isCorrect: false,
        feedback: 'Kurang tepat. Ilmu dan kebanggaan budaya sebaiknya disebarkan agar semakin banyak anak Indonesia yang mencintainya.',
      },
    ],
    educationalMoral:
      'Mengagumi karya leluhur dan membagikan pengetahuannya ke orang lain adalah wujud nyata kepedulian terhadap sejarah maritim Nusantara.',
  },
];
