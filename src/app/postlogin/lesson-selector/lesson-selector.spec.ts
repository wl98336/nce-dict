import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSelector } from './lesson-selector';

describe('LessonSelector', () => {
  let component: LessonSelector;
  let fixture: ComponentFixture<LessonSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
