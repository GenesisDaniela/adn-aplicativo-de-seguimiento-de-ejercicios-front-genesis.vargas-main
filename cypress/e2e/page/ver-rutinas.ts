export const page = {
  irHome: () => {
    cy.visit('/home');
    
  },
  irListarRutinas: () => {
    cy.get('app-navbar > nav > a:nth-child(2)').click();
  }
};