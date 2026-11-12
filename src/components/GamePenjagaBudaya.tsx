import React, { useState } from 'react';
import { STEWARDSHIP_SCENARIOS } from '../data/gamesData';
import { AppScreen } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Shield,
  ChevronRight,
  Trophy,
  RotateCcw,
  Sparkles,
  Heart,
} from 'lucide-react';

interface GamePenjagaBudayaProps {
  onAddScore: (points: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onGameCompleted: (gameKey: string) => void;
}

export const GamePenjagaBudaya: React.FC<GamePenjagaBudayaProps> = ({
  onAddScore,
  onNavigate,
  onGameCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredCorrectlyIds, setAnsweredCorrectlyIds] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario = STEWARDSHIP_SCENARIOS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = scenario.options[idx].isCorrect;
    if (isCorrect) {
      soundManager.playCorrect();
      if (!answeredCorrectlyIds.includes(scenario.id)) {
        onAddScore(10);
        setAnsweredCorrectlyIds([...answeredCorrectlyIds, scenario.id]);
      }
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < STEWARDSHIP_SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      soundManager.playVictory();
      setGameFinished(true);
      onGameCompleted('penjaga_budaya');
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleReset = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setGameFinished(false);
  };

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-orange-100 shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto text-4xl shadow-sm animate-bounce">
            <Shield className="w-10 h-10 text-orange-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Pelindung Budaya Sejati
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Keputusan Berkarakter Luhur!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Kamu telah membuktikan sikap kepedulian, empati, dan keberanian menjaga keutuhan serta kelestarian warisan budaya bangsa Indonesia!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 text-sm font-bold">
            Bonus Sikap Penjaga: +{answeredCorrectlyIds.length * 10} Poin
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('MAP_MENU');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Kembali ke Peta Petualangan
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Skenario</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentOptionData = selectedOption !== null ? scenario.options[selectedOption] : null;

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

        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">
          Kasus {currentIndex + 1} dari {STEWARDSHIP_SCENARIOS.length}
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-md space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
            Game 4: Misi Penjaga Budaya
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading mt-2">
            Studi Kasus Kehidupan Nyata
          </h2>
        </div>

        {/* Situation Story Box */}
        <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-orange-600" />
            <span>Situasi yang Kamu Hadapi:</span>
          </p>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            &ldquo;{scenario.situation}&rdquo;
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
            Pilihlah Tindakan Terbaik Seorang Penjaga Warisan:
          </p>
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let style = 'border-slate-200 bg-slate-50/70 hover:border-orange-300 hover:bg-orange-50/40 text-slate-800';

            if (isAnswered) {
              if (opt.isCorrect) {
                style = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-bold';
              } else if (isSelected) {
                style = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300 font-medium';
              } else {
                style = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl text-left border-2 text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
              >
                <span className="leading-relaxed">{opt.text}</span>
                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Moral Value */}
        {isAnswered && currentOptionData && (
          <div
            className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in space-y-2 ${
              currentOptionData.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {currentOptionData.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Sangat Tepat! (+10 Poin)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Pilihan Kurang Bijak!</span>
                </>
              )}
            </div>
            <p>{currentOptionData.feedback}</p>
            {currentOptionData.isCorrect && (
              <div className="pt-2 border-t border-emerald-200/80 text-emerald-900 text-xs">
                <strong>Nilai Karakter:</strong> {scenario.educationalMoral}
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          {isAnswered && !currentOptionData?.isCorrect ? (
            <button
              onClick={handleRetry}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Pilih Tindakan Lain</span>
            </button>
          ) : (
            <div />
          )}

          {isAnswered && currentOptionData?.isCorrect && (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-orange-600/20 transition-all ml-auto"
            >
              <span>{currentIndex < STEWARDSHIP_SCENARIOS.length - 1 ? 'Kasus Berikutnya' : 'Selesaikan Misi'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
