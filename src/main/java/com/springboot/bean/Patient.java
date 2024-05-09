package com.springboot.bean;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient")

public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;
	
	private String name;
	private String email;
	private String phoneNo;
	
	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
	private List<Appointment> appointment;
	
    public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Patient(int pid, String name, String email, String phoneNo) {
		super();
		this.pid = pid;
		this.name = name;
		this.email = email;
		this.phoneNo = phoneNo;
	}



	/**
	 * @return the pid
	 */
	public int getPid() {
		return pid;
	}



	/**
	 * @param pid the pid to set
	 */
	public void setPid(int pid) {
		this.pid = pid;
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

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}



	@Override
	public String toString() {
		return "Patient [pid=" + pid + ", name=" + name + ", email=" + email + ", phoneNo=" + phoneNo + ", appointment="
				+ appointment + "]";
	}


	

}
