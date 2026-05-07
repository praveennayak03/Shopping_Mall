package com.mall.service;

import com.mall.model.Employee;
import com.mall.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.getAll();
    }

    public int addEmployee(Employee e) {
        return employeeRepository.add(e);
    }

    public int deleteEmployee(int id) {
        return employeeRepository.delete(id);
    }
}