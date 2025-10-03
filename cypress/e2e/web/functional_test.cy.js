describe('Functional Testing', () => {
  
  const size = 'M'
  const colour = 'Purple'

   beforeEach(() => {
      cy.visit('/')
    })

  it('Navigasi & Validasi URL', function () {
    const fullName = 'Test User Fadil'
    const uniqueEmail = `testuser_${Date.now()}@example.com`

    cy.xpath("//a[@href='https://demo.evershop.io/account/login']").click()
    cy.xpath("//a[@href='https://demo.evershop.io/account/register']").click()
    cy.url().should('include', '/register')

    cy.get('input[name="full_name"]').type(fullName)
    cy.get('input[name="email"]').type(uniqueEmail)
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button').contains('SIGN UP').click()
    cy.xpath("//a[@href='https://demo.evershop.io/account']").click()
    cy.get('.account-details-name div:last-child')
      .should('have.text', fullName)

    cy.get('.account-details-email div:last-child')
      .should('have.text', uniqueEmail)
  })

  it('Add to Cart & Verifikasi Quantity', function () {
    const minRange = 181
    const maxRange = 650
    const brand = 'Converse'

    cy.contains('a', 'Women').click()
    cy.get('input[type="range"].min')
      .invoke('val', minRange)
      .trigger('input', { force: true })
      .trigger('change', { force: true })

    cy.get('input[type="range"].max')
      .invoke('val', maxRange)
      .trigger('input', { force: true })
      .trigger('change', { force: true })

    cy.contains('span.filter-option', size).click()

    cy.wait(1500)
    cy.contains('span.filter-option', colour).click()
    cy.wait(1500)
    cy.contains('span.filter-option', brand).click()
    cy.wait(1500)

    cy.get('.listing-tem .product-name a').first().click()

    cy.get('.product-single-name')
      .should('be.visible')

    cy.get('.variant-option-list')
    .first()
    .contains('a', size)
    .click()

    cy.wait(1000)

    cy.get('.variant-option-list')
      .last()
      .contains('a', colour)
      .click()

    cy.wait(1000)

    cy.contains('button', 'ADD TO CART').click()
    cy.get('.toast-mini-cart')
    .should('be.visible')
    .within(() => {
      cy.contains('QTY: 1').should('exist')
      cy.contains('VIEW CART (1)').should('exist')
    })
  })

  it('Hapus Produk dari Keranjang', function () {

    cy.visit('https://demo.evershop.io')

    cy.get('.listing-tem .product-name a').first().click()

    cy.get('.variant-option-list').first().contains('a', size).click()
    cy.wait(1000)

    cy.get('.variant-option-list').last().contains('a', colour).click()

    cy.wait(2000)
    cy.contains('button', 'ADD TO CART').click()
    cy.wait(1000)

    cy.get('.toast-mini-cart').should('be.visible')
    cy.contains('VIEW CART (1)').should('be.visible')
    cy.contains('VIEW CART (1)').click()

    cy.contains('Remove').click()

    cy.contains('Your cart is empty!').should('be.visible')
  })

it('Checkout Flow', function () {
  const fullName = 'Dummy User Cypress'
  const uniqueEmail = `testuser_${Date.now()}@example.com`
  const password = 'Password123!'
  cy.xpath("//a[@href='https://demo.evershop.io/account/login']").click()
  cy.xpath("//a[@href='https://demo.evershop.io/account/register']").click()
  cy.url().should('include', '/register')

  cy.get('input[name="full_name"]').type(fullName)
  cy.get('input[name="email"]').type(uniqueEmail)
  cy.get('input[name="password"]').type(password)
  cy.get('button').contains('SIGN UP').click()

  cy.xpath("//a[@href='https://demo.evershop.io/account']").should('be.visible')

  cy.contains('a', 'Women').click()
  cy.wait(1500)
  cy.get('.listing-tem .product-name a').first().click()
  cy.wait(1000)

  cy.get('.variant-option-list').first().contains('a', size).click()
  cy.wait(1000)
  cy.get('.variant-option-list').last().contains('a', colour).click()
  cy.wait(2000)

  cy.contains('button', 'ADD TO CART').click()
  cy.wait(1000)
  cy.get('.toast-mini-cart').should('be.visible')
  cy.contains('VIEW CART (1)').should('be.visible').click()

  cy.xpath("//a[@href='https://demo.evershop.io/checkout']").click({ force: true })
  cy.wait(2000)
  cy.get('input[name="address[full_name]"]').type(fullName)
  cy.get('input[name="address[telephone]"]').type('081234567890')
  cy.get('input[name="address[address_1]"]').type('123 Cypress Street')
  cy.get('input[name="address[city]"]').type('Testville')
  cy.get('select[name="address[country]"]').select('US')
  cy.get('select[name="address[province]"]').select('California')
  cy.get('input[name="address[postcode]"]').type('90210')

  cy.wait(1000)

  cy.get('.radio-unchecked').first().click()
  cy.wait(1000)

  cy.contains('button', 'Continue to payment').click()
  cy.wait(1200)

  cy.get('img[alt="Cash On Delivery"]')
    .closest('.flex')
    .find('a')
    .wait(500)
    .click({ force: true })

  cy.wait(3000)

  cy.contains('button', 'Place Order').click({ force: true })

  cy.wait(5000)

  cy.contains('Thank you').should('be.visible')

  cy.url().should('include', '/checkout/success')

})

  it('Mobile Viewport Test', function () {
    cy.viewport('iphone-x')
    cy.get('div.md\\:hidden a')
    .find('svg')
    .should('be.visible')

    cy.get('div.md\\:hidden a').click()

    cy.contains('a', 'Shop').should('be.visible')
  })
})