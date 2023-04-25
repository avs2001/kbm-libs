import {AuthState} from "./model";
import {BehaviorSubject, Observable} from "rxjs";

export abstract class AuthStore<T> {
  abstract update(data: Partial<T>): void;

  abstract get data$(): Observable<Partial<T>>;

  abstract get data(): Partial<T>;
}


export class DefaultAuthStore extends AuthStore<AuthState> {
  private readonly _data = new BehaviorSubject<Partial<AuthState>>({});

  update(data: Partial<AuthState>): void {
    this._data.next(data);

  }

  get data$(): Observable<Partial<AuthState>> {
    return this._data.asObservable();
  }

  get data(): Partial<AuthState> {
    return this._data.getValue();
  }
}
