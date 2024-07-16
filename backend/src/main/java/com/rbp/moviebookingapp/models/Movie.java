package com.rbp.moviebookingapp.models;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value="movie")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
	private ObjectId _id;
	private String movieName;
	private String theatreName;
	private Integer noOfTicketsAvailable;
	private String ticketStatus;
	
	public Movie(String movieName, String theatreName, Integer noOfTicketsAvailable,
			String ticketStatus) {
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.noOfTicketsAvailable = noOfTicketsAvailable;
		this.ticketStatus = ticketStatus;
	}

	public Movie(String movieName, String theatreName, Integer noOfTicketsAvailable) {
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.noOfTicketsAvailable = noOfTicketsAvailable;
	}

	public Movie(ObjectId _id, String movieName, String theatreName, Integer noOfTicketsAvailable) {

		this._id = _id;
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.noOfTicketsAvailable = noOfTicketsAvailable;
	}
	
	
	
	
}


