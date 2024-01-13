import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: LoginComponent },
  {
    path: 'crear-proyecto',
    component: CreateProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lista-proyectos',
    component: ListProjectsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
