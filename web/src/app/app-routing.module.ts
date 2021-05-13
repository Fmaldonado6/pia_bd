import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./screens/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: 'full'

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
