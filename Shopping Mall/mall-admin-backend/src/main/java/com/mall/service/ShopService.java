package com.mall.service;

import com.mall.model.Shop;
import com.mall.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShopService {
    @Autowired
    private ShopRepository shopRepository;

    public List<Shop> getAllShops() {
        return shopRepository.getAllShops();
    }
    public int approveShop(int id) {
        return shopRepository.updateStatus(id, "APPROVED");
    }
    public int rejectShop(int id) {
        return shopRepository.updateStatus(id, "REJECTED");
    }
    public int addShop(Shop shop) {
        return shopRepository.addShop(shop);
    }
}