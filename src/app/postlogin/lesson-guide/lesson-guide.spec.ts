import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonGuide } from './lesson-guide';

describe('LessonGuide', () => {
  let component: LessonGuide;
  let fixture: ComponentFixture<LessonGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
