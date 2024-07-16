package com.rbp.moviebookingapp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rbp.moviebookingapp.models.ERole;
import com.rbp.moviebookingapp.models.Role;
import com.rbp.moviebookingapp.models.User;
import com.rbp.moviebookingapp.payload.request.LoginRequest;
import com.rbp.moviebookingapp.payload.request.SignUpRequest;
import com.rbp.moviebookingapp.payload.response.JwtResponse;
import com.rbp.moviebookingapp.payload.response.MessageResponse;
import com.rbp.moviebookingapp.repository.RoleRepository;
import com.rbp.moviebookingapp.repository.UserRepository;
import com.rbp.moviebookingapp.security.jwt.JwtUtils;
import com.rbp.moviebookingapp.security.services.UserDetailsImpl;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1.0/moviebooking")
@Slf4j
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	
	
	@PostMapping("/login")
	@Operation(summary = "login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getLoginId(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse( jwt , 
				userDetails.get_id(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles
				));
		}
	
	@PostMapping("/register")
	@Operation(summary = "New Registration")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
		//Check if username already exist or not
		if(userRepository.existsByLoginId(signUpRequest.getLoginId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: LoginId is already taken"));
		}
		
		//Check if email exist or not
		if(userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		
		User user = new User(signUpRequest.getLoginId(),
				signUpRequest.getFirstName(),
				signUpRequest.getLastName(),
				signUpRequest.getEmail(),
				signUpRequest.getContactNumber(),
				encoder.encode(signUpRequest.getPassword()));
		
		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();
		
		String errorMessage = "Error: Roles not found.";
		
		if(strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException(errorMessage));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch(role) {
				case "admin" : 
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException(errorMessage));
					roles.add(adminRole);
					break;
					
				case "guest":
					Role modRole = roleRepository.findByName(ERole.ROLE_GUEST)
						.orElseThrow(() -> new RuntimeException(errorMessage));
					roles.add(modRole);
					break;
					
				default:
						Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException(errorMessage));
						roles.add(userRole);
				}
			});
		}
		
		user.setRoles(roles);
		userRepository.save(user);
		
		return ResponseEntity.ok(new MessageResponse("User Registered Successfully!"));
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getDetails(){
		return ResponseEntity.ok(this.userRepository.findAll());
	}
}
