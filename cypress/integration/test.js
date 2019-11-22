const newTestUserEmail = Math.random().toString(36).substring(7) + '@testUser.com'

context('User Authorization', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('should create user, redirect to homepage', () => {
        cy.visit('http://localhost:3000/register')
    
        cy.get('input[name="name"]').type('Test User')
        cy.get('input[name="email"]').type(newTestUserEmail)
        cy.get('input[name="screenName"]').type('Random Gen User')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="password2"]').type('password')
        cy.get('#registerButton').click()
    
        cy.location('pathname').should('eq', '/')
    })
    
    it('should log user in and out', () => {
        cy.visit('http://localhost:3000/login')
    
        cy.get('input[name="email"]').type(newTestUserEmail)
        cy.get('input[name="password"]').type('password')
        cy.get('#loginButton').click()
    
        cy.location('pathname').should('eq', '/')
    })
})