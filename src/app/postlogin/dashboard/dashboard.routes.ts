import { Routes } from '@angular/router';
import { NewWords } from '../../new-words/new-words';
import { Refer } from '../../refer/refer';
import { Dictionary } from '../dictionary/dictionary';
import { LessonContent } from '../lesson-content/lesson-content';
import { LessonNote } from '../lesson-note/lesson-note';
import { LessonTyping } from '../lesson-typing/lesson-typing';
import { LessonGuide } from '../lesson-guide/lesson-guide';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'read',
    pathMatch: 'full',
  },
  {
    path: 'read',
    component: LessonContent,
  },
  {
    path: 'words',
    component: NewWords,
  },
  {
    path: 'notes',
    component: LessonNote,
  },
  {
    path: 'guide',
    component: LessonGuide,
  },
  {
    path: 'type',
    component: LessonTyping,
  },
  {
    path: 'refer',
    component: Refer,
  },
  {
    path: 'dict',
    component: Dictionary,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
