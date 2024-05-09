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

import com.springboot.bean.Doctor;

import com.springboot.repo.DoctorRepo;

@RestController
@CrossOrigin("*")
public class DoctorController {

	@Autowired
	DoctorRepo repo;
	
	@PostMapping("CreateDoctor")
	public String createDoctor(@RequestBody Doctor doctor) {
		String msg="";
		try {
			repo.save(doctor);
			msg="Inserted Successfully";
		} catch (Exception e) {
			msg="Failed to Insert";
		}
		return msg;
	}
	
	@GetMapping("GetAllDoctor")
	public ArrayList<Doctor> getAllDoctor(){
		return (ArrayList<Doctor>) repo.findAll();
	}
	
	@DeleteMapping("DeleteDoctor/{id}")
	public String doDelete(@PathVariable("id")int did) {
		String Msg="";
		try {
			repo.deleteById(did);
			Msg="Record Deleted";
		} catch (Exception e) {
			Msg="Record Not Deleted";
		}
		return Msg;	
	}
	
	@PutMapping("/UpdateDoctor/{id}")
	public String doupdate(@PathVariable int did ,@RequestBody Doctor doctor) {
		String Msg="";
		try {	
			if (repo.existsById(did)) {
				doctor.setDid(did);
				repo.save(doctor);
				Msg="Record updated Successfully";
			}
			
		} catch (Exception e) {
			Msg="Record updation Failed";
		}
		
		return Msg;
	}
	
	@GetMapping("GetDoctorById/{id}")
	public Optional<Doctor> findDoctorById(@PathVariable("id")int did) {
		return repo.findById(did);	
	}
	
	@GetMapping("IdList1")
	public ArrayList<Integer> getIdList(){
		return repo.getId();
	}
}
