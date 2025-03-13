import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:44359/Appointment';
  constructor(private http: HttpClient) { }
 
    getAppointment(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/user/${id}`).pipe(catchError(this.handleError));
    }

    getAppointmentAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`).pipe(catchError(this.handleError));
    }

    newAppointment(appointment: AppointmentModel): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.apiUrl, appointment, { headers }).pipe(catchError(this.handleError));
    }
  
    updateAppointment(id: number, appointment: AppointmentModel): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put(`${this.apiUrl}/${id}`, appointment, { headers }).pipe(catchError(this.handleError));
    }

    deleteAppointment(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
    }

   /*  private handleError(error: HttpErrorResponse) {
      if (error.status === 200 && error.error instanceof SyntaxError) {
        console.error('Unexpected response format:', error.error);
      } else {
        //console.error('An error occurred:', error);
        return error.error;
      }
      return throwError('Something bad happened; please try again later.');
    } */

      private handleError(error: HttpErrorResponse) {
        if (error.status === 200 && error.error instanceof SyntaxError) {
         console.error('Unexpected response format:', error.error);
        } else {
         console.error('An error occurred:', error);
        }
        return throwError(error.error);
      }

}
