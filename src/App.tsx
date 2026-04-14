import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Flashcard } from './components/Flashcard';
import { 
  loadFromStorage, 
  saveToStorage, 
  getDueCards, 
  getNewCards, 
  processReview,
  StudyState,
  updateSettings,
  getProgress
} from './store/studyStore';
import { vocabularyData } from './data/vocabulary';
import { ReviewQuality } from './lib/sm2';

type View = 'dashboard' | 'study' | 'settings';

function App() {
  const [state, setState] = useState<StudyState>(() => loadFromStorage());
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyQueue, setStudyQueue] = useState<typeof state.cards>([]);
  const [mode, setMode] = useState<'review' | 'new'>('review');

  // 保存状态
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  // 加载待学习卡片
  const loadStudyQueue = useCallback((studyMode: 'review' | 'new') => {
    let queue: typeof state.cards = [];
    if (studyMode === 'review') {
      queue = getDueCards(state);
    } else {
      queue = getNewCards(state);
    }
    setStudyQueue(queue);
    setCurrentCardIndex(0);
    setMode(studyMode);
  }, [state]);

  // 开始学习
  const startStudy = (studyMode: 'review' | 'new') => {
    loadStudyQueue(studyMode);
    setCurrentView('study');
  };

  // 处理答案
  const handleAnswer = (userAnswer: string, quality: ReviewQuality) => {
    if (studyQueue.length === 0) return;
    
    const card = studyQueue[currentCardIndex];
    const result = processReview(state, card.id, userAnswer);
    setState(result.state);
  };

  // 跳过当前卡
  const handleSkip = () => {
    if (currentCardIndex < studyQueue.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentView('dashboard');
    }
  };

  // 获取当前卡片
  const currentCard = studyQueue[currentCardIndex];
  const currentVocab = currentCard ? vocabularyData.find(v => v.id === currentCard.id) : undefined;

  // 进度统计
  const progress = getProgress(state);
  const dueCards = getDueCards(state);
  const newCards = getNewCards(state);

  // 设置更新
  const handleSettingsChange = (newSettings: Partial<typeof state.settings>) => {
    setState(updateSettings(state, newSettings));
  };

  return (
    <div className="app">
      {/* 顶部导航 */}
      <header className="app-header">
        <h1>📚 TEF Prepare</h1>
        {currentView !== 'dashboard' && (
          <button onClick={() => setCurrentView('dashboard')} className="back-btn">
            ← Back
          </button>
        )}
      </header>

      {/* 主内容区 */}
      <main className="app-main">
        {currentView === 'dashboard' && (
          <div className="dashboard">
            {/* 每日概览 */}
            <div className="daily-card">
              <div className="daily-title">📅 Today</div>
              <div className="daily-stats">
                <div className="stat-item">
                  <span className="stat-value">{dueCards.length}</span>
                  <span className="stat-label">Review</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{newCards.length}</span>
                  <span className="stat-label">New</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">🔥 {state.stats.streakDays}</span>
                  <span className="stat-label">Streak</span>
                </div>
              </div>
            </div>

            {/* 学习按钮 */}
            <div className="action-buttons">
              <button 
                className="action-btn primary"
                onClick={() => startStudy('review')}
                disabled={dueCards.length === 0}
              >
                📝 Start Review ({dueCards.length})
              </button>
              <button 
                className="action-btn"
                onClick={() => startStudy('new')}
                disabled={newCards.length === 0}
              >
                ➕ Learn New ({newCards.length})
              </button>
            </div>

            {/* 进度条 */}
            <div className="progress-section">
              <div className="progress-title">Learning Progress</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(progress.learned / progress.total) * 100}%` }}
                />
              </div>
              <div className="progress-labels">
                <span>{progress.learned} learned</span>
                <span>{progress.mastered} mastered</span>
              </div>
            </div>

            {/* 设置入口 */}
            <button 
              className="settings-link"
              onClick={() => setCurrentView('settings')}
            >
              ⚙️ Settings
            </button>
          </div>
        )}

        {currentView === 'study' && currentCard && (
          <div className="study-view">
            <div className="study-progress">
              {currentCardIndex + 1} / {studyQueue.length}
            </div>
            <Flashcard
              card={currentCard}
              vocabulary={currentVocab}
              onAnswer={handleAnswer}
              onSkip={handleSkip}
            />
          </div>
        )}

        {currentView === 'settings' && (
          <div className="settings-view">
            <div className="settings-title">⚙️ Learning Settings</div>
            
            <div className="setting-item">
              <label>New cards per day</label>
              <input
                type="number"
                value={state.settings.newCardsPerDay}
                onChange={(e) => handleSettingsChange({ newCardsPerDay: parseInt(e.target.value) || 20 })}
                min={1}
                max={100}
              />
            </div>

            <div className="setting-item">
              <label>Review cards per day</label>
              <input
                type="number"
                value={state.settings.reviewCardsPerDay}
                onChange={(e) => handleSettingsChange({ reviewCardsPerDay: parseInt(e.target.value) || 100 })}
                min={1}
                max={500}
              />
            </div>

            <div className="setting-item">
              <label>Target CLB level</label>
              <select
                value={state.settings.targetCLB}
                onChange={(e) => handleSettingsChange({ targetCLB: parseInt(e.target.value) })}
              >
                <option value={4}>CLB 4</option>
                <option value={5}>CLB 5</option>
                <option value={6}>CLB 6</option>
                <option value={7}>CLB 7</option>
                <option value={8}>CLB 8</option>
                <option value={9}>CLB 9</option>
                <option value={10}>CLB 10</option>
              </select>
            </div>

            <div className="stats-summary">
              <h3>📊 Statistics</h3>
              <p>Total vocabulary: {state.cards.length}</p>
              <p>Words mastered: {progress.mastered}</p>
              <p>Current streak: {state.stats.streakDays} days</p>
            </div>

            <button 
              className="back-btn"
              onClick={() => setCurrentView('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;