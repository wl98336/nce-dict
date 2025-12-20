import { RedirectCommand, Router, Routes } from '@angular/router';
import { NewWords } from '../../new-words/new-words';
import { Refer } from '../../refer/refer';
import { Dictionary } from '../dictionary/dictionary';
import { LessonContent } from '../lesson-content/lesson-content';
import { LessonNote } from '../lesson-note/lesson-note';
import { LessonTyping } from '../lesson-typing/lesson-typing';
import { LessonGuide } from '../lesson-guide/lesson-guide';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';

const canActiveFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isCustomer()) {
    const toastService = inject(ToastService);
    toastService.showToast({
      severity: 'info',
      title: '未登录',
      msg: '登陆后使用全部功能',
      confirmLbl: '去登陆',
      rejectLbl: '取消',
      onConfirm: () => authService.showLoginModal(),
    });
    return false;
  }
  return true;
};

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
    canActivate: [canActiveFn],
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
    canActivate: [canActiveFn],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
