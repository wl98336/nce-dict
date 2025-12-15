import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonNote } from './lesson-note';

describe('LessonNote', () => {
  let component: LessonNote;
  let fixture: ComponentFixture<LessonNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
