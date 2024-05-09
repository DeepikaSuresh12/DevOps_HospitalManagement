package com.springboot.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.bean.Patient;
import com.springboot.repo.PatientRepo;




@RestController
@CrossOrigin("*")
public class PatientController {
	
	@Autowired
	PatientRepo repo;
	
	@PostMapping("CreatePatient")
	public String createPatient(@RequestBody Patient patient) {
		String msg="";
		try {
			repo.save(patient);
			msg="Inserted Successfully";
		} catch (Exception e) {
			msg="Failed to Insert";
		}
		return msg;
	}
	
	@GetMapping("GetAllPatient")
	public ArrayList<Patient> getAllPatient(){
		return (ArrayList<Patient>) repo.findAll();
	}
	
	@DeleteMapping("DeletePatient/{id}")
	public String doDelete(@PathVariable("id")int pid) {
		String Msg="";
		try {
			repo.deleteById(pid);
			Msg="Record Deleted";
		} catch (Exception e) {
			Msg="Record Not Deleted";
		}
		return Msg;	
	}
	
	@PutMapping("/UpdatePatient/{id}")
	public String doupdate(@PathVariable int pid ,@RequestBody Patient patient) {
		String Msg="";
		try {	
			if (repo.existsById(pid)) {
				patient.setPid(pid);
				repo.save(patient);
				Msg="Record updated Successfully";
			}
			
		} catch (Exception e) {
			Msg="Record updation Failed";
		}
		
		return Msg;
	}
	
	@GetMapping("GetPatientById/{id}")
	public Optional<Patient> findPatientById(@PathVariable("id")int pid) {
		return repo.findById(pid);	
	}
	
	@GetMapping("IdList2")
	public ArrayList<Integer> getIdList(){
		return repo.getId();
	}
}
