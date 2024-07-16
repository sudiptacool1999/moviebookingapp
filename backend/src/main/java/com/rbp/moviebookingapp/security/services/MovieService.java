package com.rbp.moviebookingapp.security.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbp.moviebookingapp.models.Movie;
import com.rbp.moviebookingapp.models.Ticket;
import com.rbp.moviebookingapp.repository.MovieRepository;
import com.rbp.moviebookingapp.repository.TicketRepository;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private TicketRepository ticketRepository;
	
	public List<Movie> getAllMovies(){
		return movieRepository.findAll();
	}
	
	public List<Movie> getMovieByName(String movieName){
		return movieRepository.findByMovieName(movieName);
	}
	
	
	public List<Ticket> findSeats(String movieName, String theaterName){
		return ticketRepository.findSeats(movieName, theaterName);
	}
	
	public List<Movie> findAvailableTickets(String movieName, String theaterName){
		return movieRepository.findAvailableTickets(movieName, theaterName);
	}
	
	public List<Movie> findByMovieName(String movieName){
		return movieRepository.findByMovieName(movieName);
	}
	
	public void deleteByMovieName(String movieName) {
		movieRepository.deleteByMovieName(movieName);
	}
	
	public void saveTicket(Ticket ticket) {
		ticketRepository.save(ticket);
	}
	
	public void saveMovie(Movie movie) {
		movieRepository.save(movie);
	}
	
	public List<Ticket> getAllBookedTickets(String movieName){
		return ticketRepository.findByMovieName(movieName);
	}
	
	public Integer getTotalNoTickets(String movieName) {
		List<Ticket> tickets = ticketRepository.findByMovieName(movieName);
		int totalTickets = 0;
		for(Ticket ticket : tickets) {
			totalTickets = totalTickets + ticket.getNoOfTickets();
		}
		return totalTickets;
	}
	
	
}
