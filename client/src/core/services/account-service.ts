import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../types/user';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(creds: any){
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user=>{
        if(user){
          // localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      }))
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}
