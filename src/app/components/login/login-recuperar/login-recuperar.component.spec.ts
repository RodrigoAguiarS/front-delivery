import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecuperarComponent } from './login-recuperar.component';

describe('LoginRecuperarComponent', () => {
  let component: LoginRecuperarComponent;
  let fixture: ComponentFixture<LoginRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRecuperarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
