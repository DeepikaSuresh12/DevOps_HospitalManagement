package com.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.bean.Appointment;
import com.springboot.repo.AppointmentRepo;

@RestController
@CrossOrigin("*")
public class AppointmentController {

	
	@Autowired
	AppointmentRepo repo;
	
	@PostMapping("CreateAppointment")
	public String createAppointment(@RequestBody Appointment appointment) {
		
		System.out.println(appointment);
		String msg="";
		try {
			repo.saveAndFlush(appointment);
			msg="Inserted Successfully";
		} catch (Exception e) {
			msg="Failed to Insert";
			e.printStackTrace();
		}
		return msg;
	}
	
	@GetMapping("/GetAllAppointment")
	public List<Appointment> getAllAppointment(){
		return repo.findAll();
	}
	
	
	@DeleteMapping("DeleteAppointment/{id}")
	public String doDelete(@PathVariable("id")int id) {
		String Msg="";
		try {
			repo.deleteById(id);
			Msg="Record Deleted";
		} catch (Exception e) {
			Msg="Record Not Deleted";
		}
		return Msg;	
	}
	
	@PutMapping("/UpdateAppointment")
	public String doupdate(@RequestBody Appointment appointment) {
		String Msg="";
		try {	
				repo.save(appointment);
				Msg="Record updated Successfully";
			
		} catch (Exception e) {
			Msg="Record updation Failed";
		}
		
		return Msg;
	}
	
	@GetMapping("GetAppointmentById/{id}")
	public Optional<Appointment> findAppointmentById(@PathVariable("id")int id) {
		return repo.findById(id);	
	}
	
	@GetMapping("/getIdList")
	public ArrayList<Integer> getIdList(){
		return repo.getId();
	}
}
