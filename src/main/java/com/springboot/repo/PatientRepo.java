package com.springboot.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.bean.Patient;

public interface PatientRepo extends JpaRepository<Patient, Integer> {

	@Query("select pid FROM Patient")
	public ArrayList<Integer> getId();
}
