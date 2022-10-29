import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  public mapa!: mapboxgl.Map;
  public nivelZoom: number = 16.7;
  public centro: [number, number] = [-77.07125827135353, -12.030126649929777];

  @ViewChild('mapa') divMapa!: ElementRef;

  constructor(){}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.centro, // starting position [lng, lat]
      zoom: this.nivelZoom // starting zoom
    });

    this.mapa.on('zoom', () => {
      this.nivelZoom = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
      if (this.mapa.getZoom() < 13) {
        this.mapa.zoomTo(13);
      }
      this.nivelZoom = this.mapa.getZoom();
    });

    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.centro = [lng,lat];
    });
    
  }

  alejar(){
    this.mapa.zoomOut();
  }

  acercar(){
    this.mapa.zoomIn();
  }

  cambio(valor:string){
    this.mapa.zoomTo(Number(valor));
  }

}
