import React from 'react';
import { X, BookOpen, Target, CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';
import { CURRICULUM_DATA } from '../data/learningContent';
import { soundManager } from '../utils/audio';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-sky-100 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-heading">
              Capaian & Tujuan Pembelajaran
            </h2>
            <p className="text-sm font-medium text-sky-700">
              {CURRICULUM_DATA.mataPelajaran} · {CURRICULUM_DATA.fase}
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="space-y-6">
          {/* Bab Info */}
          <div className="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-4 md:p-5">
            <div className="flex items-center gap-2 mb-2 text-sky-900 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>{CURRICULUM_DATA.bab}</span>
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">
              Fokus pembelajaran: Sejarah lokal, peninggalan kerajaan maritim, tokoh pahlawan, keanekaragaman budaya suku Bugis, Makassar, dan Toraja, serta aksi nyata pelestarian warisan budaya bangsa.
            </p>
          </div>

          {/* Capaian Pembelajaran */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 rounded-md bg-amber-100 text-amber-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Capaian Pembelajaran (CP) Fase C
              </h3>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-slate-800 text-sm leading-relaxed">
              &ldquo;{CURRICULUM_DATA.capaianPembelajaran}&rdquo;
            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Tujuan Pembelajaran (TP)
              </h3>
            </div>
            <div className="grid gap-3">
              {CURRICULUM_DATA.tujuanPembelajaran.map((tp) => (
                <div
                  key={tp.id}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{tp.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{tp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semboyan Penjaga Warisan */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-center">
            <p className="text-xs font-medium text-sky-100 uppercase tracking-wider mb-1">
              Semangat Penjelajah Cilik
            </p>
            <p className="text-sm md:text-base font-bold font-heading">
              &ldquo;Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya dan bangga melestarikan budayanya!&rdquo;
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md shadow-sky-500/20 transition-colors"
          >
            Mengerti & Siap Belajar
          </button>
        </div>
      </div>
    </div>
  );
};
