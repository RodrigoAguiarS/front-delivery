import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Senha } from 'src/app/models/senha';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login-alterar',
  templateUrl: './login-alterar.component.html',
  styleUrls: ['./login-alterar.component.css']
})
export class LoginAlterarComponent implements OnInit {

  recuperarForm!: FormGroup;
  exibirComponente: boolean = true;
  uid: string = '';
  uidValido?: boolean;

  senha: Senha = {
    senha: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if (uid !== null) {
      this.uid = uid;
    } else {
      console.log('O parâmetro uid é nulo.');
    }

    this.recuperarForm = this.formBuilder.group({
      senha: ['', Validators.required],
      confirm: ['', [this.confirmValidator]],
    });

    this.verificarUid();
  }

  verificarUid() {
    this.usuarioService.verificarUid(this.uid).subscribe(
      (response) => {
        console.log('Resposta do verificarUid:', response);
        if (response) {
          this.uidValido = true;
          this.exibirComponente = true;
          this.uid = response; // Atribuir o valor do uid retornado à variável uid do componente
        } else {
          this.uidValido = false;
          this.exibirComponente = false;
        }
      },
      (error) => {
        console.log('Erro na verificação do UID:', error);
        this.uidValido = false;
        this.exibirComponente = false;
      }
    );
  }

  atualizarSenha() {
    if (this.recuperarForm.invalid) {
      this.messageService.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.senha.senha = this.recuperarForm.value.senha;

    console.log('Valor de this.uid:', this.uid);
    console.log('Valor de this.senha:', this.senha);

    this.usuarioService.atualizarSenha(this.uid, this.senha.senha)
      .subscribe(
        response => {
          // Senha atualizada com sucesso
          // Redirecionar ou exibir mensagem de sucesso
          this.messageService.success('Senha atualizada com sucesso.');
          // Redirecionar para a página de login ou qualquer outra página necessária
          this.router.navigate(['login']);
        },
        error => {
          // Tratar erro de atualização de senha
          // Exibir mensagem de erro ou tomar ação adequada
          this.messageService.error('Erro ao atualizar a senha. Por favor, tente novamente.');
        }
      );
  }

  cancel(): void {
    this.router.navigate(['login']);
  }

  confirmValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.recuperarForm.controls.senha.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.recuperarForm.controls.confirm.updateValueAndValidity());
  }
}
