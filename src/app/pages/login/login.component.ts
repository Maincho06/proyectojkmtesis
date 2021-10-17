import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@models/authmodel';
import { AuthService } from '@services/auth.service';
import { getState, setState, TOKEN_KEY, USER_DATA_KEY } from '@utils/storage';
import { toast } from '@utils/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.formLogin = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    const token = getState(TOKEN_KEY);
    if (token) this._router.navigate(['/dashboard']);
  }

  async login() {
    try {
      const { data, message }: ILogin = await this._authService.login(
        this.formLogin.value
      );
      setState(TOKEN_KEY, data);
      const perfil = await this._authService.getPerfil();
      setState(USER_DATA_KEY, perfil);
      this._router.navigate(['/dashboard']);
      toast({
        title: 'Bienvenido',
        message: message,
        type: 'success',
        messageService: this._messageService,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
