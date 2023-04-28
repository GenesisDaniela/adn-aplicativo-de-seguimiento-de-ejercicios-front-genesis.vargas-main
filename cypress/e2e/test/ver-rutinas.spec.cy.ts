import { page } from '../page/ver-rutinas';
import { page as login } from '../page/inicio-sesion-login';


describe('ver-rutinas.spec.cy.ts', () => {
  beforeEach(() => {
    login.irIniciarSesion();
    login.ingresarCampoCorreo('genesisdvargas4@gmail.com');
    login.ingresarContrasenia('12345678910');
    login.clickBotonIniciarSesion();
    cy.intercept('POST', '/api/usuario/iniciar-sesion*', {
      statusCode: 200,
      body:  {'valor':'1'},
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Inicio de sesión exitoso');
    });
  });

  it('should listar rutinas', () => {
    cy.wait(1000);
    page.irHome();
    page.irListarRutinas();
    cy.intercept('POST', 'api/usuario/1/rutina', {
      statusCode: 200 });
  });
});


