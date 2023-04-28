import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { SesionService } from '@shared/servicios/sesion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(protected sesionService: SesionService){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesionService.estaLogueado();
  }

}
