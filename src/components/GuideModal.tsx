import React from 'react';
import { X, HelpCircle, Award, Compass, Gamepad2, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-sky-100 p-6 md:p-8">
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Petunjuk"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-heading">
              Petunjuk Petualangan
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Cara bermain, mengumpulkan poin, dan meraih lencana Penjaga Warisan
            </p>
          </div>
        </div>

        <div className="space-y-5 text-sm text-slate-700">
          {/* Langkah 1 */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex gap-3.5">
            <div className="w-7 h-7 rounded-xl bg-sky-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <h3 className="font-bold text-sky-950 mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                Jelajahi 4 Wilayah Misi
              </h3>
              <p className="text-xs text-sky-900 leading-relaxed">
                Pilih misi di Peta Petualangan: Pelajari materi cerita sejarah, amati gambar benteng, kapal Pinisi, rumah adat Tongkonan, dan tokoh pahlawan.
              </p>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex gap-3.5">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <h3 className="font-bold text-amber-950 mb-1 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-amber-600" />
                Selesaikan 4 Permainan Tantangan
              </h3>
              <ul className="text-xs text-amber-950 space-y-1 list-disc list-inside mt-1">
                <li><strong>Game 1: Tebak Gambar</strong> — Identifikasi peninggalan bersejarah.</li>
                <li><strong>Game 2: Pasangkan Budaya</strong> — Hubungkan nama warisan dengan asal & perannya.</li>
                <li><strong>Game 3: Lini Masa Sejarah</strong> — Urutkan peristiwa bersejarah secara kronologis.</li>
                <li><strong>Game 4: Misi Penjaga Budaya</strong> — Tentukan tindakan bijak dalam kehidupan sehari-hari.</li>
              </ul>
            </div>
          </div>

          {/* Langkah 3 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex gap-3.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <h3 className="font-bold text-emerald-950 mb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                Sistem Poin & Gelar Kehormatan
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-950 mt-1">
                <div className="p-2 rounded-lg bg-white/70 border border-emerald-200">
                  <span className="font-bold">Jawaban Benar:</span> +10 Poin
                </div>
                <div className="p-2 rounded-lg bg-white/70 border border-emerald-200">
                  <span className="font-bold">Tuntas 1 Misi:</span> Bonus +20 Poin
                </div>
              </div>
              <div className="mt-2 text-xs space-y-0.5 text-slate-600">
                <p>• <strong>0–40 Poin:</strong> Penjelajah Pemula</p>
                <p>• <strong>41–100 Poin:</strong> Penjelajah Cerdas</p>
                <p>• <strong>101–160 Poin:</strong> Ahli Sejarah Muda</p>
                <p>• <strong>161+ Poin:</strong> Penjaga Warisan Budaya 👑</p>
              </div>
            </div>
          </div>

          {/* Langkah 4 */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex gap-3.5">
            <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <h3 className="font-bold text-purple-950 mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Kuis Evaluasi & Rapor Sertifikat
              </h3>
              <p className="text-xs text-purple-900 leading-relaxed">
                Uji pemahamanmu pada Kuis 20 Soal, isi Refleksi Sikap, dan cetak Sertifikat Resmi Penjaga Warisan Budaya dengan namamu!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md shadow-amber-500/20 transition-colors"
          >
            Siap Berpetualang!
          </button>
        </div>
      </div>
    </div>
  );
};
