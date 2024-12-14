package com.example.Assesment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Assesment1.models.Student;

public interface StudentRepository extends JpaRepository<Student,Long>{

	@Query(value="select * from student s where s.userid =:id",nativeQuery=true)
	Student findByLogin(Long id);

}
