import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  private url = "localhost:8080/api/utilisateur/forget-password"
  constructor(private http: HttpClient){}

    SendEmail(input: any) {
	return this.http.post(this.url, input).pipe(
		map(
		  (response) => {
		      if (response) {
			return response;
		      }
		  },
		  (error: any) => {
		      if (error) {
			return error;
		      }
		   }
		)
	    )
    }
}
