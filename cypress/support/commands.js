// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerUser', (fullName, email, password) => {
  cy.visit('/account/register')
  cy.get('input[name="full_name"]').type(fullName)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.contains('button', 'SIGN UP').click()
  cy.get("a[href='/account']").should('be.visible')
})

Cypress.Commands.add('addProductToCart', (size, colour) => {
  cy.get('.listing-tem .product-name a').first().click()
  cy.get('.variant-option-list').first().contains('a', size).click()
  cy.get('.variant-option-list').last().contains('a', colour).click()
  cy.contains('button', 'ADD TO CART').click()
  cy.get('.toast-mini-cart').should('be.visible')
})