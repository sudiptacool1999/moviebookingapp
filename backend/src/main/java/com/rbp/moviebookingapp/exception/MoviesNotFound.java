package com.rbp.moviebookingapp.exception;

public class MoviesNotFound extends RuntimeException {
	public MoviesNotFound(String noMoviesAreAvailable) {
		super(noMoviesAreAvailable);
	}

}
