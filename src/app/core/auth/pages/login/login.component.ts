import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserCredentials } from '../../interfaces/user-credentials';
import { Router } from '@angular/router';
import { LoginFacadeService } from '../../facades/login-facade.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CardModule, PasswordModule, CheckboxModule, InputTextModule, ReactiveFormsModule, MessageModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // authService = inject(AuthService);
  router = inject(Router);
  loginFacadeService = inject(LoginFacadeService);


  formSubmitted = false;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onSubmit() {
    if (this.form.invalid) { return }
    this.formSubmitted = true;

    const payload: UserCredentials = {
      email: this.form.controls.email.value as string,
      password: this.form.controls.password.value as string,
    };

    this.loginFacadeService.login(payload).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.form.setErrors({
            wrongCredentials: true
          });
        }
      }
    });

  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
