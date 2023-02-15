Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {

    cy.get('#firstName').type('Gustavo')

    cy.get('#lastName').type('Schneider')

    cy.get('#email').type('teste@hotmail.com')

    cy.get('#open-text-area').type('teste', { delay: 0 })

    cy.contains('button', 'Enviar').click()
})