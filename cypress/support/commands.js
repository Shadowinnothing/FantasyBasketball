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
Cypress.Commands.add("login", (email, password) => {
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('#loginButton').click()
})

Cypress.Commands.add("registerTestUser", email => {
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="screenName"]').type('Random Gen User')
    cy.get('input[name="password"]').type('password')
    cy.get('input[name="password2"]').type('password')
    cy.get('#registerButton').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
