const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor")

Given ("Already in agoda website", () => {
    cy.visit("https://www.agoda.com/");
});

Given("In Hotel tab" ,() => {
    cy.get('[data-selenium="allRoomsTab"]').should('be.visible')
    cy.get('[data-selected="true"]').should('be.visible')
    

});

When("Click flight tab" ,() => {
    cy.get('[data-selenium="agodaFlightsTab"]').click()
    cy.get('[data-selected="true"]').should('be.visible')

});

Then("Show form search flight" ,() => {
    cy.get('[aria-labelledby="tab-flight-tab"]').should('be.visible')
});

When("Fill form search flight" ,() => {
    cy.fixture('bookFlight').then((book) => {

        cy.get('[data-selenium="flight-origin-search-input"]').should('be.empty').type(book.from).wait(500)
        cy.get('[data-selenium="autosuggest-item"]').eq(0).click().wait(500)
        cy.get('[data-selenium="flight-destination-search-input"]').should('be.empty').type(book.to).wait(500)
        cy.get('[data-selenium="autosuggest-item"]').eq(0).click().wait(500)

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = String(tomorrow.getDate());

        cy.get('[data-selenium="range-picker-date"]').click().wait(500)

        cy.contains('[aria-label]', day).click();
        
    }) 
});

When("Click Search Flight button" ,() => {
    cy.get('[data-selenium="searchButton"]').click()
});

Then("Redirect to flight result" ,() => {
    cy.url('flights/results');
});

When("Search earliest depature with Malaysia Airlines" ,() => {
    cy.fixture('bookFlight').then((book) => {
        cy.xpath("//button[@role='button']").contains("airlines").click()
        cy.get('[data-component="flight-filter-item-airline"]').contains(book.airlines).click()

        cy.get('[data-testid="selection-popover"]').contains("Sort by").click()
        cy.get('[aria-labelledby="sort-options-label"]').contains(book.sortBy).click().wait(1000)
    }) 
});

When("Choose the earliest depature" ,() => {
    cy.get('[data-testid="flightCard-flight-detail"]').eq(1).click().wait(1000)
    cy.get('[data-testid="flight-details-expand"]').contains("Select").scrollIntoView().click({ force: true });
});

Then("Redirect to Passenger detail Page" ,() => {
    cy.url('bookings/details')
});

When("Fill passenger detail form" ,() => {
    cy.fixture('bookFlight').then((book) => {

        cy.get('[data-testid="contact.contactFirstName"]').should('be.empty').type(book.firstName).wait(500)
        cy.get('[data-testid="contact.contactLastName"]').should('be.empty').type(book.lastName).wait(500)
        cy.get('[data-testid="contact.contactEmail"]').should('be.empty').type(book.email).wait(500)
        cy.get('[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]').should('be.empty').type(book.phoneNumber).wait(1000)
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerGender"]').contains(book.gender).wait(500).click({force:true}).wait(500)
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerFirstName"]').should('be.empty').type(book.firstName).wait(500)
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerLastName"]').should('be.empty').type(book.lastName).wait(500)
        cy.get('[datatestid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]').type(book.birthDay).wait(500)
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]').click().wait(500)
        cy.get('[data-testid="floater-container"]').should('be.visible').contains(book.birthMonth).click()
        cy.get('[datatestid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]').type(book.birthYear).wait(500)
        cy.get('[data-testid="flight.forms.i0.units.i0.passengerNationality"]').click()
        cy.get('[data-testid="typography-type-2"]').type(book.nationality)
        // cy.contains(book.nationality).click({force: true})
    }) 
});


    // And Click continue to Payment
    // Then Show Payment Detail