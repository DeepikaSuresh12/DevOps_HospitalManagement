package com.springboot.repo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.bean.Appointment;

import jakarta.transaction.Transactional;


@Transactional
public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {

	
	@Query("select id FROM Appointment")
	public ArrayList<Integer> getId();
	
	}
