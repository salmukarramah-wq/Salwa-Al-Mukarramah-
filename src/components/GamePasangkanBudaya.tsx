import React, { useState, useEffect } from 'react';
import { MATCHING_PAIRS } from '../data/gamesData';
import { MatchingItem, AppScreen } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Trophy,
  Link2,
} from 'lucide-react';

interface GamePasangkanBudayaProps {
  onAddScore: (points: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onGameCompleted: (gameKey: string) => void;
}

export const GamePasangkanBudaya: React.FC<GamePasangkanBudayaProps> = ({
  onAddScore,
  onNavigate,
  onGameCompleted,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);
  const [shuffledRight, setShuffledRight] = useState<MatchingItem[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Initialize and shuffle right column
  useEffect(() => {
    const shuffled = [...MATCHING_PAIRS].sort(() => Math.random() - 0.5);
    setShuffledRight(shuffled);
  }, []);

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundManager.playClick();
    setSelectedLeft(id);
    setWrongPair(false);

    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundManager.playClick();
    setSelectedRight(id);
    setWrongPair(false);

    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct Match!
      soundManager.playCorrect();
      const updated = [...matchedIds, leftId];
      setMatchedIds(updated);
      setSelectedLeft(null);
      setSelectedRight(null);
      onAddScore(10);

      if (updated.length === MATCHING_PAIRS.length) {
        setTimeout(() => {
          soundManager.playVictory();
          setGameFinished(true);
          onGameCompleted('pasangkan');
        }, 500);
      }
    } else {
      // Wrong Match
      soundManager.playWrong();
      setWrongPair(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(false);
      }, 700);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setWrongPair(false);
    setGameFinished(false);
    setShuffledRight([...MATCHING_PAIRS].sort(() => Math.random() - 0.5));
  };

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sky-100 shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-4xl shadow-sm animate-bounce">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Sempurna!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Pasangan Budaya Lengkap!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Kamu berhasil menghubungkan seluruh nama peninggalan sejarah dan kebudayaan Sulawesi Selatan dengan daerah asal serta perannya secara akurat!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-bold">
            Bonus Keterampilan: +60 Poin Diperoleh
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('MAP_MENU');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Kembali ke Peta Petualangan
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mainkan Lagi</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('MAP_MENU');
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-700 hover:bg-sky-50 text-xs font-bold transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Pasangan Terhubung:</span>
          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 tabular-nums">
            {matchedIds.length} dari {MATCHING_PAIRS.length}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            Game 2: Pasangkan Warisan Budaya
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading mt-2">
            Klik Satu Kartu di Kolom Kiri, Lalu Klik Pasangan yang Sesuai di Kolom Kanan!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hubungkan warisan sejarah dengan daerah asal, julukan keberanian, atau perannya.
          </p>
        </div>

        {/* The Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column: Peninggalan / Budaya */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
              Kolom A: Warisan / Tokoh
            </p>
            {MATCHING_PAIRS.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedLeft === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectLeft(item.id)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between gap-3 ${
                    isMatched
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 opacity-90'
                      : isSelected
                      ? wrongPair
                        ? 'border-rose-500 bg-rose-50 text-rose-950 animate-shake'
                        : 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-300 shadow-sm'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white text-slate-800'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-bold font-heading">{item.leftText}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.leftSub}</p>
                  </div>
                  {isMatched ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Daerah / Peran (Shuffled) */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
              Kolom B: Asal Daerah / Peran
            </p>
            {shuffledRight.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRight === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectRight(item.id)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between gap-3 ${
                    isMatched
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 opacity-90'
                      : isSelected
                      ? wrongPair
                        ? 'border-rose-500 bg-rose-50 text-rose-950 animate-shake'
                        : 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-300 shadow-sm'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white text-slate-800'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-bold font-heading">{item.rightText}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.rightSub}</p>
                  </div>
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Feedback Banner */}
        {wrongPair && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold text-center animate-in fade-in">
            Pasangan belum cocok, coba hubungkan kembali dengan teliti!
          </div>
        )}
      </div>
    </div>
  );
};
