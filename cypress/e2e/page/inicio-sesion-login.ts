export const page = {
  irIniciarSesion: () => {
    cy.visit('/');
  },
  ingresarCampoCorreo: (correo) => {
    cy.get('#correo').type(correo);

  },
  ingresarContrasenia: (contrasenia) => {
    cy.get('#contrasenia').type(contrasenia);
  },
  clickBotonIniciarSesion: () => {
    cy.get('#btn-iniciar-sesion').click();
  }
};