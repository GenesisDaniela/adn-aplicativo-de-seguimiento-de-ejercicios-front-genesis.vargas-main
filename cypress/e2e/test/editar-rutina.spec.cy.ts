import { page as login } from '../page/inicio-sesion-login';
import { page as rutina } from '../page/editar-rutina';


describe('editar-rutina.spec.cy.ts', () => {
  it('should editar rutina', () => {
    login.irIniciarSesion();
    login.ingresarCampoCorreo('genesisdvargas4@gmail.com');
    login.ingresarContrasenia('12345678910');
    login.clickBotonIniciarSesion();
    
    cy.intercept('POST', '/api/usuario/iniciar-sesion*', {
      statusCode: 200,
      body:  {'valor':'1'},
    });
    cy.wait(2000);
    rutina.irAEditarRutinas();
    rutina.ingresarDescripcion('descripcion editada');
    rutina.ingresarObjetivo('objetivo editado');
    rutina.clickBotonGuardarPlan();
    rutina.ingresarPeso(20);
    rutina.ingresarRepeticiones(50);
    rutina.ingresarSeries(10);
    rutina.ingresarEjercicio('martillo');
    rutina.clickBotonGuardar();

    
  });

});


