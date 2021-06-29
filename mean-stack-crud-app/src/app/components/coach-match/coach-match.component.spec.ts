import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMatchComponent } from './coach-match.component';

describe('CoachMatchComponent', () => {
  let component: CoachMatchComponent;
  let fixture: ComponentFixture<CoachMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
