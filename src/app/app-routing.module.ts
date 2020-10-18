import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticaDeCancelamentoComponent } from './politica-de-cancelamento/politica-de-cancelamento.component';
import { Nutricao4xComponent } from './nutricao4x/nutricao4x.component';
import { LoginComponent } from './login/login.component';
// import { CadastroComponent } from './cadastro/cadastro.component';
// import { LembrarSenhaComponent } from './lembrar-senha/lembrar-senha.component';
import { ConsultaComponent } from './consulta/consulta.component';
// import {
//   AngularFireAuthGuard,
//   redirectLoggedInTo,
//   redirectUnauthorizedTo,
// } from '@angular/fire/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'termos-uso', component: TermosDeUsoComponent },
  { path: 'politica-cancelamento', component: PoliticaDeCancelamentoComponent },
  { path: 'nutricao4x', component: Nutricao4xComponent },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectLoggedInToItems },
  },
  // {
  //   path: 'cadastro',
  //   component: CadastroComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectLoggedInToItems },
  // },
  // {
  //   path: 'lemrar-senha',
  //   component: LembrarSenhaComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectLoggedInToItems },
  // },
  {
    path: 'consulta',
    component: ConsultaComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: false,
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
