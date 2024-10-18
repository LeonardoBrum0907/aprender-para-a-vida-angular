import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '../../types/volunteer.interface';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  private readonly apiUrl = "https://aprender-para-vida-api.onrender.com/volunteers"

  constructor(
    private http: HttpClient
  ) { }

  createVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.apiUrl, volunteer)
  }

}
