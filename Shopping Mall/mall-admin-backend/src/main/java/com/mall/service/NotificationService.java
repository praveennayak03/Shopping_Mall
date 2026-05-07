package com.mall.service;

import com.mall.model.Notification;
import com.mall.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAll() {
        return notificationRepository.getAll();
    }

    public int send(Notification n) {
        return notificationRepository.send(n);
    }

    public int delete(int id) {
        return notificationRepository.delete(id);
    }
}