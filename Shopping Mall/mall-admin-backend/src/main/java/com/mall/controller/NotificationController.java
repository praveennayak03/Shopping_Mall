package com.mall.controller;

import com.mall.model.Notification;
import com.mall.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAll();
    }

    @PostMapping
    public String send(@RequestBody Notification n) {
        notificationService.send(n);
        return "{\"message\":\"Notification sent\"}";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        notificationService.delete(id);
        return "{\"message\":\"Notification deleted\"}";
    }
}