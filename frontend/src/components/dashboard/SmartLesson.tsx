/**
 * SmartLesson — Core Lesson Reader Container
 *
 * Imports and renders the distraction-free LessonReader.
 */

import React from 'react';
import { LessonReader } from '../smart-lessons/LessonReader';

interface Props {
  onNavigate?: (view: string) => void;
  lessonId?: string;
  /** When true, opens the chapter at the quiz section with scroll gate bypassed. */
  startAtQuiz?: boolean;
}

export function SmartLesson({ onNavigate, lessonId, startAtQuiz }: Props) {
  return (
    <LessonReader
      lessonId={lessonId || 'phy_thermo'}
      onNavigate={onNavigate}
      startAtQuiz={startAtQuiz}
    />
  );
}

