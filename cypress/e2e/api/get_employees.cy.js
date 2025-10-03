const controlData = require('../../fixtures/employees_control_data.json')

describe('Tes Live API - GET /employees', () => {

  it('Comparing Data - GET', () => {
    
    cy.request({
      method: 'GET',
      url: 'http://dummy.restapiexample.com/api/v1/employees',
      failOnStatusCode: false 
    }).then((response) => {
      
      if (response.status === 429) {
        cy.log('**TEST SKIPPED**: Kena Rate Limit dari API.')
        return 
      }

      expect(response.status).to.eq(200, 'Status response dari API asli harus 200')

      const liveDataFromAPI = response.body.data
      const validationErrors = []

      controlData.forEach((expectedEmployee) => {
        const actualEmployee = liveDataFromAPI.find(e => e.id === expectedEmployee.id)
        
        if (!actualEmployee) {
          const errMsg = `\n- Karyawan '${expectedEmployee.employee_name}' (ID: ${expectedEmployee.id}) tidak ditemukan.`
          validationErrors.push(errMsg)
          cy.log(`AGAL: Data untuk **'${expectedEmployee.employee_name}'** TIDAK DITEMUKAN.`)
          return 
        }

        const propertiesToCompare = ['id', 'employee_name', 'employee_salary', 'employee_age']
        const actualDataForComparison = Cypress._.pick(actualEmployee, propertiesToCompare)
        const expectedDataForComparison = Cypress._.pick(expectedEmployee, propertiesToCompare)
        
        if (!Cypress._.isEqual(actualDataForComparison, expectedDataForComparison)) {
          const errorMessage = `
          ---------------------------------
          - KESALAHAN pada data '${expectedEmployee.employee_name}':
            - Harusnya:   ${JSON.stringify(expectedDataForComparison)}
            - Diterima:   ${JSON.stringify(actualDataForComparison)}
          ---------------------------------`
          validationErrors.push(errorMessage)
        } else {
          expect(true, `Data untuk '${expectedEmployee.employee_name}' Sesuai`).to.be.true
        }
      })
      
      const customErrorMessage = `Ditemukan ${validationErrors.length} ketidaksesuaian data:\n${validationErrors.join('')}`
      expect(validationErrors, customErrorMessage).to.be.empty
    })
  })
})