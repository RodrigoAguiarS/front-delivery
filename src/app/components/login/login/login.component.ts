import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  checked = true;


  creds: Credenciais = {
    email: '',
    senha: ''
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(
      (resposta) => {
        if (resposta && resposta.headers) {
          const authorizationHeader = resposta.headers.get('Authorization');

          if (authorizationHeader) {
            this.service.sucessFulLogin(authorizationHeader.substring(7));
          }
        }
        this.messageService.success('Login realizado com sucesso!');
        this.router.navigate(['home']);
      },
      () => {
        this.messageService.error('Usuário e/ou senha inválidas');
      }
    );
  }

  constructor(
    private messageService: NzMessageService,
    private service: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }
}
