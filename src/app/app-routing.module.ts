import { NgModule } from '@angular/core';
import { RouterModule, RouterPreloader, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'survey', component: FormComponent },
  { path: 'survey/:id', component: FormComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
