export const page = {
  irGuardarRutina: () => {
    cy.get('app-navbar > nav > a:nth-child(3)').click();
  },
  ingresarDescripcion: (descripcion) => {
    cy.get('#descripcion').type(descripcion);
  },
  ingresarObjetivo: (objetivo) =>{
    cy.get('#objetivo').type(objetivo);
  },
  clickBotonGuardarRutina: () => {
    cy.get('#btn-guardar-rutina').click();
  }
};