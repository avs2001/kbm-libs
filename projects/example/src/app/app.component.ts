import {Component, OnInit} from '@angular/core';
import {AuthService} from 'auth';
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


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.events.subscribe(({type}) => {
      if (type == 'token_refresh_error') {
        this.authService.logout();
      }
    });
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  printToken() {
    console.log(this.authService.accessToken());
  }
}
