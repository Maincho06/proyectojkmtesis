import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Cerrar Sesion',
            icon: 'pi pi-times',
            command: () => {
              this._authService.logout();
            },
          },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
