
///<reference types='cypress'/>
import 'cypress-xpath';

describe('Test Suite', () => {
    beforeEach(() => {
      // Visit the page before each test
      cy.visit('https://movie-reviews-psi.vercel.app/')
    })

it('addMovies', function(){
    cy.contains('h4', 'Add new movie').should('be.visible').click()

    cy.get('#name').type('Latest Movies')
    cy.get('#release').click().type('2024-03-28')
    cy.get('.justify-end > .flex').click()
    cy.wait(2000)
    cy.get('.flex > .w-full').click()
}
)

it('searchMovies', function(){
    // Wait for the API request to complete and assert its success
    cy.request('GET', 'https://movie-reviews-psi.vercel.app/api/trpc/movie.list,review.list?batch=1&input=%7B%7D').then((response) => {expect(response.status).to.eq(200);});
    
    cy.get('.flex > .w-full').type('Latest Movies{enter}')
}
)

it('Reviews', function(){
    cy.xpath("//h4[contains(text(),'Add new review')]").click();
    // cy.get('#movie').click()
    cy.get('#movie').select('Latest Movies')
    cy.get('#name').type('user_01')
    cy.get('#rating').type('9')
    cy.get('#review').type('Review Submitted')
    cy.get('.justify-end > .flex').click()

})

it('Delete Reviews', function(){
    cy.get('.flex > .w-full').type('Latest Movies{enter}')
    cy.wait(3000)
    cy.xpath("//h1[contains(text(),'Latest Movies')]").click()
    cy.get('.align-bottom > .flex > :nth-child(2)').click()
    cy.xpath('//div[contains(text(),"Review Deleted")]').should('contain.text', 'Review Deleted')

})

it('Movies Deleted', function(){
    cy.get('.flex > .w-full').type('Latest Movies{enter}')
    cy.wait(2000)
    cy.get('.absolute > :nth-child(2)').click()
    cy.xpath('//div[contains(text(),"Successfully Deleted")]').should('contain.text', 'Successfully Deleted')
})


})
