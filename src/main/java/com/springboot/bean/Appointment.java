package com.springboot.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointment")

public class Appointment {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
	
	private String appointmentDate;
	
	@ManyToOne(cascade = CascadeType.REMOVE,targetEntity = Doctor.class)
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;
	
	@ManyToOne(cascade = CascadeType.REMOVE,targetEntity = Patient.class)
	@JoinColumn(name = "patient_id")
	private Patient patient;


	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Appointment(int id, String appointmentDate) {
		super();
		this.id = id;
		this.appointmentDate = appointmentDate;
		
	}
	
	

	
	/**
	 * @return the doctor
	 */
	public Doctor getDoctor() {
		return doctor;
	}

	/**
	 * @param doctor the doctor to set
	 */
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	/**
	 * @return the patient
	 */
	public Patient getPatient() {
		return patient;
	}

	/**
	 * @param patient the patient to set
	 */
	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	@Override
	public String toString() {
		return "Appointment [id=" + id + ", appointmentDate=" + appointmentDate + ", doctor=" + doctor + ", patient="
				+ patient + "]";
	}

	
}
