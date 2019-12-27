import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {ProductsService} from '../shared/app-services/products.service';

interface IBreadCrumb {
  label?: string;
  params?: Params;
  url?: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumb-navigation',
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrls: ['./breadcrumb-navigation.component.scss']
})

export class BreadcrumbNavigationComponent implements OnInit {

  public breadcrumbs: IBreadCrumb[];
  categoryLabel: string;
  lastRoutePart: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.trackCategoryParam();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.trackCategoryParam();
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
  }

  private trackCategoryParam() {
    this.activatedRoute.paramMap.subscribe(value => {
      const category = value.get('category');

      if (category !== null) {
        this.productsService.getCategoryByName(category).subscribe(data => {
          if (data) {
            this.categoryLabel = data.uaName;
            this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
          }
        });
      }
    });
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    this.lastRoutePart = path.split('/').pop();
    const isDynamicCategoryRoute = this.lastRoutePart.startsWith(':category');
    const isDynamicProductNumberRoute = this.lastRoutePart.startsWith(':productNumber');

    if ((isDynamicCategoryRoute || isDynamicProductNumberRoute) && !!route.snapshot) {
      const segments = path.split('/');
      for (const param of segments) {
        if (param.startsWith(':')) {
          const paramName = param.split(':')[1];
          path = path.replace(param, route.snapshot.params[paramName]);
          if (param.startsWith(':category')) {
            label = this.categoryLabel;
          } else if (param.startsWith(':productNumber')) {
            label = 'Aрт. '.concat(route.snapshot.params[paramName]);
          } else {
            label = route.snapshot.params[paramName];
          }
        }
      }
    }
    this.lastRoutePart = route.snapshot['_routerState'].url.split('/').pop();

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label,
      url: nextUrl,
      path,
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
