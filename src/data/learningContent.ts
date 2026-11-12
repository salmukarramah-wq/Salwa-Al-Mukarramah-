export interface MissionInfo {
  id: number;
  title: string;
  themeTitle: string;
  badgeName: string;
  badgeIcon: string;
  badgeDesc: string;
  heroImage: string;
  accentColor: string;
  overview: string;
  sections: {
    heading: string;
    body: string[];
    highlightBox?: string;
    details?: { title: string; desc: string; icon?: string }[];
  }[];
}

export const CURRICULUM_DATA = {
  fase: 'Fase C (Kelas V Sekolah Dasar)',
  mataPelajaran: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  bab: 'Bab 5: Daerahku yang Bersejarah',
  capaianPembelajaran:
    'Peserta didik mampu mengenali sejarah dan perkembangan daerah tempat tinggalnya, mengidentifikasi warisan budaya serta kekayaan daerah, memahami manfaat mempelajari sejarah bagi kehidupan masa kini, dan menunjukkan kepedulian terhadap upaya pelestarian warisan budaya Indonesia.',
  tujuanPembelajaran: [
    {
      id: 1,
      title: 'Menceritakan Sejarah Daerah',
      desc: 'Peserta didik dapat menjelaskan cerita sejarah dan perkembangan daerah Sulawesi Selatan dengan bahasa sendiri.',
    },
    {
      id: 2,
      title: 'Mengidentifikasi Warisan Budaya',
      desc: 'Peserta didik mampu mengidentifikasi berbagai peninggalan sejarah dan warisan budaya benda maupun takbenda Sulawesi Selatan.',
    },
    {
      id: 3,
      title: 'Memahami Manfaat Belajar Sejarah',
      desc: 'Peserta didik dapat menjelaskan manfaat mempelajari sejarah bagi kehidupan masa kini dan masa depan.',
    },
    {
      id: 4,
      title: 'Aksi Nyata Pelestarian Budaya',
      desc: 'Peserta didik mampu mengidentifikasi dan mempraktikkan contoh tindakan menjaga serta melestarikan warisan budaya Indonesia.',
    },
    {
      id: 5,
      title: 'Sikap Bangga dan Menghargai',
      desc: 'Peserta didik menunjukkan sikap bangga, peduli, dan menghargai sejarah serta keberagaman budaya daerah.',
    },
  ],
};

