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
    cy.get('#botonGuardar').click();
  }
};