package com.springboot.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.bean.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Integer> {

	@Query("select did FROM Doctor")
	public ArrayList<Integer> getId();
}
