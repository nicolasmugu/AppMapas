import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})

export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [ -77.07125827135353, -12.030126649929777], // starting position [lng, lat]
      zoom: 15.7 // starting zoom
    });

  }

}
