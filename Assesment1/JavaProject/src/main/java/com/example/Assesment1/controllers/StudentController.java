package com.example.Assesment1.controllers;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Assesment1.models.Student;
import com.example.Assesment1.models.Teacher;
import com.example.Assesment1.repository.StudentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/student")
public class StudentController {
	
	public StudentController() {
	}

	
	@Autowired StudentRepository  studentRepository;
	
    @GetMapping("/getDataByLogin/{id}")
    public Student getDataByLogin(@PathVariable Long id) {
    	System.out.println("in transaction controller "+id);
    	Student data=studentRepository.findByLogin(id);
        return data;
    }
    @GetMapping("/getData")
    public List<Student> getData() {
    	//System.out.println("in transaction controller "+id);
    	List<Student> data=studentRepository.findAll();
        return data;
    }
    
    @PostMapping("/saveData")
    public Student saveData(@RequestBody Student data) {
    	 System.out.println("in transaction controller saveData "+data.getEmail());
    	 Student result=studentRepository.save(data);
    	 return result;
    }
    
    
    @PostMapping("/updateData")
    public Boolean updateData(@RequestBody Student updatedStudent) {
    	 Optional<Student> studentOpt = studentRepository.findById(updatedStudent.getUserid());
    	  System.out.println("in student controller updateData "+updatedStudent.getUserid());
    	    if (studentOpt.isPresent()) {
    	        Student student = studentOpt.get();
    	        System.out.println("in student controller updateData "+updatedStudent.getEmail());
    	        student.setFirstName(updatedStudent.getFirstName());
    	        student.setEmail(updatedStudent.getEmail());
    	        student.setNumber(updatedStudent.getNumber());
    	        student.setGender(updatedStudent.getGender());
    	        Student data=studentRepository.save(student);
    	        return true;
    	       
    	    }
			return false; 
    }
    
    
    @PostMapping("/updateStatus")
    public Boolean updateStatus(@RequestBody Student updatedStudent) {
    	 Optional<Student> studentOpt = studentRepository.findById(updatedStudent.getUserid());
    	  System.out.println("in student controller updateData "+updatedStudent.getUserid());
    	    if (studentOpt.isPresent()) {
    	        Student student = studentOpt.get();
    	        System.out.println("in student controller updateData "+updatedStudent.getEmail());
    	        student.setStatus(updatedStudent.getStatus());
    	      
    	        Student data=studentRepository.save(student);
    	        return true;
    	       
    	    }
			return false; 
    }
    
	@DeleteMapping("/deleteData/{uid}")
	public boolean deleteData(@PathVariable Long uid, @RequestHeader HttpHeaders headers
			, HttpServletRequest request) {
		
		HashMap<String, Object> viewData = new HashMap<>();
		
		return true;
	}
	
	 @DeleteMapping("/deleteStudent/{userid}")
	    public ResponseEntity<String> deleteStudent(@PathVariable("userid") Long userid) {
	        Optional<Student> student = studentRepository.findById(userid);
	        
	        if (!student.isPresent()) {
	            return ResponseEntity.status(404).body("Student not found with id: " + userid);
	        }

	        // Delete the admin from the database
	        studentRepository.deleteById(userid);
	        
	        // Return a success response
	        return ResponseEntity.ok("Student with ID " + userid + " has been deleted successfully.");
	    }

}
