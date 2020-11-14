import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';

import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {isNullOrUndefined} from "@progress/kendo-angular-editor/dist/es2015/util";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: 'home'};
  menuItems: MenuItem[];
  public fragment: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fragment="haut";
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));


  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }


  }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 10);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.fragment) {
        document.querySelector('' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }


}
