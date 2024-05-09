package com.springboot.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Doctor {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;
	
	private String name;
	private String department;
	
	
	@OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Appointment> appointment;
    
	public Doctor(int id, String name, String department) {
		super();
		this.did = did;
		this.name = name;
		this.department = department;
	}

	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}


	/**
	 * @return the did
	 */
	public int getDid() {
		return did;
	}

	/**
	 * @param did the did to set
	 */
	public void setDid(int did) {
		this.did = did;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	
	public List<Appointment> getAppointment() {
		return appointment;
	}
	
	public void setAppointment(List<Appointment> appointment) {
		this.appointment = appointment;
	}

	@Override
	public String toString() {
		return "Doctor [did=" + did + ", name=" + name + ", department=" + department + ", appointment=" + appointment
				+ "]";
	}

	
}
