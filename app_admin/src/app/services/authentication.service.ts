import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private router:Router
  ) {}

  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Promise<void> {
    return this.tripDataService
      .login(user)
      .then((authResp: Authresponse) => {
        this.saveToken(authResp.token);
        this.router.navigate(['/list-trips']);
      })
      .catch((err) => {
        console.error('Login failed:', err);
        throw err;
      });
  }

  public register(user: User): Promise<void> {
    return this.tripDataService
      .register(user)
      .then((authResp: Authresponse) => {
        this.saveToken(authResp.token);
        this.router.navigate(['/list-trips']);
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        throw err;
      });
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (e) {
      console.error('Error parsing token:', e);
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      try {
        const token = this.getToken();
        if (token) {
          const { email, name } = JSON.parse(atob(token.split('.')[1]));
          return { email, name } as User;
        }
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }

    return null;
  }
}
