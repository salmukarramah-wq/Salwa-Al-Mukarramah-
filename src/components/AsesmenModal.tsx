import React, { useState } from 'react';
import { X, Award, Star, CheckCircle2, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AsesmenModalProps {
  isOpen: boolean;
  onClose: () => void;
  reflectionAnswers: Record<string, number>;
  onSaveReflection: (answers: Record<string, number>) => void;
}

const REFLECTION_STATEMENTS = [
  {
    id: 'sikap_1',
    statement: 'Saya merasa bangga terhadap sejarah perjuangan pahlawan dan keragaman budaya daerah Sulawesi Selatan.',
    dimension: 'Rasa Bangga & Cinta Tanah Air',
  },
  {
    id: 'sikap_2',
    statement: 'Saya menghargai tradisi, bahasa, pakaian adat, dan rumah adat teman yang berbeda suku dengan saya.',
    dimension: 'Toleransi & Kebinekaan',
  },
  {
    id: 'sikap_3',
    statement: 'Saya bertekad menjaga kebersihan dan tidak akan merusak cagar budaya saat berkunjung ke museum atau benteng.',
    dimension: 'Kepedulian Cagar Budaya',
  },
  {
    id: 'sikap_4',
    statement: 'Saya mau meneladani semangat pantang menyerah Sultan Hasanuddin dalam belajar dan menyelesaikan tugas sekolah.',
    dimension: 'Nilai Keteladanan Pantang Menyerah',
  },
  {
    id: 'sikap_5',
    statement: 'Saya siap bekerja sama dan bergotong royong seperti tradisi pembuatan kapal Pinisi dalam kegiatan kelompok.',
    dimension: 'Gotong Royong & Kerja Sama',
  },
];

const RATINGS = [
  { value: 4, label: 'Sangat Setuju', icon: '⭐' },
  { value: 3, label: 'Setuju', icon: '👍' },
  { value: 2, label: 'Cukup', icon: '👌' },
  { value: 1, label: 'Kurang', icon: '🌱' },
];

export const AsesmenModal: React.FC<AsesmenModalProps> = ({
  isOpen,
  onClose,
  reflectionAnswers,
  onSaveReflection,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>(reflectionAnswers);

  if (!isOpen) return null;

  const handleSelect = (statementId: string, rating: number) => {
    soundManager.playClick();
    const updated = { ...answers, [statementId]: rating };
    setAnswers(updated);
    onSaveReflection(updated);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 md:p-8">
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Refleksi"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-heading">
              Asesmen Sikap: Refleksi Diri Penjelajah
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Menilai sikap kepedulian, kebanggaan, dan gotong royong terhadap budaya bangsa
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 mb-6">
          Bacalah setiap pernyataan dengan jujur dan pilihlah tingkat kesetujuanmu:
        </div>

        {/* 5 Reflection Statements */}
        <div className="space-y-4">
          {REFLECTION_STATEMENTS.map((item, idx) => {
            const currentRating = answers[item.id] || 0;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    Dimensi {idx + 1}: {item.dimension}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {item.statement}
                  </p>
                </div>

                {/* Rating Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RATINGS.map((rate) => {
                    const isSelected = currentRating === rate.value;
                    return (
                      <button
                        key={rate.value}
                        type="button"
                        onClick={() => handleSelect(item.id, rate.value)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-600 text-white shadow-xs'
                            : 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700'
                        }`}
                      >
                        <span>{rate.icon}</span>
                        <span>{rate.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Terisi: <strong>{answeredCount} / 5</strong> Pernyataan
          </div>

          <button
            onClick={() => {
              soundManager.playCorrect();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-colors"
          >
            Simpan Refleksi Sikap
          </button>
        </div>
      </div>
    </div>
  );
};
