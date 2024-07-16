// cypress/integration/bookedTickets.spec.js

describe('BookedTickets Component', () => {
  beforeEach(() => {
      // Mock the API response
      cy.intercept('GET', 'http://localhost:8080/api/v1.0/moviebooking/getallbookedtickets/*', {
          statusCode: 200,
          body: [
              {
                  loginId: "user1",
                  movieName: "Movie A",
                  theatreName: "Theatre 1",
                  noOfTickets: 2,
                  seatNumber: ["A1", "A2"]
              },
              {
                  loginId: "user2",
                  movieName: "Movie A",
                  theatreName: "Theatre 2",
                  noOfTickets: 3,
                  seatNumber: ["B1", "B2", "B3"]
              }
          ]
      }).as('getTickets');
      
      // Visit the component with a specific movie name
      cy.visit('/booked-tickets/Movie A');
  });

  it('should display all booked tickets', () => {
      // Wait for the API call to complete
      cy.wait('@getTickets');

      // Check if the header is present
      cy.get('h3').contains('All Booked Tickets');

      // Check if the table is present
      cy.get('table').should('have.class', 'table-border');

      // Check the table headers
      cy.get('thead > tr > th').should('have.length', 5);
      cy.get('thead > tr > th').eq(0).contains('UserName');
      cy.get('thead > tr > th').eq(1).contains('Movie Name');
      cy.get('thead > tr > th').eq(2).contains('Theatre Name');
      cy.get('thead > tr > th').eq(3).contains('Number Of Tickets');
      cy.get('thead > tr > th').eq(4).contains('Seat Numbers');

      // Check the table rows
      cy.get('tbody > tr').should('have.length', 2);

      // Check the first row
      cy.get('tbody > tr').eq(0).within(() => {
          cy.get('td').eq(0).contains('user1');
          cy.get('td').eq(1).contains('Movie A');
          cy.get('td').eq(2).contains('Theatre 1');
          cy.get('td').eq(3).contains('2');
          cy.get('td').eq(4).contains('A1,A2');
      });

      // Check the second row
      cy.get('tbody > tr').eq(1).within(() => {
          cy.get('td').eq(0).contains('user2');
          cy.get('td').eq(1).contains('Movie A');
          cy.get('td').eq(2).contains('Theatre 2');
          cy.get('td').eq(3).contains('3');
          cy.get('td').eq(4).contains('B1,B2,B3');
      });
  });
});
