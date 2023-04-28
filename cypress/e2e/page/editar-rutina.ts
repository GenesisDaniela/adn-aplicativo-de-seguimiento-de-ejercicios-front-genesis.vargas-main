export const page = {
  ingresarSeries: (series) => {
    cy.get('#series').type(series);
  },
  ingresarPeso: (peso) =>{
    cy.get('#peso').type(peso);
  },
  ingresarRepeticiones: (repeticiones) =>{
    cy.get('#repeticiones').type(repeticiones);
  },
  ingresarEjercicio: (ejercicio) =>{
    cy.get('#ejercicio').select(ejercicio);
  },
  clickBotonGuardarPlan: () => {
    cy.get('#botonAgregar').click();
  },
  clickBotonGuardar: () => {
    cy.get('#botonEditarRutina').click();
  },
  irAEditarRutinas: () =>{
    cy.visit('/rutina/editar/2953');
  },
  ingresarDescripcion: (descripcion) => {
    cy.get('#descripcion').type(descripcion);
  },
  ingresarObjetivo: (objetivo) =>{
    cy.get('#objetivo').type(objetivo);
  }
};