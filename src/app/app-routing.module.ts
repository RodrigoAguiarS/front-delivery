import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginCreateComponent } from './components/login/login-create/login-create.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login-create', component: LoginCreateComponent  },
  { path: 'login-recuperar', component: LoginRecuperarComponent},
  // Outras rotas protegidas...
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redireciona para a página de login por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
