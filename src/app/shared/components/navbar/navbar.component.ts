import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Cerrar Sesion',
            icon: 'pi pi-times',
            command: (event) => {
              localStorage.clear();
              this.route.navigateByUrl('login');
            }
          },
        ],
      },
    ];
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
