import { Type } from "@angular/core";

export interface Book {
  id: number;
  en?: string;
  zh?: string;
}
export interface BookUnit {
  id: number;
  en: string;
  lessons: Lesson[];
}
export interface Lesson {
  id: number;
  en: string;
  zh: string;
}
export interface LessonNewWords {
  lesson: number;
  words: string[];
}
export interface LessonContent {
  title: Sentence;
  audio?: string;
  sentences?: Sentence[];
}
export interface Sentence {
  en: string;
  zh?: string;
  start?: number;
  end?: number;
}
export interface Modal{
  show: boolean;
  component: Type<any>
}
 
