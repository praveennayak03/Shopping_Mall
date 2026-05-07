package com.mall.controller;

import com.mall.model.GuestBook;
import com.mall.service.GuestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/guestbook")
@CrossOrigin(origins = "http://localhost:3000")
public class GuestBookController {

    @Autowired
    private GuestBookService guestBookService;

    @GetMapping
    public List<GuestBook> getAll() {
        return guestBookService.getAllEntries();
    }

    @PostMapping
    public String addEntry(@RequestBody GuestBook g) {
        guestBookService.addEntry(g);
        return "{\"message\":\"Guest added\"}";
    }
}