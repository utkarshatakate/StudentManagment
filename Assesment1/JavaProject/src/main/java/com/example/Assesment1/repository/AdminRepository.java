package com.example.Assesment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Assesment1.models.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{

	@Query(value="select * from admin where username =:username",nativeQuery=true)
	Admin findByUsername(String username);

}
