import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, BookOpen, HelpCircle, Award, Home, Compass, Radio } from 'lucide-react';
import { soundManager, BgmTheme } from '../utils/audio';
import { AppScreen } from '../types/game';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  playerName: string;
  score: number;
  unlockedBadgesCount: number;
  onOpenCurriculum: () => void;
  onOpenGuide: () => void;
  onOpenReflection: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  playerName,
  score,
  unlockedBadgesCount,
  onOpenCurriculum,
  onOpenGuide,
  onOpenReflection,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmActive, setIsBgmActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<BgmTheme>('anging_mammiri');
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playClick();
  };

  const toggleMusic = () => {
    soundManager.playClick();
    const active = soundManager.toggleBGM();
    setIsBgmActive(active);
  };

  const handleSelectTrack = (track: BgmTheme) => {
    soundManager.playClick();
    setCurrentTrack(track);
    soundManager.setBgmTheme(track);
    if (!isBgmActive) {
      soundManager.startBGM();
      setIsBgmActive(true);
    }
    setShowMusicMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs px-4 md:px-8 py-3 transition-all no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(playerName ? 'MAP_MENU' : 'WELCOME');
            }}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            title="Kembali ke Beranda / Peta"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-amber-400 flex items-center justify-center text-white shadow-sm group-hover:rotate-6 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-sky-950 font-heading block leading-tight">
                Jelajah Sulsel
              </span>
              <span className="text-xs text-sky-600 font-medium hidden sm:block">
                IPAS Kelas V SD · Warisan Budaya
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav / Status */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          {playerName && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-200/60 rounded-xl">
              <span className="text-xs font-semibold text-sky-700">Penjelajah:</span>
              <span className="text-xs font-bold text-slate-800">{playerName}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800 font-bold text-xs">
            <span>⭐ Poin:</span>
            <span className="tabular-nums text-sm text-amber-900">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded-xl text-emerald-800 font-bold text-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Lencana:</span>
            <span className="tabular-nums text-sm text-emerald-900">{unlockedBadgesCount} / 4</span>
          </div>
        </div>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 shrink-0">
          {currentScreen !== 'WELCOME' && (
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('MAP_MENU');
              }}
              className="px-3 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl flex items-center gap-1.5 transition-colors"
              title="Peta Petualangan"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Peta Misi</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCurriculum();
            }}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Capaian & Tujuan Pembelajaran (CP & TP)"
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span className="hidden md:inline">CP & TP</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenReflection();
            }}
            className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Refleksi Sikap Penjelajah"
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="hidden lg:inline">Refleksi Sikap</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGuide();
            }}
            className="p-2 text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-xl transition-colors"
            title="Petunjuk Permainan"
            aria-label="Petunjuk Permainan"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Regional Music Controls & Track Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowMusicMenu(!showMusicMenu);
              }}
              className={`p-2 rounded-xl transition-all flex items-center gap-1.5 ${
                isBgmActive ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Musik Tradisional Sulawesi Selatan"
              aria-label="Pilih Musik Daerah"
            >
              <Music className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-bold">
                {isBgmActive ? (currentTrack === 'anging_mammiri' ? 'Anging Mammiri 🎶' : 'Pakarena 🥁') : 'Musik Daerah'}
              </span>
            </button>

            {/* Music Track Selection Dropdown */}
            {showMusicMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-amber-200 p-3 z-50 animate-in fade-in space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-amber-600" />
                    Musik Daerah Sulsel
                  </span>
                  <button
                    onClick={toggleMusic}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isBgmActive ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isBgmActive ? 'Jeda ⏸️' : 'Putar ▶️'}
                  </button>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleSelectTrack('anging_mammiri')}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentTrack === 'anging_mammiri' && isBgmActive
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">1. Anging Mammiri</p>
                      <p className="text-[10px] text-slate-500">Lagu Daerah Khas Makassar</p>
                    </div>
                    {currentTrack === 'anging_mammiri' && isBgmActive && <span>▶️</span>}
                  </button>

                  <button
                    onClick={() => handleSelectTrack('gandrang_pakarena')}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentTrack === 'gandrang_pakarena' && isBgmActive
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">2. Gandrang Pakarena</p>
                      <p className="text-[10px] text-slate-500">Irama Gendang & Kesenian Tari</p>
                    </div>
                    {currentTrack === 'gandrang_pakarena' && isBgmActive && <span>▶️</span>}
                  </button>

                  <button
                    onClick={() => handleSelectTrack('marimba_santai')}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentTrack === 'marimba_santai' && isBgmActive
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">3. Melodi Santai</p>
                      <p className="text-[10px] text-slate-500">Alunan Lembut Penjelajah</p>
                    </div>
                    {currentTrack === 'marimba_santai' && isBgmActive && <span>▶️</span>}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl transition-colors ${
              isMuted ? 'bg-rose-100 text-rose-600' : 'text-slate-600 hover:bg-sky-50'
            }`}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
            aria-label="Toggle Suara"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
