package com.example.Assesment1.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Assesment1.models.Admin;
import com.example.Assesment1.models.Student;
import com.example.Assesment1.models.Teacher;
import com.example.Assesment1.repository.AdminRepository;
import com.example.Assesment1.repository.StudentRepository;
import com.example.Assesment1.repository.TeacherRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/admin")
public class AdminController {

	public AdminController() {
	}

	@Autowired AdminRepository  adminRepository;	
	@Autowired TeacherRepository  teacherRepository;	
	
	  @PostMapping("/saveData")
	    public Admin saveData(@RequestBody Admin data) {
	    	 System.out.println("in transaction controller saveData "+data.getEmail());
	    	 Admin result=adminRepository.save(data);
	    	 return result;
	    }
	  
	  @GetMapping("/getData/{username}/{password}")
	  public ResponseEntity<?> getData(@PathVariable String username, @PathVariable String password) {
	      Admin admin = adminRepository.findByUsername(username);
	      
	      if (admin != null && admin.getPassword().equals(password)) {
	          return ResponseEntity.ok(admin);  // Return Admin data if found
	      }
	      
	      Teacher user = teacherRepository.findByUsernameAndPassword(username, password);
	      if (user != null) {
	          return ResponseEntity.ok(user);  // Return User data if found
	      }
	      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or password incorrect");
	  }

	  
	  @GetMapping("/getTeacherData")
	    public List<Teacher> getTeacherData() {
	    	//System.out.println("in transaction controller "+id);
	    	List<Teacher> data=teacherRepository.findAll();
	        return data;
	    }
	  @PostMapping("/saveTeacherData")
	    public Teacher saveTeacherData(@RequestBody Teacher data) {
	    	 System.out.println("in transaction controller saveData "+data.getEmail());
	    	 Teacher result=teacherRepository.save(data);
	    	 return result;
	    }
	  
	  @PostMapping("/updateStatus")
	    public Boolean updateStatus(@RequestBody Teacher updatedTeacher) {
	    	 Optional<Teacher> teacherOpt = teacherRepository.findById(updatedTeacher.getUserid());
	    	  System.out.println("in student controller updateData "+updatedTeacher.getUserid());
	    	    if (teacherOpt.isPresent()) {
	    	    	Teacher teacher = teacherOpt.get();
	    	        System.out.println("in student controller updateData "+updatedTeacher.getEmail());
	    	        teacher.setStatus(updatedTeacher.getStatus());
	    	      
	    	        Teacher data=teacherRepository.save(teacher);
	    	        return true;
	    	       
	    	    }
				return false; 
	    }
	  
	  @DeleteMapping("/deleteTeacher/{userid}")
	    public ResponseEntity<String> deleteAdmin(@PathVariable("userid") Long userid) {
	        Optional<Teacher> teacher = teacherRepository.findById(userid);
	        
	        if (!teacher.isPresent()) {
	            return ResponseEntity.status(404).body("Teacher not found with id: " + userid);
	        }

	        // Delete the admin from the database
	        teacherRepository.deleteById(userid);
	        
	        // Return a success response
	        return ResponseEntity.ok("Teacher with ID " + userid + " has been deleted successfully.");
	    }
	  
	

	  
}
