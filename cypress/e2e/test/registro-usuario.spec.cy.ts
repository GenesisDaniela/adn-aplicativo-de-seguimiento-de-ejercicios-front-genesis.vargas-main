import { page } from '../page/registro-usuario';

describe('registro-usuario.spec.cy.ts', () => {
  it('should registro ', () => {
    page.irRegistroUsuario();
    page.ingresarFechaNacimiento('2001-02-02');
    page.ingresarPeso(45);
    page.ingresarNombre('Génesis');
    page.ingresarCampoCorreo('genesisdvargas'+Math.floor(Math.random() * (50 - 10 + 1) + 10)+'@gmail.com');
    page.ingresarContrasenia('12345678910');

    page.clickBotonRegistro();
    cy.intercept('POST', '/api/usuario/*', {
      statusCode: 200,
      body:  {'valor':'11293'},
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Registro de usuario exitoso');
    });

  });
});


