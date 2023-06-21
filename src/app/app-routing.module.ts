import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // Outras rotas protegidas...
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redireciona para a página de login por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
