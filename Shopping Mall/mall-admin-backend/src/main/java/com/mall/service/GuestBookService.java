package com.mall.service;

import com.mall.model.GuestBook;
import com.mall.repository.GuestBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GuestBookService {
    @Autowired
    private GuestBookRepository guestBookRepository;

    public List<GuestBook> getAllEntries() {
        return guestBookRepository.getAllEntries();
    }
    public int addEntry(GuestBook g) {
        return guestBookRepository.addEntry(g);
    }
}