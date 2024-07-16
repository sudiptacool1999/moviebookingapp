package com.rbp.moviebookingapp.security.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.rbp.moviebookingapp.models.Movie;
import com.rbp.moviebookingapp.models.Ticket;
import com.rbp.moviebookingapp.repository.MovieRepository;
import com.rbp.moviebookingapp.repository.TicketRepository;

@SpringBootTest
@ActiveProfiles("test")
public class MovieServiceTest {
		
	@MockBean
	private MovieRepository movieRepo;
	
	@MockBean
	private TicketRepository ticketRepo;
	
	@Autowired
	private MovieService movieService;
	
	@Test
	public void testGetAllMovies(){
		//Set up mock data
		List<Movie> movies = new ArrayList<>();
		Movie movie1 = new Movie("Movie 1","Theatre 1", 120,"Book Now" );
		Movie movie2 = new Movie("Movie 2","Theatre 2", 110,"Book Now" );
		movies.add(movie1);
		movies.add(movie2);
		
		//Set up mock behaviour
		when(movieRepo.findAll()).thenReturn(movies);
		
		//Call method under test
		List<Movie> result = movieService.getAllMovies();
		
		assertEquals(movies,result);
	}
	
	@Test
	void getmovieByName() {
		//Set up mock data
		List<Movie> movies = new ArrayList<>();
		movies.add(new Movie("Sultan","PVR",123,"Book ASAP"));
		movies.add(new Movie("Jab we met","INOX",133,"Book ASAP"));
		movies.add(new Movie("Avengers","Anupam",126,"Book ASAP"));
		when(movieRepo.findByMovieName("Sultan")).thenReturn(
				movies.stream().filter(m -> m.getMovieName().equals("Sultan")).collect(
						Collectors.toList()));
		
		//call the method being tested
		List<Movie> result = movieService.getMovieByName("Sultan");
		
		//Assert the result
		assertEquals(1,result.size());
		assertEquals("Sultan",result.get(0).getMovieName());
	}
	
	 @Test
	    void findSeats() {
	        // Set up mock data
	        List<Ticket> tickets = new ArrayList<>();
	        tickets.add(new Ticket("mustakeem","Sultan", "Screen 1", 2, new ArrayList<String>(List.of("a1","a2"))));
	        when(ticketRepo.findSeats("Sultan", "Screen 1")).thenReturn(tickets);

	        // Call the method being tested
	        List<Ticket> result = movieService.findSeats("Sultan", "Screen 1");

	        // Assert the results
	        assertEquals(1, result.size());
	    }
	 
	 @Test
	    void testFindAvailableTickets() {
	        String movieName = "Avengers: Endgame";
	        String theatreName = "Theatre 1";
	        List<Movie> expectedMovies = Arrays.asList(
	                new Movie("Avengers: Endgame", "Action", 180, "Incredible!"),
	                new Movie("Avengers: Endgame", "Action", 180, "Amazing!"),
	                new Movie("Avengers: Endgame", "Action", 180, "Thrilling!")
	        );
	        when(movieRepo.findAvailableTickets(movieName, theatreName)).thenReturn(expectedMovies);
	        List<Movie> actualMovies = movieService.findAvailableTickets(movieName, theatreName);
	        assertEquals(expectedMovies, actualMovies);
	    }
	 
	 @Test
	    void testSaveTicket() {
	        Ticket expectedTicket = new Ticket("mustakeem","Sultan", "Screen 1", 2, new ArrayList<String>(List.of("a1","a2")));
	        movieService.saveTicket(expectedTicket);
	        verify(ticketRepo, times(1)).save(expectedTicket);
	    }
	 
	 @Test
	    void testSaveMovie() {
	        Movie expectedMovie = new Movie("Avengers: Endgame", "Action", 180, "Incredible!");
	        movieService.saveMovie(expectedMovie);
	        verify(movieRepo, times(1)).save(expectedMovie);
	    }
	 
	 @Test
	    void testGetAllBookedTickets() {
	        String movieName = "Avengers: Endgame";
	        List<Ticket> expectedTickets = Arrays.asList(
	                new Ticket("mustakeem","Sultan", "Screen 1", 2, new ArrayList<String>(List.of("a1","a2")))
	        );
	        when(ticketRepo.findByMovieName(movieName)).thenReturn(expectedTickets);
	        List<Ticket> actualTickets = movieService.getAllBookedTickets(movieName);
	        assertEquals(expectedTickets, actualTickets);
	    }
	 
	 @Test
	    void findByMovieName() {
	        String movieName = "The Dark Knight";
	        List<Movie> movies = new ArrayList<>(List.of(
	                new Movie("The Dark Knight", "Christopher Nolan", 152, "A Batman movie"),
	                new Movie("The Dark Knight Rises", "Christopher Nolan", 165, "Another Batman movie")
	        ));
	        when(movieRepo.findByMovieName(movieName)).thenReturn(movies);
	        assertEquals(movies, movieService.findByMovieName(movieName));
	    }
	 
	 @Test
	    void deleteByMovieName() {
	        String movieName = "The Dark Knight";
	        movieService.deleteByMovieName(movieName);
	        verify(movieRepo, times(1)).deleteByMovieName(movieName);
	    }

}
