import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticaDeCancelamentoComponent } from './politica-de-cancelamento/politica-de-cancelamento.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'termos-uso', component: TermosDeUsoComponent },
  { path: 'politica-cancelamento', component: PoliticaDeCancelamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
