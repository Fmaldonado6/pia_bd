import { VerAlimentosComponent } from './pages/ver-alimentos/ver-alimentos.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarAlimentoComponent } from 'src/app/shared/components/modals/alimentos/editar-alimento/editar-alimento.component';
import { MainComponent } from './pages/main/main.component';
import { TiposComponent } from './pages/tipos/tipos.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'lista',
    component: VerAlimentosComponent
  },
  {
    path: 'marcas',
    component: MarcasComponent
  },
  {
    path: 'tipos',
    component: TiposComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentosRoutingModule { }
