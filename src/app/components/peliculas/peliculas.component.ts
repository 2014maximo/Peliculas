import { Component, OnInit } from '@angular/core';
import { PeliculaModel } from '../../models/peliculas';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit {

  peliculas: PeliculaModel[];
  images: any[];

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit() {

    this.peliculaService.consultarEnCartelera().subscribe(datos => {
      this.peliculas = datos.results;

      this.images = [];
      for (let i = 0; i < this.peliculas.length; i++) {
        this.images.push({
          source: 'https://image.tmdb.org/t/p/w500/' + this.peliculas[i].poster_path,
          alt: this.peliculas[i].overview.substr(0, 100) + '...',
          title: this.peliculas[i].title
        });
      }
    });


  }

}
