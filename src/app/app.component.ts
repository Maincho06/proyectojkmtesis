import { Component, OnInit } from '@angular/core';
import { ILogin } from '@models/authmodel';
import { AuthService } from '@services/auth.service';
import { setState, TOKEN_KEY } from '@utils/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projectjkm';

  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit() {

    this.login();

  }

  async login(): Promise<void> {

    try {
      const data: ILogin =  await this._authService.login({ username: 'cesarfb', password: 'facil123' }) ;
      // console.log('LOGIN', data);
      setState(TOKEN_KEY, data.data);
    } catch (error) {
      console.log("Error: ",error);
    }

  }

}
