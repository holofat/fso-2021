describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog')
      }
    })
  })

  

  describe('Login', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000', {
        onBeforeLoad(win) {
          cy.stub(win.console, 'log').as('consoleLog')
        }
      })
    })

    it('Login form is shown', function() {
      cy.contains('Log in to Blog')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test3')
      cy.get('#password').type('test3')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('Create A New Blog').click()

      cy.get('#title').type('Cypress Title')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('Cypress URL')
      cy.get('#create-blog').click()
      cy.get('#cancel-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create A New Blog').click()

      cy.get('#title').type(' Part II')
      cy.get('#author').type(' Part II')
      cy.get('#url').type(' Part II')
      cy.get('#create-blog').click()

      cy.get('.blog').should('contain', 'Like')
    })

    it('A blog can be liked', function() {
      cy.get('#like-button:first').click()

      cy.get('#show-detail:first').click()

      cy.get('.totalLikes').should('contain', '1')
    })
  })

  describe('When delete a note', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('Create A New Blog').click()

      cy.get('#title').type('Cypress Title')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('Cypress URL')
      cy.get('#create-blog').click()
      cy.get('#cancel-button').click()
    })

    it('a blog can be deleted by the user who creat it', function() {
      cy.get('#show-detail').click()
  
      cy.get('#delete-button').click()
  
      cy.on('window:confirm', () => true)
      cy.get('.error').should('contain', 'Cypress Title is deleted')
    })

    it('a blog cant be deleted by the user who not create it', function() {
      cy.get('button:first').click()
      const user = {
        name: 'roof',
        username: 'roof',
        password: 'roof'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.get('#username').type('roof')
      cy.get('#password').type('roof')
      cy.get('#login-button').click()

      cy.get('#show-detail').click()
      cy.get('.blog').should('not.have', 'delete')
    })
  })

  describe('when there are some blogs', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('Create A New Blog').click()

      cy.get('#title').type('First')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('Cypress URL')
      cy.get('#create-blog').click()

      cy.get('#title').clear()

      cy.get('#title').type('Second')
      cy.get('#create-blog').click()

      cy.get('#title').clear()

      cy.get('#title').type('Third')
      cy.get('#create-blog').click()
      cy.get('#cancel-button').click()

    })

    it('the blogs are ordered according to likes', function() {

      cy.get('#like-button:first').click()
      cy.get('#like-button:first').click()
      cy.get('#like-button:first').click()

      cy.reload()

      cy.get('#show-detail:first').click()

      cy.get('#title:first').should('contain', 'First')
    })
  })
})

