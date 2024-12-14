package com.example.Assesment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Assesment1.models.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher,Long>{

	@Query(value="select * from teacher where username =:username and password =:password",nativeQuery=true)
	Teacher findByUsernameAndPassword(String username, String password);

}
