import { Component, OnInit } from '@angular/core';

interface Menu{
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public MenuItems: Menu[] = [
    { ruta: '/mapas/fullscreen', nombre: 'FullScreen' },
    { ruta: '/mapas/zoom-range', nombre: 'Zoom' },
    { ruta: '/mapas/marcadores', nombre: 'Marcadores' },
    { ruta: '/mapas/propiedades', nombre: 'Propiedades' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
