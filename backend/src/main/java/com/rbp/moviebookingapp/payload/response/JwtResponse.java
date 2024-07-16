package com.rbp.moviebookingapp.payload.response;

import java.util.List;

import org.bson.types.ObjectId;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private ObjectId _id;
	private String loginId;
	private String email;
	private List<String> roles;
	
	
	public String getAccessToken() {
		return token;
	}
	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}
	public String getTokenType() {
		return type;
	}
	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}
	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getUserName() {
		return loginId;
	}
	public void setUserName(String loginId) {
		this.loginId = loginId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	public JwtResponse(String accessToken, ObjectId _id, String loginId, String email, List<String> roles) {
		super();
		this.token = accessToken;
		this._id = _id;
		this.loginId = loginId;
		this.email = email;
		this.roles = roles;
	}
	
	

}
