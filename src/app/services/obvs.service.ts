import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ObvsService extends BaseService {

    private readonly $spinner: BehaviorSubject<any> = new BehaviorSubject(false);
    // readonly $spinnerObvs = this.$spinner.asObservable();
    // Observable exposing the navbar hierarchy 
    private readonly $navbar: BehaviorSubject<any> = new BehaviorSubject(false);
    readonly $navbarObvs = this.$navbar.asObservable();
    // Observable exposing the breadcrumb hierarchy 
    private readonly $breadcrumbs = new BehaviorSubject<any[]>([]);
    readonly $breadcrumbsObvs = this.$breadcrumbs.asObservable();

    constructor(
        private http: HttpClient,
        private _spinner: NgxSpinnerService,
        private router: Router
    ) {
        super();
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                const root = this.router.routerState.snapshot.root;
                const breadcrumbs: any[] = [];
                this.addBreadcrumb(root, breadcrumbs);
                this.$breadcrumbs.next(breadcrumbs);
            });
    }

    //Navbar
    toogleNavBar() {
        this.$navbar.next(!this.$navbar.value);
    }

    //Spinner
    toogleSpinner() {
        this.$spinner.value ? this._spinner.hide() : this._spinner.show();
        this.$spinner.next(!this.$spinner.value)
    }

    //BreadBrum
    private addBreadcrumb(
        route: ActivatedRouteSnapshot,
        breadcrumbs: any[]
    ) {
        if (route) {
            if (route.data.breadcrumb) {
                const breadcrumb = {
                    label: this.getLabel(route.data),
                };
                breadcrumbs.push(breadcrumb);
            }
            this.addBreadcrumb(route.firstChild, breadcrumbs);
        }
    }

    private getLabel(data) {
        return typeof data.breadcrumb === 'function'
            ? data.breadcrumb(data)
            : data.breadcrumb;
    }
}
