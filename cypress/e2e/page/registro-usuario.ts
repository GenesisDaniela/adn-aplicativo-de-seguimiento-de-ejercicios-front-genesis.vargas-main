export const page = {
  irRegistroUsuario: () => {
    cy.visit('/registro');
  },
  ingresarCampoCorreo: (correo) => {
    cy.get('#correo').type(correo);
  },
  ingresarContrasenia: (contrasenia) => {
    cy.get('#contrasenia').type(contrasenia);
  },
  ingresarNombre: (nombre) => {
    cy.get('#nombre').type(nombre);
  },
  ingresarFechaNacimiento: (fechaNacimiento) => {
    cy.get('#fechaNacimiento').type(fechaNacimiento);
  },
  ingresarPeso: (peso) => {
    cy.get('#peso').type(peso);
  },
  clickBotonRegistro: () => {
    cy.get('#btn-registro').click();
  }
};