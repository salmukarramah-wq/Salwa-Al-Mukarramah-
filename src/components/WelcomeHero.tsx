import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, HelpCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface WelcomeHeroProps {
  onStart: (playerName: string, avatar: string) => void;
  onOpenGuide: () => void;
  onOpenCurriculum: () => void;
}

const AVATAR_OPTIONS = [
  { id: 'daeng_cilik', name: 'Daeng Penjelajah', icon: '⛵', desc: 'Penjelajah Bahari Bugis-Makassar' },
  { id: 'bunga_toraja', name: 'Melati Toraja', icon: '🏡', desc: 'Pencinta Seni Ukir & Tongkonan' },
  { id: 'pattingalloang', name: 'Pendekar Cilik', icon: '🛡️', desc: 'Penjaga Benteng Bersejarah' },
  { id: 'nona_bodo', name: 'Srikandi Sutra', icon: '🌸', desc: 'Pelestari Busana & Tari Daerah' },
];

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onStart,
  onOpenGuide,
  onOpenCurriculum,
}) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].id);
  const [validationError, setValidationError] = useState('');

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Silakan ketik namamu terlebih dahulu ya!');
      soundManager.playWrong();
      return;
    }
    soundManager.playBadgeUnlock();
    onStart(name.trim(), selectedAvatar);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/40 to-[#F4F9FD] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Story, Title, Visual Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-300/60 text-sky-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>IPAS FASE C · KELAS V SD · BAB 5</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight leading-[1.15]">
              JELAJAH SEJARAH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-amber-500">
                SULAWESI SELATAN
              </span>
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-700">
              Petualangan Penjaga Warisan Budaya
            </p>
          </div>

          {/* Story intro balloon */}
          <div className="p-5 rounded-3xl bg-white/95 border border-sky-100 shadow-md shadow-sky-900/5 relative">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Compass className="w-6 h-6 animate-float" />
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase font-extrabold tracking-wider text-sky-600">
                  Pesan Dari Tetua Adat & Guru
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  &ldquo;Halo, Penjelajah Cilik! Tahukah kamu bahwa Sulawesi Selatan memiliki banyak cerita sejarah dan warisan budaya yang sangat menarik? Hari ini kamu akan melakukan perjalanan untuk menemukan berbagai peninggalan sejarah, mengenal budaya daerah, dan menjadi penjaga warisan budaya Indonesia. Siap memulai petualangan?&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Hero Illustrated Banner Preview */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
            <img
              src="/src/assets/images/hero_sulsel_adventure_1794477634828.jpg"
              alt="Ilustrasi Sejarah dan Warisan Budaya Sulawesi Selatan"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent flex items-end p-4 sm:p-5">
              <div className="text-white space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <MapPin className="w-4 h-4" />
                  <span>Makassar · Bulukumba · Tana Toraja · Gowa · Bone</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200">
                  Jelajahi Benteng Rotterdam, Kapal Layar Pinisi, Rumah Tongkonan, dan Kisah Sultan Hasanuddin!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Registration & Launch Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 border border-sky-100/80 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Kartu Identitas Penjelajah
                </h2>
                <p className="text-xs text-slate-500">
                  Masukkan namamu untuk memulai misi penyelamatan budaya
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                🎒
              </div>
            </div>

            <form onSubmit={handleStartGame} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nama Siswa / Penjelajah:
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Contoh: Andi Pratama / Nurul..."
                  maxLength={30}
                  className="w-full px-4 py-3 text-base rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-hidden transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                />
                {validationError && (
                  <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                    <span>⚠️</span> {validationError}
                  </p>
                )}
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Karakter Penjelajah:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {AVATAR_OPTIONS.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.id;
                    return (
                      <button
                        type="button"
                        key={avatar.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedAvatar(avatar.id);
                        }}
                        className={`p-3 rounded-2xl text-left border-2 transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-300'
                            : 'border-slate-100 bg-slate-50/70 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-2xl">{avatar.icon}</span>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-800 truncate">{avatar.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{avatar.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features summary list */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kumpulkan 4 Lambang Lencana Pusaka Daerah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎶</span>
                  <span className="text-slate-700 font-medium">Musik Daerah: <strong>Anging Mammiri & Pakarena</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔊</span>
                  <span className="text-slate-700 font-medium">Dilengkapi <strong>Suara Narasi Penjelasan Materi</strong></span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
              >
                <span>MULAI PETUALANGAN</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenGuide();
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>Petunjuk Game</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenCurriculum();
                  }}
                  className="py-2.5 px-3 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Capaian (CP & TP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
