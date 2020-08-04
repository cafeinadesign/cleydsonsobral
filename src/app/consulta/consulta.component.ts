import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import pagarme from 'pagarme/browser';

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public auth: AngularFireAuth, private formBuilder: FormBuilder) {
    this.cardForm = this.formBuilder.group({
      card_holder_name: '',
      card_expiration_month: '',
      card_expiration_year: '',
      card_cvv: '',
    });
  }

  ngOnInit(): void {
    this.carregando = false;
    this.firstFormGroup = this.formBuilder.group({
      cpfCtrl: ['', Validators.required],
      telefoneCtrl: ['', Validators.required],
      cepCtrl: ['', Validators.required],
      nCtrl: ['', Validators.required],
      complementoCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
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
}
