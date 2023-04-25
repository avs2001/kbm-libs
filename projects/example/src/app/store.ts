import {AuthState, AuthStore} from "auth";
import {map, Observable} from "rxjs";
import {store} from "../../core/state/app.repository";
import {setProps} from "@ngneat/elf";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class Store extends AuthStore<AuthState> {

  update(data: Partial<AuthState>): void {
    store.update(setProps(data));
  }

  get data$(): Observable<Partial<AuthState>> {
    return store.pipe(map(data => data));
  }

  get data(): Partial<AuthState> {
    return store.getValue();
  }

}
