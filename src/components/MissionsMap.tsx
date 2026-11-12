import React from 'react';
import { MISSIONS } from '../data/learningContent';
import { AppScreen, Badge } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ShieldCheck,
  Compass,
  Award,
  Medal,
  Lock,
  CheckCircle2,
  Play,
  Gamepad2,
  FileQuestion,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface MissionsMapProps {
  playerName: string;
  avatar: string;
  score: number;
  completedMissions: number[];
  badges: Badge[];
  onSelectMission: (missionId: number) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const MissionsMap: React.FC<MissionsMapProps> = ({
  playerName,
  avatar,
  score,
  completedMissions,
  badges,
  onSelectMission,
  onNavigate,
}) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'Medal':
      default:
        return <Medal className="w-5 h-5 text-orange-600" />;
    }
  };

  const getRankTitle = (pts: number) => {
    if (pts >= 161) return { title: 'Penjaga Warisan Budaya 👑', color: 'text-amber-800 bg-amber-100 border-amber-300' };
    if (pts >= 101) return { title: 'Ahli Sejarah Muda 🌟', color: 'text-emerald-800 bg-emerald-100 border-emerald-300' };
    if (pts >= 41) return { title: 'Penjelajah Cerdas 🧭', color: 'text-sky-800 bg-sky-100 border-sky-300' };
    return { title: 'Penjelajah Pemula 🌱', color: 'text-slate-800 bg-slate-100 border-slate-300' };
  };

  const rank = getRankTitle(score);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome & Badges Trophy Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-amber-300 flex items-center justify-center text-3xl shadow-md shrink-0">
            {avatar === 'daeng_cilik' ? '⛵' : avatar === 'bunga_toraja' ? '🏡' : avatar === 'pattingalloang' ? '🛡️' : '🌸'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Peta Petualangan, {playerName}!
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${rank.color}`}>
                {rank.title}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Total Poin: <strong className="text-sky-700 tabular-nums">{score}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Badges Shelf */}
        <div className="w-full md:w-auto bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            Pusaka Warisan Terkumpul ({badges.filter((b) => b.unlocked).length}/4)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {badges.map((badge) => (
              <div
                key={badge.id}
                title={badge.unlocked ? `${badge.name} (Terkumpul!)` : `${badge.name} (Selesaikan Misi ${badge.missionNumber})`}
                className={`p-2 rounded-xl flex flex-col items-center justify-center text-center transition-all ${
                  badge.unlocked
                    ? 'bg-white shadow-xs border-2 border-amber-300'
                    : 'bg-slate-200/60 opacity-50 grayscale'
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  {badge.unlocked ? getBadgeIcon(badge.iconName) : <Lock className="w-4 h-4 text-slate-400" />}
                </div>
                <span className="text-[10px] font-bold text-slate-800 line-clamp-1 mt-0.5">
                  Misi {badge.missionNumber}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 4 Mission Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Empat Wilayah Misi Bersejarah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilih wilayah untuk mempelajari materi dan selesaikan tantangannya!
            </p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('QUIZ_EVALUASI');
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <FileQuestion className="w-4 h-4" />
            <span>Kuis 20 Soal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISSIONS.map((mission) => {
            const isCompleted = completedMissions.includes(mission.id);
            const badge = badges.find((b) => b.missionNumber === mission.id);

            return (
              <div
                key={mission.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Mission Image Header */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img
                      src={mission.heroImage}
                      alt={mission.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 font-extrabold text-xs tracking-wider">
                          {mission.title}
                        </span>
                        {isCompleted && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selesai
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-white font-heading">
                          {mission.themeTitle}
                        </h3>
                        <p className="text-xs text-amber-300 font-semibold flex items-center gap-1 mt-0.5">
                          <span>Lencana: {mission.badgeName}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {mission.overview}
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Hadiah Kelulusan:</span>
                      <span className="font-bold text-emerald-700">+20 Poin & Lencana</span>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectMission(mission.id);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isCompleted ? 'Buka Ulang Misi & Materi' : 'Mulai Misi Ini'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arena Mini Games Quick Launcher */}
      <div className="bg-gradient-to-br from-sky-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span>Zona Tantangan Keterampilan</span>
            </div>
            <h2 className="text-2xl font-black font-heading">
              Empat Arena Permainan Budaya
            </h2>
            <p className="text-xs sm:text-sm text-sky-200">
              Mainkan setiap jenis permainan untuk mengasah keterampilan dan menambah 10 poin per jawaban tepat!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Game 1 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('GAME_TEBAK_GAMBAR');
            }}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center text-xl mb-3 shadow-md">
              🖼️
            </div>
            <h3 className="font-bold text-white text-sm font-heading group-hover:text-amber-300 transition-colors">
              Game 1: Tebak Gambar
            </h3>
            <p className="text-xs text-sky-200 mt-1 line-clamp-2">
              Tebak nama benteng, kapal, rumah adat, dan pakaian tradisional.
            </p>
            <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Mainkan</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>

          {/* Game 2 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('GAME_PASANGKAN');
            }}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl mb-3 shadow-md">
              🔗
            </div>
            <h3 className="font-bold text-white text-sm font-heading group-hover:text-amber-300 transition-colors">
              Game 2: Pasangkan Budaya
            </h3>
            <p className="text-xs text-sky-200 mt-1 line-clamp-2">
              Cocokkan nama peninggalan dengan daerah asal dan julukan tokoh.
            </p>
            <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Mainkan</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>

          {/* Game 3 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('GAME_LINI_MASA');
            }}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl mb-3 shadow-md">
              ⏳
            </div>
            <h3 className="font-bold text-white text-sm font-heading group-hover:text-amber-300 transition-colors">
              Game 3: Lini Masa Sejarah
            </h3>
            <p className="text-xs text-sky-200 mt-1 line-clamp-2">
              Urutkan peristiwa sejarah dari tahun 1545 hingga pengakuan dunia.
            </p>
            <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Mainkan</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>

          {/* Game 4 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('GAME_PENJAGA_BUDAYA');
            }}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl mb-3 shadow-md">
              🛡️
            </div>
            <h3 className="font-bold text-white text-sm font-heading group-hover:text-amber-300 transition-colors">
              Game 4: Misi Penjaga
            </h3>
            <p className="text-xs text-sky-200 mt-1 line-clamp-2">
              Pilih tindakan berkarakter bijak saat menghadapi situasi budaya.
            </p>
            <div className="mt-3 text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Mainkan</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Final Assessment Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-amber-950 font-heading">
            Sudah Menyelesaikan Seluruh Misi & Tantangan?
          </h3>
          <p className="text-xs sm:text-sm text-amber-800">
            Periksa hasil akhirmu, raih Gelar Penjaga Warisan Budaya, dan cetak Sertifikat Kelulusan resmi!
          </p>
        </div>
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('FINAL_RESULT');
          }}
          className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md transition-colors shrink-0"
        >
          Lihat Rapor & Sertifikat 📜
        </button>
      </div>
    </div>
  );
};
