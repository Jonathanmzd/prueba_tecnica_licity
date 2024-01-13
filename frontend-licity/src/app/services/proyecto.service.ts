import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/proyecto.model';
import { ProyectoApply } from '../models/apply-proyecto.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  constructor(private http: HttpClient) {}

  public getProjects(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${environment.apiUrl}/projects`);
  }

  public getIdProjects(id: string): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${environment.apiUrl}/projects/${id}`);
  }

  createProject(project: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${environment.apiUrl}/projects`, project);
  }

  applyProject(project: ProyectoApply): Observable<ProyectoApply> {
    return this.http.post<ProyectoApply>(
      `${environment.apiUrl}/applications`,
      project,
    );
  }

  deleteProject(id: string): Observable<Proyecto> {
    return this.http.delete<Proyecto>(`${environment.apiUrl}/projects/${id}`);
  }
}
