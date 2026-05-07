package com.mall.controller;

import com.mall.model.Shop;
import com.mall.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:3000")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @PostMapping
    public String addShop(@RequestBody Shop shop) {
        shopService.addShop(shop);
        return "{\"message\":\"Shop added\"}";
    }

    @PutMapping("/approve/{id}")
    public String approve(@PathVariable int id) {
        shopService.approveShop(id);
        return "{\"message\":\"Shop approved\"}";
    }

    @PutMapping("/reject/{id}")
    public String reject(@PathVariable int id) {
        shopService.rejectShop(id);
        return "{\"message\":\"Shop rejected\"}";
    }
}