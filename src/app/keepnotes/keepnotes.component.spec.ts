import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepnotesComponent } from './keepnotes.component';

describe('KeepnotesComponent', () => {
  let component: KeepnotesComponent;
  let fixture: ComponentFixture<KeepnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepnotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeepnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
