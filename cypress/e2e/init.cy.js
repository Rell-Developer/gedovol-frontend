/// <reference types="cypress"/>

describe('Pruebas de Visitas a las Paginas Publicas', () => { 

    it('Visita la pagina principal de gedovol', () => {
        // Verificar si llega a esa URL
        cy.visit('http://localhost:5173');

        // Verificar si aparece el texto de bienvenido
        cy.contains('h2', 'Bienvenido');

        // Encontrar los elementos esenciales
        cy.get('header');
        cy.get('main')
        cy.get('footer');
        // cy.get('aside');
    });
})