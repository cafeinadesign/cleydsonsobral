import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticaDeCancelamentoComponent } from './politica-de-cancelamento/politica-de-cancelamento.component';
import { Nutricao4xComponent } from './nutricao4x/nutricao4x.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LembrarSenhaComponent } from './lembrar-senha/lembrar-senha.component';
import { ConsultaComponent } from './consulta/consulta.component';

import { NgxMaskModule } from 'ngx-mask';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    TermosDeUsoComponent,
    PoliticaDeCancelamentoComponent,
    Nutricao4xComponent,
    FaqComponent,
    LoginComponent,
    CadastroComponent,
    LembrarSenhaComponent,
    ConsultaComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ScullyLibModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [Title, { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
