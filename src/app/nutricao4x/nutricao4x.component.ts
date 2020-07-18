import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'bootstrap/js/dist/carousel';

@Component({
  selector: 'app-nutricao4x',
  templateUrl: './nutricao4x.component.html',
  styleUrls: ['./nutricao4x.component.scss']
})
export class Nutricao4xComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Nutrição 4x - O Programa para Emagrecer com a Alimentação Certa');
  }

  ngOnInit(): void {
  }

}
