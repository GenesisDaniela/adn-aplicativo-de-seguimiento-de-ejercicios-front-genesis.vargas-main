import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '@core/modelo/menu-item';
import { SesionService } from '@shared/servicios/sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [`:host {
    border: 0 solid #e1e1e1;
    border-bottom-width: 1px;
    display: block;
    height: 48px;
    padding: 0 16px;
  }

  nav a {
    color: #8f8f8f;
    font-size: 14px;
    font-weight: 500;
    line-height: 48px;
    margin-right: 20px;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
  }

  nav a.router-link-active {
    color: #106cc8;
  }`],
})
export class NavbarComponent {
  @Input() items: MenuItem[];
  
  constructor(protected sesionService: SesionService, protected router: Router){
  }
  
  estaLogueado(){
    return this.sesionService.estaLogueado();
  }

  cerrarSesion(){
    this.sesionService.cerrarSesion();
    this.router.navigate(['/inicio-sesion']);
  }
}
