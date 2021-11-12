import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ObvsService } from '@services/obvs.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnDestroy {
  sideBarOpen = true;

  $items: Subscription;
  items: MenuItem[];
  home: MenuItem;

  constructor(private _obvsService: ObvsService) {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.$items = _obvsService.$breadcrumbsObvs.subscribe(
      (value) => (this.items = value)
    );
  }

  ngOnDestroy() {
    this.$items.unsubscribe();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
