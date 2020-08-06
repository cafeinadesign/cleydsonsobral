import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import pagarme from 'pagarme/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ConsultaComponent implements OnInit {
  cardForm;
  carregando = true;
  card = {
    card_holder_name: '',
    card_expiration_date: '',
    card_number: '',
    card_cvv: '',
  };
  customer = {
    external_id: '',
    name: '',
    type: 'individual',
    country: 'br',
    email: '',
    documents: [
      {
        type: 'cpf',
        number: '',
      },
    ],
    phone_numbers: [''],
  };
  customerForm: FormGroup;
  secondFormGroup: FormGroup;
  valorTotal = 47000;

  constructor(
    public auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.customerForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      phone_number: ['', Validators.required],
      cepCtrl: ['', Validators.required],
      nCtrl: ['', Validators.required],
      complementoCtrl: [''],
    });
    this.cardForm = this.formBuilder.group({
      card_holder_name: ['', Validators.required],
      card_expiration_date: ['', Validators.required],
      card_number: ['', Validators.required],
      card_cvv: ['', Validators.required],
      installments: ['1', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onSubmit(cardData): any {
    if (
      !cardData.card_number &&
      !cardData.card_holder_name &&
      !cardData.card_expiration_date &&
      !cardData.card_cvv
    ) {
      return false;
    }
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    // pega os erros de validação nos campos do form e a bandeira do cartão
    const cardValidations = pagarme.validate({
      card: cardData,
    });
    // this.cardForm.reset();

    // console.warn('Your order has been submitted', cardValidations);
    if (!cardValidations.card.brand) {
      alert('Oops, a bandeira do cartão incorreto');
    } else if (!cardValidations.card.card_cvv) {
      alert('Oops, código de segurança do cartão incorreto');
    } else if (!cardValidations.card.card_expiration_date) {
      alert(
        'Oops, data de validade do cartão incorreto.\nPreencha no formato MM/AA'
      );
    } else if (!cardValidations.card.card_holder_name) {
      alert('Oops, nome do cartão incorreto.');
    } else if (!cardValidations.card.card_number) {
      alert('Oops, número do cartão incorreto');
    } else {
      // Mas caso esteja tudo certo, você pode seguir o fluxo
      pagarme.client
        .connect({ encryption_key: environment.pagarme.encryptionKey })
        .then((client) => client.security.encrypt(cardData))
        .then((CARD_HASH) => {
          console.log('CARD_HASH', CARD_HASH);
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          };
          this.http
            .post(
              'http://localhost:5001/cleydson-sobral/us-central1/pagar',
              CARD_HASH,
              httpOptions
            )
            .subscribe(
              (res) => {
                console.log('res', res);
              },
              (err) => {
                console.error('ops... deu erro: ', err);
                alert(
                  'Ops... Ocorreu algum erro, por favor entre em contato com o adminstrador do site.'
                );
              }
            );
        });
      // o próximo passo aqui é enviar o CARD_HASH para seu servidor, e
      // em seguida criar a transação/assinatura
    }
  }

  ngOnInit(): void {
    this.carregando = false;
  }

  pagar(): void {
    // pega os erros de validação nos campos do form e a bandeira do cartão
    const cardValidations = pagarme.validate({ card: this.card });
    if (cardValidations) {
      pagarme.client
        .connect({
          encryption_key: 'ek_test_OSxEIhfFAQqcqaewfXUr9p9bNpQffG',
        })
        .then((client) => client.security.encrypt(this.card))
        .then((card_hash) => console.log(card_hash));
    } else {
      alert('Oops, número de cartão incorreto');
    }
  }

  buscaCEP(): void {}
  quantidadeParcelas(installments): void {
    switch (installments) {
      case '1':
        this.valorTotal = 47000;
        break;
      case '2':
        this.valorTotal = 48880;
        break;
      case '3':
        this.valorTotal = 49820;
        break;
    }
  }
}
