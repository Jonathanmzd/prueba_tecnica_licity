import { Component } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
})
export class ListProjectsComponent {
  projects: any[] = [];
  detailsProject: Proyecto | null = null;
  selectedIdProject = '';
  supplierData: { id_item: string; cost_supplier_und: number }[] = [];

  constructor(
    private Service: ProyectoService,
    private ServiceA: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  isConstructor(): boolean {
    return this.ServiceA.getUserRole() === 'Constructor';
  }

  getProjects(): void {
    this.Service.getProjects().subscribe(
      (res) => (this.projects = res),
      (err) => console.log(err),
    );
  }

  deleteProject(id: string): void {
    this.Service.deleteProject(id).subscribe(
      (res) => this.getProjects(),
      (err) => console.log(err),
    );
  }

  showModal(id: string) {
    this.selectedIdProject = id;
    this.Service.getIdProjects(id).subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.detailsProject = res.length > 0 ? res[0] : null;
        } else {
          this.detailsProject = res as Proyecto;
        }
      },
      (err) => console.log(err),
    );
    this.supplierData =
      this.detailsProject?.items.map((item) => ({
        id_item: item._id,
        cost_supplier_und: 0,
      })) || [];
  }

  applyProject(): void {
    const applicationProject = {
      id_project: this.selectedIdProject,
      id_supplier: this.ServiceA.getUserId() || '',
      items: this.supplierData,
    };
    this.Service.applyProject(applicationProject).subscribe(
      (res) => {
        this.router.navigate(['/lista-proyectos']);
      },
      (err) => console.log(err),
    );
    alert('Aplicado al Proyecto Correctamente');
  }
}
