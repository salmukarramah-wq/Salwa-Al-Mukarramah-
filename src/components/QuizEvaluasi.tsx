import React, { useState } from 'react';
import { EVALUATION_QUIZ_QUESTIONS } from '../data/quizData';
import { AppScreen } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Award,
  BookOpen,
} from 'lucide-react';

interface QuizEvaluasiProps {
  onAddScore: (points: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onRecordQuizAnswer: (questionId: number, selectedIndex: number, isFirstTryCorrect: boolean) => void;
  recordedAnswers: Record<number, number>;
}

export const QuizEvaluasi: React.FC<QuizEvaluasiProps> = ({
  onAddScore,
  onNavigate,
  onRecordQuizAnswer,
  recordedAnswers,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [firstTryCorrectIds, setFirstTryCorrectIds] = useState<number[]>([]);
  const [hasTriedWrong, setHasTriedWrong] = useState(false);

  const question = EVALUATION_QUIZ_QUESTIONS[currentIdx];

  // Category filter tabs
  const categories = [
    'Semua (20)',
    'Sejarah Daerah',
    'Warisan Budaya',
    'Manfaat Belajar Sejarah',
    'Pelestarian Budaya',
  ] as const;
  const [activeCategory, setActiveCategory] = useState<string>('Semua (20)');

  const filteredQuestions =
    activeCategory === 'Semua (20)'
      ? EVALUATION_QUIZ_QUESTIONS
      : EVALUATION_QUIZ_QUESTIONS.filter((q) => q.category === activeCategory);

  const activeQuestion = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleOptionClick = (idx: number) => {
    if (isAnswered && isCorrect) return; // already solved correctly
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === activeQuestion.correctIndex) {
      setIsCorrect(true);
      soundManager.playCorrect();
      const isFirstTry = !hasTriedWrong && !firstTryCorrectIds.includes(activeQuestion.id);
      if (isFirstTry) {
        setFirstTryCorrectIds([...firstTryCorrectIds, activeQuestion.id]);
        onAddScore(10);
      }
      onRecordQuizAnswer(activeQuestion.id, idx, isFirstTry);
    } else {
      setIsCorrect(false);
      soundManager.playWrong();
      setHasTriedWrong(true);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetQuestionState();
    } else {
      // Go to Final Result
      soundManager.playVictory();
      onNavigate('FINAL_RESULT');
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      soundManager.playClick();
      setCurrentIdx(currentIdx - 1);
      resetQuestionState();
    }
  };

  const handleRetryQuestion = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(true);
  };

  const resetQuestionState = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setHasTriedWrong(false);
  };

  const changeCategory = (cat: string) => {
    soundManager.playClick();
    setActiveCategory(cat);
    setCurrentIdx(0);
    resetQuestionState();
  };

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

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Terjawab Benar: <strong className="text-emerald-700 tabular-nums">{firstTryCorrectIds.length}</strong> / 20
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('FINAL_RESULT');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Selesai & Lihat Rapor
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-6">
        {/* Question Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 text-xs font-bold">
              Soal {currentIdx + 1} dari {filteredQuestions.length}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-bold text-slate-600">
              {activeQuestion.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                activeQuestion.difficulty === 'HOTS'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : activeQuestion.difficulty === 'Sedang'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              Tingkat: {activeQuestion.difficulty}
            </span>
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 font-heading leading-snug">
          {activeQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {activeQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let style = 'border-slate-200 bg-slate-50/70 hover:border-sky-300 hover:bg-sky-50/40 text-slate-800';

            if (isAnswered) {
              if (idx === activeQuestion.correctIndex) {
                style = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-bold';
              } else if (isSelected) {
                style = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300 font-medium';
              } else {
                style = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered && isCorrect}
                className={`w-full p-4 rounded-2xl text-left border-2 text-xs sm:text-sm transition-all flex items-start gap-3.5 ${style}`}
              >
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 text-slate-700 shadow-2xs">
                  {optionLetters[idx]}
                </div>
                <span className="leading-relaxed flex-1">{option}</span>
                {isAnswered && idx === activeQuestion.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && idx !== activeQuestion.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Box (when requested or after wrong attempt) */}
        {(showHint || (!isCorrect && isAnswered)) && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Petunjuk Jawaban:</p>
              <p>{activeQuestion.hint}</p>
            </div>
          </div>
        )}

        {/* Immediate Feedback Explanation */}
        {isAnswered && isCorrect && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1.5 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Hebat! Jawabanmu Benar (+10 Poin)</span>
            </div>
            <p className="leading-relaxed">{activeQuestion.explanation}</p>
          </div>
        )}

        {/* Navigation & Retry Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {!isCorrect && isAnswered && (
            <button
              onClick={handleRetryQuestion}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all ml-auto"
          >
            <span>{currentIdx < filteredQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
