import React, { useState, useEffect } from 'react';
import { TIMELINE_EVENTS } from '../data/gamesData';
import { TimelineEvent, AppScreen } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  Calendar,
} from 'lucide-react';

interface GameLiniMasaProps {
  onAddScore: (points: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onGameCompleted: (gameKey: string) => void;
}

export const GameLiniMasa: React.FC<GameLiniMasaProps> = ({
  onAddScore,
  onNavigate,
  onGameCompleted,
}) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  // Initial shuffle on mount
  useEffect(() => {
    shuffleEvents();
  }, []);

  const shuffleEvents = () => {
    const shuffled = [...TIMELINE_EVENTS].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
    setIsChecked(false);
    setIsAllCorrect(false);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    soundManager.playClick();
    const updated = [...events];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setEvents(updated);
    setIsChecked(false);
  };

  const moveDown = (index: number) => {
    if (index === events.length - 1) return;
    soundManager.playClick();
    const updated = [...events];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setEvents(updated);
    setIsChecked(false);
  };

  const checkOrder = () => {
    let allRight = true;
    for (let i = 0; i < events.length; i++) {
      if (events[i].correctOrder !== i + 1) {
        allRight = false;
        break;
      }
    }

    setIsChecked(true);
    setIsAllCorrect(allRight);

    if (allRight) {
      soundManager.playCorrect();
      onAddScore(50);
      setTimeout(() => {
        soundManager.playVictory();
        setGameFinished(true);
        onGameCompleted('lini_masa');
      }, 700);
    } else {
      soundManager.playWrong();
    }
  };

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-4xl shadow-sm animate-bounce">
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Lini Masa Berhasil Disusun!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Ahli Kronologi Sejarah!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Kamu berhasil mengurutkan peristiwa penting sejarah Sulawesi Selatan secara runtut dari abad ke-16 hingga masa depan!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-bold">
            Bonus Kronologi: +50 Poin Diperoleh
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigate('MAP_MENU');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Kembali ke Peta Petualangan
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setGameFinished(false);
                shuffleEvents();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Susun Ulang Lagi</span>
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

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          Susun dari Waktu Terlama ke Paling Baru
        </span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Game 3: Petualangan Lini Masa
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading mt-2">
            Urutkan Peristiwa Bersejarah Sulawesi Selatan!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gunakan tombol panah <strong>Naik (▲)</strong> dan <strong>Turun (▼)</strong> pada setiap kartu untuk mengatur urutan tahun peristiwa secara tepat.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-3">
          {events.map((event, idx) => {
            const isItemCorrect = isChecked && event.correctOrder === idx + 1;
            const isItemWrong = isChecked && event.correctOrder !== idx + 1;

            return (
              <div
                key={event.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ${
                  isItemCorrect
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950'
                    : isItemWrong
                    ? 'border-rose-400 bg-rose-50/60 text-slate-800'
                    : 'border-slate-200 bg-slate-50/70 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-200/80 font-black text-xs text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                        {event.yearOrEra}
                      </span>
                      {isItemCorrect && (
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Posisi Tepat
                        </span>
                      )}
                      {isItemWrong && (
                        <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Posisi Belum Tepat
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold font-heading text-slate-900 mt-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Move Controls */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Pindahkan ke atas"
                    aria-label="Naikkan urutan"
                  >
                    <ChevronUp className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === events.length - 1}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Pindahkan ke bawah"
                    aria-label="Turunkan urutan"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Check & Feedback */}
        {isChecked && !isAllCorrect && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Urutan belum sepenuhnya benar. Ingat: Tahun 1545 (Benteng awal) terjadi sebelum Gowa memeluk Islam (1605), dilanjutkan Sultan Hasanuddin (1667), lalu pengakuan UNESCO (2017)!
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={checkOrder}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 transform active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Periksa Urutan Lini Masa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
