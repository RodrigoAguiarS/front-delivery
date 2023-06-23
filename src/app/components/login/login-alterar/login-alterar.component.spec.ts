import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAlterarComponent } from './login-alterar.component';

describe('LoginAlterarComponent', () => {
  let component: LoginAlterarComponent;
  let fixture: ComponentFixture<LoginAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAlterarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
