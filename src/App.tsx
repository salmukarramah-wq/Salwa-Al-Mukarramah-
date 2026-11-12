/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen, PlayerProfile, Badge } from './types/game';
import { Navbar } from './components/Navbar';
import { WelcomeHero } from './components/WelcomeHero';
import { MissionsMap } from './components/MissionsMap';
import { MissionView } from './components/MissionView';
import { GameTebakGambar } from './components/GameTebakGambar';
import { GamePasangkanBudaya } from './components/GamePasangkanBudaya';
import { GameLiniMasa } from './components/GameLiniMasa';
import { GamePenjagaBudaya } from './components/GamePenjagaBudaya';
import { QuizEvaluasi } from './components/QuizEvaluasi';
import { SertifikatHasil } from './components/SertifikatHasil';
import { CurriculumModal } from './components/CurriculumModal';
import { GuideModal } from './components/GuideModal';
import { AsesmenModal } from './components/AsesmenModal';
import { soundManager } from './utils/audio';

const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_1',
    name: 'Prasasti Keberanian Gowa-Bone',
    missionNumber: 1,
    description: 'Menguasai sejarah kerajaan maritim, tokoh pahlawan Sultan Hasanuddin, dan benteng pertahanan.',
    iconName: 'ShieldCheck',
    unlocked: false,
  },
  {
    id: 'badge_2',
    name: 'Kemaritiman Pinisi Samudra',
    missionNumber: 2,
    description: 'Mengidentifikasi warisan budaya benda dan takbenda khas Sulawesi Selatan yang mendunia.',
    iconName: 'Compass',
    unlocked: false,
  },
  {
    id: 'badge_3',
    name: 'Tongkonan Gotong Royong Leluhur',
    missionNumber: 3,
    description: 'Menghubungkan masa lalu, masa kini, dan masa depan melalui keteladanan nilai luhur bangsa.',
    iconName: 'Award',
    unlocked: false,
  },
  {
    id: 'badge_4',
    name: 'Penjaga Warisan Budaya Bangsa',
    missionNumber: 4,
    description: 'Bertekad menjaga, merawat, dan melestarikan budaya Nusantara dalam kehidupan sehari-hari.',
    iconName: 'Medal',
    unlocked: false,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('WELCOME');
  const [selectedMissionId, setSelectedMissionId] = useState<number>(1);

  // Modals state
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);

  // Player state
  const [player, setPlayer] = useState<PlayerProfile>({
    name: '',
    avatar: 'daeng_cilik',
    score: 0,
    completedMissions: [],
    completedGames: [],
    badges: INITIAL_BADGES,
    quizAnswers: {},
    quizScore: 0,
    reflectionAnswers: {},
  });

  const handleStartGame = (name: string, avatar: string) => {
    setPlayer((prev) => ({
      ...prev,
      name,
      avatar,
    }));
    setCurrentScreen('MAP_MENU');
  };

  const handleAddScore = (points: number) => {
    setPlayer((prev) => ({
      ...prev,
      score: prev.score + points,
    }));
  };

  const handleCompleteMission = (missionId: number) => {
    setPlayer((prev) => {
      const alreadyCompleted = prev.completedMissions.includes(missionId);
      const newCompleted = alreadyCompleted
        ? prev.completedMissions
        : [...prev.completedMissions, missionId];
      const newScore = alreadyCompleted ? prev.score : prev.score + 20;

      const newBadges = prev.badges.map((b) =>
        b.missionNumber === missionId ? { ...b, unlocked: true } : b
      );

      return {
        ...prev,
        score: newScore,
        completedMissions: newCompleted,
        badges: newBadges,
      };
    });
  };

  const handleGameCompleted = (gameKey: string) => {
    setPlayer((prev) => {
      if (prev.completedGames.includes(gameKey)) return prev;
      return {
        ...prev,
        completedGames: [...prev.completedGames, gameKey],
      };
    });
  };

  const handleRecordQuizAnswer = (
    questionId: number,
    selectedIndex: number,
    isFirstTryCorrect: boolean
  ) => {
    setPlayer((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: selectedIndex },
      quizScore: isFirstTryCorrect ? prev.quizScore + 10 : prev.quizScore,
    }));
  };

  const handleSaveReflection = (answers: Record<string, number>) => {
    setPlayer((prev) => ({
      ...prev,
      reflectionAnswers: answers,
    }));
  };

  const handleResetAll = () => {
    setPlayer({
      name: '',
      avatar: 'daeng_cilik',
      score: 0,
      completedMissions: [],
      completedGames: [],
      badges: INITIAL_BADGES,
      quizAnswers: {},
      quizScore: 0,
      reflectionAnswers: {},
    });
    setCurrentScreen('WELCOME');
  };

  const unlockedBadgesCount = player.badges.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-screen bg-[#F4F9FD] flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        playerName={player.name}
        score={player.score}
        unlockedBadgesCount={unlockedBadgesCount}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenReflection={() => setIsReflectionOpen(true)}
      />

      {/* Screen Router */}
      <main className="flex-1">
        {currentScreen === 'WELCOME' && (
          <WelcomeHero
            onStart={handleStartGame}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenCurriculum={() => setIsCurriculumOpen(true)}
          />
        )}

        {currentScreen === 'MAP_MENU' && (
          <MissionsMap
            playerName={player.name}
            avatar={player.avatar}
            score={player.score}
            completedMissions={player.completedMissions}
            badges={player.badges}
            onSelectMission={(id) => {
              setSelectedMissionId(id);
              setCurrentScreen('MISSION_DETAIL');
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'MISSION_DETAIL' && (
          <MissionView
            missionId={selectedMissionId}
            completedMissions={player.completedMissions}
            badges={player.badges}
            onCompleteMission={handleCompleteMission}
            onNavigate={setCurrentScreen}
            onSelectMission={setSelectedMissionId}
          />
        )}

        {currentScreen === 'GAME_TEBAK_GAMBAR' && (
          <GameTebakGambar
            onAddScore={handleAddScore}
            onNavigate={setCurrentScreen}
            onGameCompleted={handleGameCompleted}
          />
        )}

        {currentScreen === 'GAME_PASANGKAN' && (
          <GamePasangkanBudaya
            onAddScore={handleAddScore}
            onNavigate={setCurrentScreen}
            onGameCompleted={handleGameCompleted}
          />
        )}

        {currentScreen === 'GAME_LINI_MASA' && (
          <GameLiniMasa
            onAddScore={handleAddScore}
            onNavigate={setCurrentScreen}
            onGameCompleted={handleGameCompleted}
          />
        )}

        {currentScreen === 'GAME_PENJAGA_BUDAYA' && (
          <GamePenjagaBudaya
            onAddScore={handleAddScore}
            onNavigate={setCurrentScreen}
            onGameCompleted={handleGameCompleted}
          />
        )}

        {currentScreen === 'QUIZ_EVALUASI' && (
          <QuizEvaluasi
            onAddScore={handleAddScore}
            onNavigate={setCurrentScreen}
            onRecordQuizAnswer={handleRecordQuizAnswer}
            recordedAnswers={player.quizAnswers}
          />
        )}

        {currentScreen === 'FINAL_RESULT' && (
          <SertifikatHasil
            player={player}
            onResetAll={handleResetAll}
            onNavigate={setCurrentScreen}
            onOpenReflection={() => setIsReflectionOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <AsesmenModal
        isOpen={isReflectionOpen}
        onClose={() => setIsReflectionOpen(false)}
        reflectionAnswers={player.reflectionAnswers}
        onSaveReflection={handleSaveReflection}
      />

      {/* Footer */}
      <footer className="no-print border-t border-sky-100 bg-white/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            IPAS Kelas V SD Fase C · Bab 5: Daerahku yang Bersejarah (Sulawesi Selatan)
          </p>
          <p className="text-slate-400">
            Jelajah Sejarah Sulawesi Selatan · Petualangan Penjaga Warisan Budaya
          </p>
        </div>
      </footer>
    </div>
  );
}
