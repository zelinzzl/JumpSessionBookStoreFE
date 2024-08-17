import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from '../Models/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  //ToDo: write Login endpoint to handle log in, leave this as is for them to fix with correct endpoint, Maybe
  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const admin = {
      id: 1,
      username: username,
      password: password
    }
    
    return this.http.post<Admin>(`${this.apiUrl}/get-username`, admin, { headers })
      .pipe(map(response => {{
        console.log(response);
        
          if (response.username === username && response.password === password) {
            return true;
          }
        }
        return false;
      }));
  }
  
}
