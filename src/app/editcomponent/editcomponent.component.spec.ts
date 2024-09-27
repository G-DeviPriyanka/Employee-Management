import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcomponentComponent } from './editcomponent.component';

describe('EditcomponentComponent', () => {
  let component: EditcomponentComponent;
  let fixture: ComponentFixture<EditcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
