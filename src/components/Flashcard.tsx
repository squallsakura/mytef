import { useState } from 'react';
import { Card, ReviewQuality } from '../lib/sm2';
import { VocabularyItem, verbConjugations } from '../data/vocabulary';

interface FlashcardProps {
  card: Card;
  vocabulary: VocabularyItem | undefined;
  onAnswer: (userAnswer: string, quality: ReviewQuality) => void;
  onSkip: () => void;
  showHint?: boolean;
}

export function Flashcard({ card, vocabulary, onAnswer, onSkip, showHint = true }: FlashcardProps) {
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 生成填空题
  const generateCloze = (text: string, answer: string): { question: string; hint: string } => {
    // 找到答案在句子中的位置
    const parts = text.split(answer);
    if (parts.length === 1) {
      // 答案不在句子里，直接显示英文/中文提示
      return {
        question: `Translate: "${text}"`,
        hint: `(${answer.length} letters)`,
      };
    }
    
    // 用空白替换答案
    const question = parts[0] + '______' + parts.slice(1).join('');
    const hint = `(${answer.length} letters)`;
    
    return { question, hint };
  };

  // 获取正确答案
  const correctAnswer = card.back;
  const { question, hint } = vocabulary?.example 
    ? generateCloze(vocabulary.example, correctAnswer)
    : { question: `What is the French word for: "${vocabulary?.english || card.front}"`, hint: '' };

  // 检查答案
  const checkAnswer = () => {
    if (!userInput.trim()) return;
    
    const userAns = userInput.toLowerCase().trim();
    const correct = correctAnswer.toLowerCase().trim();
    
    // 计算质量
    let quality: ReviewQuality;
    if (userAns === correct) {
      quality = ReviewQuality.Easy;
      setIsCorrect(true);
    } else if (Math.abs(userAns.length - correct.length) <= 1) {
      // 简单的Levenshtein检查
      let diff = 0;
      for (let i = 0; i < Math.max(userAns.length, correct.length); i++) {
        if (userAns[i] !== correct[i]) diff++;
      }
      quality = diff <= 1 ? ReviewQuality.Good : ReviewQuality.Again;
      setIsCorrect(quality >= ReviewQuality.Good);
    } else {
      quality = ReviewQuality.Again;
      setIsCorrect(false);
    }
    
    setSubmitted(true);
    onAnswer(userInput, quality);
  };

  // 获取动词变位
  const getVerbConjugations = () => {
    if (!vocabulary?.verbGroup || vocabulary.verbGroup === 'er' || vocabulary.verbGroup === 'ir' || vocabulary.verbGroup === 're') {
      return verbConjugations[correctAnswer];
    }
    return verbConjugations[correctAnswer];
  };

  // 重置并继续
  const handleContinue = () => {
    setUserInput('');
    setSubmitted(false);
    setIsCorrect(false);
    onSkip();
  };

  const conjugations = getVerbConjugations();

  return (
    <div className="flashcard-container">
      {!submitted ? (
        // 问题界面
        <div className="question-view">
          <div className="category-tag">
            {vocabulary?.category === 'verb' && '🔊'}
            {vocabulary?.category === 'noun' && '📝'}
            {vocabulary?.category === 'expression' && '💬'}
            {' '}{vocabulary?.category || 'word'}
          </div>
          
          <div className="question-text">{question}</div>
          
          {showHint && hint && (
            <div className="hint-text">{hint}</div>
          )}
          
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type your answer..."
            className="answer-input"
            autoFocus
          />
          
          <button onClick={checkAnswer} className="submit-btn" disabled={!userInput.trim()}>
            Submit
          </button>
        </div>
      ) : (
        // 答案反馈界面
        <div className={`answer-view ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <div className="result-icon">✅</div>
              <div className="result-text">Correct!</div>
            </>
          ) : (
            <>
              <div className="result-icon">❌</div>
              <div className="result-text">Incorrect</div>
            </>
          )}
          
          <div className="correct-answer">
            <span className="label">Answer:</span>
            <span className="value">{correctAnswer}</span>
          </div>
          
          <div className="meaning">
            {vocabulary?.english} • {vocabulary?.chinese}
          </div>
          
          {/* 动词变位显示 - 仅在错误时显示 */}
          {!isCorrect && conjugations && (
            <div className="conjugation-panel">
              <div className="conjugation-title">
                📚 Verb Conjugations ({correctAnswer})
              </div>
              <div className="conjugation-grid">
                <div className="tense-section">
                  <div className="tense-title"> Présent (现在时)</div>
                  <div className="conjugation-row">
                    <span>je</span><span>{conjugations.je}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>tu</span><span>{conjugations.tu}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>il/elle</span><span>{conjugations.il}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>nous</span><span>{conjugations.nous}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>vous</span><span>{conjugations.vous}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>ils/elles</span><span>{conjugations.ils}</span>
                  </div>
                </div>
                
                <div className="tense-section">
                  <div className="tense-title"> Passé Composé (复合过去时)</div>
                  <div className="conjugation-row">
                    <span>je</span><span>j'ai {conjugations.je.replace('e', 'é')}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>tu</span><span>tu as {conjugations.tu.replace('s', 'é')}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>il/elle</span><span>il a {conjugations.il.replace('e', 'é')}</span>
                  </div>
                </div>
                
                <div className="tense-section">
                  <div className="tense-title"> Futur (将来时)</div>
                  <div className="conjugation-row">
                    <span>je</span><span>{conjugations.jeFutur}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>tu</span><span>{conjugations.tu}as</span>
                  </div>
                  <div className="conjugation-row">
                    <span>il/elle</span><span>{conjugations.il}a</span>
                  </div>
                </div>
                
                <div className="tense-section">
                  <div className="tense-title"> Impératif (命令式)</div>
                  <div className="conjugation-row">
                    <span>tu</span><span>{conjugations.tuCommander}</span>
                  </div>
                  <div className="conjugation-row">
                    <span>nous</span><span>{conjugations.nousCommander}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {isCorrect && vocabulary?.example && (
            <div className="example-section">
              <div className="example-label">Example:</div>
              <div className="example-text">{vocabulary.example}</div>
              <div className="example-translation">{vocabulary.exampleTranslation}</div>
            </div>
          )}
          
          <button onClick={handleContinue} className="continue-btn">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}