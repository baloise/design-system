import { Component } from '@angular/core'
import { ActivatedRoute, Route, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'design-system-ng-demo'

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateTo(routeName: string) {
    this.router.navigate([routeName])
  }

  isTabActive(routeName: string) {
    return this.router.isActive(routeName, {
      fragment: 'exact',
      matrixParams: 'exact',
      queryParams: 'exact',
      paths: 'exact',
    })
  }
}
