import { Endereco } from './../endereco';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import pagarme from 'pagarme/browser';
import { environment } from 'src/environments/environment';
import { User } from 'firebase';
import { Observable } from 'rxjs';

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
  secondFormGroup: FormGroup;
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
  constructor(
    public auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.customerForm = this.formBuilder.group({
      name: ['Morpheus Fishburne', Validators.required],
      cpf: ['30621143049', Validators.required],
      birthday: ['1965-01-01'],
      phone_number: ['11999998888', Validators.required],
      cepCtrl: ['06714360', Validators.required],
      street_number: ['9999', Validators.required],
      complementary: [''],
    });
    this.cardForm = this.formBuilder.group({
      card_holder_name: ['Morpheus Fishburne', Validators.required],
      card_expiration_date: ['09/22', Validators.required],
      card_number: ['4111111111111111', Validators.required],
      card_cvv: ['123', Validators.required],
      installments: ['1', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregando = false;
    this.auth.user.subscribe((usuario) => (this.usuario = usuario));
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
          console.log('birthday', this.customerForm.value.birthday);
          this.http
            .post('http://localhost:5001/cleydson-sobral/us-central1/pagar', {
              CARD_HASH,
              installments: cardData.installments,
              card_expiration_date: cardData.card_expiration_date,
              card_holder_name: cardData.card_holder_name,
              customer: {
                external_id: this.usuario.uid,
                name: this.customerForm.value.name,
                email: this.usuario.email,
                documents: [
                  { number: this.customerForm.value.cpf.replace(/\D/g, '') },
                ],
                phone_numbers: [
                  '+55' +
                    this.customerForm.value.phone_number.replace(/\D/g, ''),
                ],
                birthday: this.customerForm.value.birthday,
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
                  console.error('agora foi ' + res.status, res);
                  switch (res.status) {
                    case 'refused':
                      alert('Pagamento foi recusado');
                      break;

                    case 'paid':
                      alert('Pagamento realizado com sucesso xD');
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
