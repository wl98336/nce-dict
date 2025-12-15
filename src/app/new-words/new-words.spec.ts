import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWords } from './new-words';

describe('NewWords', () => {
  let component: NewWords;
  let fixture: ComponentFixture<NewWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
