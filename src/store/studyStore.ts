/**
 * 本地存储的学习状态管理
 */

import { Card, CardReviewData, createCard, ReviewQuality, getQuality, calculateNextReview } from '../lib/sm2';
import { vocabularyData, vocabularyToCard } from '../data/vocabulary';

const STORAGE_KEY = 'tef-study-data';

export interface StudySettings {
  newCardsPerDay: number;
  reviewCardsPerDay: number;
  targetCLB: number;
}

export interface StudyStats {
  totalLearned: number;
  mastered: number;
  streakDays: number;
  lastStudyDate: string;
}

export interface StudyState {
  cards: Card[];
  settings: StudySettings;
  stats: StudyStats;
  todayNewCount: number;
  todayReviewCount: number;
}

const DEFAULT_SETTINGS: StudySettings = {
  newCardsPerDay: 20,
  reviewCardsPerDay: 100,
  targetCLB: 5,
};

const DEFAULT_STATS: StudyStats = {
  totalLearned: 0,
  mastered: 0,
  streakDays: 0,
  lastStudyDate: '',
};

// 初始化词汇卡
function initializeCards(): Card[] {
  return vocabularyData.slice(0, 100).map(vocabularyToCard);
}

// 从本地存储加载
export function loadFromStorage(): StudyState {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as StudyState;
      // 检查是否是同一天，重置计数
      const today = new Date().toDateString();
      if (parsed.stats.lastStudyDate !== today) {
        // 新的一天，检查是否连续
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (parsed.stats.lastStudyDate === yesterday.toDateString()) {
          parsed.stats.streakDays += 1;
        } else {
          parsed.stats.streakDays = 1;
        }
        parsed.stats.lastStudyDate = today;
        parsed.todayNewCount = 0;
        parsed.todayReviewCount = 0;
      }
      return { ...parsed, cards: parsed.cards || initializeCards() };
    }
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
  
  return {
    cards: initializeCards(),
    settings: DEFAULT_SETTINGS,
    stats: { ...DEFAULT_STATS, streakDays: 1, lastStudyDate: new Date().toDateString() },
    todayNewCount: 0,
    todayReviewCount: 0,
  };
}

// 保存到本地存储
export function saveToStorage(state: StudyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

// 获取待复习的卡片
export function getDueCards(state: StudyState): Card[] {
  const now = new Date();
  return state.cards.filter(card => {
    const dueDate = new Date(card.dueDate);
    return dueDate <= now && state.todayReviewCount < state.settings.reviewCardsPerDay;
  });
}

// 获取新卡片
export function getNewCards(state: StudyState): Card[] {
  return state.cards
    .filter(card => card.repetitions === 0 && state.todayNewCount < state.settings.newCardsPerDay)
    .slice(0, 10);
}

// 获取需要专门复习的错词（动词变位错误）
export function getErrorCards(state: StudyState): Card[] {
  return state.cards.filter(card => card.repetitions > 0 && card.repetitions < 3);
}

// 处理复习回应
export function processReview(
  state: StudyState,
  cardId: string,
  userAnswer: string
): { state: StudyState; isCorrect: boolean; quality: ReviewQuality } {
  const cardIndex = state.cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) {
    return { state, isCorrect: false, quality: ReviewQuality.Again };
  }

  const card = state.cards[cardIndex];
  const quality = getQuality(userAnswer, card.back);
  const isCorrect = quality >= ReviewQuality.Good;

  const updatedCardData = calculateNextReview(card, quality);
  
  const newCards = [...state.cards];
  newCards[cardIndex] = {
    ...newCards[cardIndex],
    ...updatedCardData,
    lastReviewed: new Date(),
  };

  const newState: StudyState = {
    ...state,
    cards: newCards,
    todayReviewCount: state.todayReviewCount + 1,
    stats: {
      ...state.stats,
      totalLearned: isCorrect ? state.stats.totalLearned : state.stats.totalLearned + 1,
      mastered: newCards[cardIndex].interval > 21 
        ? state.stats.mastered + 1 
        : state.stats.mastered,
    },
  };

  return { state: newState, isCorrect, quality };
}

// 更新设置
export function updateSettings(state: StudyState, newSettings: Partial<StudySettings>): StudyState {
  return {
    ...state,
    settings: { ...state.settings, ...newSettings },
  };
}

// 获取学习进度
export function getProgress(state: StudyState): { learned: number; total: number; mastered: number } {
  const learned = state.cards.filter(c => c.repetitions > 0).length;
  const mastered = state.cards.filter(c => c.interval > 21).length;
  return {
    learned,
    total: state.cards.length,
    mastered,
  };
}