Feature: Booking Flight from Jakarta to Singapore via Agoda

Scenario: Successful booking
    Given Already in agoda website
    And In Hotel tab
    When Click flight tab
    Then Show form search flight
    When Fill form search flight
    And Click Search Flight button
    Then Redirect to flight result
    When Search earliest depature with Malaysia Airlines
    And Choose the earliest depature
    Then Redirect to Passenger detail Page 
    When Fill passenger detail form
    # And Click continue to Payment
    # Then Show Payment Detail