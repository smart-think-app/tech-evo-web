import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveComponent } from './above.component';

describe('AboveComponent', () => {
  let component: AboveComponent;
  let fixture: ComponentFixture<AboveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
