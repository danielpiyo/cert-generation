import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckFormComponent } from './components/check-form/check-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: CheckFormComponent },
  { path: 'certificate', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to Login
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// export const routing = RouterModule.forRoot(routes, { useHash: true });
