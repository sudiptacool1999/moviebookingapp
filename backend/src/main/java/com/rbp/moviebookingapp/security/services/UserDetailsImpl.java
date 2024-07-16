package com.rbp.moviebookingapp.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rbp.moviebookingapp.models.Role;
import com.rbp.moviebookingapp.models.User;

public class UserDetailsImpl implements UserDetails {
	
	@Autowired
	private Role role;
	
	
	private static final Long serialVersionUID = 1L;
	private ObjectId _id;
	
	private String loginId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private long contactNumber;
	
	@JsonIgnore
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	
	public UserDetailsImpl(ObjectId _id, String loginId, String firstName, String lastName, String email,
			long contactNumber, String password, Collection<? extends GrantedAuthority> authorities) {
		this._id = _id;
		this.loginId = loginId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.password = password;
		this.authorities = authorities;
	}

	
	
	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());
				
		return new UserDetailsImpl(
				user.get_id(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getContactNumber(),
				user.getPassword(),
				authorities );
				}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	
	@Override
	public String getUsername() {
		return loginId;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if(o == null || getClass() != o.getClass())	
				return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(_id, user._id);
	}
	
	
	
	

}
