// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    const
        nome = 'Gustavo',
        sobrenome = 'Schneider',
        email = 'teste@hotmail.com',
        telefone = 1234567489,
        ajuda = Cypress._.repeat('Muitas informações ', 15)

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function () {

        cy.visit('../../src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {

        cy.clock()

        cy.get('#firstName')
            .type(nome)
            .should('have.value', nome)

        cy.get('#lastName')
            .type(sobrenome)
            .should('have.value', sobrenome)

        cy.get('#email')
            .type(email)
            .should('have.value', email)

        cy.get('#open-text-area')
            .type(ajuda, { delay: 0 })
            .should('have.value', ajuda)

        cy.contains('button', 'Enviar')
            .click()

        cy.get('.success')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success')
            .should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.clock()

        const email = 'email.oi'

        cy.get('#firstName')
            .type(nome)
            .should('have.value', nome)

        cy.get('#lastName')
            .type(sobrenome)
            .should('have.value', sobrenome)

        cy.get('#email')
            .type(email)
            .should('have.value', email)

        cy.get('#open-text-area')
            .type(ajuda)
            .should('have.value', ajuda)

        cy.contains('button', 'Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error')
            .should('not.be.visible')
    })

    Cypress._.times(3, function () {

        it('campo de telefone vazio ao tentar inserir letras', function () {

            cy.get('#phone')
                .type('oi tudo bem?')
                .should('be.empty')
        })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.clock()

        cy.get('#firstName')
            .type(nome)

        cy.get('#lastName')
            .type(sobrenome)

        cy.get('#email')
            .type(email)

        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')

        cy.get('#phone')
            .should('have.attr', 'required')

        cy.get('#open-text-area')
            .type(ajuda)

        cy.contains('button', 'Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error')
            .should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName')
            .type(nome)
            .should('have.value', nome)
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type(sobrenome)
            .should('have.value', sobrenome)
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type(email)
            .should('have.value', email)
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(telefone)
            .should('have.value', telefone)
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.contains('button', 'Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {

        cy.get('input[type=radio]')
            .should('have.length', 3)
            .each(function (radio) {

                cy.wrap(radio)
                    .check()
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('input[type=checkbox]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function (input) {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function (input) {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json').as('sampleFile')

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function (input) {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        cy.get('#privacy > a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {

        cy.get('#privacy > a')
            .invoke('removeAttr', 'target')
            .click()

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function () {

        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function () {

        const texto = Cypress._.repeat("TEXTO MUITO LONGO ", 20)

        cy.get('#open-text-area')
            .invoke('val', texto)
            .should('have.value', texto)
    })

    it('faz uma requisição HTTP', function () {

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {

                const { status, statusText, body } = response

                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('exibe o gato escondido', function () {

        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })
})