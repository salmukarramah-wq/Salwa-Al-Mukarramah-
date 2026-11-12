import React, { useState, useEffect } from 'react';
import { MISSIONS, CULTURAL_GALLERY, MissionInfo } from '../data/learningContent';
import { AppScreen, Badge } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  Sparkles,
  Gamepad2,
  FileQuestion,
  ChevronRight,
  Info,
  Clock,
  HeartHandshake,
  ShieldAlert,
  Volume2,
  Square,
  Radio,
} from 'lucide-react';

interface MissionViewProps {
  missionId: number;
  completedMissions: number[];
  badges: Badge[];
  onCompleteMission: (id: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onSelectMission: (id: number) => void;
}

export const MissionView: React.FC<MissionViewProps> = ({
  missionId,
  completedMissions,
  badges,
  onCompleteMission,
  onNavigate,
  onSelectMission,
}) => {
  const mission = MISSIONS.find((m) => m.id === missionId) || MISSIONS[0];
  const isCompleted = completedMissions.includes(mission.id);
  const badge = badges.find((b) => b.missionNumber === mission.id);

  // Gallery state for Mission 2
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<(typeof CULTURAL_GALLERY)[0] | null>(null);

  // Timeline slider step for Mission 3
  const [timelineStep, setTimelineStep] = useState<0 | 1 | 2>(0);

  // Stewardship checklist for Mission 4
  const [checkedActions, setCheckedActions] = useState<number[]>([]);

  // Narration Voice State
  const [activeNarrationId, setActiveNarrationId] = useState<string | null>(null);

  // Stop any ongoing speech when switching missions or unmounting
  useEffect(() => {
    return () => {
      soundManager.stopSpeaking();
    };
  }, [missionId]);

  const handleSpeak = (id: string, textToRead: string) => {
    if (activeNarrationId === id) {
      soundManager.stopSpeaking();
      setActiveNarrationId(null);
    } else {
      setActiveNarrationId(id);
      soundManager.speakText(
        textToRead,
        () => setActiveNarrationId(id),
        () => setActiveNarrationId(null),
        () => setActiveNarrationId(null)
      );
    }
  };

  const toggleAction = (idx: number) => {
    soundManager.playClick();
    if (checkedActions.includes(idx)) {
      setCheckedActions(checkedActions.filter((i) => i !== idx));
    } else {
      setCheckedActions([...checkedActions, idx]);
    }
  };

  const handleClaimBadge = () => {
    soundManager.playBadgeUnlock();
    onCompleteMission(mission.id);
  };

  const getGameTargetScreen = (id: number): AppScreen => {
    switch (id) {
      case 1:
        return 'GAME_TEBAK_GAMBAR';
      case 2:
        return 'GAME_PASANGKAN';
      case 3:
        return 'GAME_LINI_MASA';
      case 4:
      default:
        return 'GAME_PENJAGA_BUDAYA';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('MAP_MENU');
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-700 hover:bg-sky-50 text-xs font-bold transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>

        {/* Mission Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                soundManager.playClick();
                onSelectMission(m.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                m.id === mission.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Misi {m.id}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
        <img
          src={mission.heroImage}
          alt={mission.title}
          referrerPolicy="no-referrer"
          className="w-full h-64 sm:h-80 object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black tracking-wide inline-block">
                {mission.title}
              </span>

              {/* Audio Narration Button for Mission Overview */}
              <button
                type="button"
                onClick={() =>
                  handleSpeak(
                    'overview',
                    `${mission.title}. ${mission.themeTitle}. ${mission.overview}`
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all ${
                  activeNarrationId === 'overview'
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
                }`}
                title="Dengarkan narasi pengantar misi ini"
              >
                {activeNarrationId === 'overview' ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Dengarkan Pengantar</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading">
              {mission.themeTitle}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
              {mission.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Badge Status Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
              isCompleted ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                Pusaka Misi Ini:
              </span>
              {isCompleted && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Telah Diraih ✨
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              {mission.badgeName}
            </h2>
            <p className="text-xs text-slate-500">{mission.badgeDesc}</p>
          </div>
        </div>

        {!isCompleted ? (
          <button
            onClick={handleClaimBadge}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Selesaikan & Klaim Lencana (+20 Poin)</span>
          </button>
        ) : (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            Lencana Telah Masuk Lemari Pusaka
          </div>
        )}
      </div>

      {/* Main Educational Learning Sections with Voice Narration */}
      <div className="space-y-6">
        {mission.sections.map((sec, idx) => {
          const sectionId = `sec_${idx}`;
          const isSpeakingThis = activeNarrationId === sectionId;
          const fullSectionText = `${sec.heading}. ${sec.body.join(' ')}. ${sec.highlightBox || ''}`;

          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-xs space-y-4 transition-all ${
                isSpeakingThis ? 'border-sky-400 ring-2 ring-sky-200 bg-sky-50/20' : 'border-slate-200/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-sky-500 inline-block" />
                  {sec.heading}
                </h2>

                {/* Voice Narration Button */}
                <button
                  type="button"
                  onClick={() => handleSpeak(sectionId, fullSectionText)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isSpeakingThis
                      ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/60'
                  }`}
                  title="Dengarkan penjelasan suara materi ini"
                >
                  {isSpeakingThis ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Hentikan Suara</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-sky-600" />
                      <span>Dengarkan Penjelasan 🔊</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2.5 text-slate-700 text-sm leading-relaxed">
                {sec.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {sec.highlightBox && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
                  {sec.highlightBox}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MISSION-SPECIFIC INTERACTIVE COMPONENT */}

      {/* Mission 2: Interactive Cultural Gallery */}
      {mission.id === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Galeri Interaktif Sulawesi Selatan</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Sentuh Warisan Budaya untuk Membuka Rahasianya
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CULTURAL_GALLERY.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedGalleryItem(item);
                }}
                className={`p-3 rounded-2xl text-left border-2 transition-all group flex flex-col justify-between ${
                  selectedGalleryItem?.id === item.id
                    ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300'
                    : 'border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 font-heading line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-amber-700 font-bold">{item.origin}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Gallery Item Box with Audio Narration */}
          {selectedGalleryItem && (
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 animate-in fade-in space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                    {selectedGalleryItem.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 font-heading mt-1">
                    {selectedGalleryItem.title} ({selectedGalleryItem.origin})
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(
                      `gallery_${selectedGalleryItem.id}`,
                      `${selectedGalleryItem.title} dari ${selectedGalleryItem.origin}. ${selectedGalleryItem.description}. ${selectedGalleryItem.facts}`
                    )
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeNarrationId === `gallery_${selectedGalleryItem.id}`
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                  title="Dengarkan penjelasan warisan budaya ini"
                >
                  {activeNarrationId === `gallery_${selectedGalleryItem.id}` ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Hentikan Suara</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Dengarkan Penjelasan 🔊</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedGalleryItem.description}
              </p>
              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{selectedGalleryItem.facts}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mission 3: Interactive Timeline Wheel (Masa Lalu -> Masa Kini -> Masa Depan) */}
      {mission.id === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Kompas Perjalanan Waktu</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Garis Waktu Reflektif: Sejarah Membuat Kita Maju
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilih fase waktu di bawah ini untuk melihat peran dan tanggung jawab setiap generasi:
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { step: 0 as const, label: '1. MASA LALU', sub: 'Fondasi Warisan' },
              { step: 1 as const, label: '2. MASA KINI', sub: 'Tugas Kita Hari Ini' },
              { step: 2 as const, label: '3. MASA DEPAN', sub: 'Cita-Cita Bangsa' },
            ].map((tab) => (
              <button
                key={tab.step}
                onClick={() => {
                  soundManager.playClick();
                  setTimelineStep(tab.step);
                }}
                className={`p-3 rounded-2xl text-center border-2 transition-all ${
                  timelineStep === tab.step
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                }`}
              >
                <p className={`text-xs font-black font-heading ${timelineStep === tab.step ? 'text-emerald-800' : 'text-slate-700'}`}>
                  {tab.label}
                </p>
                <p className="text-[10px] text-slate-500">{tab.sub}</p>
              </button>
            ))}
          </div>

          {/* Step Detail Card with Voice Narration */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200/60">
              <span className="text-xs font-bold text-emerald-800">
                Fase {timelineStep + 1} dari 3
              </span>
              <button
                type="button"
                onClick={() => {
                  const text =
                    timelineStep === 0
                      ? 'Masa Lalu: Jejak Perjuangan dan Mahakarya Leluhur. Nenek moyang kita berjuang mempertahankan kehormatan tanah air dari penjajahan VOC, mengarungi samudra luas dengan perahu Pinisi, dan membangun rumah adat Tongkonan yang harmonis dengan alam. Semua ini menjadi akar budaya yang kokoh bagi bangsa Indonesia.'
                      : timelineStep === 1
                      ? 'Masa Kini: Tanggung Jawab Siswa Kelas V SD. Sebagai pelajar, kita tidak perlu berperang membawa senjata. Perjuangan kita saat ini adalah belajar tekun, tidak membuang sampah sembarangan di cagar budaya, menghargai teman dari suku lain, dan bangga menampilkan tarian serta kesenian daerah.'
                      : 'Masa Depan: Indonesia Emas yang Maju dan Berkarakter. Dengan menguasai sains, teknologi modern, dan tetap memegang teguh nilai gotong royong serta falsafah Siri na Pacce, bangsa Indonesia akan menjadi bangsa unggul kelas dunia yang tetap berjiwa luhur dan bermartabat.';
                  handleSpeak(`timeline_${timelineStep}`, text);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeNarrationId === `timeline_${timelineStep}`
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
                title="Dengarkan penjelasan fase waktu ini"
              >
                {activeNarrationId === `timeline_${timelineStep}` ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dengarkan Fase Ini 🔊</span>
                  </>
                )}
              </button>
            </div>

            {timelineStep === 0 && (
              <div>
                <h3 className="text-base font-bold text-emerald-950 font-heading">
                  Masa Lalu: Jejak Perjuangan & Mahakarya Leluhur
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  Nenek moyang kita berjuang mempertahankan kehormatan tanah air dari penjajahan VOC, mengarungi samudra luas dengan perahu Pinisi, dan membangun rumah adat Tongkonan yang harmonis dengan alam. Semua ini menjadi akar budaya yang kokoh bagi bangsa Indonesia.
                </p>
              </div>
            )}
            {timelineStep === 1 && (
              <div>
                <h3 className="text-base font-bold text-emerald-950 font-heading">
                  Masa Kini: Tanggung Jawab Siswa Kelas V SD
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  Sebagai pelajar, kita tidak perlu berperang membawa senjata. Perjuangan kita saat ini adalah belajar tekun, tidak membuang sampah sembarangan di cagar budaya, menghargai teman dari suku lain, dan bangga menampilkan tarian serta kesenian daerah.
                </p>
              </div>
            )}
            {timelineStep === 2 && (
              <div>
                <h3 className="text-base font-bold text-emerald-950 font-heading">
                  Masa Depan: Indonesia Emas yang Maju dan Berkarakter
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  Dengan menguasai sains, teknologi modern, dan tetap memegang teguh nilai gotong royong serta falsafah &ldquo;Siri&apos; na Pacce&rdquo;, bangsa Indonesia akan menjadi bangsa unggul kelas dunia yang tetap berjiwa luhur dan bermartabat.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mission 4: Interactive Stewardship Pledge Checklist */}
      {mission.id === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
              <HeartHandshake className="w-4 h-4" />
              <span>Komitmen Penjaga Warisan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              5 Janji Aksi Nyata Penjelajah Cilik
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Centang setiap aksi nyata yang siap kamu lakukan untuk merawat budaya Indonesia:
            </p>
          </div>

          <div className="space-y-3">
            {[
              '1. Bersemangat mempelajari lagu, tarian daerah, atau cerita rakyat di sekolah.',
              '2. Mengunjungi museum bersejarah atau cagar budaya bersama keluarga/sekolah.',
              '3. Menjaga kebersihan dan tidak mencoret-coret fasilitas saat berada di tempat bersejarah.',
              '4. Bangga mengenakan pakaian adat, batik, atau kain tenun tradisional.',
              '5. Memperkenalkan keindahan budaya daerah kepada orang lain dengan rasa bangga.',
            ].map((action, idx) => {
              const isChecked = checkedActions.includes(idx);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleAction(idx)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs sm:text-sm leading-relaxed">{action}</span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-orange-500 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-orange-100/70 border border-orange-200 text-xs text-orange-900 font-medium">
            Telah mencentang <strong>{checkedActions.length} / 5</strong> komitmen aksi nyata. Kamu adalah pahlawan pelindung warisan budaya masa depan!
          </div>
        </div>
      )}

      {/* Mission Footer Challenge & Navigation Launcher */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Tantangan Keterampilan Misi {mission.id}
          </p>
          <h3 className="text-xl sm:text-2xl font-black font-heading">
            Uji Pemahamanmu di Arena Permainan!
          </h3>
          <p className="text-xs text-slate-300">
            Dapatkan +10 poin per jawaban tepat dan asah kemampuan analisis sejarahmu.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate(getGameTargetScreen(mission.id));
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Mainkan Game Tantangan Misi {mission.id}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigate('QUIZ_EVALUASI');
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FileQuestion className="w-4 h-4 text-sky-300" />
            <span>Kuis 20 Soal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
