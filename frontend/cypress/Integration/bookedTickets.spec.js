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
      
      // Visit the component with a specific movie name and ensure it's fully loaded
      cy.visit('/booked-tickets/Movie A').then(() => {
          // Ensure the page is fully loaded
          cy.wait('@getTickets');
      });
  });

  it('should display all booked tickets', () => {
      // Check if the header is present
      cy.get('h3').should('contain', 'All Booked Tickets');

      // Check if the table is present
      cy.get('table').should('have.class', 'table-border');

      // Check the table headers
      cy.get('thead > tr > th').should('have.length', 5);
      cy.get('thead > tr > th').eq(0).should('contain', 'UserName');
      cy.get('thead > tr > th').eq(1).should('contain', 'Movie Name');
      cy.get('thead > tr > th').eq(2).should('contain', 'Theatre Name');
      cy.get('thead > tr > th').eq(3).should('contain', 'Number Of Tickets');
      cy.get('thead > tr > th').eq(4).should('contain', 'Seat Numbers');

      // Check the table rows
      cy.get('tbody > tr').should('have.length', 2);

      // Check the first row
      cy.get('tbody > tr').eq(0).within(() => {
          cy.get('td').eq(0).should('contain', 'user1');
          cy.get('td').eq(1).should('contain', 'Movie A');
          cy.get('td').eq(2).should('contain', 'Theatre 1');
          cy.get('td').eq(3).should('contain', '2');
          cy.get('td').eq(4).should('contain', 'A1,A2');
      });

      // Check the second row
      cy.get('tbody > tr').eq(1).within(() => {
          cy.get('td').eq(0).should('contain', 'user2');
          cy.get('td').eq(1).should('contain', 'Movie A');
          cy.get('td').eq(2).should('contain', 'Theatre 2');
          cy.get('td').eq(3).should('contain', '3');
          cy.get('td').eq(4).should('contain', 'B1,B2,B3');
      });
  });
});
