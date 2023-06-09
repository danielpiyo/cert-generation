import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlartModalComponent } from './alart-modal.component';

describe('AlartModalComponent', () => {
  let component: AlartModalComponent;
  let fixture: ComponentFixture<AlartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
