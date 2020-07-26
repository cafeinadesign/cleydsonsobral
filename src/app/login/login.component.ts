import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private usuario: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.usuario.login().then((res) => {
      console.log(res);
      this.router.navigate(['']);
    });
  }
}
