import { Component, OnInit } from '@angular/core';
import pagarme from 'pagarme/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cleydsonsobral';
  ngOnInit() {
  }

  checkout() {
    console.log('olá!');
  }
}
