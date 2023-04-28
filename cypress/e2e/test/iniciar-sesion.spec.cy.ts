import { page } from '../page/inicio-sesion-login';

describe('iniciar-sesion.spec.cy.ts', () => {
  it('should inicio ', () => {
    page.irIniciarSesion();
    page.ingresarCampoCorreo('genesisdvargas4@gmail.com');
    page.ingresarContrasenia('12345678910');
    page.clickBotonIniciarSesion();
    cy.intercept('POST', '/api/usuario/iniciar-sesion*', {
      statusCode: 200,
      body:  {'valor':'11288'},
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Inicio de sesión exitoso');
    });

  });
});


