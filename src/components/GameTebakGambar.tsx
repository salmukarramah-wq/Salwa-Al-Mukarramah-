import React, { useState } from 'react';
import { GUESS_GAME_ITEMS } from '../data/gamesData';
import { soundManager } from '../utils/audio';
import { AppScreen } from '../types/game';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Trophy,
} from 'lucide-react';

interface GameTebakGambarProps {
  onAddScore: (points: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onGameCompleted: (gameKey: string) => void;
}

export const GameTebakGambar: React.FC<GameTebakGambarProps> = ({
  onAddScore,
  onNavigate,
  onGameCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answeredCorrectlyIds, setAnsweredCorrectlyIds] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const currentItem = GUESS_GAME_ITEMS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered && isCorrect) return; // already solved this item
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentItem.correctIndex) {
      setIsCorrect(true);
      soundManager.playCorrect();
      if (!answeredCorrectlyIds.includes(currentItem.id)) {
        onAddScore(10);
        setAnsweredCorrectlyIds([...answeredCorrectlyIds, currentItem.id]);
      }
    } else {
      setIsCorrect(false);
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < GUESS_GAME_ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setGameFinished(true);
      soundManager.playVictory();
      onGameCompleted('tebak_gambar');
    }
  };

  const handleRetryCurrent = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(true);
  };

  const handleResetGame = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setGameFinished(false);
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
              Tantangan Terselesaikan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Selamat, Penjelajah Jeli!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Kamu berhasil menebak seluruh peninggalan bersejarah dan budaya Sulawesi Selatan dengan sangat teliti!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-900 text-sm font-bold">
            Poin yang Dikumpulkan: +{answeredCorrectlyIds.length * 10} Poin
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
              onClick={handleResetGame}
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
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
          <span className="text-xs font-bold text-slate-500">Soal Gambar:</span>
          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800">
            {currentIndex + 1} dari {GUESS_GAME_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
            Game 1: Tebak Gambar Sejarah
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading mt-2">
            {currentItem.titlePrompt}
          </h2>
        </div>

        {/* Display Image */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-inner max-h-80 flex items-center justify-center border border-slate-200">
          <img
            src={currentItem.imageSrc}
            alt="Peninggalan Sejarah Sulawesi Selatan"
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-72 object-cover object-center"
          />
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentItem.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let btnClass = 'border-slate-200 bg-slate-50/70 hover:border-sky-300 hover:bg-sky-50/50 text-slate-800';

            if (isAnswered) {
              if (idx === currentItem.correctIndex) {
                btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-bold';
              } else if (isSelected) {
                btnClass = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300 font-medium';
              } else {
                btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered && isCorrect}
                className={`p-4 rounded-2xl text-left border-2 text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnClass}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentItem.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && idx !== currentItem.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-bold">
                  {isCorrect ? 'Jawaban Benar! (+10 Poin)' : 'Jawaban Kurang Tepat!'}
                </p>
                <p>{isCorrect ? currentItem.explanation : 'Jangan menyerah! Cermati kembali gambar dan pilihan yang ada.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          {!isCorrect && isAnswered ? (
            <button
              onClick={handleRetryCurrent}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          ) : (
            <div />
          )}

          {isCorrect && (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-sky-600/20 transition-all ml-auto"
            >
              <span>{currentIndex < GUESS_GAME_ITEMS.length - 1 ? 'Soal Berikutnya' : 'Selesaikan Game'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
