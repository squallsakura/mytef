/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the SuperMemo SM-2 algorithm
 */

export interface CardReviewData {
  repetitions: number;
  interval: number;
  easeFactor: number;
  dueDate: Date;
}

export interface Card extends CardReviewData {
  id: string;
  front: string;
  back: string;
  hint?: string;
  example?: string;
  exampleTranslation?: string;
  verbGroup?: 'er' | 'ir' | 're' | 'irregular';
  lastReviewed?: Date;
}

export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

/**
 * Quality ratings for review responses
 */
export enum ReviewQuality {
  Again = 0,      // Complete blackout
  Hard = 1,        // Incorrect, but upon seeing correct answer it felt familiar
  Difficult = 2,   // Incorrect, but correct answer seemed easy to recall
  Good = 3,        // Correct with serious difficulty
  Easy = 4,        // Correct after hesitation
  Perfect = 5,     // Perfect response
}

/**
 * Calculate the next review date and update card data based on SM-2 algorithm
 */
export function calculateNextReview(
  card: CardReviewData,
  quality: ReviewQuality
): CardReviewData {
  let { repetitions, interval, easeFactor } = card;

  if (quality >= 3) {
    // Successful recall
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

    repetitions += 1;
  } else {
    // Failed recall - reset
    repetitions = 0;
    interval = 1;
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return {
    repetitions,
    interval,
    easeFactor,
    dueDate,
  };
}

/**
 * Get quality rating from user's answer
 */
export function getQuality(userAnswer: string, correctAnswer: string): ReviewQuality {
  const userLower = userAnswer.toLowerCase().trim();
  const correctLower = correctAnswer.toLowerCase().trim();

  if (userLower === correctLower) {
    return ReviewQuality.Easy;
  }

  // Check for minor typos (off by one character)
  if (Math.abs(userLower.length - correctLower.length) <= 1) {
    // Simple Levenshtein distance check
    let differences = 0;
    const maxLen = Math.max(userLower.length, correctLower.length);
    
    for (let i = 0; i < maxLen; i++) {
      if (userLower[i] !== correctLower[i]) {
        differences++;
      }
    }
    
    if (differences <= 1) {
      return ReviewQuality.Good;
    }
  }

  return ReviewQuality.Again;
}

/**
 * Format interval for display
 */
export function formatInterval(days: number): string {
  if (days === 0) return 'Now';
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.round(days / 7)} weeks`;
  if (days < 365) return `${Math.round(days / 30)} months`;
  return `${Math.round(days / 365)} years`;
}

/**
 * Create a new card with default values
 */
export function createCard(
  id: string,
  front: string,
  back: string,
  options?: Partial<Omit<Card, 'id' | 'front' | 'back'>>
): Card {
  return {
    id,
    front,
    back,
    repetitions: 0,
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    dueDate: new Date(),
    ...options,
  };
}