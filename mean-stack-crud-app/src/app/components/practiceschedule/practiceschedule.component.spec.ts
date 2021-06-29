import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticescheduleComponent } from './practiceschedule.component';

describe('PracticescheduleComponent', () => {
  let component: PracticescheduleComponent;
  let fixture: ComponentFixture<PracticescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticescheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
