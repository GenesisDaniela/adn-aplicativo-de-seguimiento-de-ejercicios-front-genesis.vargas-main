import { page } from '../page/guardar-rutina';
import { page as login } from '../page/inicio-sesion-login';
import { page as plan } from '../page/guardar-plan';


describe('guardar-rutina.spec.cy.ts', () => {

  it('should guardar rutina con plan', () => {
    login.irIniciarSesion();
    login.ingresarCampoCorreo('genesisdvargas4@gmail.com');
    login.ingresarContrasenia('12345678910');
    login.clickBotonIniciarSesion();
    
    cy.intercept('POST', '/api/usuario/iniciar-sesion*', {
      statusCode: 200,
      body:  {'valor':'1'},
    });
    page.irGuardarRutina();
    page.ingresarDescripcion('entrenamiento de impacto');
    page.ingresarObjetivo('fortalecimiento de musculos');
    page.clickBotonGuardarRutina();
    
    cy.intercept('POST', '/api/usuario/1/rutina*', {
      statusCode: 200,
      body:  {'valor':'2901'}});
    plan.ingresarPeso(20);
    plan.ingresarRepeticiones(50);
    plan.ingresarSeries(10);
    plan.ingresarEjercicio('martillo');
    plan.clickBotonGuardarPlan();
    
  });
});


