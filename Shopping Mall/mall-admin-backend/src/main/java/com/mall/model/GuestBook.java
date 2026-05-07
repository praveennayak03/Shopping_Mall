package com.mall.model;

public class GuestBook {
    private int id;
    private String visitorName;
    private String phone;
    private String purpose;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getVisitorName() { return visitorName; }
    public void setVisitorName(String visitorName) { this.visitorName = visitorName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
}