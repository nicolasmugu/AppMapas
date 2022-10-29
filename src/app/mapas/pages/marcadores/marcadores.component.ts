import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marker{
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})

export class MarcadoresComponent implements AfterViewInit {

  public mapa!: mapboxgl.Map;
  public nivelZoom: number = 16.7;
  public centro: [number, number] = [-77.07125827135353, -12.030126649929777];

  public marcadores: Marker[] = [];

  @ViewChild('mapa') divMapa!: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.centro, // starting position [lng, lat]
      zoom: this.nivelZoom // starting zoom
    });

    this.leerMarcadores();

    // const markerHtml: HTMLElement = documnent.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo' | se pueden poner imagenes personalizadas u otras cosas dentro del .Marker()

    /* const marcador = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(this.centro)
      .addTo(this.mapa); */

  }

  agregarMarcador(){

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const marcador = new mapboxgl.Marker({ color, draggable: true })
      .setLngLat(this.centro)
      .addTo(this.mapa);

    this.marcadores.push({
      color: color,
      marcador: marcador,
    });

    this.guardarMarcadores();

    marcador.on('dragend', () => {
      this.guardarMarcadores();
    }) 

  }

  irMarcador(marcador:mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat(),
      zoom: 18
    });
  }

  guardarMarcadores(){

    const coordenadas: Marker[] = [];

    this.marcadores.forEach( m => {

      const {lng,lat} = m.marcador!.getLngLat();

      coordenadas.push({
        color: m.color,
        centro: [lng,lat]
      });

    })

    localStorage.setItem('marcadores', JSON.stringify(coordenadas));

  }

  leerMarcadores(){
    
    if(!localStorage.getItem('marcadores')){
      return;
    }

    const coordenadas: Marker[] = JSON.parse(localStorage.getItem('marcadores')!); 

    coordenadas.forEach(element => {

      const marcador = new mapboxgl.Marker({ color: element.color, draggable: true })
        .setLngLat(element.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marcador: marcador,
        color: element.color
      })

      marcador.on('dragend', () => {
        this.guardarMarcadores();
      })

    });

  }

  borrar(i:number){

    this.marcadores[i].marcador?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadores();

    this.mapa.flyTo({
      center: this.centro,
      zoom: this.nivelZoom
    });

  }

}
