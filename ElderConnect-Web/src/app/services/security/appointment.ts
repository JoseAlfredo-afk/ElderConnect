import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  id?: number;
  date: string;
  time: string;
  title: string;
  type: string;
  responsible: string;
  notes: string;
  seniorId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8081/api/appointments';

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  findById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(
      `${this.apiUrl}/${id}`
    );
  }

  findBySeniorId(seniorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.apiUrl}/senior/${seniorId}`
    );
  }

  create(appointment: Appointment): Observable<number> {
    return this.http.post<number>(
      this.apiUrl,
      appointment
    );
  }

  update(id: number, appointment: Appointment): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      appointment
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}