package com.mall.controller;

import com.mall.model.Employee;
import com.mall.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public String add(@RequestBody Employee e) {
        employeeService.addEmployee(e);
        return "{\"message\":\"Employee added\"}";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        employeeService.deleteEmployee(id);
        return "{\"message\":\"Employee deleted\"}";
    }
}