import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import {User} from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private stroage:Storage
  ) {}

  apiBaseUrl = 'http://localhost:3000/api';

  private handleError(error:any):Promise<any>{
    return Promise.reject(error.message||error);
  }

  public login(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }
  
  private makeAuthApiCall(urlPath: string, user: User): Promise<Authresponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<Authresponse>(url, user)
      .toPromise()
      .catch(this.handleError);
  }
  

  url = 'http://localhost:3000/api/trips';

  getTrips():Observable<Trip[]>{
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip):Observable<Trip>{
    return this.http.post<Trip>(this.url, formData);
  }

  updateTrip(formData:Trip):Observable<Trip>{
    return this.http.put<Trip>(this.url+'/'+formData.code,formData);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }
}
