import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-small-mapa',
  templateUrl: './small-mapa.component.html',
  styleUrls: ['./small-mapa.component.css']
})
export class SmallMapaComponent implements AfterViewInit {

  @Input() coordenadas: [number, number] = [0, 0];
  @ViewChild('mapa') mapa!: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {

    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.coordenadas, // starting position [lng, lat]
      zoom: 14.7, // starting zoom
      interactive: false
    });

    new mapboxgl.Marker({color: 'red'})
      .setLngLat(this.coordenadas)
      .addTo(map);

  }

}
