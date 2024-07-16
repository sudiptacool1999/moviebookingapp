describe('Home Component', () => {
    beforeEach(() => {
        // Mock the API response for fetching movies
        cy.intercept('GET', 'http://localhost:8080/api/v1.0/moviebooking/all', {
            statusCode: 200,
            body: [
                {
                    _id: { timestamp: "1" },
                    movieName: "Movie A",
                    theatreName: "Theatre 1",
                    noOfTicketsAvailable: 0,
                    ticketStatus: "AVAILABLE"
                },
                {
                    _id: { timestamp: "2" },
                    movieName: "Movie B",
                    theatreName: "Theatre 2",
                    noOfTicketsAvailable: 5,
                    ticketStatus: "AVAILABLE"
                }
            ]
        }).as('fetchMovies');
        
        // Visit the Home component
        cy.visit('/');
    });

    it('should display all shows', () => {
        // Wait for the API call to complete
        cy.wait('@fetchMovies');

        // Check if the header is present
        cy.get('h2').should('contain', 'All Shows');

        // Check if the table is present
        cy.get('table').should('have.class', 'table-border');

        // Check the table headers
        cy.get('thead > tr > th').should('have.length', 8);
        cy.get('thead > tr > th').eq(0).should('contain', 'Movie ID');
        cy.get('thead > tr > th').eq(1).should('contain', 'Movie Name');
        cy.get('thead > tr > th').eq(2).should('contain', 'Theater Name');
        cy.get('thead > tr > th').eq(3).should('contain', 'Ticket Available');
        cy.get('thead > tr > th').eq(4).should('contain', 'Ticket Status');
        cy.get('thead > tr > th').eq(5).should('contain', 'Ticket Details');
        cy.get('thead > tr > th').eq(6).should('contain', 'Update Ticket Status');
        cy.get('thead > tr > th').eq(7).should('contain', 'Delete Movie');

        // Check the table rows
        cy.get('tbody > tr').should('have.length', 2);

        // Check the first row
        cy.get('tbody > tr').eq(0).within(() => {
            cy.get('td').eq(0).should('contain', '1');
            cy.get('td').eq(1).should('contain', 'Movie A');
            cy.get('td').eq(2).should('contain', 'Theatre 1');
            cy.get('td').eq(3).should('contain', '0');
            cy.get('td').eq(4).should('contain', 'AVAILABLE');
            cy.get('td').eq(5).should('contain', 'Details');
            cy.get('td').eq(6).should('contain', 'Update');
            cy.get('td').eq(7).should('contain', 'Delete');
        });

        // Check the second row
        cy.get('tbody > tr').eq(1).within(() => {
            cy.get('td').eq(0).should('contain', '2');
            cy.get('td').eq(1).should('contain', 'Movie B');
            cy.get('td').eq(2).should('contain', 'Theatre 2');
            cy.get('td').eq(3).should('contain', '5');
            cy.get('td').eq(4).should('contain', 'AVAILABLE');
            cy.get('td').eq(5).should('contain', 'Details');
            cy.get('td').eq(6).should('contain', 'Update');
            cy.get('td').eq(7).should('contain', 'Delete');
        });
    });

    it('should update ticket status', () => {
        // Mock the API response for updating ticket status
        cy.intercept('PUT', 'http://localhost:8080/api/v1.0/moviebooking/Movie A/update', {
            statusCode: 200,
            body: { message: "Ticket status Updated Successfully" }
        }).as('updateTicketStatus');

        // Click on the update button for the first movie
        cy.get('tbody > tr').eq(0).within(() => {
            cy.get('button').contains('Update').click();
        });

        // Wait for the API call to complete
        cy.wait('@updateTicketStatus');

        // Check if the alert is shown
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Ticket status Updated Successfully');
        });
    });

    it('should delete a movie', () => {
        // Mock the API response for deleting a movie
        cy.intercept('DELETE', 'http://localhost:8080/api/v1.0/moviebooking/Movie A/delete', {
            statusCode: 200,
            body: { message: "Movie Deleted Successfully" }
        }).as('deleteMovie');

        // Click on the delete button for the first movie
        cy.get('tbody > tr').eq(0).within(() => {
            cy.get('button').contains('Delete').click();
        });

        // Wait for the API call to complete
        cy.wait('@deleteMovie');

        // Check if the alert is shown
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Movie Deleted Successfully');
        });

        // Verify the movie is removed from the list
        cy.get('tbody > tr').should('have.length', 1);
    });
});