export const MISSIONS: MissionInfo[] = [
  {
    id: 1,
    title: 'MISI 1: JEJAK MASA LALU',
    themeTitle: 'Cerita Masa Lalu Daerahku',
    badgeName: 'Prasasti Keberanian Gowa-Bone',
    badgeIcon: 'ShieldCheck',
    badgeDesc: 'Berhasil menguasai sejarah kerajaan, tokoh pahlawan, dan benteng bersejarah Sulawesi Selatan!',
    heroImage: '/src/assets/images/benteng_rotterdam_1794477636498.jpg',
    accentColor: '#0284c7', // Sky blue
    overview:
      'Selamat datang di Misi 1! Mari kita putar kembali roda waktu untuk menjelajahi jejak masa lalu Sulawesi Selatan, kerajaan maritim yang tangguh, serta pahlawan pemberani yang disegani kawan dan lawan.',
    sections: [
      {
        heading: '1. Mengenal Sejarah dan Peninggalan Masa Lalu',
        body: [
          'Sejarah adalah peristiwa nyata di masa lampau yang benar-benar terjadi serta meninggalkan bukti yang dapat dipelajari hingga kini.',
          'Peninggalan sejarah merupakan benda, bangunan, naskah tulisan kuno, atau kisah yang diwariskan dari zaman dulu. Peninggalan ini menjadi bukti hidup bagaimana nenek moyang kita berjuang, berdagang, dan membangun peradaban.',
        ],
        highlightBox:
          '💡 Tahukah Kamu? Belajar sejarah daerah bukan sekadar menghafal tanggal! Dengan belajar sejarah, kita memahami asal-usul tempat tinggal kita, meneladani sifat pantang menyerah para pejuang, dan memupuk rasa bangga sebagai anak bangsa.',
      },
      {
        heading: '2. Kerajaan Masyhur: Gowa-Tallo dan Bone',
        body: [
          'Sulawesi Selatan sejak berabad-abad lalu dikenal sebagai pusat pelayaran dan perdagangan rempah di kawasan Indonesia Timur.',
          'Kerajaan Gowa-Tallo adalah kerajaan maritim Islam terbesar dengan pelabuhan internasional Somba Opu yang ramai dikunjungi pedagang Portugis, Inggris, Denmark, Tiongkok, dan Arab.',
          'Kerajaan Bone merupakan kerajaan Bugis terkemuka yang terkenal dengan kearifan adat, keberanian prajurit, dan kepemimpinan Raja Arung Palakka yang memperjuangkan kemerdekaan rakyatnya.',
        ],
      },
      {
        heading: '3. Sultan Hasanuddin: Ayam Jantan dari Timur',
        body: [
          'Sultan Hasanuddin (1631–1670) adalah Raja Gowa ke-16 sekaligus Pahlawan Nasional Indonesia.',
          'Beliau dijuluki "Ayam Jantan dari Timur" (Haantjes van het Oosten) oleh Belanda karena keberaniannya yang luar biasa dalam menentang monopoli perdagangan VOC di perairan Nusantara.',
          'Meskipun menghadapi persenjataan canggih Belanda, Sultan Hasanuddin bersama rakyat Makassar pantang menyerah membela kedaulatan tanah air.',
        ],
        highlightBox:
          '🦅 Nilai Keteladanan: Sultan Hasanuddin selalu mendahulukan kepentingan rakyat dan kebebasan perairan maritim di atas kepentingan pribadi.',
      },
      {
        heading: '4. Benteng Bersejarah: Rotterdam & Somba Opu',
        body: [
          'Benteng Rotterdam (Makassar): Awalnya bernama Benteng Ujung Pandang, dibangun oleh Raja Gowa IX pada tahun 1545 dengan bentuk menyerupai penyu yang merayap ke laut. Setelah Perjanjian Bungaya tahun 1667, benteng ini diperbarui Belanda dan kini menjadi cagar budaya serta Museum La Galigo.',
          'Benteng Somba Opu (Gowa): Pusat pertahanan dan istana utama Kerajaan Gowa yang dahulu memiliki dinding bata merah tebal dan meriam raksasa "Anak Makassar". Benteng ini menjadi saksi pertempuran dahsyat mempertahankan Nusantara.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'MISI 2: HARTA KARUN BUDAYA',
    themeTitle: 'Warisan Budaya & Kekayaan Daerahku',
    badgeName: 'Kemaritiman Pinisi Samudra',
    badgeIcon: 'Compass',
    badgeDesc: 'Berhasil mengidentifikasi keanekaragaman budaya benda dan takbenda khas Sulawesi Selatan!',
    heroImage: '/src/assets/images/kapal_pinisi_1794477636294.jpg',
    accentColor: '#d97706', // Amber gold
    overview:
      'Di Misi 2, kita akan membuka peti harta karun budaya Sulawesi Selatan yang sangat kaya—mulai dari arsitektur rumah adat, kapal legendaris penakluk samudra, busana adat sutra yang anggun, hingga filosofi luhur masyarakat.',
    sections: [
      {
        heading: '1. Warisan Budaya Benda dan Takbenda',
        body: [
          'Warisan budaya terbagi menjadi dua kategori utama:',
          '• Budaya Benda (Tangible): Warisan fisik yang dapat dilihat dan diraba, seperti Rumah Tongkonan, Kapal Pinisi, Benteng Rotterdam, pakaian Baju Bodo, dan senjata pusaka Badik.',
          '• Budaya Takbenda (Intangible): Nilai, tradisi lisan, tarian, seni musik, adat istiadat, dan filosofi hidup seperti Tari Pakarena, upacara Rambu Solo\', serta prinsip Siri\' na Pacce.',
        ],
      },
      {
        heading: '2. Mahakarya Dunia: Kapal Pinisi & Rumah Tongkonan',
        body: [
          'Kapal Pinisi (Bulukumba): Kapal layar kayu kebanggaan suku Bugis dan Makassar yang dibuat oleh para Panrita Lopi di Tana Beru. Dibuat tanpa gambar cetak biru teknis dan menggunakan pasak kayu ulin, Pinisi telah diakui UNESCO sebagai Warisan Budaya Takbenda Dunia sejak 2017.',
          'Rumah Adat Tongkonan (Toraja): Rumah panggung tradisional masyarakat Toraja dengan atap melengkung menyerupai perahu atau tanduk kerbau. Dindingnya dihiasi ukiran Pa\'ssura penuh makna filosofis kehidupan dan deretan tanduk kerbau (kabongo) sebagai lambang kehormatan keluarga.',
        ],
      },
      {
        heading: '3. Keanggunan Seni: Baju Bodo & Tari Pakarena',
        body: [
          'Baju Bodo: Salah satu pakaian adat tertua di dunia yang dikenakan wanita suku Bugis-Makassar. Berbentuk segi empat dengan lengan pendek, warna Baju Bodo secara tradisional menandakan tingkat usia pemakainya.',
          'Tari Kipas Pakarena: Tarian tradisional khas Gowa yang dibawakan secara gemulai oleh penari wanita memegang kipas, diiringi tabuhan gendang yang rancak. Tarian ini melambangkan kelembutan, kesabaran, serta rasa syukur atas nikmat Tuhan.',
        ],
      },
      {
        heading: '4. Empat Suku Utama & Kekayaan Hasil Alam',
        body: [
          'Sulawesi Selatan dihuni oleh empat suku bangsa utama yang hidup berdampingan secara harmonis: Bugis, Makassar, Toraja, dan Mandar (serta Massenrempulu).',
          'Kekayaan Alam Melimpah: Sutra tenun sengkang dari Wajo, Kopi Arabika Toraja yang mendunia, lumbung beras Sidrap & Pinrang, perkebunan markisa Malino, serta hasil laut pesisir yang kaya.',
        ],
        highlightBox:
          '⭐ Filosofi Siri\' na Pacce: Semboyan luhur masyarakat Bugis-Makassar. "Siri\'" bermakna menjaga kehormatan dan integritas diri, sedangkan "Pacce" bermakna rasa empati dan solidaritas merasakan penderitaan sesama.',
      },
    ],
  },
  {
    id: 3,
    title: 'MISI 3: BELAJAR DARI SEJARAH',
    themeTitle: 'Sejarah akan Membuat Kita Maju',
    badgeName: 'Tongkonan Gotong Royong Leluhur',
    badgeIcon: 'Award',
    badgeDesc: 'Berhasil menghubungkan masa lalu, masa kini, dan masa depan melalui nilai keteladanan luhur!',
    heroImage: '/src/assets/images/tongkonan_toraja_1794477636925.jpg',
    accentColor: '#059669', // Emerald green
    overview:
      'Mengapa kita harus belajar sejarah jika peristiwanya sudah lewat? Misi 3 membuktikan bahwa sejarah bukanlah fosil yang mati, melainkan kompas masa depan yang membimbing bangsa Indonesia agar semakin maju dan bermartabat.',
    sections: [
      {
        heading: '1. Manfaat Mempelajari Sejarah bagi Kehidupan',
        body: [
          'Pahlawan Proklamator Bung Karno pernah berpesan: "JASMERAH — Jangan Sekali-kali Melupakan Sejarah".',
          'Manfaat belajar sejarah bagi kita siswa kelas V SD:',
          '1. Mengetahui asal-usul budaya dan tradisi lingkungan sekitar.',
          '2. Mengambil hikmah: mengulang keberhasilan dan menghindari kesalahan masa lalu.',
          '3. Meneladani nilai-nilai karakter luhur para pejuang terdahulu.',
          '4. Menjadi inspirasi untuk berkarya dan berprestasi di masa kini.',
        ],
      },
      {
        heading: '2. Hubungan Masa Lalu, Masa Kini, dan Masa Depan',
        body: [
          '• MASA LALU (Fondasi): Tempat nenek moyang berjuang, membangun tradisi, dan menciptakan karya hebat seperti Kapal Pinisi dan Benteng Rotterdam.',
          '• MASA KINI (Tanggung Jawab Kita): Waktu di mana kita sebagai generasi penerus belajar giat, menjaga kerukunan, dan merawat warisan yang ada.',
          '• MASA DEPAN (Cita-Cita Bangsa): Terwujudnya Indonesia yang maju, adil, makmur, dan berkarakter kuat tanpa melupakan jati diri budayanya.',
        ],
      },
      {
        heading: '3. Empat Nilai Luhur yang Harus Diteladani',
        body: [
          '• Nilai Keberanian: Seperti Sultan Hasanuddin yang berani menyuarakan keadilan dan kebenaran walau menghadapi bahaya besar.',
          '• Nilai Gotong Royong & Kerja Sama: Seperti para pembuat kapal Pinisi (Panrita Lopi) yang bekerja sama saling bahu membahu mendirikan tiang layar raksasa.',
          '• Nilai Tanggung Jawab: Menjaga amanah tugas, merawat barang milik bersama, dan menghormati aturan masyarakat.',
          '• Nilai Persatuan: Mengesampingkan permusuhan demi kepentingan bersama seluruh bangsa Indonesia.',
        ],
        highlightBox:
          '💡 Inspirasi Siswa: Kamu tidak perlu berperang mengangkat senjata di medan tempur. Menjadi juara kelas, disiplin mengerjakan PR, dan menolong teman yang kesulitan adalah bentuk perjuangan masa kini!',
      },
    ],
  },
  {
    id: 4,
    title: 'MISI 4: PENJAGA WARISAN',
    themeTitle: 'Menjaga Warisan Budaya Indonesia',
    badgeName: 'Penjaga Warisan Budaya Bangsa',
    badgeIcon: 'Medal',
    badgeDesc: 'Tuntas menyelesaikan seluruh misi dan siap menjadi Pelindung Warisan Budaya Nusantara!',
    heroImage: '/src/assets/images/sultan_hasanuddin_1794477637170.jpg',
    accentColor: '#ea580c', // Bright orange
    overview:
      'Warisan budaya yang indah ini tidak akan bertahan selamanya jika kita tidak menjaganya. Di Misi 4, kamu resmi dilantik sebagai Penjaga Warisan Budaya (Cultural Heritage Guardian) yang siap membela kelestarian budaya Indonesia!',
    sections: [
      {
        heading: '1. Mengapa Warisan Budaya Harus Dilestarikan?',
        body: [
          'Warisan budaya adalah identitas dan jati diri bangsa kita. Tanpa budaya daerah, bangsa kita akan kehilangan akar kebanggaan.',
          'Warisan sejarah juga menjadi sumber ilmu pengetahuan, inspirasi seni, serta daya tarik wisata yang menghidupkan perekonomian masyarakat lokal.',
        ],
      },
      {
        heading: '2. Ancaman Nyata terhadap Kelestarian Budaya',
        body: [
          '• Vandalisme: Tindakan tidak terpuji mencoret-coret dinding candi, benteng, atau situs bersejarah.',
          '• Pengabaian Generasi Muda: Lebih menyukai budaya asing secara berlebihan hingga melupakan tarian dan bahasa daerah sendiri.',
          '• Klaim Sepihak Negara Lain: Budaya yang tidak dirawat dan tidak dicatat berisiko diakui oleh pihak lain.',
          '• Kerusakan Lingkungan & Alam: Bangunan cagar budaya yang lapuk karena tidak dirawat atau terkena bencana tanpa perlindungan.',
        ],
      },
      {
        heading: '3. Lima Aksi Nyata Siswa Kelas V SD untuk Melestarikan Budaya',
        body: [
          '1. Belajar dan Menghargai: Antusias mempelajari tarian daerah, lagu daerah seperti "Anging Mammiri", atau dongeng rakyat di sekolah.',
          '2. Mengenal Langsung: Mengunjungi museum lokal (seperti Museum La Galigo) atau situs bersejarah bersama keluarga.',
          '3. Sopan dan Tertib di Cagar Budaya: Tidak membuang sampah sembarangan dan tidak merusak fasilitas saat mengunjungi tempat bersejarah.',
          '4. Bangga Menggunakan Produk Budaya: Senang mengenakan batik, kain tenun sutra Toraja/Bugis, dan mencicipi kuliner nusantara.',
          '5. Memperkenalkan Budaya: Menceritakan keunikan tradisi daerah kepada teman-teman atau media digital secara kreatif dan positif.',
        ],
        highlightBox:
          '🌟 Janji Penjaga Budaya: "Aku bangga akan sejarah bangsaku. Aku berjanji merawat, mencintai, dan menghormati seluruh warisan budaya Indonesia!"',
      },
    ],
  },
];

export const CULTURAL_GALLERY = [
  {
    id: 'benteng_rotterdam',
    title: 'Benteng Rotterdam',
    origin: 'Kota Makassar',
    category: 'Budaya Benda (Arsitektur)',
    image: '/src/assets/images/benteng_rotterdam_1794477636498.jpg',
    description:
      'Benteng peninggalan Kerajaan Gowa abad ke-16 yang awalnya bernama Benteng Ujung Pandang. Berbentuk seperti penyu yang merayap ke laut, melambangkan kejayaan maritim Gowa di darat dan samudra. Di dalamnya kini terdapat Museum La Galigo.',
    facts: 'Arsitektur unik dengan dinding batu andesit kokoh, menghadap langsung ke Selat Makassar.',
  },
  {
    id: 'kapal_pinisi',
    title: 'Kapal Layar Pinisi',
    origin: 'Bulukumba',
    category: 'Budaya Benda & Tradisi Maritim',
    image: '/src/assets/images/kapal_pinisi_1794477636294.jpg',
    description:
      'Kapal layar kayu legendaris buatan para Panrita Lopi di Ara dan Tana Beru Bulukumba. Memiliki dua tiang utama dan tujuh helai layar yang melambangkan kemampuan mengarungi tujuh samudra besar dunia. Diakui UNESCO sebagai Warisan Budaya Dunia.',
    facts: 'Dirakit secara tradisional tanpa cetak biru kertas dan disambung menggunakan pasak kayu ulin alami!',
  },
  {
    id: 'tongkonan_toraja',
    title: 'Rumah Adat Tongkonan',
    origin: 'Tana Toraja & Toraja Utara',
    category: 'Budaya Benda (Arsitektur Adat)',
    image: '/src/assets/images/tongkonan_toraja_1794477636925.jpg',
    description:
      'Rumah adat kebanggaan masyarakat Toraja dengan atap menjulang melengkung menyerupai perahu para leluhur. Dinding kayunya dihiasi ukiran Pa\'ssura berwarna merah, kuning, hitam, dan putih, disertai deretan tanduk kerbau di tiang utamanya.',
    facts: 'Setiap ukiran memiliki makna tersendiri, seperti Pa\'tedong (ukiran kerbau) yang melambangkan kemakmuran.',
  },
  {
    id: 'sultan_hasanuddin',
    title: 'Sultan Hasanuddin',
    origin: 'Kerajaan Gowa',
    category: 'Tokoh Pahlawan Nasional',
    image: '/src/assets/images/sultan_hasanuddin_1794477637170.jpg',
    description:
      'Raja Gowa ke-16 yang berani menentang monopoli perdagangan rempah VOC Belanda di Indonesia Timur. Memiliki julukan "Ayam Jantan dari Timur" karena kegigihannya memimpin armada laut dan prajurit Makassar.',
    facts: 'Nama aslinya I Mallombasi Muhammad Bakir Daeng Mattawang Karaeng Bonto Mangepe.',
  },
  {
    id: 'baju_bodo',
    title: 'Baju Bodo',
    origin: 'Bugis - Makassar',
    category: 'Budaya Benda (Pakaian Adat)',
    image: '/src/assets/images/hero_sulsel_adventure_1794477634828.jpg',
    description:
      'Pakaian adat tradisional perempuan suku Bugis dan Makassar. Salah satu busana tertua di Nusantara yang berbentuk segi empat tanpa lengan bersambung, terbuat dari kain kasa tipis atau tenun sutra warna-warni cerah.',
    facts: 'Dahulu setiap warna memiliki arti usia pemakainya: jingga untuk anak-anak, merah untuk gadis remaja!',
  },
];
