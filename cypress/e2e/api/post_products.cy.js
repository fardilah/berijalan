const testData = require('../../fixtures/product_test_data.json')

describe('Tes API - POST /products', () => {

  it('Comparing Data - POST', function () {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/products',
      body: testData.positive
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])
      expect(response.body).to.have.property('id')
      expect(response.body.title).to.eq(testData.positive.title)
    })
  })

  context('Skenario Negatif', () => {
    Object.keys(testData.negative).forEach((caseKey) => {
      const negativeCase = testData.negative[caseKey]

      it(`${negativeCase.case_name}`, () => {
        cy.request({
          method: 'POST',
          url: 'https://fakestoreapi.com/products',
          body: negativeCase.payload,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400)
          // expect(response.status).be.oneOf([200, 201])
        })
      })
    })
  })
})