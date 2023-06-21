import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-login-recuperar',
  templateUrl: './login-recuperar.component.html',
  styleUrls: ['./login-recuperar.component.css']
})
export class LoginRecuperarComponent implements OnInit {

  recuperarForm!: FormGroup;

  email: Email = {
    email: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recuperarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperarSenha() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.value.email;
      this.usuarioService.recuperarSenha(email).subscribe(
        (response: string) => {
          console.log(response); // Imprime a resposta no console para análise
          this.messageService.success("Link de recuperação de senha enviada para o email.");
          this.router.navigate(['login']);
        },
        (error) => {
          console.error(error); // Imprime o erro no console para análise
          this.messageService.error("Erro ao enviar o email de recuperação de senha: " + error.message);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['login']);
  }
}




