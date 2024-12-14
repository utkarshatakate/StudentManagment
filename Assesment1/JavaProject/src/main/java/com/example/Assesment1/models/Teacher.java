package com.example.Assesment1.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Teacher {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userid;
	private String name;
	private String email;
	private String number;
	private String gender;
	private String username;
	private String password;
	private Boolean status;
	
	public Teacher() {
	}
	
	
	public Teacher(long userid, String name, String email, String number, String gender, String username,
			String password, Boolean status) {
		this.userid = userid;
		this.name = name;
		this.email = email;
		this.number = number;
		this.gender = gender;
		this.username = username;
		this.password = password;
		this.status = status;
	}

	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}


	public Boolean getStatus() {
		return status;
	}


	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	
}
