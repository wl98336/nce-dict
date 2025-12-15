import { Component, computed, effect, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { BookUnit } from '../../model/model';
import { BookService } from '../../service/book.service';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-lesson-selector',
  imports: [NgClass],
  templateUrl: './lesson-selector.html',
  styleUrl: './lesson-selector.scss',
})
export class LessonSelector {
  lessonId = computed(() => this.bookService.lessonId());
  activedUnit = signal(0);
  private openedUnitId = 0;
  select = output<number>();
  book: any = {};
  bookUnits = computed(() => this.bookService.bookUnits());

  constructor(private bookService: BookService, private modalService: ModalService) {
    effect(() => {
      const lessonId = this.lessonId();
      this.activeUnitByLessonId(lessonId);
    });
  }

  private activeUnitByLessonId(lessonId: number) {
    const unit = this.bookUnits().find((unit: BookUnit) => {
      const lesson = unit.lessons.find((lesson) => lesson.id == lessonId);
      return !!lesson;
    });
    if (unit && unit?.id !== this.openedUnitId) {
      this.activeUnit(unit);
    }
  }

  activeUnit(unit: any): void {
    if (this.openedUnitId == unit.id) {
      this.openedUnitId = 0;
      this.activedUnit.set(0); //close
    } else {
      this.activedUnit.set(unit.id);
      this.openedUnitId = unit.id;
    }
  }

  selectLesson(id: number): void {
    this.bookService.chooseLesson(id);
    this.modalService.modal.set({ show: false });
  }
}
