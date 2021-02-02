import { Component, OnInit } from '@angular/core'
import { Router, Routes } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular'
  routes: Routes = []

  constructor(private route: Router) {}

  onInput(event: CustomEvent<string>): void {
    console.warn('onInput', event)
  }

  // onInput(event: CustomEvent<string>): void {
  //   console.log('onInput', event)
  //   console.log('onInput', event.detail)
  // }

  ngOnInit(): void {
    this.routes = this.route.config
    this.routes.shift()
    this.routes.pop()
  }
}
