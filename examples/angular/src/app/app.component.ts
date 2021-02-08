import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  routes: Route[] = [];
  activeTab: number = 0;

  constructor(private router: Router) { 
    this.router.events.subscribe( (event) => this.onRouteChanged(event) );
  }

  ngOnInit(): void {
    this.routes = this.createRoutesArray();
  }

  createRoutesArray() {
    let routes = [];
    routes = this.router.config.filter(route => route.data?.nav)
    routes = this.initActiveProp(routes);

    return routes;
  }

  initActiveProp(array: any[]) {
    array.forEach( (route, index) => {
      route.active = index !== this.activeTab ? false : true;
    });

    return array;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigate(route: Route) {
    this.router.navigate([`/${(route as any).path}`]);
  }

  onRouteChanged(event: any) {
    if (event instanceof NavigationEnd) {
      console.log(event)
      const name = event['url'];
      if (name && name !== '/') {
        this.routes = this.updateActiveProp(this.routes, name.slice(1));
      }
    }
  }

  updateActiveProp(array: any[], name: string) {
    let index = array.findIndex(route => route.path === name);
    array[this.activeTab].active = false;
    array[index].active = true;
    this.activeTab = index;
    return array;
  }
}
