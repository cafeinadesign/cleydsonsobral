import { Endereco } from './../endereco';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import pagarme from 'pagarme/browser';
import { environment } from 'src/environments/environment';
import { User } from 'firebase';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { UsuarioService } from './../services/usuario.service';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

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
  usuario: User;
  cardForm;
  customerForm: FormGroup;
  valorTotal = 47000;
  carregando = true;
  endereco = 'Pesquise seu endereço pelo CEP';
  address: Endereco = {
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    street_number: '',
    zipcode: '',
  };
  private animationItem: AnimationItem;
  options: AnimationOptions = {
    path: 'https://assets8.lottiefiles.com/datafiles/D7hmWWCXGWSQUPi/data.json',
  };
  sucesso: AnimationOptions = {
    path: 'https://assets5.lottiefiles.com/datafiles/K6S8jDtSdQ7EPjH/data.json',
    autoplay: false,
    loop: false,
  };
  pagamentoProcessado = false;

	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	// phoneForm = new FormGroup({
	// 	phone: new FormControl(undefined, [Validators.required])
	// });

  constructor(
    public auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      birthday: [''],
      phone_number: ['', Validators.required],
      cepCtrl: ['', Validators.required],
      street_number: ['', Validators.required],
      complementary: [''],
    });
    this.cardForm = this.formBuilder.group({
      card_holder_name: ['', Validators.required],
      card_expiration_date: ['', Validators.required],
      card_number: ['', Validators.required],
      card_cvv: ['', Validators.required],
      installments: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregando = false;
    this.usuarioService.loginAnonimo().catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    this.auth.user.subscribe((usuario) => (this.usuario = usuario));
  }
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  onSubmit(cardData): any {
    // campos obrigatórios
    if (
      !cardData.card_number &&
      !cardData.card_holder_name &&
      !cardData.card_expiration_date &&
      !cardData.card_cvv
    ) {
      return false;
    }
    // Process checkout data here
    cardData.card_number = cardData.card_number.replace(/\D/g, '');
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
      this.carregando = true;
      // Mas caso esteja tudo certo, você pode seguir o fluxo
      pagarme.client
        .connect({ encryption_key: environment.pagarme.encryptionKey })
        .then((client) => client.security.encrypt(cardData))
        .then((CARD_HASH) => {
          const birthday = this.customerForm.value.birthday;
          console.log(
            'birthday',
            birthday.substr(4) +
              '-' +
              birthday.substr(2, 2) +
              '-' +
              birthday.substr(0, 2)
          );
          this.http
            .post(environment.pagarme.url + '/pagar', {
              CARD_HASH,
              installments: cardData.installments,
              card_expiration_date: cardData.card_expiration_date,
              card_holder_name: cardData.card_holder_name,
              customer: {
                external_id: this.usuario.uid,
                name: this.customerForm.value.name,
                email: this.customerForm.value.email,
                documents: [
                  { number: this.customerForm.value.cpf.replace(/\D/g, '') },
                ],
                phone_numbers: [
                  this.customerForm.value.phone_number.e164Number,
                ],
                birthday:
                  birthday.substr(4) +
                  '-' +
                  birthday.substr(2, 2) +
                  '-' +
                  birthday.substr(0, 2),
              },
              billing: {
                address: {
                  state: this.address.state,
                  city: this.address.city,
                  neighborhood: this.address.neighborhood,
                  street: this.address.street,
                  street_number: this.customerForm.value.street_number,
                  complementary: this.customerForm.value.complementary,
                  zipcode: this.address.zipcode,
                },
              },
            })
            .subscribe(
              (res: any) => {
                // console.error('deu erro', res);
                console.log('res.response', res.response);
                // deu erro
                if (res.name === 'ApiError') {
                  if (res.response.errors[0].message === 'Invalid CPF') {
                    alert('Ops... CPF inválido!');
                  } else if (
                    res.response.errors[0].parameter_name === 'customer'
                  ) {
                    alert(
                      'Ops... Confirme seus dados pessoais, como CPF e nome, estão corretos!\nNo telefone adicione o número e o DDD.'
                    );
                  } else if (
                    res.response.errors[0].message ===
                    '"state" is not allowed to be empty'
                  ) {
                    alert(
                      'Ops... Endereço inválido! Confime se seu CEP está correto.'
                    );
                  } else if (
                    res.response.errors[0].parameter_name === 'billing'
                  ) {
                    alert(
                      'Ops... Endereço inválido! Confime se seu CEP ou complemento estão corretos.'
                    );
                  } else {
                    alert(
                      'Ops... Ocorreu algum erro.\n' +
                        'Confirme se seus dados estão corretos e tente novamente.'
                    );
                  }
                } else {
                  console.log('agora foi ' + res.status, res);
                  switch (res.status) {
                    case 'refused':
                      alert('Pagamento foi recusado');
                      break;
                    case 'paid':
                      // alert('Pagamento realizado com sucesso xD');
                      this.pagamentoProcessado = true;
                      this.animationItem.play();
                      break;
                  }
                }
              },
              (err) => {
                this.carregando = false;
                console.error('ops... deu erro: ', err);
                alert(
                  'Ops... Ocorreu algum erro, por favor entre em contato com o adminstrador do site.'
                );
              },
              () => (this.carregando = false)
            );
        });
      // o próximo passo aqui é enviar o CARD_HASH para seu servidor, e
      // em seguida criar a transação/assinatura
    }
  }

  buscaCEP(cep: string): void {
    const zipcode = cep.replace(/-|\s/g, '');
    if (zipcode.length > 7) {
      this.endereco = 'Pesquisando...';
      this.address = {
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        street_number: '',
        zipcode: '',
      };
      this.http.get('https://api.pagar.me/1/zipcodes/' + zipcode).subscribe(
        (res: Endereco) => {
          // console.log(res);
          this.address = res;
        },
        () => {
          // console.error('não encontrou o CEP');
          this.endereco = 'CEP não encontrado!';
          // console.error(error);
          this.address = {
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            street_number: '',
            zipcode: '',
          };
        }
      );
    } else {
      this.endereco = 'Pesquise seu endereço pelo CEP';
      this.address = {
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        street_number: '',
        zipcode: '',
      };
    }
  }
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
