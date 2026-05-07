package com.mall.service;

import com.mall.model.MallAdmin;
import com.mall.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public MallAdmin login(String username, String password) {
        return adminRepository.login(username, password);
    }
}