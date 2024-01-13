import { Component } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  ListItems: any[] = [];

  newItem = {
    item: '',
    cost_und: 0,
  };

  ListImages: any[] = [];

  newImg = {
    name_img: '',
    url: '',
  };

  newProject: Proyecto = {
    name: '',
    initial_date: '',
    final_date: '',
    images: this.ListImages,
    items: this.ListItems,
  };

  images: File[] = [];

  imagenPath = 'assets/imagesProject/'; // TODO: Falta realizar servicio de cargar img en Back

  constructor(
    private proyectoService: ProyectoService,
    private router: Router,
  ) {}

  addItem() {
    if (this.newItem.item && this.newItem.cost_und !== null) {
      this.ListItems.push({ ...this.newItem });
      this.newItem = {
        item: '',
        cost_und: 0,
      };
    }
  }

  addImages() {
    if (this.newImg.name_img && this.newImg.url !== null) {
      this.ListImages.push({ ...this.newImg });
      this.newImg = {
        name_img: '',
        url: '',
      };
    }
  }

  submitProject() {
    this.proyectoService.createProject(this.newProject).subscribe(
      (res) => this.router.navigate(['/lista-proyectos']),
      (err) => console.log(err),
    );
  }
}
