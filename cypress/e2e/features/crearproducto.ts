import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { page } from '../page/inicio-sesion-login';


Given('Ingreso a la ruta de inicio de sesión',()=>{
  page.irIniciarSesion();
});

When('Diligencio el formulario', () => {
  page.ingresarCampoCorreo('genesisdvargas4@gmail.com');
  page.ingresarContrasenia('12345678910');
});

Then('El usuario inicia sesión correctamente', () => {
  cy.intercept('POST', '/api/users*', {
    statusCode: 201,
    body:  {'id':'1','email':'user@email.com','createdAt':'2022-06-02T17:10:31.731Z'},
  });
  
  cy.intercept('POST', '/api/usuario/iniciar-sesion*', {
    statusCode: 200,
    body:  {'valor':'11288'},
  });
});

