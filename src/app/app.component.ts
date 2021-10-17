import { Component, OnInit } from '@angular/core';
import { ILogin } from '@models/authmodel';
import { AuthService } from '@services/auth.service';
import { setState, TOKEN_KEY } from '@utils/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'projectjkm';
  constructor(
    private _authService: AuthService
  ) {}
}
