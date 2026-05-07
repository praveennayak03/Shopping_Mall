package com.mall.model;

public class Shop {
    private int id;
    private String shopName;
    private String ownerName;
    private String category;
    private int floorNumber;
    private String status;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getFloorNumber() { return floorNumber; }
    public void setFloorNumber(int floorNumber) { this.floorNumber = floorNumber; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}