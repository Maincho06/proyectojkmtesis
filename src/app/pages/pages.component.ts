import { Component, OnInit } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs/operators';
import * as $ from "jquery";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

    sideBarOpen = true;
    
    items: MenuItem[];
    home: MenuItem;

    constructor() { }

    ngOnInit() {
        this.items = [
            { label: 'Categories' },
            { label: 'Sports' },
            { label: 'Football' },
            { label: 'Countries' },
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }

    sideBarToggler() {
        this.sideBarOpen = !this.sideBarOpen
    }

}
