package com.rbp.moviebookingapp.models;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value="ticket")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
	private ObjectId _id;
	private String loginId;
	private String movieName;
	private String theatreName;
	private Integer noOfTickets;
	private List<String> seatNumber;
	public Ticket(String loginId, String movieName, String theatreName, Integer noOfTickets, List<String> seatNumber) {
		this.loginId = loginId;
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.noOfTickets = noOfTickets;
		this.seatNumber = seatNumber;
	}
	
	
}
