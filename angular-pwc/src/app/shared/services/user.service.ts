import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {User} from '../../videos/model/music.model';
import {BASE_URL} from '../tokens';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public name = 'auto';
  private _user$ = new BehaviorSubject<User | null>(null);
  constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        this._user$.next(JSON.parse(userFromStorage));
      } catch (err) {
        console.log('Error parse user', err);
      }
    }
    // update user from session
    this._user$.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  get user$ () {
    return this._user$.asObservable();
  }

  login(username: string, password: string): Observable<User> {
    console.log('log -> ', username, password);
    // FIX - only for demo
    return this.http.get<User[]>(this.baseUrl + '/users', {
      params: {
        username: username,
        password: password
      }
    }).pipe(
      switchMap(users => {
        if (users[0]) {
          return of(users[0]);
        } else {
          return throwError('Login failed');
        }
      }),
      tap(user => this._user$.next(user))
    );
  }

  logout(): Observable<null> {
    // Observable.create(observer => {
    //   observer.create(null);
    //   observer.next(null);
    //   observer.complete();
    //   return () => {};
    // });
    this._user$.next(null);
    return of(null);
  }

  onRequest(req: HttpRequest<any>) {
    console.log('onRequest', req);
  }
}
