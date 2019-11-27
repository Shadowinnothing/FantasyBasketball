const newTestUserEmail = Math.random().toString(36).substring(7) + '@testUser.com'

context('User Authorization', () => {
    beforeEach(() => {
        //cy.visit('http://localhost:3000')
    })

    after(() => {
        cy.task('clear:testUsers')
    })

    it('should create user, redirect to homepage', () => {
        cy.visit('http://localhost:3000/register')
        cy.register(newTestUserEmail)
        cy.location('pathname').should('eq', '/')
    })
    
    it('should log user in and out', () => {
        cy.visit('http://localhost:3000/login')
        cy.login(newTestUserEmail, 'password')
        cy.location('pathname').should('eq', '/')
        cy.get('#logoutButton').click()
    })
})