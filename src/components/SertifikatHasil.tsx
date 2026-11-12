import React from 'react';
import { PlayerProfile, Badge, AppScreen } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  Award,
  Printer,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Compass,
  Sparkles,
  BookOpen,
  Heart,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface SertifikatHasilProps {
  player: PlayerProfile;
  onResetAll: () => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenReflection: () => void;
}

export const SertifikatHasil: React.FC<SertifikatHasilProps> = ({
  player,
  onResetAll,
  onNavigate,
  onOpenReflection,
}) => {
  const getRankData = (score: number) => {
    if (score >= 161) {
      return {
        title: 'Penjaga Warisan Budaya 👑',
        badgeTitle: 'PENJAGA WARISAN BUDAYA TINGKAT UTAMA',
        message: 'Luar biasa! Kamu telah menguasai seluruh sejarah, budaya, dan menunjukkan komitmen tinggi dalam menjaga warisan budaya Indonesia!',
        color: 'from-amber-500 to-yellow-600',
        textColor: 'text-amber-800',
        bgBadge: 'bg-amber-100 border-amber-300',
      };
    }
    if (score >= 101) {
      return {
        title: 'Ahli Sejarah Muda 🌟',
        badgeTitle: 'AHLI SEJARAH MUDA SULAWESI SELATAN',
        message: 'Hebat sekali! Pemahamanmu mengenai sejarah kerajaan, benteng, dan budaya maritim sangat mendalam dan membanggakan!',
        color: 'from-emerald-500 to-teal-600',
        textColor: 'text-emerald-800',
        bgBadge: 'bg-emerald-100 border-emerald-300',
      };
    }
    if (score >= 41) {
      return {
        title: 'Penjelajah Cerdas 🧭',
        badgeTitle: 'PENJELAJAH CERDAS NUSANTARA',
        message: 'Bagus! Kamu sudah mengenal banyak peninggalan bersejarah dan tradisi budaya Sulawesi Selatan dengan baik.',
        color: 'from-sky-500 to-blue-600',
        textColor: 'text-sky-800',
        bgBadge: 'bg-sky-100 border-sky-300',
      };
    }
    return {
      title: 'Penjelajah Pemula 🌱',
      badgeTitle: 'PENJELAJAH PEMULA BERSEMANGAT',
      message: 'Awal yang baik! Teruslah membaca dan menjelajahi materi sejarah untuk meningkatkan wawasan dan meraih gelar Penjaga Warisan!',
      color: 'from-slate-500 to-slate-700',
      textColor: 'text-slate-800',
      bgBadge: 'bg-slate-100 border-slate-300',
    };
  };

  const rank = getRankData(player.score);

  // Quiz evaluation accuracy
  const totalQuestions = 20;
  const answeredQuizCount = Object.keys(player.quizAnswers).length;
  // Let's compute quiz percentage
  const quizAccuracyPercent = Math.min(
    100,
    Math.round((player.quizScore / (totalQuestions * 10)) * 100) || 0
  );

  // Attitude reflection rating average
  const reflectionValues = Object.values(player.reflectionAnswers);
  const avgReflection =
    reflectionValues.length > 0
      ? (reflectionValues.reduce((a, b) => a + b, 0) / reflectionValues.length).toFixed(1)
      : 'Belum diisi';

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const todayDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Action Header (No Print) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
            Rapor & Sertifikat Hasil Belajar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Hasil evaluasi menyeluruh IPAS Kelas V SD Bab 5: Daerahku yang Bersejarah
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('MAP_MENU');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Kembali ke Peta
          </button>
        </div>
      </div>

      {/* THREE ASSESSMENTS BREAKDOWN CARDS (No Print) */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Asesmen Pengetahuan */}
        <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>A. Asesmen Pengetahuan</span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading tabular-nums">
            {quizAccuracyPercent}% <span className="text-xs text-slate-400 font-normal">Akurasi Kuis</span>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menilai pemahaman materi sejarah kerajaan, pahlawan, peninggalan benteng, dan arti warisan budaya.
          </p>
          <div className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
            Nilai Kuis: {player.quizScore} Poin
          </div>
        </div>

        {/* Asesmen Keterampilan */}
        <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>B. Asesmen Keterampilan</span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading tabular-nums">
            {player.completedGames.length} / 4 <span className="text-xs text-slate-400 font-normal">Game Tuntas</span>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menilai kemampuan mengidentifikasi gambar, mencocokkan asal daerah, dan mengurutkan lini masa sejarah.
          </p>
          <div className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
            Predikat: {player.completedGames.length >= 3 ? 'Sangat Terampil ⭐' : 'Cukup Terampil'}
          </div>
        </div>

        {/* Asesmen Sikap */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>C. Asesmen Sikap</span>
          </div>
          <p className="text-2xl font-black text-slate-900 font-heading tabular-nums">
            {avgReflection} <span className="text-xs text-slate-400 font-normal">Skala 4.0</span>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Refleksi sikap bangga, toleransi kebinekaan, kepedulian cagar budaya, dan semangat pantang menyerah.
          </p>
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenReflection();
            }}
            className="text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg w-full text-center transition-colors"
          >
            {reflectionValues.length === 5 ? 'Lihat Refleksi Diri ✓' : 'Isi Refleksi Diri ✍️'}
          </button>
        </div>
      </div>

      {/* OFFICIAL CERTIFICATE CARD (PRINTABLE) */}
      <div className="print-card bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-8 border-sky-600/20 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Certificate Decorative Border */}
        <div className="absolute inset-2 border-2 border-dashed border-amber-400/80 rounded-2xl pointer-events-none" />

        {/* Top Emblems */}
        <div className="relative flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
            🏛️
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-sky-800">
              KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
            </p>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              KURIKULUM MERDEKA · IPAS KELAS V SEKOLAH DASAR
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl shadow-xs">
            ⛵
          </div>
        </div>

        {/* Certificate Title */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-heading tracking-wide">
            PIAGAM PENGHARGAAN
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-700 tracking-wider uppercase">
            PENJAGA WARISAN BUDAYA SULAWESI SELATAN
          </p>
        </div>

        {/* Student Name */}
        <div className="py-4 space-y-1 border-y border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Diberikan dengan bangga kepada:</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-sky-950 font-heading tracking-tight underline decoration-amber-400 decoration-4 underline-offset-8">
            {player.name || 'Siswa Berprestasi'}
          </h3>
          <p className="text-xs text-slate-600 font-medium pt-2">
            Sebagai peserta didik yang telah berhasil menuntaskan Petualangan Pembelajaran
            <strong> Bab 5: Daerahku yang Bersejarah</strong> dengan predikat kehormatan:
          </p>
        </div>

        {/* Honorific Title Badge */}
        <div className="inline-block">
          <div className={`px-6 py-2.5 rounded-2xl border-2 font-black text-base sm:text-lg tracking-wide ${rank.bgBadge} ${rank.textColor} font-heading shadow-xs`}>
            {rank.badgeTitle}
          </div>
        </div>

        {/* Motivational message */}
        <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed italic">
          &ldquo;{rank.message}&rdquo;
        </p>

        {/* Badges Earned Ribbon */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 max-w-xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">
            Pusaka Sejarah yang Telah Dikuasai:
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {player.badges.map((b) => (
              <div
                key={b.id}
                className={`p-2 rounded-xl border text-[10px] font-bold ${
                  b.unlocked ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-100 border-slate-200 text-slate-400 opacity-50'
                }`}
              >
                <span>{b.unlocked ? '🏅' : '🔒'}</span>
                <p className="truncate mt-0.5">{b.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics summary strip */}
        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto text-xs py-2">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-100">
            <span className="text-slate-500 block text-[10px]">Total Skor</span>
            <strong className="text-sky-900 text-base tabular-nums">{player.score}</strong> Poin
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-slate-500 block text-[10px]">Misi Selesai</span>
            <strong className="text-amber-900 text-base tabular-nums">{player.completedMissions.length}</strong> / 4 Misi
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-slate-500 block text-[10px]">Nilai Kuis</span>
            <strong className="text-emerald-900 text-base tabular-nums">{quizAccuracyPercent}%</strong>
          </div>
        </div>

        {/* Signatures & Date */}
        <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-slate-600 border-t border-slate-200 max-w-lg mx-auto">
          <div className="space-y-8">
            <p className="font-semibold">Makassar, {todayDate}</p>
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold text-slate-800">Guru Pamong IPAS Kelas V</p>
              <p className="text-[10px] text-slate-500">NIP. 19850314 200902 1 004</p>
            </div>
          </div>

          <div className="space-y-8">
            <p className="font-semibold">Disahkan Oleh:</p>
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold text-slate-800">Penjaga Cagar Budaya Sulsel</p>
              <p className="text-[10px] text-slate-500">Dewan Adat & Budaya Nusantara</p>
            </div>
          </div>
        </div>
      </div>

      {/* Restart / Reset Footer (No Print) */}
      <div className="no-print bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Ingin Mengulang Petualangan dari Awal?
          </h3>
          <p className="text-xs text-slate-500">
            Kamu dapat mengulang untuk mendapatkan skor sempurna atau mengajak teman mencoba.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onResetAll();
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mulai Petualangan Baru</span>
        </button>
      </div>
    </div>
  );
};
