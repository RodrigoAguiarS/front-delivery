import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.css']
})
export class LoginCreateComponent implements OnInit {

  validateForm!: FormGroup;


  public usuario: Usuario = {
    id:0,
    nome: '',
    email: '',
    senha: '',
    endereco: {
      cep: '',
      rua: '',
      numeroCasa: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  };

  constructor(private fb: FormBuilder,
              private service: UsuarioService,
              private messageService: NzMessageService,
              private router: Router,) { }

  create(): void {
    this.service.create(this.usuario).subscribe(
      (resposta) => {
        console.log(resposta);
        this.messageService.success('Cadastrado com sucesso');
        this.router.navigate(['login']);
      },
      (error) => {
        if (error.error && error.error.message) {
          this.messageService.error(error.error.message);
        } else if (error.error && error.error.errors) {
          error.error.errors.forEach((element: { message: string }) => {
            this.messageService.error(element.message);
          });
        } else {
          this.messageService.error('Ocorreu um erro ao processar a solicitação.');
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nome: ['', [Validators.required], [Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      numeroCasa: ['', [Validators.required],[Validators.maxLength(6)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
    })
  }

  confirmValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.senha.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  formatarCEP(event: any) {
    const cep = event.target.value;
    const cepFormatado = cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
    this.usuario.endereco.cep = cepFormatado;
  }
}

