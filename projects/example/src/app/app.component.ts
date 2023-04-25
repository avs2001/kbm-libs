import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from 'auth';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    JsonPipe,
    NgIf,
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  isLogged$ = this.authService.store.data$.pipe(map(state => state.isLogged));

  constructor() {
  }


  fetch() {
    this.http.get('/api/tenant-admin/patients').subscribe(console.log);
  }

  async ngOnInit(): Promise<void> {
    await this.authService.login();
  }

  async logout() {
    await this.authService.logout();
  }

  printToken() {
    console.log(this.authService.accessToken());
  }
}
