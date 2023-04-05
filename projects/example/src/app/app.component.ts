import {Component, OnInit} from '@angular/core';
import {AuthService} from 'auth';
import {AUTH_CONFIG} from "../../../auth/src/lib/auth.config";
import {authConfig} from "./config";
import {JsonPipe} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    JsonPipe
  ]
})
export class AppComponent implements OnInit {
  token = this.authService.accessToken;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.events.subscribe(event => {
      console.log(event);
    });
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  printToken() {
    console.log(this.token);
  }
}
