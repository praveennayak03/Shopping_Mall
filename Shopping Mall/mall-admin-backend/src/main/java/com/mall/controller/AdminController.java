package com.mall.controller;

import com.mall.model.MallAdmin;
import com.mall.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:3001"
})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MallAdmin admin) {

        MallAdmin result = adminService.login(
                admin.getUsername(),
                admin.getPassword()
        );

        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(401)
                    .body("{\"message\":\"Invalid credentials\"}");
        }
    }
}